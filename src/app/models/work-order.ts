import parseJSON from 'date-fns/parseJSON';

export type Status = 'New' | 'Confirmed' | 'Canceled' | 'Completed';
export type Priority = 'Low' | 'Normal' | 'High';
export type AssignStatus =
  | 'Assigned'
  | 'In progress'
  | 'Confirmed'
  | 'Completed';

export interface AssignedToDto {
  person_name: string;
  status: AssignStatus;
}

export interface WorkdOrderDto {
  work_order_id: number;
  description: string;
  received_date: string;
  assigned_to: AssignedToDto[];
  status: Status;
  priority: Priority;
}

class AssignedTo {
  name: string;
  status: AssignStatus;

  constructor({ person_name, status }: AssignedToDto) {
    this.name = person_name;
    this.status = status;
  }
}

export class WorkOrder {
  id: number;
  description: string;
  receivedDate: Date;
  assignedTo: AssignedTo[];
  status: Status;
  priority: Priority;

  constructor({
    work_order_id,
    description,
    received_date,
    assigned_to,
    status,
    priority,
  }: WorkdOrderDto) {
    this.id = work_order_id;
    this.description = description;
    this.receivedDate = parseJSON(received_date);
    this.assignedTo = assigned_to.map((assign) => new AssignedTo(assign));
    this.status = status;
    this.priority = priority;
  }

  get assignedToString() {
    return this.assignedTo.map((assign) => assign.name).join(', ');
  }
}
