import React, {useState, useEffect} from 'react';

import LoggedArea from '../../templates/logged_area';
import PokemonList from '../../components/pokemon/list';
import Pokemon from '../../utils/pokemon';

function Home() {
  return (
    <LoggedArea>
      <div id="home-container">
	<PokemonList />
      </div>
    </LoggedArea>
  );
}

export default Home;
