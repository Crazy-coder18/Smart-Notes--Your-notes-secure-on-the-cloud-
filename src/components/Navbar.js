import React from 'react'
import { Link ,useLocation} from 'react-router-dom'

export default function Navbar(props) {
  const location=useLocation();
  const handleclick=()=>{
    props.setlogincred({loggedin:false});
  }
  return (
    <div>

<nav className="navbar navbar-expand-lg bg-primary">
  <div className="container-fluid">
    <a className="navbar-brand" href="/">Smart Notes</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
         { props.login.loggedin && <Link className={`nav-link ${location.pathname==="/home"?"active":" "}`} aria-current="page" to="/home">Home</Link>}
        </li>
        
        
       <li className="nav-item">
       { props.login.loggedin && <Link className={`nav-link ${location.pathname==="/addnote"?"active":" "}`} to="/addnote">AddNote</Link> }
        </li> 
        <li className="nav-item">
         {props.login.loggedin && <Link className={`nav-link ${location.pathname==="/about"?"active":" "}`} to="/about">About</Link>}
        </li>
      </ul>
     
    </div>
    <form className="d-flex">
   {!props.login.loggedin && <Link class="btn btn-warning mx-1"  to="/login" role="button">Login</Link>}
    {! props.login.loggedin&&  <Link class="btn btn-warning mx-1"  to="/signup" role="button">Signup</Link>}
    {props.login.loggedin && <Link class="btn btn-warning mx-1"  to="/login" role="button" onClick={handleclick}>LogOut</Link>}
    </form>
  </div>
</nav>



    </div>
  )
}
