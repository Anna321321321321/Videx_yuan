import 'whatwg-fetch';
import { Layout, Modal, Input, notification } from 'antd';
import Error from 'next/error';
import Index from '../index';
import React, { Component } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import Loading from '../components/loading';

export default class user extends Component {
  state = {
    allow: null,
    id: null
  };

  componentDidMount() {
    fetch('/api/v4/users', { method: 'GET', credentials: 'include' })
      .then(res => res.json())
      .then(json => {
        this.setState({
          ...this.state,
          allow: parseInt(json.type, 10) === 2
        });
      });
  }

  remove = () => {
    fetch(`/api/v4/users/${this.state.id}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'DELETE',
      credentials: 'include'
    }).then(res => {
      if (res.ok) {
        notification.success({
          message: 'OK',
          description: 'OK'
        });
      } else {
        notification.error({
          message: 'Error',
          description: 'Please check the input'
        });
      }
      this.setState({
        ...this.state,
        id: null
      });
    });
  };

  render() {
    if (this.state.allow === false) {
      return <Error statusCode={403} />;
    } else {
      return (
        <Index>
          <Layout
            style={{
              minHeight: '100vh'
            }}
          >
            <Header />
            {this.state.allow === null && <Loading />}
            {this.state.allow === true && (
              <Layout.Content
                style={{
                  padding: '0 5vw'
                }}
              >
                <Modal
                  title="Remove User Information From Database"
                  visible={true}
                  onOk={this.remove}
                  onCancel={() => {
                    window.location.href = '/';
                  }}
                >
                  <Input
                    placeholder="User GUID"
                    value={this.state.id}
                    onChange={event => {
                      this.setState({
                        ...this.state,
                        id: event.target.value
                      });
                    }}
                  />
                </Modal>
              </Layout.Content>
            )}
            <Footer />
          </Layout>
        </Index>
      );
    }
  }
}
