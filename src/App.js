import './App.scss';
import Container from 'react-bootstrap/Container';
import Header from './components/Header';
import { ToastContainer} from 'react-toastify';
import { useEffect } from 'react';
import { useContext } from 'react';
import { UserContext } from './components/context/UserContext';
import AppRoutes from './routes/AppRoutes';


function App() {
  const {login} = useContext(UserContext);
  useEffect(() => {
    if(localStorage.getItem("token")){
      login(localStorage.getItem("email"), localStorage.getItem("token") );
    }
  },[])
  return (
    <>
    <div className='app-container'>
         <Header/>
         <Container>  
          <AppRoutes/>
         </Container>
       
    </div>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      />
    </>
  );
}

export default App;
