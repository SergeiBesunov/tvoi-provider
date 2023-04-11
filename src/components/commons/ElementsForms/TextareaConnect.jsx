import React from 'react';

export default function TextareaConnect({ placeholder, value, onChange, name }) {
   return (
      <div className="form__textfield-container">
         <textarea
            className="form__textfield"
            name={name}
            cols="30"
            rows="10"
            placeholder={placeholder}
            value={value}
            onChange={onChange}>
        </textarea>
      </div>
   );
}
