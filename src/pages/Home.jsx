import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';

import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';
import { fetchPizzas } from '../redux/slices/pizzaSlice';
import { selectFilter } from '../redux/slices/filterSlice';
import { selectPizzaData } from '../redux/slices/pizzaSlice';

const Home = () => {
  const dispatch = useDispatch();
  const { items, status } = useSelector(selectPizzaData);
  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);
  const sortType = sort.sortProperty;

  const pizzas = items.map((pizza) => <PizzaBlock {...pizza} key={pizza.id} />);
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);


  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  }

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  }

  console.log(searchValue);

  const getPizzas = async () => {
    const category = categoryId > 0 ? `&category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(fetchPizzas({
      category,
      search,
      sortType,
      currentPage
    }));

    window.scrollTo(0, 0);
  }

  useEffect(() => {
    getPizzas();
  }, [categoryId, sortType, searchValue, currentPage])

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

  // вариант с axios
  // useEffect(() => {
  //   setIsLoading(true);
  //   axios
  //     .get(`https://649c3d9c048075719237c2de.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortType}&order=desc${search}`)
  //     .then((res) => {
  //       setPizzas(res.data);
  //       setIsLoading(false);
  //     });

  //   window.scrollTo(0, 0);
  // }, [categoryId, sortType, searchValue, currentPage]);


  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={(id) => onClickCategory(id)} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {status === 'success' ?  pizzas : skeletons}
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
