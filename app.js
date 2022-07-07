const express = require("express");
const app = express();
const port = 3000;


const DB = {
    users:[
        {id:0,name:"akhil",age:25,email:"akhilemcalicut@gmail.com",active:true},
        {id:1,name:"amal",age:27,email:"amalbabumm@gmail.com",active:true}]
};



app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.get("/users",(req,res)=>{
    res.send(DB.users);
})

app.get("/users/:id",(req,res)=>{
   let id = req.params.id;

   let user = DB.users.find(user => user.id === parseInt(id));
   
   if(!user) res.status(404).send("user with that id doesn't exist");
   res.send(user);
});

app.post("/users",(req,res)=>{
   if(Object.keys(req.body).length === 0){
     return res.status(406).send("name,age and email required");
   }
    
   let {name,age,email} = req.body;
   
   if(!name) return res.status(406).send("name required");
   if(!age) return res.status(406).send("age required");
   if(!email) return res.status(406).send("email required");

   let id = (DB.users).length+1;
   let active = false

   let user = {id,name,age,email,active};
   (DB.users).push(user);
   
   res.send("new user added");


});

app.put("/users/:id",(req,res)=>{
    let id = parseInt(req.params.id);


    if(Object.keys(req.body).length === 0){
        return res.status(406).send("name,age and email required");
    } 

    let {name,age,email} = req.body;
   
    if(!name) return res.status(406).send("name required");
    if(!age) return res.status(406).send("age required");
    if(!email) return res.status(406).send("email required");
    
    if(!((DB.users)[id])) return res.status(404).send("user not found");
    
    let active = ((DB.users)[id]).active;
    let user = {id,name,age,email,active};

    (DB.users)[id] = user;

    res.send(user);

})


app.patch("/users/:id",(req,res)=>{
   let id = req.params.id;
   if(!(DB.users)[id]) return res.status(404).send('user not found');

   let user = (DB.users)[id];
   let active = !user.active;
   user.active = active; 
   (DB.users)[id] = user;

   res.send("user updated");
})

app.delete("/users/:id",(req,res)=>{
    let id = parseInt(req.params.id);
    if(!(DB.users)[id]) return res.status(404).send('user not found');
    
    console.log(DB.users);
    (DB.users).splice(id,1);
    console.log(DB.users);
    res.send("user removed")
})


app.listen(port,()=>console.log(`application running on ${port}`));

module.exports = app;
