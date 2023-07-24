const express=require('express');
const port=3100;
const path=require('path');
const db=require('./config/mongoose');
const Task=require('./models/task');

const app=express();


app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));


app.get('/',function(req,res){
    Task.find({},function(err,lists){
        if(err)
        {
            console.log("error while retriving");
            return;
        }
        return res.render('home',{
            title:"this is home page",
            tasklist:lists
        });
    }) 

    
});

app.get('/delete-list/',function(req,res){
//let task=req.query.task;
let id=req.query.id;
//let tindex=taskList.findIndex(tasklistindx=>tasklistindx.task==task);
// if(tindex!=-1){
//     taskList.splice(tindex,1);
// }
Task.findByIdAndDelete(id,function(err){
    if(err)
    {
        console.log("error while deleting");
        return;
    }
    return res.redirect('back');
});
//return res.redirect('back');

});


app.post('/create-list',function(req,res){

Task.create({
    task:req.body.task
},function(err,newtask){
    if(err)
    {
        console.log("error occured creating list");
    }
          console.log("******",newtask);
          return res.redirect('back');
});

    // taskList.push({
    //      task:req.body.task

    // })
    //console.log(req.body.name);
    
});

app.listen(port,function(err){
if(err)
{
    console.log("error occured during express");
}
console.log("successfully connected to express");

});