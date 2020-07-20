const mongoose = require('mongoose');
const { Schema } = mongoose;

const podcastSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        tag: [
            {
                type: String,
                enum: ['science', 'technology', 'philosophy', 'business', 'pop-culture', 'history'],
                required: true,
            },
        ],
        file: {
            type: String,
            required: true,
        },
        dateUploaded: {
            type: Date,
            default: Date.now(),
        },
    }
);

module.exports = mongoose.model('Podcast', podcastSchema);