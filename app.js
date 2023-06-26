const express=require('express');
const app=express();
//const fs = require('fs');

//パスの設定
const path=require('path');
app.use(express.static(path.join(__dirname)));

// app.get('/',(req,res)=>{
//     res.render('index.html');
// });

  

app.listen(3000)