import React from "react";
import "./TodoItem.css";
import { useState } from "react";

function TodoItem(props) {
  const [checkbox, setCheckbox] = useState(props.isFinished);
  const [isEdit, setIsEdit] = useState(false);
  const [curtask, setCurTask] = useState("");
  const [curdueDate, setCurDueDate] = useState();
  const task = props.task;
  const dueDate = props.dueDate;
  const date = dueDate.getDate();
  const month = dueDate.getMonth();
  const year = dueDate.getFullYear();

  const resolveDueDate = (date, month, year) => {
    let convertedDate = date < 10 ? `0${date}` : `${date}`;
    let convertedMonth = month + 1 < 10 ? `0${month + 1}` : `${month + 1}`;
    return `${year}-${convertedMonth}-${convertedDate}`;
  };

  const onClickEdit = () => {
    setIsEdit(true);
    setCurTask(props.task);
    const dataToSet = resolveDueDate(date, month, year);
    setCurDueDate(dataToSet);
  };

  const onClickDone = () => {
    const editValue = {
      id: props.id,
      task: curtask,
      dueDate: new Date(curdueDate),
      isFinished: checkbox,
    };
    setIsEdit(false);
    props.editHandler(props.id, editValue);
  };
  if (isEdit) {
    return (
      <div className="form-control">
        <div className="cb-container">
          <input
            checked={checkbox}
            onChange={(e) => setCheckbox(e.target.checked)}
            type="checkbox"
          />
        </div>
        <div className="tn-container">
          <input value={curtask} onChange={(e) => setCurTask(e.target.value)} />
        </div>
        <div className="dd-container">
          <input
            value={curdueDate}
            onChange={(e) => setCurDueDate(e.target.value)}
            type="date"
          />
        </div>
        <div className="ed-container">
          <button onClick={onClickDone}>Done</button>
        </div>
        <div className="dl-container">
          <button onClick={() => setIsEdit(false)}>Cancel</button>
        </div>
      </div>
    );
  }

  return (
    <div className="form-control">
      <div className="cb-container">
        <input
          checked={checkbox}
          onChange={(e) => setCheckbox(e.target.checked)}
          type="checkbox"
        />
      </div>
      <div className="tn-container">{task}</div>
        <div className="dd-container">
          {date}/{month + 1}/{year}
        </div>
      <div className="ed-container">
        <button onClick={onClickEdit}>Edit</button>
      </div>
      <div className="dl-container">
        <button onClick={() => props.deleteHandler(props.id)}>Delete</button>
      </div>
    </div>
  );
}

export default TodoItem;
