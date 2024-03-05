import React from "react";
import './scss/App.scss';
import Header from "./components/Header";
import Home from "./pages/Home";
import Cart from './pages/Cart'
import {Routes, Route} from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
import FullPizza from "./components/FullPizza";

 export const SearchContext = React.createContext('')


  const App = () => {
   const [searchValue, setSearchValue] = React.useState('')


    return (
            <div className="wrapper">
               <SearchContext.Provider value={{ searchValue,  setSearchValue}}>
                   <Header />
                   <div className='content'>

                       <Routes>
                           <Route path='/' element={<Home />}/>
                           <Route path='/cart' element={<Cart/>}/>
                           <Route path='/pizza/:id' element={<FullPizza/>}/>
                           <Route path='*' element={<NotFoundPage/>}/>
                       </Routes>

                   </div>
               </SearchContext.Provider>
            </div>

    );
}
export default App


