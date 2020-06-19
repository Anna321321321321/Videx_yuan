import { ServerError } from 'videx/server/core/error';
import log from 'videx/server/log';
import { ILesson } from 'videx/server/entities';
import fetch from 'node-fetch';
import { APPLICATION_APPINSIGHTS } from 'config';
import { Redis } from 'videx/server/redis';

/*
customEvents
| extend Pacific=(timestamp -7h),userId=tostring(customDimensions.userId), courseId=tostring(customDimensions.courseId), lessonId=tostring(customDimensions.lessonId), userType=tolong(customDimensions.userType), start = tostring(customDimensions.start), end=tostring(customDimensions.end) 
| where timestamp > datetime(2018-12-31)
| where name == "Player.Seeking" and userType == 0 and lessonId  == "---"
| summarize count() by start, end
*/
export default async (req, res, next) => {
  try {
    const redisClient = Redis;
    const redisResponse = await redisClient.get(req.originalUrl, true);
    if (redisResponse !== null) {
      res.status(200);
      res.send({ lessonSeeks: redisResponse });
    } else {
      const lesson: ILesson = res.locals.videx.lesson;
      const result = await fetch(
        `https://api.applicationinsights.io/v1/apps/${
          APPLICATION_APPINSIGHTS.ID
        }/query?query=customEvents%7C%20extend%20Pacific%3D(timestamp%20-7h)%2CuserId%3Dtostring(customDimensions.userId)%2C%20courseId%3Dtostring(customDimensions.courseId)%2C%20lessonId%3Dtostring(customDimensions.lessonId)%2C%20userType%3Dtolong(customDimensions.userType)%2C%20start%20%3D%20tostring(customDimensions.start)%2C%20end%3Dtostring(customDimensions.end)%20%7C%20where%20timestamp%20%3E%20datetime(2019-05-01)%7C%20where%20name%20%3D%3D%20%22Player.Seeking%22%20and%20userType%20%3D%3D%200%20and%20lessonId%20%20%3D%3D%20%22${lesson.getId()}%22%7C%20summarize%20count()%20by%20start%2C%20end`,
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
      res.send({ lessonSeeks: object });
    }
    return;
  } catch (e) {
    log.exception(new Error('AppInsights Load failed'), e);
    return next(new ServerError(500, e));
  }
};
