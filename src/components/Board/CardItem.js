import React, { useState, useContext, useEffect } from "react";
import { BoardContext } from "./Board";
import { Card } from "react-bootstrap";
import TaskForm from "./New Task/TaskForm";

const initialEditedValues = {
  title: "",
  description: ""
};

const EDIT = "edit";
const DELETE = "delete";
 
function CardItem(props) {
  const [show, setShow] = useState(false);
  const [editedValues, setFormValues] = useState(initialEditedValues);
  const handleClose = () => setShow(false);
  const { taskState, onDeletingTask, onUpdatingTask } = useContext(
    BoardContext
  );

  const handleShow = () => {
    setShow(true);
  };

  const clickHandler = (type) => {
    if (type === EDIT) {
     var formValues=  taskState.find((task) => {
       return task.id===props.task.id
      });
      setFormValues(formValues);
      handleShow();
    } else if (type === DELETE) {
      onDeletingTask(props.task.id);
    }
  };

  const handleUpdate = (values, submitProps) => {
    submitProps.setSubmitting(false);
    onUpdatingTask(values);
    setShow(false);
    submitProps.resetForm();
  };

  return (
    <>
      <TaskForm
        editedValues={editedValues}
        taskState="Update"
        show={show}
        handleClose={handleClose}
        onSubmit={handleUpdate}
      ></TaskForm>
      <Card key={props.task.id} className="card-task">
        <Card.Body>
          <Card.Title>
            {props.task.title}{" "}
            <div className="card-task-option pull-right">
              <a onClick={() => clickHandler(EDIT)}>
                <i className="fas fa-edit"></i>
              </a>
              &nbsp;
              <a onClick={() => clickHandler(DELETE)}>
                <i className="fas fa-trash"></i>
              </a>
            </div>
          </Card.Title>
        </Card.Body>
      </Card>
    </>
  );
}

export default CardItem;
