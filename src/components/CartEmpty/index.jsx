import React from 'react';
import cat from "../../assets/img/cat.jpg";
import {Link} from "react-router-dom";


const CartEmpty = () => {
    return (
        <>
        <div className='cart cart--empty'>
            <h2>Корзина пустая </h2>
            <p >
                Вероятней всего, вы не заказывали ещё пиццу.<br/>
                Для того, чтобы заказать пиццу, перейди на главную страницу.
            </p>
            <img src={cat} width={500} height={500} alt=""/>
            <Link to="/" className="button button--black">
                <span>Вернуться назад</span>
            </Link>
        </div>
        </>
    );
};

export default CartEmpty;