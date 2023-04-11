import React from 'react';

export default function CheckboxConnect({ value, onChange, name }){
   return(
        <div className="form__item">
               <input 
                    type="checkbox"
                    name={name}
                    value={value}
                    onChange={onChange}
                    checked={value}
                />
               <p>
                  Я даю <a>Согласие на обработку персональных данных</a>
               </p>
        </div>
   )           
}