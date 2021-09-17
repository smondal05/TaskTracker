export type Task = {
  key: number;
  taskId: string;
  taskname: string;
  project: string;
  priority: string;
  company: string;
  taskdescription: string;
  createdOn: string;
  completedOn: string;
  taskMode: string;
};

export enum TaskMode {
  TODO = "Todo",
  IN_PROGRESS = "InProgress",
  DONE = "Done",
}

export type TaskValues = {
  company: string;
  priority: string;
  project: string;
  taskdescription: string;
  taskname: string;
};
