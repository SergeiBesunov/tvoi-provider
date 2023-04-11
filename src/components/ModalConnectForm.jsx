import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { toggleModalForm } from '../redux/slices/modalSlices';

import TextFieldConnect from './commons/ElementsForms/TextFieldConnect';
import TextFieldConnectTel from './commons/ElementsForms/TextFieldConnectTel';
import TextareaConnect from './commons/ElementsForms/TextareaConnect';
import CheckboxConnect from './commons/ElementsForms/CheckboxConnect';
import validator from '../utils/validator';

import closeSvg from '../assets/icon-svg/close.svg';

function ModalForm() {
   const dispatch = useDispatch();
   const { nameTariff, idTariff, selectedAddress } = useSelector((state) => state.connectionForm);
   
   const closeModalForm = () => {
      dispatch(toggleModalForm(false));
   };

   const [dataForm, setDataForm] = React.useState({
      tariffId: '',
      tariffName: '',
      userName: '',
      userPhone: '',
      userAddress: '',
      userAgreement: false,
   });
   const [errors, setErrors] = React.useState({});

   const validatorConfig = {
      userName: {
         isRequired: {
            message: 'Введите ваше имя',
         },
      },
      userPhone: {
         isRequired: {
            message: 'Введите ваш контактный телефон',
         },
         minLength:{
            message: 'Введите корректный номер',
         }
      },

      userAgreement: {
         isRequired: {
            message: 'Пользователь не дал соглашение',
         },
      },
   };

   const validate = () => {
      const errors = validator(dataForm, validatorConfig);

      setErrors(errors);
      return Object.keys(errors).length === 0;
   };

   // Закидываем данные о тарифе из store в состояние формы
   React.useEffect(()=>{
      setDataForm((prev)=> ({...prev, tariffId: idTariff, tariffName: nameTariff}))
   },[nameTariff, idTariff])

   // Закидываем данные о выбранном адрессе с главной страницы из store в состояние формы
   React.useEffect(() => {
      if (selectedAddress) {
         setDataForm((prev) => ({ ...prev, userAddress: selectedAddress }));
      }
   }, [selectedAddress]);


   const handleChange = ({ target }) => {
      if (target.name === 'userAgreement') {
         console.log('checkbox');
         setDataForm((prev) => ({ ...prev, [target.name]: !prev[target.name] }));
      } else {
         setDataForm((prev) => ({ ...prev, [target.name]: target.value }));
      }
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      const valid = validate();
      if (!valid) return;
      closeModalForm()
      window.setTimeout(()=>{
         alert(JSON.stringify(dataForm))
      }, 500)
      
      
   };


   return (
      <div className="modal-form-wrapper">
         <form className="modal-form" onSubmit={handleSubmit}>
            <h2 className="title2">Заявка на подключение</h2>

            <div className="form__textfield-container">
               <input
                  className="form__textfield disabled"
                  type="text"
                  placeholder={nameTariff}
               />
            </div>

            <TextFieldConnect
               name={'userName'}
               placeholder={'Ваше имя'}
               value={dataForm.userName}
               onChange={handleChange}
               error={errors.userName}
            />

            <TextFieldConnectTel
               name={'userPhone'}
               placeholder={'Ваш телефон*'}
               value={dataForm.userPhone}
               onChange={handleChange}
               error={errors.userPhone}
            />

            <TextareaConnect
               name={'userAddress'}
               placeholder={'Адрес подключения'}
               value={dataForm.userAddress}
               onChange={handleChange}
            />

            <CheckboxConnect
               name={'userAgreement'}
               value={dataForm.userAgreement}
               onChange={handleChange}
            />

            <button type="submit" className={`blue-button ${dataForm.userAgreement ? '' : 'disabled'}`}>
               Отправить
            </button>

            <p>
               Отправляя заявку, вы соглашаетесь с
               <a href="/"> Политикой обработки персональных данных</a>
            </p>
         </form>

         <img className="modal-form-сlose" src={closeSvg} alt="close" onClick={closeModalForm} />
      </div>
   );
}

export default ModalForm;
