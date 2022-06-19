import React, { useRef } from "react"
import { Link, useHistory } from "react-router-dom"
import "./Auth.css"
import { loginUser } from "./AuthManager"


export const Login = () => {
  const username = useRef()
  const password = useRef()
  const invalidDialog = useRef()
  const history = useHistory()

  const handleLogin = (e) => {
    e.preventDefault()
    const user = {
      username: username.current.value,
      password: password.current.value
    }

    loginUser(user)
      .then(res => {
        if ("valid" in res && res.valid && "token" in res) {
          localStorage.setItem("auth_token", res.token)
          history.push("/")
        }
        else {
          invalidDialog.current.showModal()
        }
      })
  }

  return (
    <main >
      <dialog ref={invalidDialog}>
        <div>Username or password was not valid.</div>
        <button onClick={e => invalidDialog.current.close()}>Close</button>
      </dialog>
      <section>
        <form className="loginRegister"onSubmit={handleLogin}>
          <fieldset className="loginRegisterField">
            <label  htmlFor="inputUsername"> Username  </label>
            <input className="my-input" ref={username} type="username" id="username" placeholder="Username address" required autoFocus />
          </fieldset>
          <fieldset className="loginRegisterField">
            <label htmlFor="inputPassword"> Password  </label>
            <input className="my-input" ref={password} type="password" id="password" placeholder="Password" required />
          </fieldset>
          <fieldset className="loginRegisterField">
            <button className= "my-Button" type="submit">Sign In</button>
          </fieldset>
          <section className="RegisterLink">
            <Link to="/register" >Not a member yet?</Link>
          </section>
        </form>
      </section>
    </main>
  )
}