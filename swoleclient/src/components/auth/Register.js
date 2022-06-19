import React, { useRef } from "react"
import { Link, useHistory } from "react-router-dom"
import { registerUser } from "./AuthManager"
import './Auth.css'
// TODO: This should get you started on registering a new user. 
// Add new fields depending on your server side registration
export const Register = () => {
  const username = useRef()
  const password = useRef()
  const first_name = useRef()
  const last_name = useRef()
  const email = useRef()
  const profile_picture_url = useRef()
  const history = useHistory()

  const handleRegister = (e) => {
    e.preventDefault()

    const newUser = {
      "first_name": first_name.current.value,
      "last_name": last_name.current.value,
      "email": email.current.value,
      "username": username.current.value,
      "password": password.current.value,
      "profile_picture_url": "💪"
    }

    registerUser(newUser).then(res => {
      if ("token" in res) {
        localStorage.setItem("auth_token", res.token)
        history.push("/")
      }
    })
  }

return (
  <main>
    <form className="loginRegister" onSubmit={handleRegister}>
      <h3 className="registerHeader">Register an account</h3>
      <fieldset className="loginRegisterField">
        <label htmlFor="inputFirst_name">First Name  </label>
        <input className="my-input" ref={first_name} type="text" name="first_name" placeholder="First name" required />
      </fieldset>
      <fieldset className="loginRegisterField">
        <label htmlFor="inputLast_name">Last Name  </label>
        <input className="my-input" ref={last_name} type="text" name="last_name" placeholder="Last name" required />
      </fieldset>
      <fieldset className="loginRegisterField">
        <label htmlFor="inputEmail">Email  </label>
        <input className="my-input" ref={email} type="text" name="email" placeholder="Email" required />
      </fieldset>
      <fieldset className="loginRegisterField">
        <label htmlFor="inputUsername">Username  </label>
        <input className="my-input" ref={username} type="text" name="username" placeholder="Username" required />
      </fieldset>
      <fieldset className="loginRegisterField">
        <label htmlFor="inputPassword"> Password  </label>
        <input className="my-input" ref={password} type="password" name="password" placeholder="Password" required />
      </fieldset>
      <fieldset className="loginRegisterField">
        <button className="my-Button"type="submit">Register</button>
      </fieldset>
    <section className="RegisterLink">
      Already registered? <Link to="/login">Login</Link>
    </section>
    </form>
  </main>
)
}