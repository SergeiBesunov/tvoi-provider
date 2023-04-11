import React from 'react';

import { useDispatch } from 'react-redux';
import { addPlacoholderAddress } from '../redux/slices/connectionForms'
import URL from '../options/basicUrl';


function PopapSearchAddress({ geoId }) {
   const dispatch = useDispatch()
   const searchRef = React.useRef(null);
   const [searchValue, setSearchValue] = React.useState('');
   const [selectedAdress, setSelectedAdress] = React.useState('');
   const [listAddress, setListAddress] = React.useState([]);
   const [messageError, setMessageError] = React.useState('');

   // Поиск по полученным адресам, через вбитые данные с textfield
   const filterListAddress = listAddress.filter((text) =>
      text.toLowerCase().includes(searchValue.toLowerCase()),
   );

   const clickItemDropdown = (value) => {
      dispatch(addPlacoholderAddress(value))
      setSelectedAdress(value);
      setSearchValue('');
   };

   // Вешаем обработчик отлавливания клика на документ для закрытия попапа 
   React.useEffect(() => {
      const handleClickOnPopap = ({ target }) => {
         if (!target.closest('.search')) {
            setSearchValue('');
         }
      };
      document.body.addEventListener(`click`, handleClickOnPopap);

      return () => {
         document.body.removeEventListener(`click`, handleClickOnPopap);
      };
   }, []);

   // Поиск по базе данных адрессов
   const getAddress = async (id) => {
      try {
         const response = await fetch(`${URL}address/${id}`);

         if (!response.ok) {
            throw new Error('Что то пошло не так :(');
         }
         const data = await response.json();

         setListAddress(data.data);
      } catch (error) {
         setMessageError(error.message);
         setListAddress([])
      }
   };

   React.useEffect(() => {
      getAddress(geoId);
   }, [geoId]);

   return (
      <div className="search" ref={searchRef}>
         <input
            style={
               searchValue.length > 0
                  ? {
                       borderBottomRightRadius: '0px',
                       borderBottomLeftRadius: '0px',
                       borderBottom: '0px',
                    }
                  : null
            }
            type="text"
            value={searchValue}
            placeholder={selectedAdress || 'Начните вводить Ваш адрес'}
            onInput={(e) => setSearchValue(e.target.value)}
         />

         {searchValue.length > 0 && (
            <ul className="search__popap">
               <li className="search__popap-first-item">
                  {filterListAddress.length > 0
                     ? 'Выберите вариант или продолжите ввод'
                     : 'Неизвестый адресс'}
               </li>
               {messageError && <li className="search__popap-first-item">{messageError}</li>}

               {filterListAddress.map((street, i) => (
                  <li key={i} onClick={() => clickItemDropdown(street)}>
                     {street}
                  </li>
               ))}
            </ul>
         )}
      </div>
   );
}

export default PopapSearchAddress;
