import React, { useState } from 'react'
import { useContext } from 'react';
import noteContext from '../context/notes/noteContext';
const Addnote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setnote] = useState({ title: "", description: "", tag: "" })
  const handleClick = (e) => {
    e.preventDefault();
    
    props.showAlert("success","u have successfully addded note");
    addNote(note.title, note.description, note.tag);
  }
  const onchange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value })
    
  }

  return (
    <div>

      <div className="container my-3">
        <h1>Add a Note</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" class="form-label">Title</label>
            <input type="text" class="form-control" id="title" name='title' onChange={onchange} />
          </div>
          <div className="mb-3">
            <label htmlFor="description" class="form-label">Description</label>
            <input type="text" class="form-control" id="description" name="description" onChange={onchange} />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" class="form-label">Tag</label>
            <input type="text" class="form-control" id="tag" name="tag" onChange={onchange} />
          </div>
          <button  disabled={note.title.length<5 || note.description.length<5 || note.tag.length<3}type="submit" class="btn btn-primary" onClick={handleClick}>Add Note</button>
        </form>
      </div>
    </div>
  )
}

export default Addnote
