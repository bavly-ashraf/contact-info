import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteContact } from '../../redux/contactsSlice';

const ContactActionsPage = () => {
    const contacts = useSelector(state => state.contacts.value);
    const dispatch = useDispatch();
    const [filteredContacts,setFilteredContacts] = useState([]);

    useEffect(()=>{
        setFilteredContacts(contacts);
    },[contacts]);

    // filter function for the search input
    const filterContacts = (e) => {
        // lowering the case of every contact name and the name in the search box to get user without case sensitive
        const searchResults = contacts.filter(contact => `${contact?.name?.first?.toLowerCase()} ${contact?.name?.last?.toLowerCase()}`.includes(e.target.value.toLowerCase()));
        setFilteredContacts(searchResults);
    };

    return ( 
        <>
        <div className="flex justify-end mb-3">
            <Link to={'/contact/New'} className="btn btn-info">Create New Contact</Link>
        </div>
        <label className="input input-bordered flex items-center gap-2 mb-3">
            <input type="text" className="grow" placeholder="Search" onChange={filterContacts} />
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70">
                <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd" />
            </svg>
        </label>
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {/* row 1 */}
                {filteredContacts.map(contact => 
                <tr key={contact?.login?.uuid}>
                <td>
                <div className="flex items-center gap-3">
                    <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                        <img
                        src={contact?.picture?.medium}
                        alt="User Image" />
                    </div>
                    </div>
                    <div>
                    <div className="font-bold">{`${contact?.name?.title} ${contact?.name?.first} ${contact?.name?.last}`}</div>
                    <div className="text-sm opacity-50">{contact?.location?.country}</div>
                    </div>
                </div>
                </td>
                <td>
                {contact?.phone}
                </td>
                <td>{contact?.email}</td>
                <th>
                <Link to={`/contact/${contact?.login?.uuid}`} className="btn btn-warning btn-xs">Edit</Link>
                </th>
                <th>
                <button onClick={()=>document.getElementById(contact?.login?.uuid).showModal()} className="btn btn-error btn-xs">Delete</button>
                <dialog id={contact?.login?.uuid} className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg text-error">Delete !</h3>
                        <p className="py-4">Are you sure to delete this contact? <span className="font-extrabold">{`${contact?.name?.title} ${contact?.name?.first} ${contact?.name?.last}`}</span></p>
                        <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <div onClick={()=>dispatch(deleteContact(contact?.login?.uuid))} className="btn btn-error me-2">Delete</div>
                            <button className="btn">Close</button>
                        </form>
                        </div>
                    </div>
                </dialog>
                </th>
            </tr>
                )}

                </tbody>
            </table>
        </div>
        </>
     );
}
 
export default ContactActionsPage;