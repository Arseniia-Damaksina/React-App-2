import { Priority } from 'src/enums/priority.enum';

export class CreateTaskDto {
  name: string;
  description: string;
  dueDate: string;
  priority: Priority;
  taskListId: number;
  taskListTitle: string
}
