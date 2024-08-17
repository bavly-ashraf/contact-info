import { useEffect, useId, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { createContact, editContact } from "../../redux/contactsSlice";

const ContactEditPage = () => {
    const {id} = useParams();
    const contacts = useSelector(state => state.contacts.value);
    const [user,setUser] = useState({});
    const newUserId = useId(); // in case of a new user with no id
    const {register, handleSubmit, formState: { errors }, reset} = useForm();
    const dispatch = useDispatch();

    const onSubmit = (data) => {
        data.name.title = capitalizeFirstLetter(data.name.title); // capitalizing first letter in title
        data.name.first = capitalizeFirstLetter(data.name.first); // capitalizing first letter in first name
        data.name.last = capitalizeFirstLetter(data.name.last); // capitalizing first letter in last name
        if(id == 'New'){
            data.login = {uuid:newUserId}; // random generated id for new users
            data.picture = {thumbnail:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png',medium:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png',large:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png' }; // default profile picture for new users
            dispatch(createContact(data));
        }else{
            const editedData = {...user, ...data};
            dispatch(editContact(editedData));
        }
        document.getElementById('feedback-modal').showModal();
    };

    const capitalizeFirstLetter = (name) => {
        return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    };

    useEffect(()=>{
        if(id != 'New'){ // in case of edit bring the current user data
           const foundedUser = contacts.find(el => el?.login?.uuid == id);
           if(foundedUser){
               setUser(foundedUser);
               reset({
                name: {
                    title: foundedUser.name ? foundedUser.name.title : '',
                    first: foundedUser.name ? foundedUser.name.first : '',
                    last: foundedUser.name ? foundedUser.name.last : '',
                },
                phone: foundedUser.phone ? foundedUser.phone: '',
                cell: foundedUser.cell ? foundedUser.cell: '',
                email: foundedUser.email ? foundedUser.email: '',
                gender: foundedUser.gender ? foundedUser.gender: 'male'
               });
           }
        }
    },[contacts,id,reset]);
    
    return (
        <>
        <div className={`p-4 mb-10 rounded-xl text-white ${id == 'New'? 'bg-success':'bg-warning'}`}>{id == 'New'? 'New':'Edit'} Contact page</div>
        <form className="p-3" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col mb-6 gap-2">
                <div className="flex items-center gap-4">
                    <label className="w-[15%]" htmlFor="name">Name :</label>
                    <input id="name" type="text" placeholder="Title" className="rounded p-2 w-[28.333%]" {...register('name.title',{required:true})} />
                    <input id="name" type="text" placeholder="First Name" className="rounded p-2 w-[28.333%]" {...register('name.first',{required:true})} />
                    <input id="name" type="text" placeholder="Last Name" className="rounded p-2 w-[28.333%]" {...register('name.last',{required:true})} />
                </div>
                {errors.name && <span className="text-error">Name is required</span>}
            </div>
            <div className="flex flex-col mb-6 gap-2">
                <div className="flex items-center gap-4">
                    <label className="w-[15%]" htmlFor="phone">Phone :</label>
                    <input id="phone" type="text" placeholder="Enter contact phone number" className="rounded p-2 w-[85%]" {...register('phone',{required:true, pattern:/^(?:\+?[\s-]?)\(?(\d{1,4})\)?[\s-]?(\d{1,4})[\s-]?(\d{1,4})[\s-]?(\d{1,4})$/})} />
                </div>
                {errors.phone && <span className="text-error">Phone is required without letters and with minimum length of 4 numbers</span>}
            </div>
            <div className="flex flex-col mb-6 gap-2">
                <div className="flex items-center gap-4">
                    <label className="w-[15%]" htmlFor="cell">Cell :</label>
                    <input id="cell" type="text" placeholder="Enter contact cell" className="rounded p-2 w-[85%]" {...register('cell',{required:true, pattern:/^(?:\+?[\s-]?)\(?(\d{1,4})\)?[\s-]?(\d{1,4})[\s-]?(\d{1,4})[\s-]?(\d{1,4})$/})} />
                </div>
                {errors.cell && <span className="text-error">Cell is required without letters and with minimum length of 4 numbers</span>}
            </div>
            <div className="flex flex-col mb-6 gap-2">
                <div className="flex items-center gap-4">
                    <label className="w-[15%]" htmlFor="email">Email :</label>
                    <input id="email" type="text" placeholder="Enter contact email" className="rounded p-2 w-[85%]" {...register('email',{required:true,pattern:/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g})} />
                </div>
                {errors.email && <span className="text-error">Email is required and must be in this format: user@example.com.</span>}
            </div>
            <div className="flex flex-col mb-6 gap-2">
                <div className="flex items-center gap-4">
                    <label className="w-[15%]">Gender :</label>
                    <div className="border border-black flex justify-evenly w-[85%] rounded p-2">
                        <div className="flex items-center gap-3">
                            <label htmlFor="male">Male :</label>
                            <input id="male" name="gender" value='male' type="radio" {...register('gender',{required:true})} />
                        </div>
                        <div className="flex items-center gap-3">
                            <label htmlFor="female">Female :</label>
                            <input id="female" name="gender" value='female' type="radio" {...register('gender',{required:true})} />
                        </div>
                    </div>
                </div>
                {errors.gender && <span className="text-error">Gender is required.</span>}
            </div>
            <div className="flex justify-end">
                <button className={`btn text-white ${id == 'New'? 'btn-success': 'btn-warning'} w-[200px]`}>{id == 'New'? 'Create':'Edit'}</button>
            </div>
        </form>
        <dialog id='feedback-modal' className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg text-success">Success !</h3>
                <p className="py-4">Contact is {id == 'New'? 'created':'edited'} successfully.</p>
                <div className="modal-action">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <Link to={'/contact-actions'} className="btn">Close</Link>
                    </form>
                </div>
            </div>
        </dialog>
        </>
     );
}
 
export default ContactEditPage;