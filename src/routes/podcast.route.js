const express = require("express");
const multer = require('multer');
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
const { storage, fileFilter } = require('../helpers/multer');
const { podcastValidation, validate } = require('../validation/podcast.validation');

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

// A logged in user can upload a podcast
podCastRouter.post('/upload', checkToken, podcastValidation(), validate, upload.single('file'), uploadPodcast);

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