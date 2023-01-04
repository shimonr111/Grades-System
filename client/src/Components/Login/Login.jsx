import "./Login.css";
import React from "react";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import logoImage from "../Assets/Logo.png"

const baseUrl = 'http://localhost:8080/' //URL of server.
let message = ''

function Login() {

  const [userName, setUserName] = useState(''); //user name when client enter an input.
  const [pass, setPass] = useState(''); //password when client enter an input.
  const [users, setUsers] = useState(''); //set the users data

  const navigate = useNavigate();

  /* function that request data from db.
     send param - "users".
     set data in users. */

  function loginSuccess(id, role, course_names) {
    message = ''
    role === "Student" ?
      navigate('/student-layout/main', {
        state: {
          id_num: id
        }
      }) : navigate('/lecturer-layout/main', {
        state: {
          id_num: id
        }
      })
  }

  //back button of browser. 
  window.onpopstate = (e) => {
    navigate("/");
  }

  //This function triggered when we press on the button Login
  async function getInfoAndSendUserToServer(e) {
    e.preventDefault()
    const res = await fetch(baseUrl + 'db_request/',
      {
        method: 'GET'
      })
    const data = await res.json() // get the users array from db and store it
    setUsers(data)
    let flag = 0 // flag for changing html element if login succeed/failed

    //Check if the username and password that the user entered is match with the data base
    let user_find = data.filter(d => d.user_name === userName && d.password === pass)
    flag = user_find.length !== 0 ? 1 : 0
    flag ? loginSuccess(user_find[0].user_id, user_find[0].role, user_find[0].course_names) : 
    message = "Wrong user name or password. please try again"
  }

  //listener to input of user name
  const handleChangeForUserName = (event) => {
    setUserName(event.target.value);
  };

  //listener to input of password
  const handleChangeForPassword = (event) => {
    setPass(event.target.value);
  };

  //What we show on screen
  return (
    <div className="Login">
      <form>
        <img src={logoImage} id="my-logo-login" alt="Logo" />
        {/* <h1 id="my-h1-login">Login</h1> */}
        <label>User name: </label>
        <input type="text" id="my-input-login" onChange={handleChangeForUserName} /><br></br><br></br>
        <label id="my-label-password">Password: </label>
        <input class="my-input-password" type="password" id="my-input-login" onChange={handleChangeForPassword} /><br></br><br></br>
        <button id="my-button-login" onClick={getInfoAndSendUserToServer}>Login</button>
        <p id="my-p-login">{message}</p>
      </form>
    </div>
  );
}

export default Login;



