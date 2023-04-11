import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { changeCategory } from '../redux/slices/filterSlice'

import { addTariffData } from '../redux/slices/connectionForms'
import { toggleModalForm } from '../redux/slices/modalSlices'

import logoMTS from '../assets/card/mts-logo.svg';
import logoRos from '../assets/card/ros-logo.svg';

function CardTariffById({
    id,
    category,
    provider_id,
    name,
    name_promo,
    description_promo,
    connection,
    basic_price,
    promo_price,
    internet,
    tv_сhannels,
    tv_hd_channels,
    sim_minutes,
    sim_internet,
    sim_sms,
    sim_total,
    geo, 
}){
    const navigate = useNavigate()
    const dispatch = useDispatch()

   const openPageTariffs = (value) => {
        dispatch(changeCategory(value))
        navigate('/tariffs')
   } 

    // Открываем форму в модалке, и сразу закидываем в нее через store данные тарифа на который кликнули
    const openModalForm = (id, name) => {
      dispatch(addTariffData({id: id, name: name}))
      dispatch(toggleModalForm(true))
   }


return(
    <div className="tariff">
    <div className="tariff__top">
       <h2 className="title2">
          {name} г {geo}
       </h2>
       <div className="tariff__top-logo">
          <img src={provider_id === '12' ? logoMTS : logoRos} alt="logo" />
       </div>
    </div>
    <div className="tariff__nav">
       <ul className="tariff__nav-list">
          <li>
             <button onClick={()=>openPageTariffs("all")}>Все тарифы</button>
          </li>
          <li>
             <button onClick={()=>openPageTariffs(category.id)}>{category.name}</button>
          </li>
          <li className="disabled">
             <button>{name}</button>
          </li>
       </ul>
    </div>
    {name_promo && (
       <div className="tariff__promo">
          <h3>{name_promo}</h3>
          <p>{description_promo}</p>
       </div>
    )}

    <div className="tariff__connect">
       <div className="tariff__price">
          <div className="tariff__price-old">
             <p>{promo_price >= 0 && basic_price}</p>
          </div>
          <div className="tariff__price-sale">
             <p>{promo_price >= 0 ? promo_price : basic_price}</p>
          </div>
          <div className="tariff__price-text">
             <p>руб.</p>
             <p>мес.</p>
          </div>
       </div>
       <button className="blue-button" onClick={()=>openModalForm(id, name)}>Подключить</button>
    </div>

    {sim_minutes && (
       <div className="tariff__item">
          <h4 className="tariff__item-title">Мобильная связь</h4>
          <div className="tariff__item-row">
             <p>Звонки</p>
             <p>{sim_minutes} минут</p>
          </div>
          {sim_internet && (
             <div className="tariff__item-row">
                <p>Мобильный интернет</p>
                <p>{sim_internet} ГБ</p>
             </div>
          )}

          {sim_sms && (
             <div className="tariff__item-row">
                <p>SMS</p>
                <p>{sim_sms} шт.</p>
             </div>
          )}

          {sim_total && (
             <div className="tariff__item-row">
                <p>Количество sim-карт</p>
                <p>до {sim_total} шт.</p>
             </div>
          )}
       </div>
    )}

    {internet && (
       <div className="tariff__item">
          <h4 className="tariff__item-title">Домашний интернет</h4>
          <div className="tariff__item-row">
             <p>Скорость</p>
             <p>до {internet} Мбит/с</p>
          </div>
       </div>
    )}

    {tv_сhannels && (
       <div className="tariff__item">
          <h4 className="tariff__item-title">Телевидение</h4>
          <div className="tariff__item-row">
             <p>Количество каналов</p>
             <p>{tv_сhannels} каналов</p>
          </div>
          <div className="tariff__item-row">
             <p>Количество HD каналов</p>
             <p>{tv_hd_channels}HD</p>
          </div>
       </div>
    )}

    <div className="tariff__item">
       <div className="tariff__item-row">
          <p>Стоимость подключения</p>
          <p>{connection === 'free' ? `бесплатно` : `${connection} руб.`}.</p>
       </div>
    </div>
 </div>
)
}

export default CardTariffById