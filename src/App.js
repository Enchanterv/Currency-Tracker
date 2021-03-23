import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Coin from "./Coin";

function App() {
  const [coins, setCoins] = useState([]);
  const [dataVisible, setDataVisible] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=10&page=1&sparkline=false"
      )
      .then((res) => {
        setCoins(res.data);
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );
 let buttonTxt=  dataVisible ?"↑↑ Less Data":  "↓↓ More Data";
  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Currency Tracker</h1>
        <form>
          <input
            className="coin-input"
            type="text"
            onChange={handleChange}
            placeholder="Search"
          />
        </form>
      </div>{" "}
      <button
        className="button-showData"
        onClick={() => setDataVisible((pre) => !pre)}
      >
     {buttonTxt}
      </button>{" "}
      <div className="coin-upper-container">
        {filteredCoins.map((coin) => {
          return (
            <Coin
              key={coin.id}
              name={coin.name}
              price={coin.current_price}
              symbol={coin.symbol}
              marketcap={coin.total_volume}
              volume={coin.market_cap}
              image={coin.image}
              priceChange={coin.price_change_percentage_24h}
              dataVisible={dataVisible}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
