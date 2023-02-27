import {useState} from 'react'
import {useHistory, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

// Sai Tej's Code

const Login = () => {
  const [userID, setUseName] = useState('')
  const [pin, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const history = useHistory()

  const onChangeUseName = event => {
    setUseName(event.target.value)
  }

  const onChangePassword = event => {
    setPassword(event.target.value)
  }

  const onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})

    history.replace('/')
  }

  const onSubmitFailure = error => setErrorMsg(error)

  const onSubmitForm = async event => {
    event.preventDefault()

    const userDetails = {user_id: userID, pin}

    const url = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    // console.log(response)
    // console.log(data)

    if (response.ok === true) {
      onSubmitSuccess(data.jwt_token)
    } else {
      onSubmitFailure(data.error_msg)
    }
  }

  const jwtToken = Cookies.get('jwt_token')
  console.log(jwtToken)

  if (jwtToken !== undefined) {
    return <Redirect to="/" />
  }

  return (
    <div className="login-con">
      <div className="login-inner-con">
        <img
          alt="website login"
          className="login-img"
          src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
        />
        <div className="credentials-con">
          <form className="input-con" onSubmit={onSubmitForm}>
            <h1 className="welcomeText">Welcome Back</h1>
            <label htmlFor="username">User ID</label>
            <input id="username" type="text" onChange={onChangeUseName} />
            <label htmlFor="password">PIN</label>
            <input id="password" type="password" onChange={onChangePassword} />
            {errorMsg && <p className="error-msg">{errorMsg}</p>}
            <button type="submit" className="login-Btn">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
