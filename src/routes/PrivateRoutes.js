import { useContext } from "react";
import { UserContext } from "../components/context/UserContext";
import Alert from 'react-bootstrap/Alert';

const PrivateRoutes = (props) => {
    const {user} = useContext(UserContext);
    if(user && user.auth === false){
        // toast.error("You don't have permission the access this page");
        return (<>
            <Alert variant="danger" >
                <Alert.Heading>Oh snap! You don't have permission to use this page.</Alert.Heading>
                <p>
                If you want to access the page, please logged in first.
                </p>
            </Alert>
        </>)
    }
    return(
        props.children
    )
    
}

export default PrivateRoutes;