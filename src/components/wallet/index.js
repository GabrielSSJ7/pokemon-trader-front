import React, {useState, useEffect} from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import './style.scss';

import Authentication from '../../lib/authentication';
import uWallet from '../../utils/wallet';

function Wallet() {
  const auth = Authentication();
  const _wallet = uWallet();
  const [wallet, setWallet] = useState({});
  const [user, setUser] = useState({});

  useEffect(() => {
    const user = auth.getUserData();
    setUser(user);
    
    const fetchWallet = async () => {
      const wallet = await _wallet.getWallet(user.id);
      setWallet(wallet);
    }
    fetchWallet();
  }, []);

  return (
    <div id="wallet-container">
      <div className="header">
	<h1>Seu Pokemoney</h1>
      </div>
      <div className="content">
        <div className="info" id="btc-info">
          <span>BTC</span>
          <span>{wallet.total}</span>
        </div>

        <div className="info" id="usd-info">
          <span>USD</span>
          <span>{wallet.amount}</span>
        </div>

        <div className="info" id="pokemons-info">
          <span>Seus Pokemons</span>
          <span>{wallet.count}</span>
        </div>

        <div className="info" id="pokemons-info">
          <span>Rendimento</span>
	  {wallet.diff ? <span style={{color: wallet.diff <= 0 ? 'red' : '#0B4619'}} >
	      {wallet.diff > 0 ? <FaChevronUp /> : <FaChevronDown />}{wallet.diff.toFixed(2)}%
          </span> : <span>0.00%</span>}
        </div>
      </div>
    </div>
  );
}

export default Wallet;
