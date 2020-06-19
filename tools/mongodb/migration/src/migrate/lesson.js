import mongoose from 'mongoose';
import azure from 'azure';
import fetch from 'node-fetch';
import { URLSearchParams } from 'url';

const bs_ACCOUNT = '';
const bs_ACCESS_KEY = '';
let ams_TOKEN = '';
const ams_REST_API_ENDPOINT = '';
const ams_CLIENT_ID = '';
const ams_SECRET = '';
const ams_AAD_TENANT_DOMAIN = '';

const blobStorageService = azure.createBlobService(bs_ACCOUNT, bs_ACCESS_KEY);
const lessonsArray = [];

const lessonModel = mongoose.model('Lesson');
const courseModel = mongoose.model('Course');
const aggregatedLessonModel = mongoose.model('AggregatedLesson');
const lessonV3Model = mongoose.model('LessonV3');

export default async () => {
  ams_TOKEN = await getAccessToken();
  await lessonV3Model.remove({});

  const courses = await courseModel.find({});
  await Promise.all(
    courses.map(async course => {
      await Promise.all(
        course.lessons.map(async lesson => {
          if (!lessonsArray.includes(lesson._id)) {
            lessonsArray.push(lesson._id);

            const document = await lessonModel.findById(lesson._id);
            const { streamingUrl, offlineUrl } = await processVideos(
              document.azure.assetsId.encodingAssetId,
              document.azure.assetsId.offlineAssetId
            );
            const { url, height, width, sas } = await processThumbnail(
              document.azure.assetsId.thumbnailAssetId
            );
            const { fileUrl } = await processTranscript(
              document.azure.assetsId.indexAssetId
            );

            const aggregatedlesson = await aggregatedLessonModel.findOne({
              _id: lesson._id
            });
            const views = aggregatedlesson ? aggregatedlesson.views : [];

            await lessonV3Model.create({
              _id: document._id,
              name: document.name,
              courseId: course._id,
              summary: document.summary,
              status: document.status,
              duration: null,
              azure: document.azure,
              video: {
                streaming: streamingUrl,
                download: offlineUrl
              },
              transcript: {
                text: document.transcript.text,
                file: fileUrl
              },
              thumbnail: {
                url: url,
                height: height,
                width: width,
                sas: sas
              },
              category: lesson.category,
              releaseDate: lesson.releaseDate,
              publish: lesson.publish,
              keywords: lesson.keywords,
              views: views
            });
          }
        })
      );
    })
  );
  console.log('Finish Processing Lesson Collection');
};

/**
 * Blob related
 */
const listBlobsSegmented = async container => {
  return new Promise((resolve, reject) => {
    let aggregatedResult = [];
    const aggregateBlobs = (error, result, response, cb) => {
      if (error) {
        cb(true, null);
      } else {
        aggregatedResult = aggregatedResult.concat(result.entries);
        if (result.continuationToken !== null) {
          blobStorageService.listBlobsSegmented(
            container,
            result.concontinuationToken,
            (error, result, response) => {
              aggregateBlobs(error, result, response, cb);
            }
          );
        } else {
          cb(null, aggregatedResult);
        }
      }
    };
    blobStorageService.listBlobsSegmented(
      container,
      null,
      (error, result, response) => {
        aggregateBlobs(error, result, response, (error, blobs) => {
          if (error) {
            return reject(
              new Error('AzureBlobStorage listBlobsSegmented error')
            );
          } else {
            resolve(blobs);
          }
        });
      }
    );
  });
};

const search = async (container, regex) => {
  const result = [];
  const blobs = await listBlobsSegmented(container);
  for (const blob of blobs) {
    if (regex.test(blob.name)) {
      result.push(blob.name);
    }
  }
  return result[0];
};

/**
 * Media service related
 */
const getAccessToken = async () => {
  const params = new URLSearchParams();
  params.append('grant_type', 'client_credentials');
  params.append('client_id', ams_CLIENT_ID);
  params.append('client_secret', ams_SECRET);
  params.append('resource', 'https://rest.media.azure.net');
  const res = await fetch(
    `https://login.microsoftonline.com/${ams_AAD_TENANT_DOMAIN}/oauth2/token`,
    {
      method: 'POST',
      body: params,
      headers: {
        Accept: 'application/json',
        Connection: 'Keep-Alive',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  );
  const { access_token } = await res.json();
  return access_token;
};

const createHeader = () => {
  return {
    Authorization: 'Bearer ' + ams_TOKEN,
    'x-ms-version': '2.17',
    Accept: 'application/json',
    'Content-Type': 'application/json',
    DataServiceVersion: '3.0;NetFx',
    MaxDataServiceVersion: '3.0;NetFx'
  };
};

const deleteLocatorsAndPolicies = async assetId => {
  const resLocators = await fetch(
    `${ams_REST_API_ENDPOINT}Assets('${assetId}')/Locators`,
    {
      method: 'GET',
      headers: createHeader()
    }
  );
  const valueLocators = await resLocators.json();
  await Promise.all(
    valueLocators.value.map(async ({ Id, AccessPolicyId }) => {
      await fetch(`${ams_REST_API_ENDPOINT}Locators('${Id}')`, {
        method: 'DELETE',
        headers: createHeader()
      });
      await fetch(
        `${ams_REST_API_ENDPOINT}AccessPolicies('${AccessPolicyId}')`,
        {
          method: 'DELETE',
          headers: createHeader()
        }
      );
    })
  );
};

const createAccessPolicy = async () => {
  const res = await fetch(ams_REST_API_ENDPOINT + 'AccessPolicies', {
    method: 'POST',
    body: JSON.stringify({
      Name: 'DownloadPolicy',
      DurationInMinutes: (365 * 24 * 60 * 100).toString(),
      Permissions: 1 // Read
    }),
    headers: createHeader()
  });
  const { Id } = await res.json();
  return Id;
};

const createLocator = async (type, assetId, accessPolicyId) => {
  await deleteLocatorsAndPolicies(assetId);
  const res = await fetch(ams_REST_API_ENDPOINT + 'Locators', {
    method: 'POST',
    body: JSON.stringify({
      AccessPolicyId: accessPolicyId,
      AssetId: assetId,
      StartTime: new Date(Date.now() - 5 * 60 * 1000)
        .toISOString()
        .split('.', 1)[0], // Start 5 minutes before to prevent clock skew
      Type: type
    }),
    headers: createHeader()
  });
  const { BaseUri, ContentAccessComponent, Path } = await res.json();
  return {
    baseUri: BaseUri,
    contentAccessComponent: ContentAccessComponent,
    path: Path
  };
};

const createDownloadUrl = async (assetId, fileName) => {
  const accessPolicyId = await createAccessPolicy();
  const locator = await createLocator(1, assetId, accessPolicyId);
  return locator.baseUri + '/' + fileName + locator.contentAccessComponent;
};

const createStreamingUrl = async (assetId, fileName) => {
  const accessPolicyId = await createAccessPolicy();
  const locator = await createLocator(2, assetId, accessPolicyId);
  return locator.path + fileName;
};

const assetId2container = assetId => {
  try {
    const re1 = '.*?';
    const re2 =
      '([A-Z0-9]{8}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{12})';
    const p = new RegExp(re1 + re2, 'i');
    const m = p.exec(assetId);
    return `asset-${m[1]}`;
  } catch (e) {
    throw new Error('assetId2container error');
  }
};

const findCreateDownloadUrl = async (assetId, fileRegExp) => {
  const container = await assetId2container(assetId);
  const file = await search(container, fileRegExp);
  return await createDownloadUrl(assetId, file);
};

const findCreateStreamingUrl = async (assetId, fileRegExp, postfix) => {
  const container = await assetId2container(assetId);
  const file = await search(container, fileRegExp);
  return await createStreamingUrl(assetId, `${file}${postfix}`);
};

/**
 * Post process related
 */
const processVideos = async (encodingAssetId, offlineAssetId) => {
  const streamingUrl = await findCreateStreamingUrl(
    encodingAssetId,
    /.*\.ism$/,
    '/manifest(format=m3u8-aapl)'
  );
  const offlineUrl = await findCreateDownloadUrl(offlineAssetId, /.*\.mp4$/);
  return {
    streamingUrl: streamingUrl.replace(/^http:\/\//g, 'https://'),
    offlineUrl: offlineUrl
  };
};

const processThumbnail = async thumbnailAssetId => {
  const previewUrl = await createDownloadUrl(thumbnailAssetId, '000001.jpg');
  const links = previewUrl.split('000001.jpg?');
  return {
    url: links[0],
    height: 360,
    width: 480,
    sas: links[1]
  };
};

const processTranscript = async indexAssetId => {
  const fileUrl = await findCreateDownloadUrl(indexAssetId, /.*\.vtt$/);
  return {
    fileUrl
  };
};
