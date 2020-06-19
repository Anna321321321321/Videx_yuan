import { ServerError } from 'videx/server/core/error';
import log from 'videx/server/log';
import { ILesson } from 'videx/server/entities';
import fetch from 'node-fetch';
import { APPLICATION_APPINSIGHTS } from 'config';
import { Redis } from 'videx/server/redis';

// get start and end data for each lesson Annotation.Add
/**
 * customEvents
| extend Pacific=(timestamp -7h),userId=tostring(customDimensions.userId), courseId=tostring(customDimensions.courseId), lessonId=tostring(customDimensions.lessonId), userType=tolong(customDimensions.userType), annotationStart=tostring(customDimensions.annotationStart), annotationEnd=tostring(customDimensions.annotationEnd)
| where timestamp > datetime(2018-12-31)
| where name == "Annotation.Add" and  userType == 0 and lessonId == "---"
| project annotationStart, annotationEnd 
 */
export default async (req, res, next) => {
  try {
    const redisClient = Redis;
    const redisResponse = await redisClient.get(req.originalUrl, true);
    //check if cache exists
    if (redisResponse !== null) {
      res.status(200);
      res.send({ lessonAnnotation: redisResponse });
    } else {
      const lesson: ILesson = res.locals.videx.lesson;
      const result = await fetch(
        `https://api.applicationinsights.io/v1/apps/${
          APPLICATION_APPINSIGHTS.ID
        }/query?query=customEvents%7C%20where%20(timestamp%20-8h)%20%3E%20datetime(2019-05-01)%7C%20extend%20userType%3Dtolong(customDimensions.userType)%2C%20lessonId%3Dtostring(customDimensions.lessonId)%2C%20videoTimestamp%3Dtolong(customDimensions.videoTimestamp)%2C%20start%3Dtostring(customDimensions.annotationStart)%2C%20end%3Dtostring(customDimensions.annotationEnd)%7C%20where%20name%20%3D%3D%20%22Annotation.Add%22%20and%20userType%20%3D%3D%200%20and%20lessonId%20%3D%3D%20%22${lesson.getId()}%22%20and%20start!%3D%22%22%20and%20end!%3D%22%22%7C%20project%20start%2Cend`,
        {
          method: 'GET',
          headers: {
            'X-Api-Key': `${APPLICATION_APPINSIGHTS.SECRET}`
          }
        }
      ).then(res => res.json());
      const object = {
        columns: result.tables[0].columns,
        rows: result.tables[0].rows
      };
      // store in cache for 4 hours
      await redisClient.setex(req.originalUrl, 14400, object);
      res.status(200);
      res.send({ lessonAnnotation: object });
    }

    return;
  } catch (e) {
    log.exception(new Error('AppInsights Load failed'), e);
    return next(new ServerError(500, e));
  }
};
