import { Link } from "react-router-dom";

const ContactCardComponent = ({name,picture,phoneNumber,email,id}) => {
    return ( 
        <>
        <div className="card card-side bg-base-100 shadow-xl w-[30%]">
            <figure>
                <img
                className="rounded-lg"
                src={picture}
                alt={name} />
            </figure>
            <div className="card-body">
                <h2 className="card-title m-auto">{name}</h2>
                <p>{phoneNumber}</p>
                <p>{email}</p>
                <div className="card-actions justify-end">
                <Link to={`/contact-info/${id}`} className="btn btn-primary">View Contact Details</Link>
                </div>
            </div>
        </div>
        </>
     );
}
 
export default ContactCardComponent;