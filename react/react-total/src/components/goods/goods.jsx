import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';

function Goods() {
  const [count, setCount] = useState(0);


  // 相当于 componentDidMount 和 componentDidUpdate:
  //React 会在组件卸载的时候执行清除操作 如果 effect 返回一个函数，React 将会在执行清除操作时调用它
  useEffect(() => {
    // 使用浏览器的 API 更新页面标题 副作用函数
    document.title = `点击${count}次`;
  });
  /**
   * 规则：
   * 1.只能在函数最外层调用 Hook。不要在循环、条件判断或者子函数中调用。
   * 2.只能在 React 的函数组件中调用 Hook。不要在其他 JavaScript 函数中调用。
   * （还有一个地方可以调用 Hook —— 就是自定义的 Hook 中）
   */
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count - 1)}>减少</button>
      <button onClick={() => setCount(count + 1)}>增加</button>
    </div>
  );
}

export default Goods;
