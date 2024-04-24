import multer from "multer";
import path from "path";

const tempDestination = path.resolve("tmp");

const storage = multer.diskStorage({
    destination: tempDestination,
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({
    storage
})

export default upload;