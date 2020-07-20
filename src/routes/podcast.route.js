const express = require("express");
const multer = require('multer');
const podCastRouter = express.Router();
const { checkToken, verifyAdmin } = require('../middlewares/checkAuth');
const { 
    uploadPodcast, 
    modifyPodcast,
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

module.exports = podCastRouter;