import React from 'react';
import error from "../../assets/img/error.svg";


const NotFoundBlock = () => {
    return (
        <div className='not-found'>
            <h2> Питсы нет, но вы держитесь! (≽^╥⩊╥^≼) </h2>
                <img  src={error} width={700} height={700} alt=""/>
        </div>
    );
};

export default NotFoundBlock;