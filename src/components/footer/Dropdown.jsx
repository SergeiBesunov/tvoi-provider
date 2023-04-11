import React from 'react'

function Dropdown({ title, text }) {

const toggleDropdown = ({target}) => {
   target.closest(".questions__dropdown").classList.toggle("active")
   
}
   return (
      <div className="questions__dropdown" >
         <div className="questions__dropdown-question" onClick={toggleDropdown}>
            <h3>{title}</h3>
            <svg
               enableBackground="new 0 0 20 20"
               width="12px"
               viewBox="0 0 20 20"
               xmlns="http://www.w3.org/2000/svg">
               <path d="m10 16.3-10.4-10.5 1.4-1.4 9 9.1 9.1-9.1 1.4 1.4z" />
            </svg>
         </div>
          <p >{text}</p>
         
      </div>
   );
}

export default Dropdown;
