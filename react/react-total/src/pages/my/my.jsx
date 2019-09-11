import React, { Component } from 'react';
// import PropTypes from 'prop-types'
import { connect } from 'react-redux';

class My extends Component {
  static propTypes = {};

  render() {
    return <div>我的</div>;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(My);
