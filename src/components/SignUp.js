import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';

export default function SignUp(props) {
  const [credentials, setcredentials] = useState({name:"",email:"",password:"",confirmpassword:""});
  const history=useNavigate();
    const handleSubmit = async (e) => {
      if(credentials.password!==credentials.confirmpassword){
        alert("password doesnt match")
        return;
      }
      e.preventDefault();
      const response = await fetch("http://localhost:5000/api/auth/createuser", {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({name:credentials.name,email: credentials.email, password: credentials.password})
      });
      const json = await response.json()
      console.log(json);
      if(json.sucess){
      sessionStorage.setItem("auth-token",json.authtoken);
      
      props.showAlert("success","u have successfully created account in");
      history("/login");
      }
      else{
        alert("enter details correctly")
      }
  }
  
  const renter = (e)=>{
    setcredentials({...credentials, [e.target.name]: e.target.value})
}
  return (
    <div>

      <div>
        
      <h2>Create An Account  to use SmartNotes</h2>
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="name" className="form-control" value={credentials.name} onChange={renter} name="name" id="name"  minLength={5} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" value={credentials.email} onChange={renter} id="email" name="email" aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" value={credentials.password} onChange={renter} name="password" id="password"  minLength={5} required />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmpassword" className="form-label">Confirm Password</label>
            <input type="password" className="form-control" value={credentials.confirmpassword} onChange={renter}  name="confirmpassword" id="confirmpassword"  minLength={5} required />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  )
}
