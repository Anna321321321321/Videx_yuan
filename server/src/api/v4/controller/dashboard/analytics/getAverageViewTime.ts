import { ServerError } from 'videx/server/core/error';
import log from 'videx/server/log';
import { ICourse } from 'videx/server/entities';
import fetch from 'node-fetch';
import { APPLICATION_APPINSIGHTS } from 'config';
import { Redis } from 'videx/server/redis';

/*
retrieves logs for Player.Exit and ActiveVideo load used for calculating dwelling time
dwelling time is how much time the user spends on a video

output: lessonId, avg_duration 

customEvents
| extend userId=tostring(customDimensions.userId), courseId=tostring(customDimensions.courseId), lessonId=tostring(customDimensions.lessonId), userType=tolong(customDimensions.userType), startTime=timestamp
| where timestamp > datetime(2018-12-30)
| where name == "ActiveVideo.Load" and userType == 0 and courseId == "---" and lessonId != ""
| distinct name, session_Id, startTime, lessonId
| join (customEvents
| where timestamp > datetime(2018-12-30)
| extend userId=tostring(customDimensions.userId), courseId=tostring(customDimensions.courseId), lessonId=tostring(customDimensions.lessonId), userType=tolong(customDimensions.userType), endTime=timestamp
| where name == "Player.Exit" and userType == 0 and courseId == "---" and lessonId != ""
| distinct  session_Id, endTime,lessonId)
on session_Id, lessonId
| where endTime > startTime 
| project  lessonId,duration = endTime - startTime
| summarize avg(duration) by lessonId
*/

export default async (req, res, next) => {
  try {
    const redisClient = Redis;
    const redisResponse = await Redis.get(req.originalUrl, true);
    //check if cache exists
    if (redisResponse !== null) {
      res.status(200);
      res.send({ averageViewTime: redisResponse });
    } else {
      const course: ICourse = res.locals.videx.course;
      const result = await fetch(
        `https://api.applicationinsights.io/v1/apps/${
          APPLICATION_APPINSIGHTS.ID
        }/query?query=customEvents%7C%20extend%20userId%3Dtostring(customDimensions.userId)%2C%20courseId%3Dtostring(customDimensions.courseId)%2C%20lessonId%3Dtostring(customDimensions.lessonId)%2C%20userType%3Dtolong(customDimensions.userType)%2C%20startTime%3Dtimestamp%7C%20where%20timestamp%20%3E%20datetime(2019-05-01)%7C%20where%20name%20%3D%3D%20%22ActiveVideo.Load%22%20and%20userType%20%3D%3D%200%20and%20courseId%20%3D%3D%20%22${course.getId()}%22%20and%20lessonId%20!%3D%20%22%22%7C%20distinct%20name%2C%20session_Id%2C%20startTime%2C%20lessonId%7C%20join%20(customEvents%7C%20where%20timestamp%20%3E%20datetime(2019-05-01)%7C%20extend%20userId%3Dtostring(customDimensions.userId)%2C%20courseId%3Dtostring(customDimensions.courseId)%2C%20lessonId%3Dtostring(customDimensions.lessonId)%2C%20userType%3Dtolong(customDimensions.userType)%2C%20endTime%3Dtimestamp%7C%20where%20name%20%3D%3D%20%22Player.Exit%22%20and%20userType%20%3D%3D%200%20and%20courseId%20%3D%3D%20%22${course.getId()}%22%20and%20lessonId%20!%3D%20%22%22%7C%20distinct%20%20session_Id%2C%20endTime%2ClessonId)on%20session_Id%2C%20lessonId%7C%20where%20endTime%20%3E%20startTime%20%7C%20project%20%20lessonId%2Cduration%20%3D%20endTime%20-%20startTime%7C%20summarize%20avg(duration)%20by%20lessonId`,
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
      res.send({ averageViewTime: object });
    }
    return;
  } catch (e) {
    log.exception(new Error('AppInsights Load failed'), e);
    return next(new ServerError(500, e));
  }
};
