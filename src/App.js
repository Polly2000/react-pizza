import React, { useState, useEffect } from 'react';

import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';
import './scss/app.scss';

function App() {
  const [pizzas, setPizzas] = useState([]);
  useEffect(() => {
    fetch('https://649c3d9c048075719237c2de.mockapi.io/items')
      .then((res) => {
        return res.json(); // преобразовали ответ в json (в понятный фронтенду формат)
      })
      .then((json) => {
        // console.log(json); // после преобразования в json отобразили в консоли
        setPizzas(json); // после преобразования в json записали пиццы
      });
  }, []);

  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <div className="content__top">
              <Categories />
              <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
              {pizzas.map((pizza) => (
                // можно сократить код:
                <PizzaBlock {...pizza} key={pizza.id} />
                // <PizzaBlock
                //   key={pizza.id}
                //   imageUrl={pizza.imageUrl}
                //   title={pizza.title}
                //   price={pizza.price}
                //   sizes={pizza.sizes}
                //   types={pizza.types}
                // />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
