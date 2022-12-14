import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Coin from '../components/coin/Coin';
import { fetchCoins } from '../Redux/coins/coinsReducer';
import './Coins.css';

const Coins = () => {
  const dispatch = useDispatch();

  const { lifecycle, coins, info } = useSelector((state) => state.coins);
  const [search, setSearch] = useState('');
  const filteredCoins = coins.filter(
    (coin) => !search || new RegExp(search, 'ig').test(coin.name),
  );
  useEffect(() => {
    if (!coins.length && lifecycle.loading === 'initial') {
      dispatch(fetchCoins());
    }
  }, [dispatch, coins, lifecycle]);

  return (
    <div>
      <div className="div-search">
        {' '}
        <input
          type="search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          className="search"
          placeholder="Search coin"
        />
      </div>

      <ul className="coin-container">
        {filteredCoins.map((coin) => (
          <Link
            to="coindetail"
            key={coin.id}
            state={{ coin, info }}
            className="individual-coin"
          >
            <li>
              <Coin coin={coin} />
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Coins;
