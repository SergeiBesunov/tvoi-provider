import React from 'react';
import svgSort from '../../assets/icon-svg/sort.svg';

import { sortOptions } from '../../options';

function SortPopap({ changeSort, sortStore }) {
   const [openSort, setOpenSort] = React.useState(false);

   const clickSortItem = (value) => {
      changeSort(value);
      setOpenSort(false);
   };


   // Вешаем обработчик отлавливания клика на документ для закрытия попапа сортировки
   React.useEffect(() => {
      const handleClickForClosedSort = ({ target }) => {
         if (!target.closest(`.sort-popap`)) {
            setOpenSort(false);
         }
      };
      document.body.addEventListener(`click`, handleClickForClosedSort);

      return () => {
         document.body.removeEventListener(`click`, handleClickForClosedSort);
      };
   }, []);

   return (
      <div className="sort-popap">
         <p onClick={() => setOpenSort((prev) => !prev)}>
            Сортировка
            <img className="options-img" src={svgSort} alt="sort" />
         </p>
         {openSort && (
            <ul>
               {sortOptions.map((obj) => (
                  <li
                     className={sortStore === obj.value ? 'sort--active' : ''}
                     key={obj.value}
                     onClick={() => clickSortItem(obj.value)}>
                     {obj.name}
                  </li>
               ))}
            </ul>
         )}
      </div>
   );
}

export default SortPopap;
