import { useContext, useEffect, useState } from "react";
import NewTask from "../NewTask";
import { Table } from "antd";

import { AppContext } from "../../context";
import { Task, TaskMode } from "../../types";

import "./index.css";

const Done = () => {
  const { Column } = Table;
  const { taskList } = useContext(AppContext);
  const [completedList, setCompletedList] = useState([]);

  useEffect(() => {
    const list = taskList.filter(
      (task: Task) => task.taskMode === TaskMode.DONE
    );
    setCompletedList(list);
  }, [taskList]);

  return (
    <div className="todoContainer">
      <NewTask
        mode={TaskMode.DONE}
        style={{
          padding: "10px",
          float: "right",
        }}
      />
      <h3>Completed Task List</h3>
      <Table
        className="todoTable"
        dataSource={completedList}
        pagination={false}
      >
        <Column title="Task Id" dataIndex="taskId" key="taskId" />
        <Column title="Task Name" dataIndex="taskname" key="taskname" />
        <Column title="Company" dataIndex="company" key="company" />
        <Column title="Project" dataIndex="project" key="project" />
        <Column title="Created On" dataIndex="createdOn" key="createdOn" />
        <Column
          title="Completed On"
          dataIndex="completedOn"
          key="completedOn"
        />
      </Table>
    </div>
  );
};

export default Done;
