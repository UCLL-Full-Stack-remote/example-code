/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      Course:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            name:
 *              type: string
 *              description: Course name.
 *            description:
 *              type: string
 *              description: Course description.
 *            phase:
 *              type: number
 *              description: Course name.
 *            credits:
 *              type: number
 *              description: Course credits.
 */
import express, { Request, Response } from 'express';

const courseRouter = express.Router();

export { courseRouter };
