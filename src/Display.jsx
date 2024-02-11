// import React from "react"
import {Button} from 'react-bootstrap'

function Display({email,password,setEmail,setPassword}){
    return <>
    <h2>Form Details</h2>
    <h3>Email : {email}</h3>
    <h3>Password : {password}</h3>
    <Button onClick={()=>{
        setEmail("")
        setPassword("")
    }}>Clear</Button>
    </>
}

export default Display