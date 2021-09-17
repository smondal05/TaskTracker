import { useContext, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import {
  Modal,
  Button,
  Form,
  Input,
  Select,
  Row,
  Col,
  notification,
} from "antd";

import { AppContext } from "../../context";
import { Task, TaskMode, TaskValues } from "../../types";
import { formattedCurrentDate } from "../../shared/formatDate";

import "./index.css";

const NewTask = (props: { mode: string; style: any }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const { Option } = Select;
  const { taskList, dispatchTaskEvent } = useContext(AppContext);

  const handleCreateTask = () => {
    setIsModalVisible(true);
  };

  const handleModalCreateTask = (values: TaskValues) => {
    let newKey = parseInt(taskList[taskList.length - 1].key) + 1;
    let newTaskId = newKey < 10 ? "TT-00" + newKey : "TT-0" + newKey;
    const task: Task = {
      key: newKey,
      taskId: newTaskId,
      taskname: values.taskname,
      project: values.project,
      priority: values.priority,
      company: values.company,
      taskdescription: values.taskdescription,
      createdOn: formattedCurrentDate(),
      completedOn: props.mode === TaskMode.DONE ? formattedCurrentDate() : "",
      taskMode: props.mode,
    };
    dispatchTaskEvent("ADD_TASK", { newTask: task });
    setIsModalVisible(false);
    openNotificationWithIcon();
    form.resetFields();
  };

  const handleModalCancelTask = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const openNotificationWithIcon = () => {
    let listName = "";
    if (props.mode === TaskMode.TODO) {
      listName = "To-Do";
    } else if (props.mode === TaskMode.IN_PROGRESS) {
      listName = "In-Progress";
    } else {
      listName = "Completed";
    }
    notification["success"]({
      message: "Task Created",
      description: `The task has been added to the ${listName} Task list.`,
    });
  };

  return (
    <div style={props.style}>
      <span>
        <Button className="btn" shape="circle" onClick={handleCreateTask}>
          <AiOutlinePlus />
        </Button>
        &nbsp; Create Task
      </span>

      <Modal
        title="Create Task"
        visible={isModalVisible}
        onOk={form.submit}
        onCancel={handleModalCancelTask}
        footer={[
          <Button key="back" onClick={handleModalCancelTask}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={form.submit}>
            Create
          </Button>,
        ]}
      >
        <Form layout="vertical" form={form} onFinish={handleModalCreateTask}>
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item
                name="company"
                label="Company"
                rules={[{ required: true }]}
              >
                <Select placeholder="Select Company" allowClear>
                  <Option value="Company 1">Company 1</Option>
                  <Option value="Company 2">Company 2</Option>
                  <Option value="Company 3">Company 3</Option>
                  <Option value="Company 4">Company 4</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="project"
                label="Project"
                rules={[{ required: true }]}
              >
                <Select placeholder="Select Project" allowClear>
                  <Option value="Project 1">Project 1</Option>
                  <Option value="Project 2">Project 2</Option>
                  <Option value="Project 3">Project 3</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={8}>
            <Col span={12}>
              <Form.Item
                name="taskname"
                label="Task Name"
                rules={[{ required: true }]}
              >
                <Input placeholder="Enter task name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="priority"
                label="Priority"
                rules={[{ required: true }]}
              >
                <Select placeholder="Select Priority" allowClear>
                  <Option value="Low">Low</Option>
                  <Option value="Medium">Medium</Option>
                  <Option value="High">High</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="taskdescription"
            label="Task Description"
            rules={[{ required: true }]}
          >
            <Input.TextArea placeholder="Enter task description" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default NewTask;
