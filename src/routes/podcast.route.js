const express = require("express");
const podCastRouter = express.Router();
const { checkToken, verifyAdmin } = require('../middlewares/checkAuth');
const { 
    uploadPodcast, 
    modifyPodcast,
    deletePodcast,
    viewAllPodcasts,
    viewAPodcast,
    searchPodcasts,
}  = require('../controllers/podcast.controller');
const upload = require('../helpers/multer');

// A logged in user can upload a podcast
podCastRouter.post('/upload', checkToken, upload.single('file'), uploadPodcast);

// only admin can modify podcast
podCastRouter.patch('/:podcastId', checkToken, verifyAdmin, modifyPodcast);

// only admin can delete podcastValidation
podCastRouter.delete('/:podcastId', checkToken, verifyAdmin,  deletePodcast);

// only admins view all podcasts
podCastRouter.get('/', checkToken, verifyAdmin, viewAllPodcasts);

// only admins view a podcast
podCastRouter.get('/:podcastId', checkToken, verifyAdmin, viewAPodcast);

// admins search podacst by title as query
podCastRouter.get('/search', checkToken, verifyAdmin, searchPodcasts);

module.exports = podCastRouter;