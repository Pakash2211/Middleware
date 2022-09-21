
const express = require('express');
const fs = require('fs');

 const app = express();
app.use(express.json());
 app.use((req,res,next)=>{
    
    let {ID,Name,Rating,Description,Genre,Cast} = req.body;

   let name = typeof Name;
   let  dec = typeof Description;
   let gen = typeof Genre;
   let cast = typeof Cast;

  
    if(ID && Name && Rating && Description && Genre && Cast){
        if(isNaN(ID) || isNaN(Rating) || name != 'string' 
        || dec != 'string' || gen != 'string' || cast != 'string'){
             res.status(400).send("data type are not correct");
        }else{
            next();
        }
       
    }else{
        res.status(400).send("all the fields are  exists");
    }
   
 })

 app.post("/movie",(req,res)=>{
   
     fs.readFile('movies.json',(err,data)=>{
        if(err){
           return res.send("Error");
        }
        let data2 = JSON.parse(data);
        data2.movie = [...data2.movie,req.body];

         fs.writeFile('movies.json',JSON.stringify(data2),{encoding: "utf-8"},()=>{
            res.send("data sucessfully added");
         })

         
     })

 })


 app.listen(9011,()=>{
    console.log("start");
 })