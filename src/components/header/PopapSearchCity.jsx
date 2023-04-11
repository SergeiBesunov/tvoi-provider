import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeGeo } from '../../redux/slices/filterSlice';
import URL from '../../options/basicUrl';

function PopapSearchCity() {
   const isFirstRenderRef = React.useRef(true);
   const dispatch = useDispatch();
   const [openPopap, setOpenPopap] = React.useState(false);
   const [valueSearch, setValueSearch] = React.useState('');
   const [listCities, setListCities] = React.useState([]);
   const [errorMessage, setErrorMessage] = React.useState('');

   const geoStore = useSelector((state) => state.filters.geo_id);

   const clickCityItem = (value) => {
      dispatch(changeGeo(value));
      setOpenPopap(false);
      setValueSearch('');
   };


   // Вешаем обработчик отлавливания клика на документ для закрытия попапа
   React.useEffect(() => {
      const handleClickOnPopap = ({ target }) => {
         if (!target.closest('.header__search')) {
            setOpenPopap(false);
            setValueSearch('');
         }
      };

      document.body.addEventListener(`click`, handleClickOnPopap);
   }, []);

   // Поиск по базе данных городов
   const getListCities = async (value) => {
      try {
         const response = await fetch(`${URL}cities?q=${value}`);

         if (!response.ok) {
            throw new Error('Что то пошло не так :(');
         }
         const data = await response.json();

         setListCities(data);
      } catch (error) {
         setErrorMessage(error.message);
      }
   };

   // Блокируем отправку запроса при рендере страницы 
   React.useEffect(() => {
      if (!isFirstRenderRef.current) {
         getListCities(valueSearch);
      }
      if (isFirstRenderRef.current) {
         isFirstRenderRef.current = false;
      }
   }, [valueSearch]);


   return (
      <div className="header__search">
         <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17">
            <path
               id="Path_97"
               dataname="Path 97"
               d="M-.646,14.805l17-6.513-6.513,17L6.406,18.24Z"
               transform="translate(0.646 -8.292)"
               fill="#FFD52C"></path>
         </svg>
         <span onClick={() => setOpenPopap((prev) => !prev)}>г {geoStore.name}</span>
         {openPopap && (
            <div className="search-city-popap">
               <div className="search search-header">
                  <input
                     style={
                        valueSearch.length > 0
                           ? {
                                borderBottomRightRadius: '0px',
                                borderBottomLeftRadius: '0px',
                                borderBottom: '0px',
                             }
                           : null
                     }
                     type="text"
                     value={valueSearch}
                     placeholder="Ваш город"
                     onInput={(e) => setValueSearch(e.target.value)}
                  />

                  {valueSearch.length > 0 && (
                     <ul className="search__popap">
                        {errorMessage && (
                           <li className="search__popap-first-item">{errorMessage}</li>
                        )}
                        {listCities.map((obj) => (
                           <li key={obj.id} onClick={() => clickCityItem(obj)}>
                              {obj.name}
                           </li>
                        ))}
                     </ul>
                  )}
               </div>
            </div>
         )}
      </div>
   );
}

export default PopapSearchCity;
