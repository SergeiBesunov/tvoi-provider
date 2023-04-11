import { useDispatch } from 'react-redux';
import { deleteTariff } from '../redux/slices/comparisonSlice'
import { Link } from 'react-router-dom';

import logoMts from '../assets/card/mts-logo.svg';
import logoRos from '../assets/card/ros-logo.svg';

function CardComparison({
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
   basic_price,
   promo_price,
   connection,
}) {

   const dispatch = useDispatch()
   const removeTariffFromComparison = () => {
      dispatch(deleteTariff(id))
   }
   return (
      <div className="cs__tariffs-item">
         <div className="cs__tariffs-item-row">
            <h3 className="cs__tariffs-item-logo">
               <img src={provider_id === "12" ? logoMts : logoRos} alt="logo" />
            </h3>
            <h3 className="cs__tariffs-item-title">{name}</h3>
            <button className="cs__tariffs-item-remove" onClick={removeTariffFromComparison}>Убрать из сравнения</button>
         </div>
         <p className="cs__tariffs-item-row">{basic_price} руб./мес.</p>
         <p className="cs__tariffs-item-row">
            {name_promo ? name_promo : "__"}
         </p>
         <p className="cs__tariffs-item-row">
            {promo_price ? <span className="cs__tariffs-item-sale">{`${promo_price} руб./мес.`}</span> : "___"}
         </p>
         <p className="cs__tariffs-item-row">{internet ? `${internet} Мбит/с` : "___"} </p>
         <p className="cs__tariffs-item-row">{tv_сhannels ? `${tv_сhannels} шт.` : "___"} </p>
         <p className="cs__tariffs-item-row">{tv_hd_channels ? `${tv_hd_channels} шт.` : "___"}</p>
         <p className="cs__tariffs-item-row">{sim_internet ? `${sim_internet} Гб` : "___"}</p>
         <p className="cs__tariffs-item-row">{sim_minutes ? `${sim_minutes} минут` : "___"}</p>
         <p className="cs__tariffs-item-row">{sim_sms ? `${sim_sms} шт.` : "___"}</p>
         <p className="cs__tariffs-item-row">{connection === "free" ? `бесплатно` : `${connection} руб.`}</p>
         <p className="cs__tariffs-item-row">___</p>
         <p className="cs__tariffs-item-row">___</p>
         <p className="cs__tariffs-item-row">
            <Link to={`/tariff/${id}`}>Подробнее...</Link>
         </p>
      </div>
   );
}

export default CardComparison;
