import { useState } from "react";
import { Redirect, Route, Switch } from "react-router";

import Login from "./components/Login";
import logo from "./user-logo.png";
import { GiHamburgerMenu } from "react-icons/gi";

import Home from "./components/Home";
import Navbar from "./components/Navbar/index";
import Todo from "./components/ToDo";
import InProgress from "./components/InProgress";
import Done from "./components/Done";
import { AppContext } from "./context";

import { dataSource } from "./datasource";
import { Task } from "./types";

import "./App.css";

function App() {
  const [showNav, setShowNav] = useState(false);
  const [taskList, setTaskList] = useState(dataSource);

  const dispatchTaskEvent = (
    actionType: string,
    payload: {
      newTask: Task;
      key: number;
    }
  ) => {
    switch (actionType) {
      case "ADD_TASK":
        setTaskList([...taskList, payload.newTask]);
        return;
      case "DELETE_TASK":
        setTaskList(taskList.filter((task) => task.key !== payload.key));
        return;
      default:
        return;
    }
  };

  return (
    <div className="App">
      <AppContext.Provider value={{ taskList, dispatchTaskEvent }}>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/login">
            <Redirect to="/" />
          </Route>
          <div>
            <header>
              <span className="menu-icon">
                <GiHamburgerMenu onClick={() => setShowNav(!showNav)} />
              </span>
              <span className="menu-icon-info">Task Tracker</span>
              <span className="logo-info">
                Janet W
                <img src={logo} alt="User" className="logo" />
              </span>
            </header>
            <Navbar show={showNav} />
            <Route path="/home" component={Home} />
            <Route path="/todo" component={Todo} />
            <Route path="/inprogress" component={InProgress} />
            <Route path="/done" component={Done} />
          </div>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </AppContext.Provider>
    </div>
  );
}

export default App;
