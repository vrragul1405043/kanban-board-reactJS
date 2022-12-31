import React,{ useEffect, useState } from "react";
import "./App.css";
import Header from "../components/Header/Header";
import Board from "../components/Board/Board";
import axios from "axios";

function App() {
  const [taskData, setTaskData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const GET_CARDS_URL = 'https://q28hu8a7z3.execute-api.ap-south-1.amazonaws.com/Prod/board/1'
  useEffect(() => {
    axios.get(GET_CARDS_URL).then(res => {
      setTaskData(res.data)
      setLoaded(true)
    })
    .then(error => console.log(error));
  }, []);

  //Parent App component which renders Header and Board Component
  return (
    <div>
      <Header></Header>
      {loaded && 
        <Board data={taskData}></Board>
      }
    </div>
  );
}

export default App;
