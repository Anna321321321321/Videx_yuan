import { Button, Layout, Steps } from 'antd';
import moment, { Moment } from 'moment';
import React, { Component } from 'react';
import { Link } from 'react-router';
import * as Logger from 'videx/client/logger';
import * as TimeCore from '../../core/time';
import APICaller from '../../system/api-caller';
import CreateEditCourseForm from '../create-edit-course-form';

export interface CreateEditCourseStepsProps {
  name?: string;
  releaseDate?: string;
  id?: string;
  mode: 'create' | 'edit';
}

interface CreateEditCourseStepsStates {
  fields: {
    name: {
      value: string;
    };
    releaseDate: {
      value: Moment;
    };
  };
  current: number;
  loading: boolean;
  status: 'wait' | 'process' | 'finish' | 'error';
}

export default class CreateEditCourseSteps extends Component<
  CreateEditCourseStepsProps,
  CreateEditCourseStepsStates
> {
  constructor(props) {
    super(props);
    this.state = {
      fields: {
        name: {
          value: this.props.name ? this.props.name : null
        },
        releaseDate: {
          value: this.props.releaseDate ? moment(this.props.releaseDate) : null
        }
      },
      current: 0,
      loading: false,
      status: 'wait'
    };
  }

  handleFormFieldsChange = changedFields => {
    this.setState({
      fields: { ...this.state.fields, ...changedFields }
    });
  };

  handleCreateApiCall = () => {
    APICaller.post(
      '/api/v4/courses',
      {
        name: this.state.fields.name.value,
        // we need to reformat the moment object, moment data returned from antd contains hours, minutes, seconds information
        releaseDate: TimeCore.round(this.state.fields.releaseDate.value)
      },
      () => {
        this.setState({
          current: this.state.current + 1,
          status: 'finish',
          loading: false
        });
      }
    );
  };

  handleEditApiCall = () => {
    APICaller.put(
      `/api/v4/courses/${this.props.id}`,
      JSON.stringify({
        name: this.state.fields.name.value,
        // we need to reformat the moment object, moment data returned from antd contains hours, minutes, seconds information
        releaseDate: TimeCore.round(this.state.fields.releaseDate.value)
      }),
      () => {
        this.setState({
          current: this.state.current + 1,
          status: 'finish',
          loading: false
        });
      }
    );
  };

  generateSteps() {
    return [
      {
        title: 'Configure',
        content: (
          <CreateEditCourseForm
            {...this.state.fields}
            onChange={changedFields =>
              this.handleFormFieldsChange(changedFields)
            }
            onSubmit={() => this.setState({ current: this.state.current + 1 })}
          />
        ),
        action: null
      },
      {
        title: 'Review',
        content: (
          <div>
            <p>Name: {this.state.fields.name.value}</p>
            <p>
              Start releaseDate:{' '}
              {this.state.fields.releaseDate.value
                ? this.state.fields.releaseDate.value.format('YYYY-MM-DD')
                : null}
            </p>
          </div>
        ),
        action: (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Button
              type="primary"
              onClick={() => {
                this.setState({ loading: true }, () => {
                  if (this.props.mode === 'create') {
                    Logger.event('CreateCourse.Create.Click');
                    this.handleCreateApiCall();
                  } else if (this.props.mode === 'edit') {
                    Logger.event('EditCourse.Save.Click', {
                      courseId: this.props.id
                    });
                    this.handleEditApiCall();
                  }
                });
              }}
              loading={this.state.loading}
            >
              Submit
            </Button>
            <Button
              style={{ marginLeft: 8 }}
              onClick={() => this.setState({ current: this.state.current - 1 })}
            >
              Previous
            </Button>
          </div>
        )
      },
      {
        title: 'Finished',
        content: (
          <div>
            {this.state.status === 'error' && (
              <div>Cannot Process the Request</div>
            )}
            {this.state.status === 'finish' && <div>Request Complete</div>}
          </div>
        ),
        action: (
          <div
            style={{
              textAlign: 'center'
            }}
          >
            <Button type="primary">
              <Link to="/">Back to Course Library</Link>
            </Button>
          </div>
        )
      }
    ];
  }

  render() {
    const steps = this.generateSteps();
    return (
      <Layout.Content
        style={{
          padding: '0px 24px'
        }}
      >
        <div
          style={{
            background: '#fff',
            padding: '24px'
          }}
        >
          <Steps current={this.state.current} status={this.state.status}>
            {steps.map(item => (
              <Steps.Step key={item.title} title={item.title} />
            ))}
          </Steps>
          <div
            style={{
              marginTop: '24px',
              border: '1px dashed #e9e9e9',
              borderRadius: '6px',
              backgroundColor: '#fafafa',
              minHeight: '200px',
              textAlign: 'center',
              paddingTop: '72px'
            }}
          >
            {steps[this.state.current].content}
          </div>
          <div
            style={{
              marginTop: '24px'
            }}
          >
            {steps[this.state.current].action}
          </div>
        </div>
      </Layout.Content>
    );
  }
}
