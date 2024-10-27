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
import express, { Request, Response } from 'express';
import scheduleService from '../service/schedule.service';

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
scheduleRouter.get('/', async (req: Request, res: Response) => {
    try {
        const schedules = await scheduleService.getAllSchedules();
        res.status(200).json(schedules);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

export { scheduleRouter };
