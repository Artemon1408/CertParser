import { useState } from "react";
import Drop from "../Drop/Drop";

import "./App.css";

function App() {
  const [addActive, setAddActive] = useState(true);

  const handleClick = () => {
    setAddActive(!addActive);
  };

  return (
    <div className="container">
      <Drop />
      {/* {addActive ? (
        <div className="firstPage">
          <button onClick={handleClick} className="btn">
            Додати
          </button>
          <p>Нема жодного сертифікату</p>
        </div>
      ) : (
        <Drop />
      )} */}
    </div>
  );
}

export default App;
