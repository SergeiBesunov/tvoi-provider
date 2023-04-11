import React from 'react';

import TextFieldConnect from './commons/ElementsForms/TextFieldConnect';
import TextFieldConnectTel from './commons/ElementsForms/TextFieldConnectTel';
import TextareaConnect from './commons/ElementsForms/TextareaConnect';
import CheckboxConnect from './commons/ElementsForms/CheckboxConnect';
import validator from '../utils/validator';

function FooterConnectForm() {
   const [dataForm, setDataForm] = React.useState({
      userName: '',
      userPhone: '',
      userAddress: '',
      userAgreement: false,
   });

   const [errors, setErrors] = React.useState({});

   const handleChange = ({ target }) => {
      if (target.name === 'userAgreement') {
         setDataForm((prev) => ({ ...prev, [target.name]: !prev[target.name] }));
      } else {
         setDataForm((prev) => ({ ...prev, [target.name]: target.value }));
      }
   };

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
         minLength: {
            message: 'Введите корректный номер',
         },
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

   const handleSubmit = (e) => {
      e.preventDefault();
      const valid = validate();
      if (!valid) return;
      window.setTimeout(() => {
         alert(JSON.stringify(dataForm));
      }, 500);
   };

   return (
      <form className="form-connect" onSubmit={handleSubmit}>
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

         <p className="form-connect-text">Поля, отмеченные *, обязательны к заполнению</p>

         <CheckboxConnect
            name={'userAgreement'}
            value={dataForm.userAgreement}
            onChange={handleChange}
         />

         <button
            type="submit"
            className={`blue-button ${dataForm.userAgreement ? '' : 'disabled'}`}>
            Отправить
         </button>

         <p>
            Отправляя заявку, вы соглашаетесь с
            <a href="/"> Политикой обработки персональных данных</a>
         </p>
      </form>
   );
}

export default FooterConnectForm;
