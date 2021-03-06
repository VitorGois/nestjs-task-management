import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Query, UseGuards, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {

  private logger = new Logger('TasksController');

  constructor(
    private readonly tasksService: TasksService,
  ) { }

  @Get()
  public getAllTasks(
    @Query() filterDto: GetTasksFilterDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    this.logger.verbose(`User "${user.username}" retrieving all tasks. Filters: ${JSON.stringify(filterDto)}`);
    return this.tasksService.getTasks(filterDto, user);
  }

  @Get('/:id')
  public getTaskById(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.getTaskById(id, user);
  }

  @Post()
  public createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    this.logger.verbose(`User "${user.username}" creating a new task. Data: ${JSON.stringify(createTaskDto)}`);
    return this.tasksService.createTask(createTaskDto, user);
  }

  @HttpCode(204)
  @Delete('/:id')
  public deleteTask(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<void> {
    return this.tasksService.deleteTask(id, user);
  }
  
  @Patch('/:id/status')
  public updateTaskStatus(
    @Param('id') id: string, 
    @Body() body: UpdateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    const { status } = body;
    return this.tasksService.updateTaskStatus(id, status, user);
  }

  @Patch('/:id/description')
  public updateTaskDescription(
    @Param('id') id: string, 
    @Body() body: UpdateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    const { description } = body;
    return this.tasksService.updateTaskDescription(id, description, user);
  }

  @Patch('/:id/title')
  public updateTaskTitle(
    @Param('id') id: string, 
    @Body() body: UpdateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    const { title } = body;
    return this.tasksService.updateTaskTitle(id, title, user);
  }

}
