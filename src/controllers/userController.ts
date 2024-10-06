import { Request, Response } from 'express';
// import { ObjectId } from 'mongodb'; // 
import { User } from '../models/index.js'; // Import { Thought } when ready

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
            { $set: req.body }
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

        // Add for deleting all thoughts & reactions on that specified user

        // const thought = await Thought.deleteMany(
        //     { users: req.params.userId },
        //     { $pull: { students: req.params.userId } },
        // );

        // if (!thought) {
        //     return res.status(404).json({
        //         message: 'Student deleted, but no courses found',
        //     });
        // }

        return res.json({ message: 'User successfully deleted' });
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

        return res.json(user);
    } catch (err) {
        return res.status(500).json(err);
    }
}
