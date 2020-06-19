import { createSelector } from 'reselect';
import * as AnalyticsStore from '../../stores/analytics-store';
import * as ActiveVideoStore from '../../stores/active-video-store';
import React from 'react';
import * as d3 from 'd3';
import * as TimeCore from '../../core/time';

export const getData = createSelector(
  AnalyticsStore.selectors.getSize,
  AnalyticsStore.selectors.getAnalytics,
  ActiveVideoStore.selectors.getDuration,
  (size, analytics, duration) => {
    if (!size || !duration) {
      return null;
    }

    const nodeY = size.height - 50;
    let nodes = [];
    const nodeSampling = Math.floor(duration / 30);
    for (let i = 0; i <= duration + 10; i = i + nodeSampling) {
      nodes.push({ time: i.toString() });
    }

    const allNodes = nodes.map(item => item.time);
    const x = d3
      .scalePoint()
      .range([0, size.width * 0.75]) //pixel range
      .domain(allNodes);

    const circleArray = nodes.reduce((map, item) => {
      const value = {
        cx: Math.floor(x(item.time)),
        cy: nodeY,
        r: 5,
        value:
          TimeCore.numToLength(Math.floor(item.time / 60)) +
          ':' +
          TimeCore.numToLength(Math.floor(item.time % 60)),
        ref: React.createRef()
      };
      map.push(value);
      return map;
    }, []);

    let arcArray = [];
    arcArray = analytics.lessonSeeks.reduce((map, item) => {
      const end = Math.ceil(item.end / nodeSampling) * nodeSampling;
      const start = Math.ceil(item.start / nodeSampling) * nodeSampling;
      const xStart = Math.floor(x(start.toString()));
      const xEnd = Math.floor(x(end.toString()));
      const arcHeight = Math.abs(xStart - xEnd) * 0.5;
      const value = {
        start: xStart < xEnd ? xStart + arcHeight - 10 : xEnd + arcHeight - 10,
        endAngle: 0.5 * Math.PI,
        padAngle: 0,
        startAngle: -0.5 * Math.PI,
        end: xEnd > xStart ? xEnd : xStart,
        innerRadius: arcHeight - 1,
        outerRadius: arcHeight + 1,
        translateX: xStart,
        ref: React.createRef()
      };
      map.push(value);
      return map;
    }, []);
    return {
      nodes: circleArray,
      links: arcArray
    };
  }
);
