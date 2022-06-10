import React from "react"
import { Link, useHistory } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
  const history = useHistory()
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/training_log/addSession">Add Session</Link>
      <Link to="/training_log">Training Log</Link>
      <Link to="/exercises">Exercises</Link>
      <Link to="/my-profile">Profile</Link>
  
      {
        localStorage.getItem("auth_token") !== null ?
          <button onClick={() => {
            localStorage.removeItem("auth_token")
            history.push({ pathname: "/" })
          }}>
            Logout
          </button>
          :
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            
          </>
      }
    </nav>
  )
}