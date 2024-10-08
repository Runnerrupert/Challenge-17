import { Schema, Types, model, type Document } from 'mongoose';

interface IReaction extends Document {
    reactionId: Schema.Types.ObjectId,
    reactionBody: string,
    username: string,
    createdAt: Date | string,
}

interface IThought extends Document {
    thoughtText: string,
    createdAt: Date | string,
    username: string,
    userId: Schema.Types.ObjectId[] | undefined,
    reactions: Schema.Types.ObjectId[]
}

const reactionSchema = new Schema<IReaction>(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: [
            {
                type: String,
                required: true,
            },
        ],
        createdAt: [
            {
                type: Date,
                default: Date.now(),
                get: (createdAt: Date) => createdAt.toLocaleDateString("en-US"),
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    },
);

const thoughtSchema = new Schema<IThought>(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength : 1,
            maxlength : 280,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            get: (createdAt: Date) => createdAt.toLocaleDateString("en-US"),
        },
        username: {
            type: String,
            required: true,
        },
        userId: { 
            type: Schema.Types.ObjectId, 
            ref: 'user', 
            required: true
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
    },
);


thoughtSchema
    .virtual('reactionCount')
    .get(function (this:IThought) {
        return this.reactions?.length;
    })

const Thought = model<IThought>('Thought', thoughtSchema);

export default Thought;