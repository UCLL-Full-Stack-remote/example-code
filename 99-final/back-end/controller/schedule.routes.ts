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
 *      EnrollmentInput:
 *          type: object
 *          properties:
 *              schedule:
 *                type: object
 *                properties:
 *                    id:
 *                      type: number
 *                      format: int64
 *              students:
 *                  type: array
 *                  items:
 *                      type: object
 *                      properties:
 *                         id:
 *                            type: number
 *                            format: int64
 */
import express, { NextFunction, Request, Response } from 'express';
import scheduleService from '../service/schedule.service';
import { EnrollmentInput, Role, ScheduleInput } from '../types';

const scheduleRouter = express.Router();

/**
 * @swagger
 * /schedules:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get the schedule of a lecturer or if the user is an admin, a list of all schedules.
 *     responses:
 *       200:
 *         description: The schedule of a lecturer or if the user is an admin, a list of all schedules.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Schedule'
 */
scheduleRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const request = req as Request & { auth: { username: string; role: Role } };
        const { username, role } = request.auth;
        const schedules = await scheduleService.getSchedule({ username, role });
        res.status(200).json(schedules);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /schedules:
 *   post:
 *      security:
 *       - bearerAuth: []
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

/**
 * @swagger
 * /schedules/enroll:
 *   post:
 *      security:
 *       - bearerAuth: []
 *      summary: Enroll students to a schedule.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/EnrollmentInput'
 *      responses:
 *         200:
 *            description: The schedule with all students enrolled.
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Schedule'
 */
scheduleRouter.post('/enroll', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const schedule = <EnrollmentInput>req.body;
        const result = await scheduleService.addStudentsToSchedule(schedule);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

export { scheduleRouter };
