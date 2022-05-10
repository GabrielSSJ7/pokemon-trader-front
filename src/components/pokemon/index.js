import React from 'react';
import "./style.scss";
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import BuyModal from '../buy_modal';

function Pokemon({ fromUser, pokemon, handleOpenModal }) {
  return (
    <div className="pokemon-container" key={pokemon.poke_id}>
      <div className="pokemon-name">
	<div className="name">
	  <span>{pokemon.name}</span>
	  <span>#{pokemon.poke_id}</span>
	</div>
	<div className="sell-trainer-container">
	  {!pokemon.user ? (<div></div>) : (
	    <div className="trainer">
	      <span>Treinador </span>
	      <span>{pokemon.user.username}</span>
	    </div>
	  )}
	  {(!fromUser && pokemon.open_to_sell) && (
	    <div onClick={()=> handleOpenModal(pokemon)} className="open-to-sell">
	      <span >Disponível para compra</span>
	    </div>
	  )}
	  {(fromUser && pokemon.open_to_sell) && (
	    <div className="open-to-sell">
	      <span onClick={() => handleOpenModal(pokemon)}>Disponível para venda</span>
	    </div>)} 
	  {(fromUser && !pokemon.open_to_sell) && (
	      <div onClick={()=> handleOpenModal(pokemon)} className="open-to-sell">
		<span >Não disponível para venda</span>
	      </div>
	    )}
	</div>
      </div>
      <div className="pokemon-image">
	<img src={pokemon.picture} alt={pokemon.name} />
      </div>
      <div className="poke-stats-container">
	<div className="poke-stats pokemon-base-xp">
	  <span>XP base</span><span> {pokemon.base_xp}</span>
	</div>
	<div className="poke-stats pokemon-price">
	  <span>Preço</span><span>{pokemon.price} BTC</span>
	</div>
	<div className="poke-stats pokemon-price">
	  <span>USD</span><span>{pokemon.usd}</span>
	</div>
	{pokemon.user && (
	  <div className="poke-owner">
	    <Valuation valuation={pokemon.valuation || 0} />
	  </div>
	)}
      </div>
    </div>
  );
}

function Valuation({ valuation }) {
  return (
    <div className="poke-stats" style={{'margin-top': '10px'}}>
    	<span>Mercado</span>
    	<span 
	    style={{color: valuation <= 0 ? 'red' : 'inherit'}} >
	      {valuation > 0 ? <FaChevronUp /> : <FaChevronDown />}{valuation.toFixed(2)}%
	</span>
    </div>
  );
}

export default Pokemon;
