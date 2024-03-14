import { useState, useEffect } from "react";
import Drop from "../Drop/Drop";

import "./App.css";

function App() {
  const [addActive, setAddActive] = useState(true);
  const [addBtn, setAddBtn] = useState(true);

  useEffect(() => {
    const data = localStorage.getItem("certificates");
    if (data) {
      setAddBtn(false);
      setAddActive(false);
    }
  }, []);

  const handleClick = () => {
    setAddActive(!addActive);
  };

  return (
    <div className="container">
      {addActive ? (
        <div className="firstPage">
          <button className="btn" onClick={handleClick}>
            Додати
          </button>

          <p>Нема жодного сертифікату</p>
        </div>
      ) : (
        <>
          {addBtn ? (
            <>
              <button className="btn" onClick={handleClick}>
                Назад
              </button>
              <Drop />
            </>
          ) : (
            <Drop />
          )}
        </>
      )}
    </div>
  );
}

export default App;
