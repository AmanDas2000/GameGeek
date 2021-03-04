import React from 'react'
import {Link} from 'react-router-dom'

function Navbar() {
    return (
    <nav>
    <div className="nav-wrapper #212121 grey darken-4">
      <Link to="/" className="brand-logo left">GameGeek.GG</Link>
      <ul id="nav-mobile" className="right">
        <li><Link to="/signin">Sign in</Link></li>
        <li><Link to="/signup">Sign up</Link></li>
        <li><Link to="/mylist">MyList</Link></li>
      </ul>
    </div>
            
    </nav> 
        
    )
}

export default Navbar