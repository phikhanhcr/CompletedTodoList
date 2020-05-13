import React, { Component } from 'react';
import classNames from 'classnames';
import imgCompleted from '../img/success.png';
import notDoneImg from '../img/fail.png'
import imgDelete from '../img/delete.png'

class TodoList extends Component {
  render() {
    const { item, onClick , show , removeItem} = this.props;
    let className = "TodoItem";
    let urlImg = notDoneImg;
    if (item.isComplete) {
      className = classNames(className, "TodoItem-completed");
      urlImg = imgCompleted;
    }
    if(show === true ) {
      className = classNames(className , "TodoItemHidden")
    }
    return (
      <div className={className} >
        <img src={urlImg} onClick={onClick}/>
        <p onClick={onClick}>{item.title} </p>
        <img onClick={removeItem} src={imgDelete}/>
      </div>
    );
  }
}

export default TodoList;