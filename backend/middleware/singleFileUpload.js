
var multer = require('multer');

let backEndUrl=process.env.BACKEND_URL || "http://localhost:3000"
var storage = multer.diskStorage({
  destination: function (request, file, callback) {
    callback(null, './public/uploads');
  },
  filename: function (request, file, callback) {
    var ext = file.originalname.split(".");
    callback(null, Date.now() + "." + ext[ext.length - 1]);
  },
});
var upload = multer({ storage: storage }).single('profile_pic');
module.exports = function (req, res, next) {
    upload(req, res, (err) => {
       if (err) {
           console.log(err,"prt");
          res.status(400).send("Something went wrong!");
       }
       if (req.file) {
           
            var path = req.file.filename;
            path = `${backEndUrl}/images/${path}`;
          req.fileurl = path;
       } else {
            if(req.body.fileurl){
                req.fileurl =req.body.fileurl;
            }else{
                req.fileurl ='';
            }
       }
       next();
    });
}