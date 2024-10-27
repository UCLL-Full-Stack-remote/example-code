/**
 * @swagger
 *   components:
 *    schemas:
 *      Schedule:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            start:
 *              type: string
 *              format: date-time
 *            end:
 *              type: string
 *              format: date-time
 *            course:
 *              $ref: '#/components/schemas/Course'
 *            lecturer:
 *              $ref: '#/components/schemas/Lecturer'
 *            students:
 *              type: array
 *              items:
 *                  $ref: '#/components/schemas/Student'
 *      ScheduleInput:
 *          type: object
 *          properties:
 *            start:
 *              type: string
 *              format: date-time
 *            end:
 *              type: string
 *              format: date-time
 *            course:
 *              type: object
 *              properties:
 *                  id:
 *                      type: number
 *                      format: int64
 *            lecturer:
 *              type: object
 *              properties:
 *                  id:
 *                      type: number
 *                      format: int64

 */
import express, { NextFunction, Request, Response } from 'express';
import scheduleService from '../service/schedule.service';
import { ScheduleInput } from '../types';

const scheduleRouter = express.Router();

/**
 * @swagger
 * /schedules:
 *   post:
 *      summary: Create a new schedule for an existing lecturer and course.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ScheduleInput'
 *      responses:
 *         200:
 *            description: The created schedule.
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Schedule'
 */
scheduleRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const schedule = <ScheduleInput>req.body;
        const result = await scheduleService.createSchedule(schedule);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

export { scheduleRouter };
