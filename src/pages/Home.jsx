import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { fetchTariffsPopular } from '../redux/slices/tariffsSlice';
import { useNavigate } from 'react-router-dom';
import { changeCategory } from '../redux/slices/filterSlice'
import { scrollToElement } from '../utils/scrollFunc'

import imgLaptop from '../assets/laptop.jpg';
import imgCategoryes1 from '../assets/categories-1.svg';
import imgCategoryes2 from '../assets/categories-2.svg';
import imgCategoryes3 from '../assets/categories-3.svg';
import imgCategoryes4 from '../assets/categories-4.svg';

import PopapSearchAddress from '../components/PopapSearchAddress';
import TariffCard from '../components/commons/TariffCard';

function Home() {
   const DOM_ElementForm = React.useRef(null)
   
   const dispatch = useDispatch();
   const navigate = useNavigate()

   const { id, name } = useSelector((state) => state.filters.geo_id);
   const {tariffsPopular} = useSelector((state) => state.tariffs)

   // Заправшиваем популярные тарифы по выбранному городу
   const getTariffsPopular = async (geoId) => {
      dispatch(fetchTariffsPopular(geoId));
   };

   const openPageTariffs = (value) => {
      dispatch(changeCategory(value))
      navigate('/tariffs')
 }

   React.useEffect(()=>{
      DOM_ElementForm.current = document.querySelector(`.form-connect`)
      window.scrollTo(0,0)
   }, [])

   React.useEffect(() => {
      getTariffsPopular(id);
   }, [id]);

   const scrolltoForm = () => {
      scrollToElement(DOM_ElementForm.current)
   }
 
   
   return (
      <div className="home">
         <section className="home__top">
            <div className="home__top__search">
               <div className="home__top__search-container">
                  <h1 className="top__search-title">Поиск провайдера по адресу в г {name}</h1>
                  <p className="top__search-text">Покажем только актуальные тарифы</p>

                  <PopapSearchAddress geoId={id} />
               </div>
            </div>

            <div className="home__top__categoryes">
               <div className="home__top__categoryes-container">
                  <h2 className="title2">Тарифы по категориям</h2>
                  <div className="top__categoryes-items">
                     <div className="top__categoryes-item-wrapper">
                        <div className="top__categoryes-item">
                           <img src={imgCategoryes1} alt="img" />
                           <button onClick={()=>openPageTariffs('1')}>Интернет + ТВ</button>
                        </div>
                     </div>

                     <div className="top__categoryes-item-wrapper">
                        <div className="top__categoryes-item">
                           <img src={imgCategoryes2} alt="img" />
                           <button onClick={()=>openPageTariffs('2')}>Домашний интернет</button>
                        </div>
                     </div>

                     <div className="top__categoryes-item-wrapper">
                        <div className="top__categoryes-item">
                           <img src={imgCategoryes3} alt="img" />
                           <button onClick={()=>openPageTariffs('3')}>Связь + Интернет + ТВ</button>
                        </div>
                     </div>

                     <div className="top__categoryes-item-wrapper">
                        <div className="top__categoryes-item">
                           <img src={imgCategoryes4} alt="img" />
                           <button onClick={()=>openPageTariffs('4')}>Телевидение</button>
                        </div>
                     </div>
                  </div>
                  <div className="top__categoryes-button">
                     <button className="blue-button" onClick={()=>openPageTariffs('all')}>Все тарифы</button>
                  </div>
               </div>
            </div>
         </section>

         <section className="home__partners">
            <div className="home__partners-container">
               <p className="home__partners-text">
                  Мы являемся официальными партнёрами Билайн, МТС, Дом.ру и еще более 25
                  интернет-провайдеров
               </p>
               <button className="blue-button" onClick={scrolltoForm}>Оставить заявку</button>
            </div>
         </section>

         <section className="home__tariffs">
            <div className="home__tariffs-container">
               <h2 className="title2">Лучшие предложения месяца</h2>
               <div className="home__tariffs-cards">

                  {tariffsPopular.map((obj, i)=><TariffCard key={i} {...obj}/>)}

               </div>
               <div className="home__tariffs-button">
                  <button className="blue-button" onClick={()=>openPageTariffs('all')}>Смотреть все тарифы</button>
               </div>

               <div className="home__tariffs-block">
                  <div className="tariffs-block-content">
                     <h3>Устали искать надёжного провайдера? Поможем!</h3>
                     <p>
                        Наши специалисты всегда готовы ответить на все Ваши вопросы, чтобы Вы могли
                        выбрать наиболее подходящий для Вас тариф
                     </p>
                     <button className="blue-button" onClick={scrolltoForm}>Оставить заявку</button>
                  </div>
                  <div className="tariffs-block-img">
                     <img src={imgLaptop} alt="img" />
                  </div>
               </div>
            </div>
         </section>
      </div>
   );
}

export default Home;
