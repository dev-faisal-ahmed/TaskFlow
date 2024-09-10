export interface ICategory {
  id: string;
  name: string;
  userEmail: string;
}

export enum ETaskStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
}
export interface ITask {
  id: string;
  title: string;
  description: string;
  status: ETaskStatus;
  date: Date;
  category: Omit<ICategory, 'userEmail'>;
}
