import React, { Component } from 'react'
import logo from '../assets/facebook-1.png'
import self from '../assets/profile-self.png'

class Header extends Component {

  render() {
    return (
      <header>
        <img src={logo} />
        <div id="my-profile">
          <span>Meu perfil</span>
          <img src="https://cdn1.iconfinder.com/data/icons/materia-human/24/013_003_account_profile_circle-512.png" />
        </div>

      </header>
    )
  }
}

export default Header;