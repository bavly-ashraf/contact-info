import { useParams } from "react-router-dom";

const ContactEditPage = () => {
    const {id} = useParams();
    
    return ( 
        <div>{id == 'New'? 'New':'Edit'} Contact page.</div>
     );
}
 
export default ContactEditPage;