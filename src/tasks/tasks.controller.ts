import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  public getAllTasks(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.tasksService.getTasks(filterDto);
  }

  @Get('/:id')
  public getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  public createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }

  @HttpCode(204)
  @Delete('/:id')
  public deleteTask(@Param('id') id: string): Promise<void> {
    return this.tasksService.deleteTask(id);
  }
  
  @Patch('/:id/status')
  public updateTaskStatus(@Param('id') id: string, @Body() body: UpdateTaskDto): Promise<Task> {
    const { status } = body;
    return this.tasksService.updateTaskStatus(id, status);
  }

  @Patch('/:id/description')
  public updateTaskDescription(@Param('id') id: string, @Body() body: UpdateTaskDto): Promise<Task> {
    const { description } = body;
    return this.tasksService.updateTaskDescription(id, description);
  }

  @Patch('/:id/title')
  public updateTaskTitle(@Param('id') id: string, @Body() body: UpdateTaskDto): Promise<Task> {
    const { title } = body;
    return this.tasksService.updateTaskTitle(id, title);
  }
}
