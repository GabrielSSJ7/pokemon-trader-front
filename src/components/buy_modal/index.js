import React, {useState, useEffect} from "react";
import ReactModal from "react-modal";
import {toast} from "react-toastify";
import Loading from "../Loading";
import "./style.scss";
import Pokemon from "../../utils/pokemon";
import Authentication from "../../lib/authentication";

function BuyModal({openToSell, pokemons, pokemon, setPokemons, limit, offset,...rest}) {
  const auth = Authentication();
  const [loading, setLoading] = useState(false);
  const [headerText, setHeaderText] = useState("");
  const [buttonText, setButtonText] = useState("");

  const handleBuy = async () => {
    setLoading(true);
    try {
      if (!openToSell) await buyPokemon();
      else await openPokemonToSell();

      fetchPokemons();
      rest.onRequestClose();
      setLoading(false);
    } catch (e) {
      console.log(e);
      toast.error("Não foi possível comprar o pokemon!");
      setLoading(false);
    }
  }

  const fetchPokemons = async () => {
    if (!openToSell) {
      const newPokemons = pokemons.map(poke => {
	if (poke.poke_id === pokemon.poke_id) {
	  poke.user = auth.getUserData();
	  return poke;
	}
	return poke;
      });
      setPokemons(newPokemons);
    } else {
      const newPokemons = await Pokemon.listUserPokemons();
      setPokemons(newPokemons.data);
    }
  }

  const buyPokemon = async () => {
    await Pokemon.buy(pokemon.poke_id);
    toast.success("Pokemon comprado!");
  }

  const openPokemonToSell = async () => {
    await Pokemon.openToSell(pokemon.poke_id, !pokemon.open_to_sell);
    toast.success("Sucesso!");
  }

  const switchHeaderText = () => {
    const pokeNameId = `${pokemon.name} #${pokemon.poke_id}`;
    if (openToSell && !pokemon.open_to_sell) return setHeaderText(`Negociar ${pokeNameId}`);
    if (openToSell && pokemon.open_to_sell) return setHeaderText(`Indisponibilizar venda ${pokeNameId}`);
    setHeaderText(`Comprar ${pokeNameId}`);
  }

  const switchButtonText = () => {
    if (openToSell && !pokemon.open_to_sell) return setButtonText("Negociar");
    if (openToSell && pokemon.open_to_sell) return setButtonText("Indisponibilizar venda");
    setButtonText("Comprar");
  }

  useEffect(() => {
    switchHeaderText();
    switchButtonText();
  }, [openToSell, pokemon]);

  return (
    <ReactModal
      {...rest}
      style={{
	content: {
	  width: "340px",
	  height: "200px",
	  'margin': 'auto',
	  left: 0,
	  right: 0,
	  top: 0,
	  bottom: 0
	}
      }}
    >
    {loading ? <Loading /> :
      (<div id="buy-container">
    	<div className="buy-header">
    	  <h1>{headerText}?</h1>
    	</div>
    	<div className="buy-body">
	  <button onClick={handleBuy} className="green-button">{buttonText}</button>
	  <button onClick={rest.onRequestClose} className="red-button">Cancelar</button>
        </div>
      </div>)
    }

    </ReactModal>
  );
}

export default BuyModal;

