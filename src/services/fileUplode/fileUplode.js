import 'dotenv/config';
export const fileUpload = () => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            // استخدم متغير البيئة UPLOADS_PATH أو استخدم "uploads/" كمسار افتراضي
            const uploadsPath = process.env.UPLOADS_PATH || 'uploads/';
            cb(null, uploadsPath);
        },
        filename: (req, file, cb) => {
            cb(null, new mongoose.Types.ObjectId() + "-" + file.originalname);
        },
    });

    function fileFilter(req, file, cb) {
        if (file.mimetype.startsWith('image') || file.mimetype.startsWith('video/')) {
            cb(null, true);
        } else {
            cb(new AppError('Only images and videos are allowed!', 401), false);
        }
    }

    const upload = multer({ storage, fileFilter });

    return upload;
};

export const uploadSingleFile = (fieldName) => fileUpload().single(fieldName);
export const uploadArrayOfFiles = (fieldName) => fileUpload().array(fieldName, 10);
export const uploadFields = (fields) => fileUpload().fields(fields);
