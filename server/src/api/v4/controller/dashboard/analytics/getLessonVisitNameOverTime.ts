import { ServerError } from 'videx/server/core/error';
import log from 'videx/server/log';
import { ICourse } from 'videx/server/entities';
import fetch from 'node-fetch';
import { APPLICATION_APPINSIGHTS } from 'config';
import { Redis } from 'videx/server/redis';

// name, lessonid, timestamp, count
export default async (req, res, next) => {
  try {
    const redisClient = Redis;
    const redisResponse = await redisClient.get(req.originalUrl, true);
    if (redisResponse !== null) {
      res.status(200);
      res.send({ lessonVisitNameOverTime: redisResponse });
    } else {
      const course: ICourse = res.locals.videx.course;
      const result = await fetch(
        `https://api.applicationinsights.io/v1/apps/${
          APPLICATION_APPINSIGHTS.ID
        }/query?query=customEvents%7C%20where%20(timestamp%20-7h)%20%3E%20datetime(2019-05-01)%7C%20extend%20Pacific%3D(timestamp%20-7h)%2C%20courseId%3Dtostring(customDimensions.courseId)%2C%20userId%3Dtostring(customDimensions.userId)%2C%20userType%3Dtolong(customDimensions.userType)%2C%20lessonId%3Dtostring(customDimensions.lessonId)%7C%20where%20name%20contains%20%22Lesson.View%22%20and%20userType%20%3D%3D0%20and%20courseId%20%3D%3D%20%22${course.getId()}%22%7C%20summarize%20dcount(userId)%20by%20lessonId%2C%20bin(Pacific%2C%201d)`,
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
      res.send({ lessonVisitNameOverTime: object });
    }

    return;
  } catch (e) {
    log.exception(new Error('AppInsights Load failed'), e);
    return next(new ServerError(500, e));
  }
};
