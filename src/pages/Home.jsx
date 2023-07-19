import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { SearchContext } from '../App';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';

const Home = () => {
  const dispatch = useDispatch();
  const { categoryId, sort, currentPage } = useSelector(state => state.filter);
  const sortType = sort.sortProperty;

  const { searchValue } = useContext(SearchContext);
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  }

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  }

  const items = pizzas.map((pizza) => <PizzaBlock {...pizza} key={pizza.id} />);
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);
  const category = categoryId > 0 ? `&category=${categoryId}` : '';
  const search = searchValue ? `&search=${searchValue}` : '';

  // оставляю для теории
  // useEffect(() => {
  //   setIsLoading(true);
  //   fetch(
  //     `https://649c3d9c048075719237c2de.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortType}&order=desc${search}`,
  //   )
  //     .then((res) => {
  //       return res.json(); // преобразовали ответ в json (в понятный фронтенду формат)
  //     })
  //     .then((json) => {
  //       // console.log(json); // после преобразования в json отобразили в консоли
  //       setPizzas(json); // после преобразования в json записали пиццы
  //       setIsLoading(false);
  //     });
  //   window.scrollTo(0, 0);
  // }, [categoryId, sortType, searchValue, currentPage]);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`https://649c3d9c048075719237c2de.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortType}&order=desc${search}`)
      .then((res) => {
        setPizzas(res.data);
        setIsLoading(false);
      });

    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={(id) => onClickCategory(id)} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading ? skeletons : items}
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
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
