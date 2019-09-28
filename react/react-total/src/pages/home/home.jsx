import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { FETCH_GOODS } from '../../store/actions';
import { connect } from 'react-redux';
import Goods from '../../components/goods/goods';
import './home.scss';

class Home extends Component {
  // constructor(props) {
  //   super(props);
  //   // this.props.getAllGoods();
  // }
  componentDidMount() {}
  shouldComponentUpdate(nextProps, nextState) {}
  componentWillUnmount() {}
  componentDidCatch(error, info) {}
  static propTypes = {};
  render() {
    // const { goodsList } = this.props.goods;
    return (
      <div>
        <Goods />
      </div>
    );
  }
}

const mapStateToProps = ({ goods }) => ({
  goods
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
