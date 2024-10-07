import { Request, Response } from 'express';
import { Thought, User } from '../models/index.js';

// Method to get all thoughts from the Database
export const getAllThoughts = async (_req: Request, res: Response) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
}

// Method to get a specified thought from the Database based on the thoughtId
export const getThoughtById = async (req: Request, res: Response) => {
    const { thoughtId } = req.params;
    try {
        const thought = await Thought.findById(thoughtId);
        if (thought) {
            return res.json(thought);
        } else {
            return res.status(404).json({
                message: 'Thought not found'
            });
        }
    } catch (error: any) {
        return res.status(500).json({
            message: error.message
        });
    }
};

// Method to create a thought based on the information provided in the body of the query

// TO-DO - Link it to the user
export const createThought = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.body.userId);
        if (!user) {
            return res.status(404).json({ 
                message: "User not found" 
            })
        }
        const thought = await Thought.create(req.body);
        return res.json(thought);
    } catch (err) {
        return res.status(500).json(err);
    }
}

// Method to update a specified thought from the Database based on the thoughtId
export const updateThoughtById = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body }
        );

        if (!thought) {
            return res
                .status(404)
                .json({message: 'Thought not found'});
        }

        return res.json(thought);
    } catch (err) {
        return res.status(500).json(err);
    }
};

// Method to delete a user based on userId
export const deleteThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

        if (!thought) {
            return res.status(404).json({ message: 'No such thought exists' });
        }
        return res.json({ message: 'Thought successfully deleted' });
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}