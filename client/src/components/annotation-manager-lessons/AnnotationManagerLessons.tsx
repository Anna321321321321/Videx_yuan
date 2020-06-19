import React, { Fragment, Component } from 'react';
import { Drawer, Icon as ANTDIcon, Button } from 'antd';
import { Tab } from 'semantic-ui-react';
import AnnotationManagerSegment from './annotation-segment';
import AnnotationsProgressBar from './annotations-progress-bar';

interface AnnotationManagerLessonsProps {
  annotations: any[];
  courseId: any;
}

interface AnnotationManagerLessonsStates {
  visible: boolean,
  color: string;
}

const colors = [
  {
    name: "Pink",
    hex: "#e32990",
  },
  {
    name: "Blue",
    hex: "#28a3dc",
  },
  {
    name: "Green",
    hex: "#4cba35",
  },
  {
    name: "Yellow",
    hex: "#fff110",
  },
  {
    name: "No Color",
    hex: null,
  }
]

const countColor = (arrayData, color) => {
  let colorCount = 0;
  for (const [i, data] of arrayData.entries()) {
    if (data.color == color) {
      colorCount++;
    }
  }
  return colorCount;
}

export default class AnnotationManagerLessons extends Component<AnnotationManagerLessonsProps, AnnotationManagerLessonsStates> {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      color: "Pink",
    };
  }
  
  renderProgressBarContent = (): {
    name: string,
    count: number,
    value: number,
    color: string
  }[] =>
    colors.map(({ hex, name }) => ({
      name: name,
      count: countColor(this.props.annotations, hex),
      value: (countColor(this.props.annotations, hex) / this.props.annotations.length) * 100,
      color: hex == null ? "#c0c0c0" : hex,
    }))

  renderPanes = () => 
    colors.map(({ name, hex }) => {
      const annotations = this.props.annotations.filter(annotation => annotation.color == hex)
      return ({
        menuItem: name,
        pane: annotations.map((item, idx) => (
          <AnnotationManagerSegment
            key={idx}
            annotation={item}
          />
        ))
      })
    })

  render() {
    return (
      <Fragment>
        <Button 
          style={{
            marginBottom: '20px'
          }}
          onClick={() => this.setState({ visible: true })}
        >
          <ANTDIcon
            type="edit"
          />
          Annotations
        </Button>
        <Drawer
          title={<h1>Annotations</h1>}
          placement="right"
          closable={true}
          width={1000}
          visible={this.state.visible}
          onClose={() => this.setState({ visible: false })}
        >
          <div className="videx-vertical-scroll">
            <AnnotationsProgressBar
              data={this.renderProgressBarContent()}
              onClick={color => this.setState({ color })}
            />
            <Tab
              panes={this.renderPanes()}
              renderActiveOnly={false}
              activeIndex={colors.findIndex(({ name }) => name == this.state.color)}
              onTabChange={(event, data) => this.setState({ color: colors[data.activeIndex].name })}
            />
          </div>
        </Drawer>
      </Fragment>
    );
  }
};
