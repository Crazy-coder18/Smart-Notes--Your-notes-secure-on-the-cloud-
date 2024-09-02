import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext';

const Noteitem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note,updateNote } = props;
    return (
        <div className='col-md-4'>
            <div className="card my-3" style={{ width: "18rem" }}>
            <span className="badge position-absolute top-0   translate-middle rounded-pill  bg-warning" style={{left:'50%',zIndex:'1'}}>{note.tag}</span>
                <div className="card-body">
                    <div className="d-flex">
                        <h5 className="card-title">{note.title}</h5>
                        <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id);
                        }}></i>
                        <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{ updateNote(note)}}></i>
                    </div>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div>
    );
};

export default Noteitem;

