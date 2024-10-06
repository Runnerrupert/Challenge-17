import { Router } from 'express';
const router = Router();
import {
    getAllUsers,
    getUserById,
    updateUserById,
    createUser,
    deleteUser,
    addFriend,
    deleteFriend
} from '../../controllers/userController.js';

// Router to Get all users and create a user
router.route('/').get(getAllUsers).post(createUser);

// Router to Get, Delete and Update a user by their id
router.route('/:userId').get(getUserById).delete(deleteUser).put(updateUserById);

// Router to add a friend to a specific user by ID
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

export { router as userRouter };