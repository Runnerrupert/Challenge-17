import { Router } from 'express';
import {
    getAllThoughts,
    getThoughtById,
    updateThoughtById,
    createThought,
    deleteThought,
    addReaction,
    deleteReaction
} from '../../controllers/thoughtController.js';
const router = Router();

// Router to Get all users and create a user
router.route('/').get(getAllThoughts).post(createThought);

// Router to Get, Delete and Update a user by their id
router.route('/:thoughtId').get(getThoughtById).delete(deleteThought).put(updateThoughtById);

// Router to Add a reaction to a specific user by ID
router.route('/:thoughtId/reactions').post(addReaction)

// Router to add a friend to a specific user by ID
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

export { router as thoughtRouter };