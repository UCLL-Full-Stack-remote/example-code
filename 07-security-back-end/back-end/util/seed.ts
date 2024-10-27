// Execute: npx ts-node util/seed.ts

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { set } from 'date-fns';

const prisma = new PrismaClient();

const main = async () => {
    await prisma.schedule.deleteMany();
    await prisma.course.deleteMany();
    await prisma.lecturer.deleteMany({});
    await prisma.student.deleteMany();
    await prisma.user.deleteMany();

    const fullStack = await prisma.course.create({
        data: {
            name: 'Full-stack development',
            description: 'Learn how to build a full stack web application.',
            phase: 2,
            credits: 6,
        },
    });

    const softwareEngineering = await prisma.course.create({
        data: {
            name: 'Software Engineering',
            description: 'Learn how to build and deploy a software application.',
            phase: 2,
            credits: 6,
        },
    });

    const frontEnd = await prisma.course.create({
        data: {
            name: 'Front-end Development',
            description: 'Learn how to build a front-end web application.',
            phase: 1,
            credits: 6,
        },
    });

    const backEnd = await prisma.course.create({
        data: {
            name: 'Back-end Development',
            description: 'Learn how to build a REST-API in a back-end application.',
            phase: 1,
            credits: 6,
        },
    });

    const admin = await prisma.user.create({
        data: {
            username: 'admin',
            password: await bcrypt.hash('admin123', 12),
            firstName: 'admin',
            lastName: 'admin',
            email: 'administration@ucll.be',
            role: 'admin',
        },
    });

    const lecturerJP = await prisma.lecturer.create({
        data: {
            expertise: 'Full-stack development, Front-end development',
            user: {
                create: {
                    username: 'johanp',
                    password: await bcrypt.hash('johanp123', 12),
                    firstName: 'Johan',
                    lastName: 'Pieck',
                    email: 'johan.pieck@ucll.be',
                    role: 'lecturer',
                },
            },
            courses: {
                connect: [{ id: fullStack.id }, { id: frontEnd.id }],
            },
        },
    });

    const lecturerES = await prisma.lecturer.create({
        data: {
            expertise: 'Software Engineering, Back-end Development',
            user: {
                create: {
                    username: 'elkes',
                    password: await bcrypt.hash('elkes123', 12),
                    firstName: 'Elke',
                    lastName: 'Steegmans',
                    email: 'elke.steegmans@ucll.be',
                    role: 'lecturer',
                },
            },
            courses: {
                connect: [{ id: fullStack.id }, { id: softwareEngineering.id }],
            },
        },
    });

    const lecturerGJ = await prisma.lecturer.create({
        data: {
            expertise: 'Full-stack development, Back-end Development',
            user: {
                create: {
                    username: 'greetjej',
                    password: await bcrypt.hash('greetjej123', 12),
                    firstName: 'Greetje',
                    lastName: 'Jongen',
                    email: 'greetje.jongen@ucll.be',
                    role: 'lecturer',
                },
            },
            courses: {
                connect: [{ id: fullStack.id }, { id: backEnd.id }],
            },
        },
    });

    const student1 = await prisma.student.create({
        data: {
            studentnumber: 'r0785023',
            user: {
                create: {
                    username: 'peterp',
                    password: await bcrypt.hash('peterp123', 12),
                    firstName: 'Peter',
                    lastName: 'Parker',
                    email: 'peter.parker@ucll.be',
                    role: 'student',
                },
            },
        },
    });

    const student2 = await prisma.student.create({
        data: {
            studentnumber: 'r0785024',
            user: {
                create: {
                    username: 'bruceb',
                    password: await bcrypt.hash('bruceb123', 12),
                    firstName: 'Bruce',
                    lastName: 'Banner',
                    email: 'bruce.banner@ucll.be',
                    role: 'student',
                },
            },
        },
    });

    const student3 = await prisma.student.create({
        data: {
            studentnumber: 'r0785025',
            user: {
                create: {
                    username: 'sallys',
                    password: await bcrypt.hash('sallysb123', 12),
                    firstName: 'Sally',
                    lastName: 'Smith',
                    email: 'sally.smith@ucll.be',
                    role: 'student',
                },
            },
        },
    });

    const student4 = await prisma.student.create({
        data: {
            studentnumber: 'r0785026',
            user: {
                create: {
                    username: 'michaelm',
                    password: await bcrypt.hash('michaelm123', 12),
                    firstName: 'Michael',
                    lastName: 'Miller',
                    email: 'michael.miller@ucll.be',
                    role: 'student',
                },
            },
        },
    });

    const student5 = await prisma.student.create({
        data: {
            studentnumber: 'r0785027',
            user: {
                create: {
                    username: 'lindas',
                    password: await bcrypt.hash('lindas123', 12),
                    firstName: 'Linda',
                    lastName: 'Lawson',
                    email: 'linda.lawson@ucll.be',
                    role: 'student',
                },
            },
        },
    });

    await prisma.schedule.create({
        data: {
            start: set(new Date(), { hours: 8, minutes: 30 }),
            end: set(new Date(), { hours: 10, minutes: 30 }),
            course: {
                connect: { id: fullStack.id },
            },
            lecturer: {
                connect: { id: lecturerJP.id },
            },
            students: {
                connect: [{ id: student1.id }],
            },
        },
    });

    await prisma.schedule.create({
        data: {
            start: set(new Date(), { hours: 13, minutes: 30 }),
            end: set(new Date(), { hours: 15, minutes: 30 }),
            course: {
                connect: { id: fullStack.id },
            },
            lecturer: {
                connect: { id: lecturerES.id },
            },
            students: {
                connect: [{ id: student2.id }],
            },
        },
    });

    await prisma.schedule.create({
        data: {
            start: set(new Date(), { hours: 13, minutes: 30 }),
            end: set(new Date(), { hours: 15, minutes: 30 }),
            course: {
                connect: { id: softwareEngineering.id },
            },
            lecturer: {
                connect: { id: lecturerES.id },
            },
            students: { connect: [{ id: student4.id }] },
        },
    });

    await prisma.schedule.create({
        data: {
            start: set(new Date(), { hours: 10, minutes: 45 }),
            end: set(new Date(), { hours: 12, minutes: 45 }),
            course: {
                connect: { id: backEnd.id },
            },
            lecturer: {
                connect: { id: lecturerGJ.id },
            },
            students: { connect: [{ id: student5.id }] },
        },
    });
};

(async () => {
    try {
        await main();
        await prisma.$disconnect();
    } catch (error) {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    }
})();
