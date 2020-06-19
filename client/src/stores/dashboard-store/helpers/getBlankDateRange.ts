import moment from 'moment';

export default () => {
  let calendarDate: Date = null;
  const todayDate = new Date();
  const currentYear = todayDate.getFullYear();
  const fallSession = new Date(currentYear, 8, 1);
  const winterSession = new Date(currentYear, 0, 1);
  const summerSession = new Date(currentYear, 4, 1);
  if (todayDate > winterSession && todayDate < summerSession) {
    calendarDate = winterSession;
  } else if (todayDate > summerSession && todayDate < fallSession) {
    calendarDate = summerSession;
  } else if (todayDate > fallSession) {
    calendarDate = fallSession;
  }

  const calendarStartDate = new Date(calendarDate);
  const calendarEndDate = new Date(calendarDate.setDate(120));

  let calendarHeatmapBlank = new Array();
  for (let i = 0; i < 123; i++) {
    const newDate = moment(calendarStartDate)
      .add(i, 'days')
      .format('YYYY-MM-DD');
    calendarHeatmapBlank.push({ date: newDate, count: 0 });
  }

  return {
    calendarStartDate: calendarStartDate,
    calendarEndDate: calendarEndDate,
    calendarHeatmapBlank: calendarHeatmapBlank
  };
};
