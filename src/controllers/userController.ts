import { Request, Response } from 'express';
import { User, Thought } from '../models/index.js';

// Method to get all users from the Database
export const getAllUsers = async (_req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
}

// Method to get a specified user from the Database based on their userId
export const getUserById = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({
                message: 'User not found'
            });
        }
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Method to update a specified user from the Database based on their userId
export const updateUserById = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { new: true }
        );

        if (!user) {
            return res
                .status(404)
                .json({message: 'User not found'});
        }

        return res.json(user);
    } catch (err) {
        return res.status(500).json(err);
    }
};

// Method to create a user based on the information provided in the body of the query
export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}

// Method to delete a user based on userId
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndDelete({ _id: req.params.userId });

        if (!user) {
            return res.status(404).json({ message: 'No such user exists' });
        }

        const thought = await Thought.deleteMany(
            { userId: req.params.userId },
        );

        if (thought.deletedCount === 0) {
            return res.status(200).json({
                message: 'User successfully deleted, but no thoughts were found',
            });
        }

        return res.json({ message: 'User and all associated thoughts have been successfully deleted' });
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}

// Method to add a friend to a specific user based on that friends ID
export const addFriend = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: 
                { friends: req.params.friendId }
            },
            { runValidators: true, new: true }
        );

        if (!user) {
            return res
                .status(404)
                .json({ message: 'No user was found with that ID' });
        }

        return res.json(user);
    } catch (err) {
        return res.status(500).json(err);
    }
}

// Method to delete a friend from a specific user based on that friends ID
export const deleteFriend = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: 
                { friends: req.params.friendId }
            },
            { runValidators: true, new: true }
        );

        if (!user) {
            return res
                .status(404)
                .json({ message: 'No user was found with that ID' });
        }
        console.log(user.friends);
        return res.json(user);
    } catch (err) {
        return res.status(500).json(err);
    }
}
