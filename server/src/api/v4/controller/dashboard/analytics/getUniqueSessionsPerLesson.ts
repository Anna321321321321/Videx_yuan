import { ServerError } from 'videx/server/core/error';
import log from 'videx/server/log';
import { ICourse } from 'videx/server/entities';
import fetch from 'node-fetch';
import { APPLICATION_APPINSIGHTS } from 'config';
import { Redis } from 'videx/server/redis';

// lesson, number of students engaged per lesson
export default async (req, res, next) => {
  try {
    const redisClient = Redis;
    const redisResponse = await redisClient.get(req.originalUrl, true);
    //check if cache exists
    if (redisResponse !== null) {
      res.status(200);
      res.send({ uniqueSessionsPerLesson: redisResponse });
    } else {
      const course: ICourse = res.locals.videx.course;
      const result = await fetch(
        `https://api.applicationinsights.io/v1/apps/${
          APPLICATION_APPINSIGHTS.ID
        }/query?query=customEvents%7C%20where%20timestamp%20%3E%20datetime(2019-05-01)%7C%20extend%20courseId%3Dtostring(customDimensions.courseId)%2C%20userId%3Dtostring(customDimensions.userId)%2C%20userType%3Dtolong(customDimensions.userType)%2C%20lessonId%3Dtostring(customDimensions.lessonId)%7C%20where%20name%20contains%20%22Lesson.View%22%20and%20userId%20!%3D%20%22%22%20and%20courseId%20%3D%3D%20%22${course.getId()}%22%20%20and%20userType%20%3D%3D%200%20and%20lessonId%20!%3D%20%22undefined%22%7C%20summarize%20Count%3Ddcount(userId)%20by%20lessonId`,
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
      res.send({ uniqueSessionsPerLesson: object });
    }
    return;
  } catch (e) {
    log.exception(new Error('AppInsights Load failed'), e);
    return next(new ServerError(500, e));
  }
};
