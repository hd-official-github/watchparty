
import express from 'express'
import authRoute from './auth.route'
import socketRoute from './socket.route'
const router = express.Router()


const defaultRoutes = [
    // {
    //     path: '/test',
    //     route: testRoute,
    // },
    {
        path: '/auth',
        route: authRoute,
    },
    {
        path: '/socket',
        route: socketRoute
    }
    // {
    //     path: '/users',
    //     route: userRoute,
    // },
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

export default router
