const multer = require('multer');
const path = require("path");

//! Use of Multer
var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        let name = path.extname(file.originalname);
        if(name === ".pdf" || name === ".pptx" || name === ".docx"){
            callBack(null, './assets/public/docs');
        }else{
            callBack(null, './assets/public/images/');    // './public/images/' directory name where save the file
        }
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

var upload = multer({
    storage: storage,
    limits : {fileSize : 5000000} //can upload upto fileSize of 5MB
});

module.exports = upload;