import React, { Component } from 'react';
import { connect } from 'react-redux';
import Events from './events/Events';
import { _loadEvents } from '../store/events';

class Dashboard extends Component {
  componentDidMount() {
    this.props.init();
  }
  render() {
    console.log(this.props)
    return (
      <div>
        <h1>Dashboard</h1>
        <Events />
      </div>
    )
  }
}

const mapStateToProps = ({ events }) => ({ events });

const mapDispatchToProps = (dispatch) => {
  return {
    init: () => {
      dispatch(_loadEvents())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);