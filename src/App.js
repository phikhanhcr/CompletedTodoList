import React, { Component } from 'react';
import './App.css';
import classNames from 'classnames';
import TodoList from './components/todoItem';
import downImg from './img/down.png';

class App extends Component {
  constructor() {
    super();
    this.state = {
      todoList: [
        { title: 'Hang out with girlfriends', isComplete: true },
        { title: 'Do homework', isComplete: true },
        { title: 'Go to sleep', isComplete: false }
      ],
      show: false,
      newItem : ''
    }
    this.onChangeInput = this.onChangeInput.bind(this)
  }
  onClickItem(ele) {
    return () => {
      const currentItem = ele;
      const todoList = this.state.todoList
      const index = todoList.indexOf(currentItem);
      let isComplete = ele.isComplete;
      // 1 
      this.setState({
        todoList: [
          ...todoList.slice(0, index), // 0 -> index  : 0 -> 1
          {
            ...ele,
            isComplete: !isComplete // index : example : 1 

          },
          ...todoList.slice(index + 1) // index + 1 , 2 ->
        ]
      })
    }
  }
  ShowTodo = () => {
    if (this.state.show === true) {
      this.setState({
        show: false
      })
    } else {
      this.setState({
        show: true
      })
    }
  }
  onKeyUp = (event) => {
    const todoList = this.state.todoList
    console.log(event)
    let text = event.target.value;
    if (event.keyCode === 13) { // enter keycode
      if (!text) { return; }
      let check = text.trim();
      if (!check) { return; }
      this.setState({
        todoList: [
          { title: text, isComplete: false },
          ...todoList
        ]
      })
      this.setState({
        newItem : ''        // set '' 
      })
    }
    console.log(text);
  }

  onChangeInput(event) {
    let text = event.target.value;
    this.setState({
      newItem : text      // cho phep ghi
    })
  }
  removeItem(ele) {
    return () => {
      const currentItem = ele;
      const todoList = this.state.todoList
      const index = todoList.indexOf(currentItem);
      console.log(index);
      this.setState({
        todoList : [
          ...todoList.slice(0 , index) , 
          ...todoList.slice(index + 1)
        ]
      })
    }
  }
  render() {
    const { todoList, show , newItem } = this.state;
    let className = "App";
    if (show === false) {
      className = classNames(className, "hiddenApp")
    }
    return (
      <div className={className}>
        <div className="Input">
          <img src={downImg} onClick={this.ShowTodo} />
          <input
            type="Text"
            placeholder="What are you going to do ?"
            value={newItem}
            onChange={this.onChangeInput}
            onKeyUp={this.onKeyUp}
          />
        </div>
        {
          todoList.length > 0 && todoList.map((ele, index) => (
            <TodoList
              key={index}
              item={ele}
              onClick={this.onClickItem(ele)}
              show={show}
              removeItem={this.removeItem(ele)}
            />
          ))
        }
      </div>
    );
  }
}

export default App;

