const multer = require('multer');
const path = require('path');

// ekhane cb-> callback er jei parameter gulo thake shegulor first er ta thake error er jonno. amra error null dicchi jaate pore proceed kore. taai amra null dicchi
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        console.log(file);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
})

const upload = multer({
    // dest: 'uploads/',
    storage: storage,
    fileFilter: (req, file, cb) => {
        const supportedImage = /png|jpg|jpeg/;
        // check the file
        // console.log({ "fileName": file, "fileOriginalName": file.originalname });
        const fileExtension = path.extname(file.originalname);
        // console.log(fileExtension);
        if (supportedImage.test(fileExtension)) {
            cb(null, true)
        } else {
            cb(new Error('File extension is inalid'))
        }

    },
    size: 5000000

});


module.exports = upload;