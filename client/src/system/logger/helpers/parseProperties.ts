const sleep = () => new Promise(resolve => setTimeout(resolve, 500));

const helper = properties => {
  return new Promise(async resolve => {
    const userStore = require('../../../stores/user-store');
    const videoPlayerStore = require('../../../stores/video-player-store');
    const activeVideoStore = require('../../../stores/active-video-store');
    // const experimentation = require('../../../system/experimentation-platform');
    const store = require('../../../store');
    let state = store.default.getState();
    let result = { ...properties };
    // add user information
    while (
      !userStore.selectors.getId(state) &&
      !userStore.selectors.getType(state)
    ) {
      await sleep();
      state = store.default.getState();
    }

    // add user information
    if (!result.userType && !result.userType) {
      result = {
        ...result,
        userId: userStore.selectors.getId(state),
        userType: userStore.selectors.getType(state)
      };
    }

    //add window information
    result = {
      ...result,
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth
    };

    // add courses id information
    if (!result.courseId) {
      result = {
        ...result,
        courseId: activeVideoStore.selectors.getCourseId(state)
      };
    }

    // add lesson id
    if (!result.lessonId) {
      result = {
        ...result,
        lessonId: activeVideoStore.selectors.getLessonId(state)
      };
    }

    // add video information
    if (
      !result.videoDuration ||
      !result.videoTimestamp ||
      !result.playContent ||
      !result.videoStatus
    ) {
      result = {
        ...result,
        videoDuration: activeVideoStore.selectors.getDuration(state),
        videoTimestamp:
          videoPlayerStore.selectors.getTime(state) === 0
            ? null
            : videoPlayerStore.selectors.getTime(state),
        playContent: videoPlayerStore.selectors.getStatus(state),
        videoStatus: videoPlayerStore.selectors.getVideoStatus(state)
      };
    }

    // add A/B test user group information
    /*
    if (!result.groups) {
      result = {
        ...result,
        groups: experimentation.getUserGroup(),
      }
    }
    */

    // remove empty field
    Object.keys(result).forEach(
      key => result[key] === null && delete result[key]
    );

    resolve(result);
  });
};

let fn;
if (process.env.NODE_ENV === 'test') {
  fn = () => ({});
} else {
  fn = async properties => await helper(properties);
}

export default fn;
