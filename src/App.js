import React, { useState, useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'
import Photos from './Photos'
// const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`
const mainUrl = `https://api.unsplash.com/photos/?client_id=Kw47YdqjgakfhMAZgKUFIKh8KfzAW2sm3m4AyAZHego`
const searchUrl = `https://api.unsplash.com/search/photos/?client_id=Kw47YdqjgakfhMAZgKUFIKh8KfzAW2sm3m4AyAZHego`

function App() {
  const [loading,setloading] =useState(false);
  const [photos,setPhotos] =useState([]);
  const [page,setPage] = useState(1);
  const [query,setQuery] =useState('');

  const fetchImages =async() =>{
    setloading(true)
    let url;
    url = `${mainUrl}`
    const urlPage = `&page=${page}`;
    const urlQuery = `&query=${query}`;
    if (query) {
      url = `${searchUrl}${urlPage}${urlQuery}`;
    } else {
      url = `${mainUrl}${urlPage}`;
    }
    try{
      const response = await fetch(url);
      const data = await response.json();
      setPhotos(data);
      setloading(false)
    }catch (error){
      setloading(false)
     console.log(error)
    };
  }

  useEffect(()=>{
 fetchImages()
  },[])

  const handleSubmit = (e) =>{
     e.preventDefault();
     console.log('안뇽')
  }
  return <main> 
    <section className='search'>
     <form className='search-form'>
     <input type="text" placeholder='search'
     className='form-input'/>
       <button type='submit' 
       className='submit-btn'
       onClick={handleSubmit}>
         <FaSearch></FaSearch>
       </button>
     
     </form>
    </section>
    <section className='photos'>
     <div className='photos-center'>
       {photos.map((image,index)=>{
          return <Photos key={index} {...image}></Photos>
       })}
     </div>
     {loading && <h2 className='loading'> loading...</h2>}
    </section>
  </main>
}

export default App
