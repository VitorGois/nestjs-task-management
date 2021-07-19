import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  public getAllTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
    if (Object.keys(filterDto).length) {
      return this.tasksService.getTaskWithFilter(filterDto);
    } else {
      return this.tasksService.getAllTasks();
    }
  }

  @Get('/:id')
  public getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  public createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }

  @HttpCode(204)
  @Delete('/:id')
  public deleteTask(@Param('id') id: string): void {
    return this.tasksService.deleteTask(id);
  }
  
  @Patch('/:id/status')
  public updateTaskStatus(@Param('id') id: string, @Body() body: UpdateTaskDto): Task {
    const { status } = body;
    return this.tasksService.updateTaskStatus(id, status);
  }

  @Patch('/:id/description')
  public updateTaskDescription(@Param('id') id: string, @Body() body: UpdateTaskDto): Task {
    const { description } = body;
    return this.tasksService.updateTaskDescription(id, description);
  }

  @Patch('/:id/title')
  public updateTaskTitle(@Param('id') id: string, @Body() body: UpdateTaskDto): Task {
    const { title } = body;
    return this.tasksService.updateTaskTitle(id, title);
  }
}
