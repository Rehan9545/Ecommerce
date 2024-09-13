import react from 'react';
// import {useHistory} from 'react-router-dom';
import '../styles/tailwind.css'
import { Link } from 'react-router-dom';
const CategoryCard=({image,title,link})=>{
    // const history =useHistory();
    const handleClick=()=>{
        // history.push(link);
    };

    return (
        <>
        <Link to={link}>
        <div
          className='cursor-pointer transition-transform transform hover:scale-105'
          onclick={handleClick}
        >
            <div className='relative'>
                       <img src={image} alt={title} className='w-full h-48 object-cover rounded-lg' />
                       <div className='absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center text-white text-xl font-semibold rounded-lg'>
                        {title}
                       </div>
                       
            </div>

        </div>  
        </Link>
      
        </>
      
    )
}

export default CategoryCard;