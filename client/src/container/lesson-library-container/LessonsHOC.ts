import { connect } from 'react-redux';
import { compose, withProps, lifecycle, withHandlers } from 'recompose';
import * as LessonLibraryStore from '../../stores/lesson-library-store';
import * as DashboardStore from '../../stores/dashboard-store';
import _ from 'lodash';
import APICaller from '../../system/api-caller';

interface InitHOCOutterProps {}

interface InitHOCInnerProps {
  lessons: any[];
  adminAccess: boolean;
  courseId: string;
  subscribers: number;
  lessonCount: number;
}

export default compose<InitHOCInnerProps, InitHOCOutterProps>(
  connect(
    state => ({
      lessons: LessonLibraryStore.selectors.getLessons(state),
      adminAccess: LessonLibraryStore.selectors.getAdminAccess(state),
      courseId: LessonLibraryStore.selectors.getCourseId(state),
      subscribers: LessonLibraryStore.selectors.getSubscribers(state),
      lessonCount: LessonLibraryStore.selectors.getLessonCount(state),
      analyticsMode: LessonLibraryStore.selectors.getAnalyticsMode(state),
      categories: LessonLibraryStore.selectors.getCategories(state),
      selectedCategory: LessonLibraryStore.selectors.getSelectedCategory(state),
      showDrawer: LessonLibraryStore.selectors.getShowDrawer(state),
    }),
    {
      changeAnalyticsMode: LessonLibraryStore.actions.changeAnalyticsMode,
      changeShowDrawer: LessonLibraryStore.actions.changeShowDrawer,
    }
  ),
  withHandlers({
    handleGetApiCall: props => () => {
      const promise = new Promise((resolve, reject) => {
        APICaller.get(`/api/v4/playlist/${props.courseId}`, payload =>
          resolve({
            ...payload
          })
        );
      });
      return promise;
    },
    handlePostApiCall: props => (categoryName, filteredLessons) => {
      APICaller.post(
        `/api/v4/playlist/${props.courseId}`,
        {
          playlist: {
            name: categoryName,
            lessons: filteredLessons,
            courseId: props.courseId
          }
        },
        () => {}
      );
    },
    handlePutApiCall: props => (_id, dummyPlaylist) => {
      APICaller.put(
        `/api/v4/playlist/${props.courseId}`,
        JSON.stringify({
          _id: _id,
          lessons: dummyPlaylist
        }),
        () => {}
      );
    },
    getFilteredLessons: props => playlistName => {
      const filteredLessons = _.filter(
        props.lessons,
        lesson =>
          lesson.category === playlistName &&
          lesson.status !== 3 &&
          lesson.preview !== null
      ).reduce((map, lesson) => {
        map.push({
          _id: lesson.id,
          name: lesson.name,
          preview: lesson.preview,
          duration: lesson.duration,
          releaseDate: lesson.releaseDate
        });
        return map;
      }, []);
      return filteredLessons;
    }
  }),
  lifecycle({
    componentDidMount() {
      if (this.props.adminAccess) {
        const promise: Promise<any> = this.props.handleGetApiCall();
        promise.then((response: any) => {
          // are there any playlists existing
          if (_.isEmpty(response.playlist)) {
            this.props.categories.map(categoryName => {
              const filteredLessons = this.props.getFilteredLessons(
                categoryName
              );
              if (filteredLessons.length > 0) {
                this.props.handlePostApiCall(categoryName, filteredLessons);
              }
            });
          } else {
            // check in depth if each playlist has the latest lessons
            if (response.playlist.length === this.props.categories.length) {
              response.playlist.map(playlistItem => {
                const dummyPlaylist = this.props.getFilteredLessons(
                  playlistItem.name
                );
                // check for comparision if playlists match
                if (!_.isEqual(dummyPlaylist, playlistItem.lessons)) {
                  this.props.handlePutApiCall(playlistItem._id, dummyPlaylist);
                }
              });
            } else {
              // there is one playlist missing in the database
              const groupedPlaylist = _.groupBy(
                response.playlist,
                item => item.name //playlist name
              );
              this.props.categories.map(categoryName => {
                // if category is not in database will return undefined
                if (groupedPlaylist[categoryName] === undefined) {
                  const filteredLessons = this.props.getFilteredLessons(
                    categoryName
                  );
                  if (filteredLessons.length > 0) {
                    this.props.handlePostApiCall(categoryName, filteredLessons);
                  }
                }
              });
            }
          }
        });
      }
    }
  }),
  withProps(props => ({
    lessons: props.lessons,
    adminAccess: props.adminAccess,
    courseId: props.courseId,
    subscribers: props.subscribers,
    lessonCount: props.lessonCount,
    analyticsMode: props.analyticsMode,
    showDrawer: props.showDrawer,
    changeShowDrawer: props.changeShowDrawer,
    changeAnalyticsMode: props.changeAnalyticsMode,
    handleGetApiCall: props.handleGetApiCall,
    handlePostApiCall: props.handlePostApiCall,
    handlePutApiCall: props.handlePutApiCall,
    getFilteredLessons: props.getFilteredLessons
  }))
);
