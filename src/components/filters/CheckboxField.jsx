import React from 'react'

import { useSelector } from 'react-redux';

function CheckboxField({label, name, valueId, handleChangeField}){
   
    const filter = useSelector((state)=>state.filters)

    // checked на чекбоксах контролируется данными по этим чекбоксам из store, для более гибкого управления
    const toggleChecked = () => {
        if(Array.isArray(filter[name])){
            if(filter[name].some((id)=> id === valueId)){
                return true
            }else{
                return false
            }
        }
        if(typeof filter[name] === 'string'){
            if(filter[name] === "1"){
                return true
            }else{
                return false
            }
        }
    }

return(
    <label className="t-form__item-checkbox" htmlFor={valueId ? valueId : name}>
        <input id={valueId ? valueId : name} className="real-checkbox" type="checkbox" name={name} onChange={handleChangeField} checked={toggleChecked()}/>
        <span className="custom-checkbox"></span>
        {label}
    </label>
)
}

export default CheckboxField