import { Test, TestingModule } from '@nestjs/testing';
import { ScheduleService } from './schedule.service';
import { PrismaService } from '../prisma/prisma.service';

describe('ScheduleService', () => {
  let service: ScheduleService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ScheduleService,
        {
          provide: PrismaService,
          useValue: {
            schedule: {
              create: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<ScheduleService>(ScheduleService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createSchedule', () => {
    it('should create an schedule', async () => {
      const scheduleDto = {
        start_time: new Date('2024-06-18T16:39:53.984Z'),
        end_time: new Date('2024-06-19T16:39:53.984Z'),
        account_id: 1,
        agent_id: 1,
      };

      const createdSchedule = {
        id: '23ff4085-2f1b-40d3-a3b4-5b98a1cbaf87',
        ...scheduleDto,
      };

      jest.spyOn(prisma.schedule, 'create').mockResolvedValue(createdSchedule);

      expect(await service.createSchedule(scheduleDto)).toEqual(
        createdSchedule,
      );
      expect(prisma.schedule.create).toHaveBeenCalledWith({
        data: scheduleDto,
      });
    });
  });

  describe('getScheduleById', () => {
    it('should return a schedule by ID', async () => {
      const schedule = {
        id: '2b9a64a6-970f-4c04-85bb-185275289260',
        agent_id: 1,
        account_id: 2,
        start_time: new Date('2024-06-18T16:39:53.984Z'),
        end_time: new Date('2024-06-19T16:39:53.984Z'),
        tasks: [],
        agent: {
          id: 1,
          email: 'test_1@example.com',
          name: 'test one',
        },
        account: {
          id: 2,
          email: 'test_2@example.com',
          name: 'test two',
        },
      };

      jest.spyOn(prisma.schedule, 'findUnique').mockResolvedValue(schedule);

      expect(
        await service.getScheduleById({
          id: '2b9a64a6-970f-4c04-85bb-185275289260',
        }),
      ).toEqual(schedule);
      expect(prisma.schedule.findUnique).toHaveBeenCalledWith({
        where: { id: '2b9a64a6-970f-4c04-85bb-185275289260' },
        include: {
          account: true,
          agent: true,
          tasks: true,
        },
      });
    });

    it('should return null if schedule not found', async () => {
      jest.spyOn(prisma.schedule, 'findUnique').mockResolvedValue(null);

      expect(
        await service.getScheduleById({
          id: '2b9a64a6-970f-4c04-85bb-185275289260',
        }),
      ).toBeNull();
      expect(prisma.schedule.findUnique).toHaveBeenCalledWith({
        where: { id: '2b9a64a6-970f-4c04-85bb-185275289260' },
        include: {
          account: true,
          agent: true,
          tasks: true,
        },
      });
    });
  });

  describe('updateSchedule', () => {
    it('should return the updated schedule', async () => {
      const schedule = {
        id: '23ff4085-2f1b-40d3-a3b4-5b98a1cbaf87',
        account_id: 8,
        agent_id: 8,
        start_time: new Date('2024-06-18T16:39:53.984Z'),
        end_time: new Date('2024-06-29T16:39:53.984Z'),
      };

      const updateQuery = {
        data: { end_time: new Date('2024-06-29T16:39:53.984Z') },
        where: { id: schedule.id },
      };

      jest.spyOn(prisma.schedule, 'update').mockResolvedValue(schedule);

      expect(await service.updateSchedule(updateQuery)).toEqual(schedule);
      expect(prisma.schedule.update).toHaveBeenCalledWith(updateQuery);
    });
  });

  describe('deleteSchedule', () => {
    it('should return the deleted schedule', async () => {
      const schedule = {
        id: '23ff4085-2f1b-40d3-a3b4-5b98a1cbaf87',
        account_id: 8,
        agent_id: 8,
        start_time: new Date('2024-06-18T16:39:53.984Z'),
        end_time: new Date('2024-06-29T16:39:53.984Z'),
      };

      jest.spyOn(prisma.schedule, 'delete').mockResolvedValue(schedule);

      expect(await service.deleteSchedule({ id: schedule.id })).toEqual(
        schedule,
      );
      expect(prisma.schedule.delete).toHaveBeenCalledWith({
        where: { id: schedule.id },
      });
    });
  });
});
