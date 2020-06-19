import moment from 'moment';

export default (a, b) => {
  if (moment(a.releaseDate).diff(moment(b.releaseDate)) === 0) {
    return a.name !== b.name ? (a.name < b.name ? -1 : 1) : 0;
  } else {
    return moment(a.releaseDate).diff(moment(b.releaseDate));
  }
};
