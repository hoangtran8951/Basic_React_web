import { useEffect, useState } from 'react';
import './Login.scss'
import { postLoginRequest } from '../services/UserService';
import { toast } from 'react-toastify';
import { Navigate, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from './context/UserContext';
const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isActive, setIsActive] = useState(false);
    const [isShowPassword, setIsShoPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [response, setRes] = useState(null);
    const navigate = useNavigate();
    const {login} = useContext(UserContext);

    useEffect(() => {
        let token = localStorage.getItem('token');
        if(token){
            toast.success("You've already logged in");
            navigate("/");
        }
    },[navigate])
    useEffect(() => {
        if(username !== "" && password !== "")
            setIsActive(true);
        else 
            setIsActive(false);
        if(password === "")
            setIsShoPassword(false);
        console.log(username, password);
    },[username, password, isActive])
    const LoginReq = async () => {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let trimEmail = username.trim();
        console.log(username, password);
        if ( re.test(trimEmail) ) {
            setIsLoading(true);
            console.log(trimEmail, password);
            let res = await postLoginRequest(trimEmail, password);
            setRes(res);
            setIsLoading(false);
            if(res && res.token){
                login(username, res.token);
            toast.success("you logged in succeed");
            }
            else{
                toast.error(`Your Email and/or Password are incorrect (use email: "eve.holt@reqres.in" for testing`);
            }
        }
        else {
            // invalid email, maybe show an error to the user.
            toast.error(`Your Email is invalid (use email: "eve.holt@reqres.in" for testing`);
        }
    }
    const handlePressEnter = (event) => {
        if(event && event.key === "Enter"){
            if(username !== "" && password !== "")
                LoginReq();
        }
    }
   

    return (
    <>
        <div className="login-container col-12 col-sm-4">
            {response && response.token && <Navigate to="/" replace={true}/>}
            <div className="title">Login</div>
            <div className="text">Email</div>
            <input type='text' placeholder='Email...' value={username} 
                onChange={(event) => setUsername(event.target.value)} 
                onKeyDown={(event) => handlePressEnter(event)}
                onClick={(event) => setUsername(event.target.value)}
                
                />
            <div className='password-input'>
                <input type={((isShowPassword && password !== "")? 'text' : 'password')} placeholder='Password...' value={password} 
                    onChange={(event) => setPassword(event.target.value)}
                    onKeyDown={(event) => handlePressEnter(event)}
                    />
                <i className={((isShowPassword && password !== "")? "fa-solid fa-eye" : "fa-solid fa-eye-slash")}  onClick={() => setIsShoPassword(!isShowPassword)}></i>
            </div>
            <button disabled={!isActive} onClick={() => {!isLoading && LoginReq()}}>
                {isLoading ? <i className="fa-solid fa-spinner fa-spin-pulse"></i> : <span>Login</span>} 
            </button>
            <div className='back' onClick={()=>navigate("/")}><i className="fa-solid fa-chevron-left"></i> <span className='text-back'>Go back</span></div>
        </div>
    
    </>
    )
}
export default Login;