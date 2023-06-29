import React, { useState, useEffect } from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

const Home = () => {
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetch('https://649c3d9c048075719237c2de.mockapi.io/items')
      .then((res) => {
        return res.json(); // преобразовали ответ в json (в понятный фронтенду формат)
      })
      .then((json) => {
        // console.log(json); // после преобразования в json отобразили в консоли
        setPizzas(json); // после преобразования в json записали пиццы
        setIsLoading(false);
      });
  }, []);
  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : pizzas.map((pizza) => <PizzaBlock {...pizza} key={pizza.id} />)}
        {/* {pizzas.map((pizza) => (
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
              ))} */}
      </div>
    </>
  );
};

export default Home;
