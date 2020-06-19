import React, { Component } from 'react';
import { connect } from 'react-redux';
import Avatar from '../../components/avatar';
import * as UserStore from '../../stores/user-store';

interface UserContainerProps {
  id: string;
  name: string;
  email: string;
  type: number;
  initialized: boolean;
  init: Function;
}

export class UserContainer extends Component<UserContainerProps, any> {
  componentDidMount() {
    if (!this.props.initialized) {
      this.props.init();
    }
  }

  generateInitial() {
    const name: string = this.props.name;
    const firstName = name.split(' ')[0];
    const lastName = name.split(' ')[1];
    return (firstName ? firstName[0] : '') + (lastName ? lastName[0] : '');
  }

  render() {
    if (!this.props.initialized) {
      return null;
    } else {
      return (
        <div>
          <Avatar name={this.generateInitial()} />
        </div>
      );
    }
  }
}

const mapStateToProps = state => UserStore.selectors.flattenData(state);

const mapDispatchToProps = {
  init: UserStore.actions.init
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserContainer);
