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

// Router to Get all thoughts and create a thought
router.route('/').get(getAllThoughts).post(createThought);

// Router to Get, Delete and Update a thought by its id
router.route('/:thoughtId').get(getThoughtById).delete(deleteThought).put(updateThoughtById);

// Router to Add a reaction to a specific thought by ID
router.route('/:thoughtId/reactions').post(addReaction).delete(deleteReaction);;

export { router as thoughtRouter };