import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import * as d3 from 'd3';
import { compose, withHandlers, onlyUpdateForKeys } from 'recompose';
import * as selectors from './selectors';
import * as AnalyticsStore from '../../stores/analytics-store';
import * as TimeCore from '../../core/time';

interface ArcChartProps {
  size: {
    height: number;
    width: number;
  };
  onMouseEnterNode: (ref) => void;
  onMouseEnterPath: (ref) => void;
  onMouseLeaveNode: (ref) => void;
  onMouseLeavePath: (ref) => void;
  getData: {
    links: {
      start: number;
      endAngle: number;
      padAngle: number;
      startAngle: number;
      end: number;
      innerRadius: number;
      outerRadius: number;
      translateX: number;
      ref: any;
    }[];
    nodes: {
      cx: number;
      cy: number;
      r: number;
      value: number;
      ref: any;
    }[];
  };
}

const mapStateToProps = state => ({
  getData: selectors.getData(state),
  size: AnalyticsStore.selectors.getSize(state)
});

const mapDispatchToProps = {};

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withHandlers({
    onMouseEnterNode: props => ref => {
      ref.current.setAttribute('r', '20');
    },
    onMouseEnterPath: props => ref => {
      ref.current.setAttribute('fill', '#1890ff');
    },
    onMouseLeavePath: props => ref => {
      ref.current.setAttribute('fill', 'grey');
    },
    onMouseLeaveNode: props => ref => {
      ref.current.setAttribute('r', '10');
    }
  }),
  onlyUpdateForKeys(['getData', 'size'])
);

export default enhance((props: ArcChartProps) => {
  const nodeY = props.size.height - 50;
  const arc = d3.arc();
  const margin = {
      top: 20,
      right: 30,
      bottom: 20,
      left: props.size.width * 0.125
    },
    width = props.size.width * 0.75 - margin.left - margin.right,
    height = props.size.height - margin.top - margin.bottom;
  return (
    <svg
      width={props.size.width - 25}
      height={height + margin.top + margin.bottom}
    >
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        {props.getData !== null &&
          props.getData.nodes.map((item, index) => (
            <Fragment>
              <circle
                key={`circle` + index}
                fill={'#1890ff'}
                stroke={'#1890ff'}
                cx={item.cx}
                cy={nodeY}
                r={10}
                ref={item.ref}
                onMouseEnter={() => props.onMouseEnterNode(item.ref)}
                onMouseLeave={() => props.onMouseLeaveNode(item.ref)}
              />
              <text
                fontSize={'x-small'}
                key={`text` + index}
                x={item.cx - 3}
                y={nodeY + 20}
              >
                {item.value}
              </text>
            </Fragment>
          ))}

        {props.getData !== null &&
          props.getData.links.map((item, index) => (
            <Fragment>
              <path
                key={`path` + index}
                offset={0}
                d={arc(item)}
                ref={item.ref}
                fill={'grey'}
                stroke={'grey'}
                transform={`translate(${item.start + 10}, ${nodeY})`}
                onMouseEnter={() => props.onMouseEnterPath(item.ref)}
                onMouseLeave={() => props.onMouseLeavePath(item.ref)}
              />
            </Fragment>
          ))}
      </g>
    </svg>
  );
});
