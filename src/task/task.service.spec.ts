import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { PrismaService } from '../prisma/prisma.service';
import { TaskType } from '@prisma/client';

describe('TaskService', () => {
  let service: TaskService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        {
          provide: PrismaService,
          useValue: {
            task: {
              create: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<TaskService>(TaskService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createTask', () => {
    it('should create a task', async () => {
      const taskDto = {
        start_time: new Date('2024-06-18T16:39:53.984Z'),
        duration: 1,
        account_id: 1,
        schedule_id: '2b9a64a6-970f-4c04-85bb-185275289260',
        type: TaskType.work,
      };

      const createdTask = {
        id: '23ff4085-2f1b-40d3-a3b4-5b98a1cbaf87',
        ...taskDto,
      };

      jest.spyOn(prisma.task, 'create').mockResolvedValue(createdTask);

      expect(await service.createTask(taskDto)).toEqual(createdTask);
      expect(prisma.task.create).toHaveBeenCalledWith({
        data: taskDto,
      });
    });
  });

  describe('getTaskById', () => {
    it('should return a task by ID', async () => {
      const task = {
        id: '9bb560ec-06c4-4752-a6d9-3cf9a6029c39',
        account_id: 1,
        schedule_id: '2b9a64a6-970f-4c04-85bb-185275289260',
        start_time: new Date('2024-06-18T16:39:53.984Z'),
        duration: 1,
        type: TaskType.work,
        schedule: {
          id: '2b9a64a6-970f-4c04-85bb-185275289260',
          account_id: 1,
          agent_id: 2,
          start_time: new Date('2024-06-18T16:39:53.984Z'),
          end_time: new Date('2024-06-19T16:39:53.984Z'),
        },
        account: {
          id: 1,
          email: 'test_1@example.com',
          name: 'tester',
        },
      };

      jest.spyOn(prisma.task, 'findUnique').mockResolvedValue(task);

      expect(
        await service.getTaskById({
          id: '9bb560ec-06c4-4752-a6d9-3cf9a6029c39',
        }),
      ).toEqual(task);
      expect(prisma.task.findUnique).toHaveBeenCalledWith({
        where: { id: '9bb560ec-06c4-4752-a6d9-3cf9a6029c39' },
        include: {
          schedule: true,
          account: true,
        },
      });
    });

    it('should return null if task not found', async () => {
      jest.spyOn(prisma.task, 'findUnique').mockResolvedValue(null);

      expect(
        await service.getTaskById({
          id: '2b9a64a6-970f-4c04-85bb-185275289260',
        }),
      ).toBeNull();
      expect(prisma.task.findUnique).toHaveBeenCalledWith({
        where: { id: '2b9a64a6-970f-4c04-85bb-185275289260' },
        include: {
          schedule: true,
          account: true,
        },
      });
    });
  });

  describe('updateTask', () => {
    it('should return the updated task', async () => {
      const task = {
        id: 'd8b77a58-4740-4d91-b26a-3c8abf1119c9',
        account_id: 8,
        schedule_id: '2b9a64a6-970f-4c04-85bb-185275289260',
        start_time: new Date('2024-06-18T16:39:53.984Z'),
        duration: 5,
        type: TaskType.work,
      };

      const updateQuery = {
        data: { duration: 5 },
        where: { id: task.id },
      };

      jest.spyOn(prisma.task, 'update').mockResolvedValue(task);

      expect(await service.updateTask(updateQuery)).toEqual(task);
      expect(prisma.task.update).toHaveBeenCalledWith(updateQuery);
    });
  });

  describe('deleteTask', () => {
    it('should return the deleted task', async () => {
      const task = {
        id: 'd8b77a58-4740-4d91-b26a-3c8abf1119c9',
        account_id: 8,
        schedule_id: '2b9a64a6-970f-4c04-85bb-185275289260',
        start_time: new Date('2024-06-18T16:39:53.984Z'),
        duration: 5,
        type: TaskType.work,
      };

      jest.spyOn(prisma.task, 'delete').mockResolvedValue(task);

      expect(await service.deleteTask({ id: task.id })).toEqual(task);
      expect(prisma.task.delete).toHaveBeenCalledWith({
        where: { id: task.id },
      });
    });
  });
});
