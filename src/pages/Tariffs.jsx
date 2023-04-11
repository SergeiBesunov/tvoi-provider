import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { changeSort, setFiltersByUrl } from '../redux/slices/filterSlice';
import { fetchTariffs } from '../redux/slices/tariffsSlice';
import { useNavigate } from 'react-router-dom';

import { categoriesOptions } from '../options';
import svgFilter from '../assets/icon-svg/filters.svg';
import TariffsCardContainer from '../components/TariffsCardContainer';
import SortPopap from '../components/filters/SortPopap';
import FilterForm from '../components/filters/FilterForm';
import URL from '../options/basicUrl';

function Tariffs() {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const filters = useSelector((state) => state.filters);

   const handleChangeSort = (newValue) => {
      dispatch(changeSort(newValue));
   };

   const setNameTitle = () => {
      let name;
      if (filters.categories.length === 1) {
         name = categoriesOptions.find((obj) => obj.id === filters.categories[0]).name;
      } else {
         name = 'Все тарифы';
      }
      return name;
   };

   // создаем запрос на бэк по параметрам фильтрации и закидываем его в store
   const getTariffs = async () => {
      const geo = filters.geo_id.id;
      const selectTariffs =
         filters.categories.length > 0
            ? filters.categories.map((id) => `&category=${id}`).join('')
            : '';
      const selectProvider =
         filters.providers.length > 0
            ? filters.providers.map((id) => `&provider_id=${id}`).join('')
            : '';
      const price = `&basic_price_gte=${filters.price.minPrice}&basic_price_lte=${filters.price.maxPrice}`;
      const freeConnection = filters.free_connection === '1' ? '&connection=free' : '';
      const promo = filters.have_promo === '1' ? '&have_promo=1' : '';
      const hd = filters.have_hd === '1' ? '&have_hd=1' : '';
      const sortBy = `&_sort=${filters.sort.replace('-', '')}`;
      const order = `&_order=${filters.sort.includes('-') ? `desc` : `asc`}`;

      dispatch(
         fetchTariffs({
            geo,
            selectTariffs,
            selectProvider,
            price,
            freeConnection,
            promo,
            hd,
            sortBy,
            order,
         }),
      );
   };

   // парсим параметры из адресной строки и формируем по ним запрос
   const parseUrlForRedux = async () => {
      const objParams = {};
      const params = window.location.search.substring(1).split('&');
      params.forEach((string) => {
         let lenghtString = string.length;
         let indexEqually = string.indexOf('=');
         let key = string.slice(0, indexEqually);
         let value = string.slice(indexEqually + 1, lenghtString);
         objParams[key] = value;
      });
      objParams.price = {
         minPrice: objParams.price.split(',')[0],
         maxPrice: objParams.price.split(',')[1],
      };
      if (objParams.categories) {
         objParams.categories = objParams.categories.split(',');
      }
      if (objParams.providers) {
         objParams.providers = objParams.providers.split(',');
      }

      try {
         const response = await fetch(`${URL}cities/${objParams.geo_id}`);

         if (!response.ok) {
            objParams.geo_id = { id: '63', name: 'Самара' };
            throw new Error('Не удалось получить актуальные данные при парсинге URL');
         }
         const data = await response.json();
         objParams.geo_id = data;
      } catch (error) {
         console.log(error.message);
      }

      dispatch(setFiltersByUrl(objParams));
   };

   React.useEffect(() => {
      window.scrollTo(0, 0);
      if (window.location.search) {
         parseUrlForRedux();
      }
   }, []);

   React.useEffect(() => {
      getTariffs();

      // формируем удобный объект по параметрам из store, для создания URL
      const queries = {
         geo_id: filters.geo_id.id,
         categories: filters.categories,
         providers: filters.providers,
         price: [filters.price.minPrice, filters.price.maxPrice],
         free_connection: filters.free_connection,
         have_promo: filters.have_promo,
         have_hd: filters.have_hd,
         sort: filters.sort,
      };
      // при изменении параметров пересоздаем URL и вшиваем его в адресную строку
      const createUrl = (obj) => {
         let url = `?geo_id=${obj.geo_id}`;
         if (obj.categories.length > 0) {
            url = url + `&categories=${obj.categories.join(',')}`;
         }
         if (obj.providers.length > 0) {
            url = url + `&providers=${obj.providers.join(',')}`;
         }
         url = url + `&price=${obj.price.join(',')}`;
         if (obj.free_connection) {
            url = url + `&free_connection=${obj.free_connection}`;
         }
         if (obj.have_promo) {
            url = url + `&have_promo=${obj.have_promo}`;
         }
         if (obj.have_hd) {
            url = url + `&have_hd=${obj.have_hd}`;
         }
         url = url + `&sort=${obj.sort}`;

         return url;
      };

      navigate(createUrl(queries));
   }, [filters]);

   return (
      <div className="tariffs">
         <div className="tariffs-container">
            <div className="tariffs__header">
               <h2 className="title2">{setNameTitle()}</h2>
               <div className="tariffs__header-options">
                  <div className="tariffs-params">
                     <p>
                        Параметры
                        <img className="options-img" src={svgFilter} alt="filter" />
                     </p>
                  </div>
                  <SortPopap sortStore={filters.sort} changeSort={handleChangeSort} />
               </div>
            </div>
            <div className="tariffs__body">
               <div className="tariffs__filters">
                  <FilterForm />
               </div>
               <TariffsCardContainer />
            </div>
         </div>
      </div>
   );
}

export default Tariffs;
