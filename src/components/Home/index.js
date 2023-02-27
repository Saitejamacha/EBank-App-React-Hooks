import {useHistory, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

// Sai Tej's Code

const CreditCard = () => {
  const history = useHistory()

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/ebank/login')
  }

  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/ebank/login" />
  }
  // console.log(jwtToken)

  return (
    <div className="AppContainer">
      <div className="nav-con">
        <img
          alt="website logo"
          className="logo"
          src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
        />
        <button onClick={onClickLogout} type="button">
          Logout
        </button>
      </div>
      <div className="content-con">
        <h1 className="head">Your Flexibility, Our Excellence</h1>
        <img
          alt="digital card"
          className="card-img"
          src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
        />
      </div>
    </div>
  )
}

export default CreditCard
