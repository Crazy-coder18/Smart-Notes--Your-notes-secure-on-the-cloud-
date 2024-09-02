import React from 'react'

function Alert(props) {
    return (
        <div style={{height: '40px',width:"300px",marginLeft:"1200px",marginTop:"20px",textAlign:"center",fontSize:"12px"}}>
        {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">{props.alert.msg} 
        </div>}
        </div>
    )
}

export default Alert