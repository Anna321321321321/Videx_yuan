import moment from 'moment';
import _ from 'lodash';

export default (
  lessonVisitNameOverTime,
  lessonCountGroupByDate,
  lessonIdData
) => {
  //LessonId, Date, Count
  const lessonVisitObjectOverTime = lessonVisitNameOverTime.rows.reduce(
    (map, item) => {
      const dummyObj = {};
      const momentObject = moment(item[1])
        .utc()
        .format('YYYY-MM-DD');
      dummyObj['date'] = momentObject;
      dummyObj['count'] = lessonCountGroupByDate[momentObject];
      if (!_.has(map, momentObject)) {
        dummyObj['lessons'] = new Set([lessonIdData[item[0]]]);
        const lessonObj = {};
        lessonObj[item[0]] = item[2];
        dummyObj['lessonIds'] = lessonObj;
        map[momentObject] = { ...dummyObj };
      } else {
        map[momentObject].lessons = map[momentObject].lessons.add(
          lessonIdData[item[0]]
        );
        // if object has lessonId info
        if (_.has(map[momentObject].lessonIds, item[0])) {
          map[momentObject].lessonId[item[0]] =
            map[momentObject].lessonId[item[0]] + item[2];
        } else {
          const lessonObj = map[momentObject].lessonIds;
          lessonObj[item[0]] = item[2];
          map[momentObject].lessonIds = { ...lessonObj };
        }
        map[momentObject] = { ...map[momentObject], ...dummyObj };
      }
      return map;
    },
    {}
  );
  return lessonVisitObjectOverTime;
};
