import React from 'react';
import ReactDOM from 'react-dom';

// JSX 打印结果一样
// const element = <h1 className="greeting">Hello JSX！</h1>
// console.log(element)

// React.createElement 打印结果一样
const element = React.createElement('h1', { className: 'greeting'}, 'Hello JSX')
console.log(element)
ReactDOM.render(element, document.getElementById('root'))