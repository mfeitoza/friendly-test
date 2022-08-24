import { WorkdOrderDto, WorkOrder, AssignedTo } from './work-order';

const orderExample: WorkdOrderDto = {
  work_order_id: 8,
  description: 'Set up station for new user',
  received_date: '2021-07-16 09:23:03',
  assigned_to: [
    {
      person_name: 'Technician Two',
      status: 'Completed',
    },
  ],
  status: 'Completed',
  priority: 'Low',
};

describe('WorkOrder', () => {
  it('should create an instance', () => {
    expect(new WorkOrder(orderExample)).toBeTruthy();
  });

  it('should convert string to date', () => {
    const order = new WorkOrder(orderExample);
    expect(order.receivedDate).toBeInstanceOf(Date);
  });

  it('should create instance of assignee', () => {
    const order = new WorkOrder(orderExample);
    expect(order.assignedTo[0]).toBeInstanceOf(AssignedTo);
  });
});
