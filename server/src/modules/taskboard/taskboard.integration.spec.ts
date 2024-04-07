import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app/app.module';
import { TaskBoardService } from './taskboard.service';
import { TaskBoardEntity } from '../../entities/taskboard.entity';
import { ActivityLogEntity } from '../../entities/activityLog.entity';
import { CreateTaskBoardDto } from '../../DTOs/create-taskboard.dto';

describe('TaskBoardController', () => {
  let app: INestApplication;
  let createdTaskBoardId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create a new task board and return 201', async () => {
    const createTaskBoardDto = {
      board: 'New Task Board',
    };

    const response = await request(app.getHttpServer())
      .post('/taskboards')
      .send(createTaskBoardDto);
    expect(response.status).toBe(HttpStatus.CREATED);
    expect(response.body).toMatchObject({
      id: expect.any(Number),
      board: createTaskBoardDto.board,
    });

    createdTaskBoardId = response.body.id;
  });

  it('should retrieve all task boards and return 200', async () => {
    const response = await request(app.getHttpServer()).get('/taskboards');
    expect(response.status).toBe(HttpStatus.OK);
    if (Array.isArray(response.body)) {
      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            board: expect.any(String),
          }),
        ]),
      );
    } else {
      expect(response.body).toEqual([]);
    }
  });

  it('should retrieve a specific task board by ID and return 200', async () => {
    const taskBoardId = createdTaskBoardId;

    const response = await request(app.getHttpServer()).get(
      `/taskboards/${taskBoardId}`,
    );
    expect(response.status).toBe(HttpStatus.OK);
    expect(response.body).toMatchObject({
      id: parseInt(taskBoardId, 10),
      board: expect.any(String),
    });
  });

  it('should return 500 when retrieving a non-existent task board', async () => {
    const nonexistentId = 'nonexistent';

    const response = await request(app.getHttpServer()).get(
      `/taskboards/${nonexistentId}`,
    );
    expect(response.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
  });

  it('should update an existing task board and return 200', async () => {
    const taskBoardId = createdTaskBoardId;
    const updateTaskBoardDto = {
      board: 'Updated Task Board',
    };

    const response = await request(app.getHttpServer())
      .put(`/taskboards/${taskBoardId}/update`)
      .send(updateTaskBoardDto);
      expect(response.status).toBe(HttpStatus.OK);
    expect(response.body).toMatchObject({
      id: taskBoardId,
      board: updateTaskBoardDto.board,
    });
  });

  it('should return 404 when updating a non-existent task boarde', async () => {
    const nonexistentId = 'nonexistent';

    const response = await request(app.getHttpServer()).get(
      `/taskboards/${nonexistentId}/update`,
    );
    expect(response.status).toBe(HttpStatus.NOT_FOUND);
  });

  it('should delete an existing task board and return 200', async () => {
    const deletesuccessMessage = 'Task board has been successfully deleted.';

    const response = await request(app.getHttpServer()).delete(
      `/taskboards/${createdTaskBoardId}/delete`,
    );
    expect(response.status).toBe(HttpStatus.OK);
    expect(response.body.message).toEqual(deletesuccessMessage);
    const getDeletedTaskBoard = await request(app.getHttpServer()).get(
      `/taskboards/${createdTaskBoardId}`,
    );
    expect(getDeletedTaskBoard.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
  });

  it('should return 404 when deleting a non-existent task board', async () => {
    const nonexistentId = 'nonexistent';

    const response = await request(app.getHttpServer()).get(
      `/taskboards/${nonexistentId}/delete`,
    );
    expect(response.status).toBe(HttpStatus.NOT_FOUND);
  });
});
