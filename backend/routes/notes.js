const express=require('express');
const router = express.Router();
const Notes=require('../models/Notes')
const fetchuser=require('../middleware/fetchuser');
const { getByTitle } = require('@testing-library/react');
const { body,validationResult } = require('express-validator');

router.get('/fetchallnotes',fetchuser,async (req,res)=>{
    try {
     
    const notes=await Notes.find({user:req.user.id});
    res.json(notes);   
    } catch (error) {
        
    console.error(error.message);
    res.status(500).send("internal server error occured")
    }
})

//ROUTE 2:CREATING A ROUTE TO ASDD NOTES;

router.post('/addnotes',fetchuser,[
    
  body("title","enter a valid title").isLength({min:3}),
  body("description"," password cannnot be blank ").isLength({min:5})
],async (req,res)=>{
    try {
      const  {title,description,tag,}=req.body;
      const errors=validationResult(req);
      if(!errors.isEmpty()){
        
    return res.status(400).json({ errors: errors.array() });
      }
      const notes=new Notes({
            title,description,tag,user:req.user.id
      })
     const savedNote=await  notes.save();
     res.json(savedNote);
    } catch (error) {
        console.log('hello world');
        res.status(400).send({ error: "error occured please check prerequistsis of notes" });
    }
})

//ROUTE:3 CREATING A ROUTE TO UPDATE NOTES;
router.put("/updatenote/:id",fetchuser, async (req,res)=>{
  try {
    
  const {title,description,tag}=req.body;
  const newNote={};
  if(title){
    newNote.title=title;
  }
  if(description){
    newNote.description=description;
  }
  if(tag){
    newNote.tag=tag;
  }
  let note=await Notes.findById(req.params.id)
  if(!note){
    return res.status(404).send("Not found");
  }
  if(note.user.toString()!=req.user.id){
    return res.status(401).send("Not Allowed");
  
  }
  note=await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
  res.json(note)
    
  } catch (error) {
    
    console.log('hello world');
    res.status(400).send({ error: "error occured please check prerequistsis of notes" });
  }
})

router.delete("/deletenote/:id",fetchuser, async (req,res)=>{
  try {
    
  const {title,description,tag}=req.body;
  
  let note=await Notes.findById(req.params.id)
  if(!note){
    return res.status(404).send("Not found");
  }
  if(note.user.toString()!=req.user.id){
    return res.status(401).send("Not Allowed");
  
  }
  note=await Notes.findByIdAndDelete(req.params.id);
  res.json("delete success");
  } catch (error) {
    
    console.log('hello world');
    res.status(400).send({ error: "error occured please check prerequistsis of notes" });
  }
})
module.exports=router;