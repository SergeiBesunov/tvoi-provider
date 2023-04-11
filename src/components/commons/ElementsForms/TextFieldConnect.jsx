import React from 'react';

export default function TextFieldConnect({ placeholder, value, onChange, name, error }) {
   return (
      <div className="form__textfield-container">
         <input
            className="form__textfield"
            value={value}
            name={name}
            type="text"
            placeholder={placeholder}
            onChange={onChange}
         />
         <p className="form__textfield-error">{error && error}</p>
      </div>
   );
}
