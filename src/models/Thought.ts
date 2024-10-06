import { Schema, model, document, ObjectID } from 'mongoose';

interface IThought extends Document {
    thoughtText: string,
    createdAt: Date,
    username: string,
    reactions: Schema.Types.ObjectId[]
}

const thoughtSchema = new Schema<IThought>(
    {
        thoughtText: {
            type: String,
            required: true,
            min_legnth: 1,
            max_length: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            // Add Getter Method to Auto-Format - TODO -
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [
            {
                type: Schema.Types.ObjectId,
                ref: 'reaction',
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        timestamps: true
    },
);

const Thought = model<IThought>('Thought', thoughtSchema);

export default Thought;