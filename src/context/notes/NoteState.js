import { React, useState } from "react";
import NoteContext from "./noteContext";
const NoteState = (props) => {
  
  const [notes,setNotes]=useState([]);
  const host = "http://localhost:5000/"
  const getNotes =async ()=>{
    const response = await fetch(`${host}api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': "application/json",
        'auth-token': sessionStorage.getItem("token")

      },
    });
    const json =await response.json();
    console.log(json);
    setNotes(json)
  }
  

  const addNote = async (title, description, tag) => {
    console.log('adding a note');
    const response = await fetch(`${host}api/notes/addnotes`, {
      method: 'POST',
      headers: {
        'Content-Type': "application/json",
        'auth-token': sessionStorage.getItem("token")

      },
      body: JSON.stringify({title,description,tag})
    });
    const json = response.json();
    const note = {
      "_id": "66cf29c57fc9845636136756",
      "user": "66cef533eaaa62c85beadc3b",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2024-08-28T13:44:37.321Z",
      "__v": 0
    }
    setNotes(notes.concat(note))
  }
  const deleteNote = async (id) => {
    console.log('deleting a note with an id:' + id);
    const response = await fetch(`${host}api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': "application/json",
        'auth-token': sessionStorage.getItem("token")
      },
    });
    const json = response.json();
    const newnote = notes.filter((note) => { return note._id !== id });
    setNotes(newnote)
  }
  const editNote = async (id, title, description, tag) => {
    //API CALL
    const response = await fetch(`${host}api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': "application/json",
        'auth-token': sessionStorage.getItem("token")
      },
      body: JSON.stringify({title,description,tag})
    });
    const json = response.json();
    //EDIT LOGIC
    let newNotes = JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag; 
        break; 
      }

    }
    setNotes(newNotes);
  }

  return (
    <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote ,getNotes}}>
      {props.children}
    </NoteContext.Provider>
  )
}
export default NoteState;