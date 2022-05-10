import React from 'react';
import "./style.scss";

import LoggedArea from '../../templates/logged_area';
import PokemonList from '../../components/pokemon/list';
import Wallet from '../../components/wallet';

function Profile() {
  return (
    <LoggedArea>
      <div id="profile-container">
	<PokemonList fromUser />
      	<Wallet />
      </div>
    </LoggedArea>
  );
}

export default Profile;
