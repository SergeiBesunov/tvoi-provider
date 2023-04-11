import { useDispatch, useSelector } from 'react-redux';
import { addTariff } from '../../redux/slices/comparisonSlice';
import { addTariffData } from '../../redux/slices/connectionForms'
import { toggleModalForm } from '../../redux/slices/modalSlices'

import { Link } from 'react-router-dom';

import logoMTS from '../../assets/card/card-mts.svg';
import logoRos from '../../assets/card/card-ros.svg';
 

const svgInternet = (
   <svg
      width="35px"
      height="35px"
      enableBackground="new 0 0 40 40"
      viewBox="0 0 40 40"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink">
      <linearGradient
         id="a"
         gradientUnits="userSpaceOnUse"
         x1="5.8579"
         x2="34.1421"
         y1="34.1421"
         y2="5.8579">
         <stop offset="0" stopColor="#646d7a" />
         <stop offset="1" stopColor="#8f7197" />
      </linearGradient>
      <circle cx="20" cy="20" fill="url(#a)" r="20" />
      <g fill="none" stroke="#fff" strokeMiterlimit="10" strokeWidth="1.5">
         <circle cx="20" cy="20" r="11" />
         <path d="m20 9v22" />
         <path d="m9 20h22" />
         <path d="m12.1 12.3s3.9 3 7.9 3 7.9-3 7.9-3" />
         <path d="m12.1 27.7s2.9-2.7 7.9-2.7 7.9 2.7 7.9 2.7" />
         <ellipse cx="20" cy="20" rx="5.5" ry="11" />
      </g>
   </svg>
);
const svgTv = (
   <svg
      width="35px"
      height="35px"
      enableBackground="new 0 0 40 40"
      viewBox="0 0 40 40"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink">
      <linearGradient
         id="a"
         gradientUnits="userSpaceOnUse"
         x1="5.8579"
         x2="34.1421"
         y1="34.1421"
         y2="5.8579">
         <stop offset="0" stopColor="#646d7a" />
         <stop offset="1" stopColor="#8f7197" />
      </linearGradient>
      <circle cx="20" cy="20" fill="url(#a)" r="20" />
      <g fill="none" stroke="#fff" strokeMiterlimit="10" strokeWidth="1.5">
         <path d="m30.3 28h-20.5c-1.6 0-2.8-1.2-2.8-2.7v-10.5c0-1.6 1.2-2.8 2.8-2.8h20.5c1.5 0 2.8 1.2 2.8 2.8v10.5c-.1 1.5-1.3 2.7-2.8 2.7z" />
         <path d="m13 32h14" />
         <path d="m20.5 17.5-4.5 4.5" />
         <path d="m25 18-5.5 5.5" />
      </g>
   </svg>
);
const svgSim = (
   <svg
      width="35px"
      height="35px"
      enableBackground="new 0 0 40 40"
      viewBox="0 0 40 40"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink">
      <linearGradient
         id="a"
         gradientUnits="userSpaceOnUse"
         x1="5.8579"
         x2="34.1421"
         y1="34.1421"
         y2="5.8579">
         <stop offset="0" stopColor="#646d7a" />
         <stop offset="1" stopColor="#8f7197" />
      </linearGradient>
      <circle cx="20" cy="20" fill="url(#a)" r="20" />
      <g fill="none" stroke="#fff" strokeMiterlimit="10" strokeWidth="1.5">
         <path d="m27 10.5v19c0 1.5-1.2 2.8-2.8 2.8h-8.5c-1.5 0-2.8-1.2-2.8-2.8v-19c0-1.5 1.2-2.8 2.8-2.8h8.5c1.6.1 2.8 1.3 2.8 2.8z" />
         <path d="m13 11.9h14" />
         <path d="m13 26.7h14" />
         <path d="m19.1 29.6h1.8" />
         <path d="m21.1 15-2.5 2.5" />
         <path d="m23.1 18-5.5 5.5" />
      </g>
   </svg>
);

function TariffCard({
   id,
   provider_id,
   have_promo,
   name_promo,
   name,
   internet,
   tv_сhannels,
   tv_hd_channels,
   sim_minutes,
   sim_internet,
   sim_sms,
   sim_total,
   basic_price,
   promo_price,
   connection,
}) {
   const dispatch = useDispatch();
   const tariffsAddedToComparison = useSelector((state)=>state.comparison.tariffs)
   const isCompared = tariffsAddedToComparison.some((tariff)=>tariff.id === id)

   const addToComparison = () => {
      dispatch(addTariff({
            id,
            provider_id,
            name_promo,
            name,
            internet,
            tv_сhannels,
            tv_hd_channels,
            sim_minutes,
            sim_internet,
            sim_sms,
            sim_total,
            basic_price,
            promo_price,
            connection
         }),
      );
   };

   // Открываем форму в модалке, и сразу закидываем в нее через store данные тарифа на который кликнули
   const openModalForm = (id, name) => {
      dispatch(addTariffData({id: id, name: name}))
      dispatch(toggleModalForm(true))
   }

   return (
      <div className="card-wrapper">
         <div className="card">
            {have_promo === '1' && <div className="card__sale">{name_promo}</div>}

            <div className="card__header">
               <h2 className="card-title">{name}</h2>
               <img
                  className="card-logo"
                  src={provider_id === '12' ? logoMTS : logoRos}
                  alt="logo"
               />
            </div>
            <div className="card__items">
               {internet && (
                  <div className="card__item card-internet">
                     <div className="card__item-icon">{svgInternet}</div>
                     <div className="card__item-decription">
                        <p>{internet} Мбит/c</p>
                     </div>
                  </div>
               )}

               {tv_сhannels && (
                  <div className="card__item card-tv">
                     <div className="card__item-icon">{svgTv}</div>
                     <div className="card__item-decription">
                        <ul className="card__item-list">
                           <li>{tv_сhannels} каналов</li>
                           {tv_hd_channels && <li>{tv_hd_channels} HD</li>}
                        </ul>
                     </div>
                  </div>
               )}

               {sim_minutes && (
                  <div className="card__item card-sim">
                     <div className="card__item-icon">{svgSim}</div>
                     <div className="card__item-decription">
                        <ul className="card__item-list">
                           {<li>{sim_minutes} минут</li>}
                           {sim_internet && <li>{sim_internet} ГБ</li>}
                           {sim_sms && <li>{sim_sms} СМС</li>}
                           {sim_total && <li>до {sim_total} сим-карт</li>}
                        </ul>
                     </div>
                  </div>
               )}
            </div>
            <div className="card__compare" onClick={addToComparison}>
               <p className="card__compare-text">В сравнение</p>
               <svg
                  width="16px"
                  height="16px"
                  margin-right="15px"
                  enableBackground="new 0 0 18 18"
                  viewBox="0 0 18 18"
                  xmlns="http://www.w3.org/2000/svg">
                  <g fill="none" stroke={isCompared ? "#212121" : "#929292"} strokeMiterlimit="10" strokeWidth="3">
                     <path d="m2 18v-7.5" />
                     <path d="m6.7 18v-12.2" />
                     <path d="m11.3 18v-8.4" />
                     <path d="m16 18v-15" />
                  </g>
               </svg>
            </div>
            <div className="card__price">
               <div className="card__price-old">{promo_price >= 0 && <p>{basic_price}</p>}</div>
               <div className="card__price-sale">
                  <p>{promo_price >= 0 ? promo_price : basic_price}</p>
               </div>
               <div className="card__price-text">
                  <p>руб.</p>
                  <p>мес.</p>
               </div>
            </div>
            <div className="card__button">
               <button className="blue-button" onClick={()=>openModalForm(id, name)}>Подключить</button>
            </div>
            <Link to={`/tariff/${id}`} className="card-link-more">
               Подробнее о тарифе
            </Link>
         </div>
      </div>
   );
}

export default TariffCard;
