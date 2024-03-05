import React from 'react';
import qs from 'qs'
import {Link, useNavigate} from "react-router-dom";

import {useDispatch, useSelector} from "react-redux";
import {setCategoryId, setCurrentPage, setFilters, selectFilter} from "../redux/slices/filterSlice";

import Categories from "../components/Categories";
import Sort, {sortList} from "../components/Sort";
import {Skeleton} from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";


import Pagination from "../components/Pagination";
import {SearchContext} from "../App";
import {fetchPizzas} from "../redux/slices/pizzasSlice";


const Home = () => {
    const {categoryId, sort, currentPage, } = useSelector(selectFilter)
    const {items, status} = useSelector((state) => state.pizza)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isSearch = React.useRef(false)
    const isMounted = React.useRef(false)


    const {searchValue} = React.useContext(SearchContext)



    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id))
    }

    const onChangePage = (number) => {
        dispatch(setCurrentPage(number))
    }


    const getPizzas = async () => {
        const category = categoryId > 0 ? `category=${categoryId}&` : ''
        const sortBy = sort.sortProperty.replace('-', '')
        const order = sort.sortProperty.includes('-') ? '-' : '+'

        dispatch(
            fetchPizzas({
                sortBy,
                order,
                category,
                currentPage
            })
        )
        window.scrollTo(0, 0)
    }


//------------- если изменили параметры и был первый рендер ---------------
    React.useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sort.sortProperty,
                categoryId,
                currentPage
            })
            navigate(`?${queryString}`)
        }
        isMounted.current = true
    }, [categoryId, sort.sortProperty, searchValue,])


    //--------------если был первый рендер, то проверяем url параметры и сохраняем в редакс---------------
    React.useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1))

            const sort = sortList.find(obj => obj.sortProperty === params.sortProperty)

            dispatch(
                setFilters({
                    ...params,
                    sort,
                })
            )
            isSearch.current = true
        }
    }, [])

//-----------------если был первый рендер, то делаем запрос----------------------
    React.useEffect(() => {
        window.scrollTo(0, 0)

        if (!isSearch.current) {
            getPizzas()
        }

        isSearch.current = false
    }, [])


    //поиск пицц
    const pizzas = items.filter((obj) => {
        if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
            return true
        }
        return false
    }).map((obj) => <Link to={`/pizza/${obj.id}`}>
        <PizzaBlock key={obj.id} {...obj}/>
    </Link>)


    //подгрузка псевдо пицц
    const skeletons = [...new Array(10)].map((_, index) => <Skeleton key={index}/>)

    return (
        <div className='container'>
            <div className='content__top'>
                <Categories value={categoryId} onChangeCategory={onChangeCategory}/>
                <Sort/>
            </div>
            <h2 className='content__title'>Все пиццы</h2>
            {status === 'error' ? (
                    <div className='content__error-info'>
                    <h2>Произошла ошибка</h2>
                    <p>К сожалению, не удалось получить пиццы. Повторите попытку позже!</p>
                </div>
                ) : (
                    <div className='content__items'> {status === 'loading' ? skeletons : pizzas} </div>
                )}

            <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
        </div>
    );
};

export default Home;