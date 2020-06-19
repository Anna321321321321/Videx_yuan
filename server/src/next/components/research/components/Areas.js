import React, { Component } from 'react';
import Carousel from 'nuka-carousel';
import AreaCard from './AreaCard';

export default class Areas extends Component {
  render() {
    return (
      <Carousel
        autoplay={true}
        wrapAround={true}
        autoplayInterval={7000}
        speed={1200}
      >
        <AreaCard
          title="Active Viewing"
          description="We examine active viewing behaviors, specifically
            seeking and highlighting within videos, which may
            suggest greater levels of participation and
            learning."
          imgSrc="/static/activeViewingFramework.png"
          backgroundColor="#0078D4"
        />
        <AreaCard
          title="Video Personalization"
          description="    We introduce a video player that allows students to
            markup video with highlights, tags, and notes in
            order to personalize their video-based learning
            experience."
          imgSrc="/static/videoPersonalization.png"
          backgroundColor="#00B7C3"
        />
        <AreaCard
          title="Video Annotations"
          description="We introduce a video player that allows students to
            markup video with highlights, tags, and notes in
            order to personalize their video-based learning
            experience."
          imgSrc="/static/videoAnnotations.png"
          backgroundColor="#744DA9"
        />
      </Carousel>
    );
  }
}
