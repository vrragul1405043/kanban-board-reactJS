import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import TaskForm from "./TaskForm";
import "./NewTask.css";

const initialValues = {
  title: "",
  description: ""
};

function NewTask(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  useEffect(() => {}, []);

  const onSubmit = (values, submitProps) => {
    submitProps.setSubmitting(false);
    props.addNewTask(values);
    setShow(false);
    submitProps.resetForm();
  };


  return (
    <>
      <Button className="btn-custom" onClick={handleShow}>
        New Task
      </Button>
      <TaskForm taskState='New' show={show} handleClose={handleClose} initialValues={initialValues} onSubmit={onSubmit}></TaskForm>
    </>
  );
}

export default NewTask;
