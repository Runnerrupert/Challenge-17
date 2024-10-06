import { Router } from 'express';
const router = Router();
import {
    getAllUsers,
    getUserById,
    updateUserById,
    createUser,
    deleteUser,
} from '../../controllers/userController.js';

// Router to Get all users and create a user
router.route('/').get(getAllUsers).post(createUser);

// Router to Get, Delete and Update a user by their id
router.route('/:userId').get(getUserById).delete(deleteUser).put(updateUserById);

export { router as userRouter };