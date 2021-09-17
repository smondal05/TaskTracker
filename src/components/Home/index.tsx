import { Card } from "antd";
import logo from "../../user-logo.png";

import NewTask from "../NewTask";

import "./index.css";

const Home = (props: {
  data: {
    key: string;
    taskId: string;
    taskname: string;
    project: string;
    priority: string;
  }[];
}) => {
  return (
    <div>
      <NewTask
        mode="Todo"
        style={{
          marginLeft: "55vh",
          paddingBottom: "10px",
          paddingTop: "10px",
        }}
      />
      <div className="container">
        <Card className="card">
          <div className="home_logo">
            <img src={logo} alt="User" />
          </div>
          <h2>Welcome to Task Tracker</h2>
          <h4>Create,View & Delete Tasks made easy</h4>
        </Card>
      </div>
    </div>
  );
};

export default Home;
