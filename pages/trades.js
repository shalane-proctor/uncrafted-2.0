import { useEffect, useState } from 'react';
import { retrieveAllMyTrades } from '../api/mergeData';
import TradeCard from '../components/TradeCard';

export default function Trades() {
  // const { user } = useAuth();
  const [trades, setTrades] = useState([]);
  const getAllTrades = () => {
    retrieveAllMyTrades().then(setTrades);
  };
  useEffect(() => {
    getAllTrades();
  }, []);

  console.warn(trades);

  return (
    <div className="text-center my-4">
      <div className="d-flex">{trades.map((trade) => (<TradeCard key={trade.firebaseKey} postObj={trade} />))}</div>
    </div>
  );
}
