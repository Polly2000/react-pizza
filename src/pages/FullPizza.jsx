import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchPizzaById } from '../redux/slices/pizzaByIdSlice';

const FullPizza = () => {
    const { id } = useParams();
    const { item } = useSelector(state => state.pizzaById);
    const { imageUrl, title, price } = item;
    const dispatch = useDispatch();

    const getPizza = () => {
        const pizzaId = id.toString();
        dispatch(fetchPizzaById({pizzaId}));
    }

    useEffect(() => {
        getPizza();
    }, [id]);

    return (
        <div className='container'>
            <img src={imageUrl} alt='pizza'/>
            <h3> {title} </h3>
            <p> Цена: {price} </p>
        </div>
    );
};

export default FullPizza;