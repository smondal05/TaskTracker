import { useContext, useEffect, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import NewTask from "../NewTask";
import { Table, Button } from "antd";

import { AppContext } from "../../context";
import { Task, TaskMode } from "../../types";
import { formattedCurrentDate } from "../../shared/formatDate";

import "./index.css";

const InProgress = () => {
  const { taskList, dispatchTaskEvent } = useContext(AppContext);
  const [inprogressList, setInProgressList] = useState<Task[]>([]);
  const [dataList, setDataList] = useState<Task[]>(taskList);

  useEffect(() => {
    const list = taskList.filter(
      (task: Task) => task.taskMode === TaskMode.IN_PROGRESS
    );
    setInProgressList(list);
  }, [taskList]);

  useEffect(() => {
    const list = dataList.filter(
      (task: Task) => task.taskMode === TaskMode.IN_PROGRESS
    );
    setInProgressList(list);
  }, [dataList]);

  const handleDelete = (deleteKey: number) => {
    dispatchTaskEvent("DELETE_TASK", { key: deleteKey });
  };

  const handleAction = (record: Task) => {
    let list: Task[] = [];
    dataList.map((item: Task) => {
      if (item.key === record.key) {
        item.taskMode = TaskMode.DONE;
        item.completedOn = formattedCurrentDate();
      }
      list.push(item);
      return null;
    });
    setDataList(list);
  };

  const columns = [
    {
      title: "Task Id",
      dataIndex: "taskId",
      key: "taskId",
    },
    {
      title: "Task Name",
      dataIndex: "taskname",
      key: "taskname",
    },
    {
      title: "Project",
      dataIndex: "project",
      key: "project",
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
    },
    {
      title: "Action",
      key: "action",
      render: (text: string, record: Task, index: number) => (
        <Button className="columnButton" onClick={() => handleAction(record)}>
          Completed
        </Button>
      ),
    },
    {
      title: "Remove",
      key: "remove",
      render: (text: string, record: Task, index: number) => (
        <span className="delete">
          <AiFillCloseCircle
            size={25}
            onClick={() => handleDelete(record.key)}
          />
        </span>
      ),
    },
  ];

  return (
    <div className="todoContainer">
      <NewTask
        mode={TaskMode.IN_PROGRESS}
        style={{
          padding: "10px",
          float: "right",
        }}
      />
      <h3>In-Progress Task List</h3>
      <Table
        className="todoTable"
        dataSource={inprogressList}
        pagination={false}
        columns={columns}
      />
    </div>
  );
};

export default InProgress;
