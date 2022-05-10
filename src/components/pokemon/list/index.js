import React, {useState, useEffect, useCallback} from 'react';
import _ from 'lodash';
import "./style.scss";
import BuyModal from '../../buy_modal';
import uPokemon from '../../../utils/pokemon';
import Pokemon from '../index';
import Loading from "../../Loading";

import PikaTriste from '../../../assets/images/pika-triste.png';

function PokemonList({ fromUser }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState({});
  const [loading, setLoading] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);

  const [pokemons, setPokemons] = useState([]);
  const [limit, setLimit] = useState(20);
  const [offset, setOffset] = useState(0);
  const [fetching, setFetching] = useState(false);
  
  useEffect(() => {
    setLoading(true);
    const fetchPokemons = async () => {
      const response = await uPokemon.listAll(limit, offset);
      setPokemons(response.data.results);
      setLimit(response.data.next.limit);
      setOffset(response.data.next.offset);
      setLoading(false);
    }

    const fetchUserPokemons = async () => {
      const response = await uPokemon.listUserPokemons();
      setPokemons(response.data);
      setLoading(false);
    }

    if (fromUser) {
      fetchUserPokemons();
    } else {
      fetchPokemons();
    }
  }, []);

  const handleOpenModal = (pokemon) => {
    setSelectedPokemon(pokemon);
    setShowModal(true);
  }


  const updateScroll = () => {
    const isAtBottom = 
      document.documentElement.scrollHeight - document.documentElement.scrollTop <= document.documentElement.clientHeight; 
    setIsAtBottom(isAtBottom);
  }

  const loadMore = () => {
    if (isAtBottom) { 
      if (fetching) return;
      setFetching(true);
      uPokemon.listAll(limit, offset).then(response => {
	setPokemons([...pokemons, ...response.data.results]);
	setLimit(response.data.next.limit);
	setOffset(response.data.next.offset);
	setFetching(false);
	console.log('fetching', fetching);
      });
    }
  }
  const delayedFetch = useCallback(_.debounce(loadMore, 500), [isAtBottom]);

  useEffect(() => {
    delayedFetch();
    return delayedFetch.cancel;
  }, [isAtBottom]);


  window.addEventListener("scroll", updateScroll);

  return loading ? <Loading /> : pokemons.length <= 0 ? 
	  (<div id="empty-pokemons">
	    <h1>Você ainda não possui nenhum Pokémon</h1>
	    <img src={PikaTriste} alt="Pikachu triste" />
	  </div>) : (
    <div>
      <div id="pokemon-list">
    	{pokemons.map(pokemon => (
	  <Pokemon fromUser={fromUser} key={pokemon.name} pokemon={pokemon} handleOpenModal={handleOpenModal} />
	))}
      <BuyModal 
	pokemons={pokemons}
	setPokemons={setPokemons} 
        limit={limit}
	offset={offset}
	pokemon={selectedPokemon} 
	openToSell={fromUser}
        isOpen={showModal} 
	onRequestClose={()=> setShowModal(false)}
      />
      </div>
      <div style={{width: '100%'}}>
	{!fromUser && <Loading position="relative" />}
      </div>
    </div>
  );

}


export default PokemonList;
