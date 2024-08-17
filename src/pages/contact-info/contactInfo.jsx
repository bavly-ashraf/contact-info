import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ContactInfoPage = () => {
    const contacts = useSelector(state => state.contacts.value);
    const [user, setUser] = useState({});
    const {id} = useParams();

    useEffect(()=>{
       const selectedUser = contacts.find(contact => contact?.login?.uuid == id);
       setUser(selectedUser);
    },[contacts,id]);

    return ( 
        <>
        <div className="stats shadow">
            <div className="stat">
                <div className="stat-figure text-secondary">
                <div className="avatar">
                    <div className="w-24 rounded-full">
                    <img src={user?.picture?.large} />
                    </div>
                </div>
                </div>
                {/* <div className="stat-value">{user?.}</div>
                <div className="stat-title">Tasks done</div>
                <div className="stat-desc text-secondary">31 tasks remaining</div> */}
            </div>

            <div className="stat">
                <div className="stat-title">{user?.name?.title}</div>
                <div className={`stat-value ${user?.gender == 'male'? 'text-primary' : 'text-secondary'}`}>{user?.name?.first}</div>
                <div className="stat-desc">{user?.name?.last}</div>
            </div>

            <div className="stat">
                <div className="stat-title">Gender</div>
                <div className={`stat-value ${user?.gender == 'male'? 'text-primary' : 'text-secondary'}`}>{user?.gender}</div>
                {user?.dob?.age && <div className="stat-desc">{user?.dob?.age} years old</div>}
            </div>
        </div>
        <div className="border border-info rounded-3xl mt-10 p-5 pt-2">
            <h1 className="text-info text-xl mb-5" >Contact Info</h1>
            {user?.id?.name && <div className="flex gap-4 items-center mb-3">
                <label className="w-[15%]">ID :</label>
                <input className="rounded p-2 w-[85%]" disabled value={`${user?.id?.name} - ${user?.id?.value}`} />
            </div>}
            {user?.login?.username && <div className="flex gap-4 items-center mb-3">
                <label className="w-[15%]">username :</label>
                <input className="rounded p-2 w-[85%]" disabled value={user?.login?.username} />
            </div>}
            {user?.location?.street?.number && <div className="flex gap-4 items-center mb-3">
                <label className="w-[15%]">Address :</label>
                <input className="rounded p-2 w-[85%]" disabled value={`${user?.location?.street?.number} ${user?.location?.street?.name}, ${user?.location?.city}, ${user?.location?.state}, ${user?.location?.country}`} />
            </div>}
            {user?.email && <div className="flex gap-4 items-center mb-3">
                <label className="w-[15%]">Email :</label>
                <input className="rounded p-2 w-[85%]" disabled value={user?.email} />
            </div>}
            {user?.phone && <div className="flex gap-4 items-center mb-3">
                <label className="w-[15%]">Phone :</label>
                <input className="rounded p-2 w-[85%]" disabled value={user?.phone} />
            </div>}
            {user?.cell && <div className="flex gap-4 items-center">
                <label className="w-[15%]">Cell :</label>
                <input className="rounded p-2 w-[85%]" disabled value={user?.cell} />
            </div>}
        </div>
        </>
     );
}
 
export default ContactInfoPage;