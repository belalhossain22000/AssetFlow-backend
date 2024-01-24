import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { ShoesRouter } from '../modules/shoes/shoes.route';

const router = Router();

// all route
const moduleRoutes = [
    
    {
        path: '/auth',
        route: UserRoutes,
    },
    {
        path: '/shoes',
        route: ShoesRouter,
    },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;




