import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { FETCH_GOODS } from '../../store/actions';
import { connect } from 'react-redux';

import './home.scss';

class Home extends Component {
  constructor(props) {
    super(props);
    this.props.getAllGoods();
  }
  static propTypes = {};
  render() {
    const { goodsList } = this.props;
    return (
      <div>
        {goodsList.map(item => (
          <div key={item.goodsid}>{item.goodsname}</div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = ({ goodsList }) => ({
  goodsList
});

const mapDispatchToProps = dispatch => ({
  getAllGoods: () => {
    dispatch({ type: FETCH_GOODS });
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
