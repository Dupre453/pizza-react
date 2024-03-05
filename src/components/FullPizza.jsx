import React from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";

const FullPizza = () => {
    const [pizza, setPizza] = React.useState()
    const {id} = useParams()

    React.useEffect(() => {
        async function fetchPizza() {
           try{
               const {data} = await axios.get('http://localhost:9001/pizza/' + id)
               setPizza(data)
           } catch (error) {
               alert('Ошибка при получении пиццы!')
           }
        }
        fetchPizza()
    }, [])

    if(!pizza) {
        return 'Загрузка...'
    }
    return (
        <div className='container'>
            <img src={pizza.imageUrl} alt=""/>
            <h2>{pizza.title}</h2>

            <h4>{pizza.price} ₽</h4>
        </div>
    );
};

export default FullPizza;