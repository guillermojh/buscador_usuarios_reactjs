import React from 'react'

const Header = (props) => {
  return (
    <div id='cabecera'>
        <img className='logo' src={process.env.PUBLIC_URL + "/logo192.png"} alt= 'mi logo' />
        <h3 className='mensaje'>Bienvenido a mi Buscador De Usuarios</h3>
    </div>
  )
}

export default Header