import Alert from 'react-bootstrap/Alert';

const NotFound = () => {
    return (
    <> 
        <Alert variant='warning'>
            <Alert.Heading>Oh snap! This link is not existed!</Alert.Heading>
            <p>
            This link is not existed or has been deleted.
            </p>
        </Alert>
    </>)
}

export default NotFound;