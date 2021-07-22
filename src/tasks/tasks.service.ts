import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) { }

  public async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto);
  }

  public async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Task with ID '${id}' not found`)
    }

    return found;
  }

  public createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }

  public async deleteTask(id: string): Promise<void> {
    const deleted = await this.tasksRepository.delete(id);

    if (deleted.affected === 0) {
      throw new NotFoundException(`Task with ID '${id}' not found`);
    }
  }

  public async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    
    task.status = status;
    await this.tasksRepository.save(task);
    
    return task;
  }

  public async updateTaskDescription(id: string, description: string): Promise<Task> {
    const task = await this.getTaskById(id);

    task.description = description;
    await this.tasksRepository.save(task);

    return task;
  }

  public async updateTaskTitle(id: string, title: string): Promise<Task> {
    const task = await this.getTaskById(id);

    task.title = title;
    await this.tasksRepository.save(task);

    return task;
  }
}
