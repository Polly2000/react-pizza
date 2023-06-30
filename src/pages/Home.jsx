import React, { useState, useEffect } from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

const Home = () => {
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({
    name: 'популярности',
    sortType: 'rating',
  });

  sortType && console.log(categoryId, sortType);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://649c3d9c048075719237c2de.mockapi.io/items?${
        categoryId > 0 ? `category=${categoryId}` : ''
      }&sortBy=${sortType.sortProperty}&order=desc`,
    )
      .then((res) => {
        return res.json(); // преобразовали ответ в json (в понятный фронтенду формат)
      })
      .then((json) => {
        // console.log(json); // после преобразования в json отобразили в консоли
        setPizzas(json); // после преобразования в json записали пиццы
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={(id) => setCategoryId(id)} />
        <Sort value={sortType} onChangeSort={(type) => setSortType(type)} />
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
    </div>
  );
};

export default Home;
