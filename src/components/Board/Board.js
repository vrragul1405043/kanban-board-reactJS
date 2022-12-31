import React, { useState, useEffect, useReducer, createContext } from "react";
import NewTask from "./New Task/NewTask";
import BoardLanes from "./BoardLanes";
import "./Board.css";
import { Button } from "react-bootstrap";
import * as CONSTANTS from "./BoardConstants"


export const BoardContext = createContext({});

function reducer(state, action) {
  switch (action.type) {
    case CONSTANTS.ON_DROP:
      const droppedTask = action.payload;
      const updatedTasks = state.map((task) => {
        if (task.id === droppedTask.id) {
          return droppedTask;
        }
        return task;
      });
      return updatedTasks;
    case CONSTANTS.LOAD_DATA:
      return action.payload;
    case CONSTANTS.ADD_NEW:
      return [...state, action.payload];
    case CONSTANTS.ON_DELETE:
      return state.filter((task) => task.id !== action.payload);
    default:
      return state;
  }
}
function Board(props) {
  const [stages, setStage] = useState(CONSTANTS.stagesData);
  const [taskState, dispatch] = useReducer(reducer, props.data.task);
  const initialData = props.data;
  
  useEffect(() => {
    dispatch({ type: CONSTANTS.LOAD_DATA, payload: taskState });
  }, [taskState, stages]);

  const onDragStartHandler = (
    event,
    taskId,
    stageId
  ) => {
    let data = {
      taskId: taskId,
      stageId: stageId,
    };
    event.dataTransfer.setData("text/plain", JSON.stringify(data));
    event.dataTransfer.effectAllowed = CONSTANTS.MOVE;
  };

  const onDragOverHandler = (event) => {
    if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
      event.preventDefault();
    }
  };

  const onDropHandler = (event, droppedStageId) => {
    let droppedData = event.dataTransfer.getData("text/plain");
    droppedData = JSON.parse(droppedData);
    const filterTask = taskState.filter((x) => x.id === droppedData.taskId);
    filterTask[0].stage = droppedStageId;
    dispatch({ type: CONSTANTS.ON_DROP, payload: filterTask[0] });
  };

  const onAddingNewTask = (dataFromChild) => {
    dataFromChild.stage = 1;
    dataFromChild.id = taskState.length + 1;
    dispatch({ type: CONSTANTS.ADD_NEW, payload: dataFromChild });
  };

  const onUpdatingTask = (dataFromChild) => {
    dispatch({ type: CONSTANTS.ON_DROP, payload: dataFromChild });
  };

  const onDeletingTask = (taskId) => {
    dispatch({ type: CONSTANTS.ON_DELETE, payload: taskId });
  };

  const onSubmitTask = (tasks) =>{
    tasks.task = taskState
    const response = fetch(CONSTANTS.SUBMIT_URL, {
      method: CONSTANTS.POST,
      headers: {
      'Content-Type' : CONSTANTS.APPLICATION_JSON
      },
      body: JSON.stringify(tasks)
      })
  };

  const ContextData = {
    taskState,
    onDragStartHandler,
    onDragOverHandler,
    onDropHandler,
    onUpdatingTask,
    onDeletingTask
  };

  //Component to display cards and lanes and also pass all the util methods from the parent component to the child component
  return (
    <div className="container-fluid pt-3">
      <div className="row">
        <div className="col-12">
          <NewTask addNewTask={onAddingNewTask}/>
          <Button className="btn-custom" onClick={()=>onSubmitTask(initialData)}>
            Submit
          </Button>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-12">
            <BoardContext.Provider value={ContextData}>
                <BoardLanes stages={stages}></BoardLanes>
            </BoardContext.Provider>
        </div>
      </div>
    </div>
  );
}

export default Board;
