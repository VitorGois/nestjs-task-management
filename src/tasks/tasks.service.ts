import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { title } from 'process';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  public getAllTasks(): Task[] {
    return this.tasks;
  }

  public getTaskWithFilter(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;
    let tasks = this.getAllTasks();
    
    if (status) {
      tasks = tasks.filter((task) => task.status.toLowerCase() === status.toLowerCase());
    }

    if (search) {
      tasks = tasks.filter((task) => 
        task.title.toLowerCase().includes(search.toLowerCase()) 
        || task.description.toLowerCase().includes(search.toLowerCase())
        ? true
        : false
      );
    }

    return tasks;
  }

  public getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  public createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }

  public deleteTask(id: string): void {
    const removeIndex = this.tasks.findIndex((task => task.id === id));
    this.tasks.splice(removeIndex, 1);
  }

  public updateTaskStatus(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }

  public updateTaskDescription(id: string, description: string): Task {
    const task = this.getTaskById(id);
    task.description = description;
    return task;
  }

  public updateTaskTitle(id: string, title: string): Task {
    const task = this.getTaskById(id);
    task.title = title;
    return task;
  }
}
