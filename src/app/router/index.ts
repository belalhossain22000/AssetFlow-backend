import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { ShoesRouter } from '../modules/shoes/shoes.route';
import { SaleRouter } from '../modules/salse/salse.route';

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
    {
        path: '/sale',
        route: SaleRouter,
    },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;




