import React from 'react';
import { useDispatch } from 'react-redux';
import { changeState } from '../../redux/slices/filterSlice';

import CheckboxField from './CheckboxField';
import PriceField from './rangeSlider';


 export default React.memo(function FilterForm() {

   const dispatch = useDispatch();
   
   const changeStore = ({ target }) => {
      if (target.name === 'categories' || target.name === 'providers') {
         dispatch(changeState({ name: target.name, id: target.id }));
      } else {
         dispatch(changeState({ name: target.name }));
      }
   };

   return (
      <form className="t-form" action="#">
         <div className="t-form__item ">
            <p className="t-form__item-title">Тарифы</p>
            <div className="t-form__item-textfields" >
               <CheckboxField
                  label={'Интернет + ТВ'}
                  valueId={'1'}
                  name={'categories'}
                  handleChangeField={changeStore}
               />

               <CheckboxField
                  label={'Интернет'}
                  valueId={'2'}
                  name={'categories'}
                  handleChangeField={changeStore}
               />

               <CheckboxField
                  label={'Связь + Интернет + ТВ'}
                  valueId={'3'}
                  name={'categories'}
                  handleChangeField={changeStore}
               />

               <CheckboxField
                  label={'Телевидение'}
                  valueId={'4'}
                  name={'categories'}
                  handleChangeField={changeStore}
               />
            </div>
         </div>

         <div className="t-form__item">
            <p className="t-form__item-title">Провайдеры</p>
            <div className="t-form__item-textfields">
               <CheckboxField
                  label={'Ростелеком'}
                  valueId={'14'}
                  name={'providers'}
                  handleChangeField={changeStore}
               />

               <CheckboxField
                  label={'МТС'}
                  valueId={'12'}
                  name={'providers'}
                  handleChangeField={changeStore}
               />
            </div>
         </div>

         <div className="t-form__item">
            <p className="t-form__item-title">Абонентская плата</p>
            <PriceField />
         </div>

         <div className="t-form__item">
            <p className="t-form__item-title">Дополнительно</p>
            <div className="t-form__item-textfields">
               <CheckboxField
                  label={'Бесплатное подключение'}
                  name={'free_connection'}
                  handleChangeField={changeStore}
               />

               <CheckboxField
                  label={'Только тарифы с акциями'}
                  name={'have_promo'}
                  handleChangeField={changeStore}
               />
            </div>
         </div>

         <div className="t-form__item">
            <p className="t-form__item-title">Параметры</p>
            <div className="t-form__item-textfields">
               <CheckboxField
                  label={'Есть HD каналы'}
                  name={'have_hd'}
                  handleChangeField={changeStore}
               />
            </div>
         </div>
      </form>
   );
})
