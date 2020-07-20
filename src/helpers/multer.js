const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + '-' + file.originalname);
    },
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'audio/mp3' || 
        file.mimetype === 'audio/aac' ||
        file.mimetype === 'audio/mpeg' ||
        file.mimetype === 'audio/ogg'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

module.exports = {
    storage,
    fileFilter,
};