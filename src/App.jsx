import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addAllContacts } from './redux/contactsSlice'
import { Link } from 'react-router-dom'
import welcomeImg from './assets/welcome-image.svg';

function App() {
  const contacts = useSelector(state => state.contacts.value);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(()=>{
    (async function(){
      if(!contacts.length){
        try{
          setLoading(true)
          const contactsFromAPI = (await axios.get('https://randomuser.me/api/?results=50'))?.data?.results;
          dispatch(addAllContacts(contactsFromAPI));
          setLoading(false);
        }catch(e){
          alert(e);
        }
      }
    })();
  });

  return (
    <>
      <div className='flex flex-col items-center gap-14'>
        <h1 className='text-3xl font-bold underline'>Simple Contacts App</h1>
        <img className='max-w-[50%] max-h-[50vh]' src={welcomeImg} alt='Welcome Image' />
        <div className='flex gap-16'>
          <Link to={'contact-list'} className="btn btn-info">Contacts list</Link>
          <Link to={'contact-actions'} className="btn btn-warning">Contacts actions</Link>
        </div>
      </div>
      <div className="toast">
        <div className={loading? 'alert alert-info': contacts.length > 0? 'alert alert-success':'alert alert-error'}>
          <span>{loading? 'Contacts are being loaded...': contacts.length > 0? 'Contacts are loaded successfully.':'There\'s an error!'}</span>
        </div>
      </div>
    </>
  )
}

export default App
