import './App.css';
import { BrowserRouter as Router ,Routes,Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Addnote from './components/Addnote';
import { useState } from 'react';
function App() {
  const [logincred, setlogincred] = useState({loggedin:false})
  const [alert, setAlert] = useState(null);
  const showAlert=(type,message)=>{
    setAlert({
        type:type,
        msg:message
    })
    setTimeout(() => {
      setAlert({alert:null})
    }, 1500);
  }
  return (
    <>
    <NoteState>
    <Router>
      
    <Navbar login={logincred} setlogincred={setlogincred} />
    <Alert alert={alert}/>
    <div className="container">
      <Routes>
        <Route path='/home' element={<Home  showAlert={showAlert} />}></Route>
        <Route path='/About' element={<About/>}></Route>
        <Route path="/addnote" element={<Addnote showAlert={showAlert}/>}></Route>
        <Route path='/' element={<Login showAlert={showAlert} setlogincred={setlogincred}/>}></Route>
        <Route path='/login' element={<Login showAlert={showAlert} setlogincred={setlogincred}/>}></Route>
        <Route path='/signup' element={<SignUp showAlert={showAlert}/>}></Route>
      </Routes>
      </div>
    </Router>
    
    </NoteState>
    </>
  );
}

export default App;
