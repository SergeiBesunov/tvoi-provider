import React from 'react';
// https://github.com/developergovindgupta/multi-range-slider-react

import './MultiRangeStyle.scss';
import MultiRangeSlider from 'multi-range-slider-react';

import { useDispatch, useSelector } from 'react-redux';
import { changePrice } from '../../../redux/slices/filterSlice';

function PriceField() {
   const priceStore = useSelector((state) => state.filters.price);
   const dispatch = useDispatch();

   const [minValue, set_minValue] = React.useState(priceStore.minPrice);
   const [maxValue, set_maxValue] = React.useState(priceStore.maxPrice);

   const changeValueOnClickEnter = (e) => {
      if (e.keyCode == '13') {
         e.target.blur()
      } else {
         return;
      }
   };

   const changeValueMin = (e) => {
      if (e.target.value < maxValue) {
         set_minValue(e.target.value);
         e.target.value = '';
         e.target.blur();
      } else {
         e.target.value = '';
         e.target.blur();
      }
   };
   const changeValueMax = (e) => {
     
      if (e.target.value > minValue) {
         set_maxValue(e.target.value);
         e.target.value = '';
         e.target.blur();
      } else {
         e.target.value = '';
         e.target.blur();
      }
   };

   const handleInput = (e) => {
      set_minValue(e.minValue);
      set_maxValue(e.maxValue);
   };

   const changeStore = (e) => {
      dispatch(changePrice({ min: e.minValue, max: e.maxValue }));
   };

   return (
      <>
         <div className="t-form__item-prices">
            <div className="t-form__item-price">
               от:
               <input
                  type="text"
                  name="price-min"
                  placeholder={minValue}
                  onKeyUp={changeValueOnClickEnter}
                  onBlur={changeValueMin}
               />
            </div>
            <div className="t-form__item-price">
               до:
               <input
                  type="text"
                  name="price-max"
                  placeholder={maxValue}
                  onKeyUp={changeValueOnClickEnter}
                  onBlur={changeValueMax}
               />
            </div>
         </div>
         <div className="range">
            <MultiRangeSlider
               step={100}
               label={false}
               ruler={false}
               min={149}
               max={1240}
               minValue={minValue}
               maxValue={maxValue}
               onInput={handleInput}
               onChange={changeStore}
            />
         </div>
      </>
   );
}
export default PriceField;
