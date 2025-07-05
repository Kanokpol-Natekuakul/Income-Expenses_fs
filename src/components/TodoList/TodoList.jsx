import React from "react";
import TodoItem from "./TodoItem/TodoItem";
import "./TodoList.css";

function TodoList(props) {
  const todoList = props.todoList;
  const curYear = props.curYear;
  const filteredTodoList = todoList.filter(
    (e) => e.dueDate.getFullYear() === Number(curYear)
  );

  return (
    <div className="tdl-container">
      {filteredTodoList.map((e) => (
        <TodoItem
          deleteHandler={props.deleteHandler}
          editHandler={props.editHandler}
          key={e.id}
          id={e.id}
          task={e.task}
          isFinished={e.isFinished}
          dueDate={e.dueDate}
        />
      ))}
    </div>
  );
}

export default TodoList;
