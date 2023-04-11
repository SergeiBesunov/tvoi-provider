import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changeCategory } from '../../redux/slices/filterSlice'

function SelectedNav({closeNavSelect, closeMenu}){
   const navigate = useNavigate()
   const dispatch = useDispatch()

   const openPageTariffs = (value) => {
      dispatch(changeCategory(value))
      navigate('/tariffs')
 }

 const handleСlickOnElement = (e, id) => {
   closeMenu()
   closeNavSelect(e)
   openPageTariffs(id)
 }
return(
    <div className="nav-select nav-select--hidden">
    <ul className="nav-select-list">
       <li>
          <button onClick={(e)=>handleСlickOnElement(e, '3')}>Связь + Интернет + ТВ</button>
       </li>
       <li>
          <button onClick={(e)=>handleСlickOnElement(e, '1')}>Интернет + ТВ</button>
       </li>
       <li>
          <button onClick={(e)=>handleСlickOnElement(e, '2')}>Домашний интернет</button>
       </li>
       <li>
          <button onClick={(e)=>handleСlickOnElement(e, '4')}>Телевидение</button>
       </li>
    </ul>
 </div>
)
}

export default SelectedNav