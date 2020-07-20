const { Podcast, User } = require('../models');
const mongoose = require('mongoose');
const { Types: { ObjectId } } = mongoose;
const uploadPodcast = async (req, res) => {
    try {
        const { _id } = req.user, { title, description, tag, file, dateCreated } = req.body;
        const fileName = req.file && req.file.path;
        const podcast = new Podcast({
            title,
            description,
            tag,
            file: fileName,
            dateCreated,
        });
        const createdPodCast = await podcast.save();
        await User.findByIdAndUpdate(
            _id,
            {
                $push: {
                    podcasts: createdPodCast._id,
                },
            },
            {
                new: true,
            }
        );
        return res.status(201).json({
            status: '201 Created',
            message: 'Podcast uploaded',
            podcast: createdPodCast,
        });
    } catch (error) {
        console.log('Error from uploading podcast', error);
        return res.status(500).json({
            status: '500 Error',
            message: 'Unable to process your request. Try again',
        });
    }
};

const modifyPodcast = async (req, res) => {
    try {
        const { podcastId } = req.params;
        if (!ObjectId.isValid(podcastId) || ObjectId.isValid(podcastId) !== true) {
            return res.status(422).json({
                status: '422 Error',
                message: 'Invalid mongoose Id',
            });
        }
        const podcast = await Podcast.findByIdAndUpdate(podcastId, { ...req.body }, { new: true });
        if (!podcast) {
            return res.status(404).json({
                status: '404 Error',
                message: 'Podcast doesn\'t exist or has been deleted',
            });
        }
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({
                status: '400 Error',
                message: 'You did not modify the podacst',
            });
        }
        return res.status(200).json({
            status: '200 OK',
            message: 'Podcast has been modidied successfully',
        });
    } catch (error) {
        console.log('Error from updating podcast', error);
        return res.status(500).json({
            status: '500 Error',
            message: 'Unable to process your request. Try again',
        });
    }
};

const deletePodcast = async (req, res) => {
    try {
        const { podcastId } = req.params;
        if (!ObjectId.isValid(podcastId) || ObjectId.isValid(podcastId) !== true) {
            return res.status(422).json({
                status: '422 Error',
                message: 'Invalid mongoose Id',
            });
        }
        const deletedPodcast = await Podcast.findByIdAndRemove(podcastId);
        if (!deletedPodcast) {
            return res.status(404).json({
                status: '404 Error',
                message: 'Podcast doesn\'t exist or has been deleted',
            });
        }
        return res.status(200).json({
            status: '200 OK',
            message: 'Podcast has been deleted successfully',
        });
    } catch (error) {
        console.log('Error from deleting podcast', error);
        return res.status(500).json({
            status: '500 Error',
            message: 'Unable to process your request. Try again',
        });
    }
};

const viewAllPodcasts = async (req, res) => {
        // destructure page and limit and set default values
    const { page = 1, limit = 10 } = req.query;

    try {
        // execute query with page and limit values
        const podcasts = await Podcast.find()
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        // get total documents in the Posts collection 
        const count = await Podcast.countDocuments();

        // return response with posts, total pages, and current page
        return res.status(200).json({
            podcasts,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        });
    } catch (err) {
        console.error('Error from deleting podcast', err);
        return res.status(500).json({
            status: '500 Error',
            message: 'Unable to process your request. Try again',
        }); 
    }
};

module.exports = {
    uploadPodcast,
    modifyPodcast,
    deletePodcast,
    viewAllPodcasts,
};