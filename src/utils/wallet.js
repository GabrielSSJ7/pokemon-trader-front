import HttpClient from '../lib/http_client';

function Wallet() {
  const http = HttpClient();
  const getWallet = async () => {
    const response = await http.get('/wallet');
    return response.data;
  }

  return {
    getWallet
  }
}

export default Wallet;

