import { useEffect, useState } from "react";
import ContactCardComponent from "../../components/contact-card/contactCard";
import { useSelector } from "react-redux";

const ContactListPage = () => {
    // const [contactList, setContactList] = useState([]);
    const [indexedList, setIndexedList] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState('All');
    const [filteredContactsList,setFilteredContactsList] = useState([]);
    const contacts = useSelector(state => state.contacts.value);

    useEffect(()=>{
        (async function(){
            try{
                // const contacts = (await axios.get('https://randomuser.me/api/?results=50'))?.data?.results;
                // setContactList(contacts);
                setFilteredContactsList(contacts);
                const newIndexedList = [];
                contacts.forEach(contact => {
                    if(!newIndexedList.includes(contact?.name?.first[0])){
                        newIndexedList.push(contact?.name?.first[0]);
                    }
                });
                setIndexedList(newIndexedList.sort());
            }catch(e){
                alert(e);
            }
        })();
    },[contacts]);


    const filterContacts = (key) => {
        if(key == 'All'){
            setFilteredContactsList(contacts);
        }else{
            const newContactList = contacts.filter(contact => contact?.name?.first[0] == key);
            setFilteredContactsList(newContactList);
        }
        setSelectedIndex(key);
    }

    return ( 
        <>
        <div className="join flex-wrap">
            <input
                className="join-item btn btn-square"
                type="radio"
                name="options"
                aria-label="All"
                onChange={()=> filterContacts('All')}
                checked={selectedIndex == 'All'} />
            {indexedList.map(index => <input key={index} onChange={()=> filterContacts(index)} checked={selectedIndex == index} className="join-item btn btn-square" type="radio" name="options" aria-label={index} />)}
        </div>
        <div className="flex gap-10 flex-wrap">
        { filteredContactsList.map(contact => <ContactCardComponent key={contact?.login?.uuid} id={contact?.login?.uuid} name={`${contact?.name?.title} ${contact?.name?.first} ${contact?.name?.last}`} email={contact?.email} phoneNumber={contact?.phone} picture={contact?.picture?.large} />) }
        </div>
        </>
     );
}
 
export default ContactListPage;