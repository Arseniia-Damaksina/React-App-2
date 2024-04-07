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

  it('should return 201 and taskboard object for POST /taskboards', async () => {
    const createTaskBoardDto = {
      board: 'New Task Board',
    };

    const response = await request(app.getHttpServer())
      .post('/taskboards')
      .send(createTaskBoardDto);
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      id: expect.any(Number),
      board: createTaskBoardDto.board,
    });

    createdTaskBoardId = response.body.id;
  });

  it('should return 200 and array of taskboards for GET /taskboards', async () => {
    const response = await request(app.getHttpServer()).get('/taskboards');
    expect(response.status).toBe(200);
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

  it('should return 200 and taskboard object for GET /taskboards/:id', async () => {
    const taskBoardId = createdTaskBoardId;

    const response = await request(app.getHttpServer()).get(
      `/taskboards/${taskBoardId}`,
    );
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      id: parseInt(taskBoardId, 10),
      board: expect.any(String),
    });
  });

  it('should return 500 Internal Server Error for GET /taskboards/:nonexistentId', async () => {
    const nonexistentId = 'nonexistent';

    const response = await request(app.getHttpServer()).get(
      `/taskboards/${nonexistentId}`,
    );
    expect(response.status).toBe(500);
  });

  it('should return 200 and updated taskboard object for PUT /taskboards/:id/update', async () => {
    const taskBoardId = createdTaskBoardId;
    const updateTaskBoardDto = {
      board: 'Updated Task Board',
    };

    const response = await request(app.getHttpServer())
      .put(`/taskboards/${taskBoardId}/update`)
      .send(updateTaskBoardDto);
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      id: taskBoardId,
      board: updateTaskBoardDto.board,
    });
  });

  it('should return 404 Not Found for PUT /taskboards/:nonexistentId/update', async () => {
    const nonexistentId = 'nonexistent';

    const response = await request(app.getHttpServer()).get(
      `/taskboards/${nonexistentId}/update`,
    );
    expect(response.status).toBe(404);
  });

  it('should return 200 and success message for DELETE /taskboards/:id/delete', async () => {
    const taskBoardId = createdTaskBoardId;
    const deletesuccessMessage = 'Task list has been successfully deleted.';

    const response = await request(app.getHttpServer()).delete(
      `/taskboards/${taskBoardId}/delete`,
    );
    expect(response.status).toBe(200);
    expect(response.body.message).toEqual(deletesuccessMessage);
  });

  it('should return 404 Not Found for DELETE /taskboards/:nonexistentId/delete', async () => {
    const nonexistentId = 'nonexistent';

    const response = await request(app.getHttpServer()).get(
      `/taskboards/${nonexistentId}/delete`,
    );
    expect(response.status).toBe(404);
  });
});
