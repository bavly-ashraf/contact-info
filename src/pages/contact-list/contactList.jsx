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
                setFilteredContactsList(contacts);
                // Adding letters to be filtered by in first name
                const newIndexedList = [];
                contacts.forEach(contact => {
                    if(!newIndexedList.includes(contact?.name?.first[0])){
                        newIndexedList.push(contact?.name?.first[0]);
                    }
                });
                // ordering letters alphabetically
                setIndexedList(newIndexedList.sort());
            }catch(e){
                alert(e);
            }
        })();
    },[contacts]);


    const filterContacts = (key) => {
        if(key == 'All'){
            // getting all contacts
            setFilteredContactsList(contacts);
        }else{
            // getting contacts according to pressed key (letter)
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