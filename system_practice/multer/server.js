const express = require('express');
const multer = require('multer');
const app = express()
app.use(express.json())

app.get("/test", (req, res) => {
  res.status(200).send({ msg: "This is test route" });
});

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        return cb(null,'./public/Images')
    },
    filename:function (req,file,cb){
        return cb(null,`${Date.now()} _ ${file.originalname}`)
    }
})
const upload = multer({storage})

app.post('/upload',upload.single('file'),(req,res)=>{
    console.log(req.body)
    console.log(req.file);
    
})
app.listen(5000,()=>{
    console.log('server started the port')
})