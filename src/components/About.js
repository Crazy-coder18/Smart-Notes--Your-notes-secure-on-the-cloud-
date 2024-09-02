import React, { useContext, useState, useEffect } from 'react';
import noteContext from '../context/notes/noteContext';

export default function About() {
  const [profile, setprofile] = useState([]);
  const context = useContext(noteContext);
  const { notes } = context;
  const getuser = async () => {
    const response = await fetch(`http://localhost:5000/api/auth/getuser`, {
      method: 'POST',
      headers: {
        'auth-token': sessionStorage.getItem("token")
      },
    });
    const json = await response.json();
    console.log(json);
    console.log(notes);
    setprofile(json);
  }
  useEffect(() => {
    getuser()
    // eslint-disable-next-line
  }, [])
  // const 
  const capitalize = (word)=>{
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
}
    let name=profile.name;
    const res=capitalize(String(name));

  return (
    <div>
      <h1 style={{textAlign:"center"}}>Profile Details</h1>
      <div class="card" style={{"height":"400px",width:"30%",marginLeft:"500px", paddingBottom:"40px"}}>
        <img src="https://www.pngitem.com/pimgs/m/24-248309_transparent-profile-clipart-font-awesome-user-circle-hd.png" alt="John" style={{"height":"200px",width:"100%"}}/>
          <h1 style={{textAlign:"center"}}>{res}</h1>
          <p class="title"><b>Email:</b>{profile.email}</p>
          <p><b>Total Notes:</b>{"   "+notes.length}</p>
      </div>
    </div>
  )
}
