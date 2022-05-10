import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import "./style.scss";

import Authentication from '../../lib/authentication';

function Navbar() {
  const navigate = useNavigate(),
        auth = Authentication(),
        [user, setUser] = useState({}),
        [dropdown, setDropdown] = useState(false);

  useEffect(() => {
    const user = auth.getUserData();
    setUser(user);
  }, []);

  const handleLogout = () => {
    auth.logout();
    navigate('/login');
  }


  return (
    <div id="navbar">
      <div id="navbar-content">
        <div className="nav-links">
	  <Link to="/"><a>Mercado</a></Link>
	  <Link to="/user/profile"><a>Meus Pokemons</a></Link>
        </div>
        <div className="user-info"
	  onMouseOver={() => setDropdown(true)} 
	  onMouseLeave={() => setDropdown(false)}
	>
          <div 
	    className="user-info-content"
	  >
            <div className="user-initials">
	      {user.username && user.username[0].toUpperCase()}
            </div>
            <span className="user-name">
	      {user.username}
            </span>
          </div>
	  {dropdown ? <div className="dropdown">
            <span className="dropdown-item" onClick={handleLogout}>
              Sair
            </span>
          </div> : null}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
