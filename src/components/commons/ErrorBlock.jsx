function ErrorBlock({title, decription}) {
    return (
      <div className="tariffs__cards-notfound">
         <h2 className='title2'>{title}</h2>
         {decription &&  <p>{decription}</p>}
      </div>
    );
 }
 
 export default ErrorBlock;