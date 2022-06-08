import React, { useState, useEffect, useRef } from 'react'
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
  const mounted =useRef(false);
  const [newImages,setNewImages]= useState(false)

  const fetchImages =async() =>{
    setloading(true)
    let url;
  
    const urlPage = `&page=${page}`;
    const urlQuery = `&query=${query}`;

    if(query){
      url = `${searchUrl}${urlPage}${urlQuery}`
    }
    else{
      url = `${mainUrl}${urlPage}`
    }
    // url = `${mainUrl}${urlPage}`
 
    try{
      const response = await fetch(url);
      const data = await response.json();
      
      setPhotos((oldphotos)=>{
        if(query&& page ===1){
          return data.results
        }
        else if(query){
          return [...oldphotos,...data.results]
        }else{
          return [...oldphotos,...data]
        }
       
      });
      setNewImages(false)
      setloading(false)
    }catch (error){
      setloading(false)
     console.log(error)
    };
  }

  useEffect(()=>{
 fetchImages()
  },[page]);

  useEffect(()=>{
    if(!mounted.current){
      mounted.current =true
      return
    }
    if(!newImages) return
      if(loading) return
      setPage((oldPage)=>oldPage+1)
  },[newImages])
  const event = () =>{
    if(window.innerHeight +window.scrollY >= document.body.scrollHeight-2){
      setNewImages(true)
    }
  }
  useEffect(()=>{
     window.addEventListener('scroll',event)
     return () => window.removeEventListener('scroll',event)
  },[])

  // useEffect(()=>{
  // const event = window.addEventListener('scroll',()=>{
  //   if((
  //     !loading &&
  //      window.innerHeight + window.scrollY)>= document.body.scrollHeight-2)
  //      {
  //       setPage((oldPage)=>{
  //         return oldPage+1
  //       })
  //   }

  // });
  // return () => window.removeEventListener('scroll',event)
  // },[])

  const handleSubmit = (e) =>{
     e.preventDefault();
     if(!query) return;
     if(page ===1){
       fetchImages()
       return;
     }
     setPage(1);
   
   
  }
  return <main> 
    <section className='search'>
     <form className='search-form'>
     <input type="text" placeholder='search'
     className='form-input' value={query}
      onChange={(e)=>{
          setQuery(e.target.value)
      }}/>
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
         console.log(image)
          return <Photos key={image.id} {...image}></Photos>
       })}
     </div>
     {loading && <h2 className='loading'> loading...</h2>}
    </section>
  </main>
}

export default App
