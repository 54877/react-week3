import axios from "axios";
import {useState} from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";


const URL = import.meta.env.VITE_BASE_URL;

function Login() {
     const [formData, setFormData] = useState({
     username: "example@text.com",
     password: "example",
     });
    
     const goto = useNavigate()

     const [isAuth, setIsAuth] = useState(false);

     const inputSetFormData = (e)=>{
        const {value, name} = e.target;
        setFormData({
            ...formData,
            [name] : value
        });
     };

     const login = (e)=>{
        e.preventDefault()
        axios.post(`${URL}/v2/admin/signin` , formData)
            .then((res)=>{
                setIsAuth(true)
                Cookies.set('token' , res.data.token , {expires : 1, secure: true})
                Cookies.set('expires' , res.data.expires , {expires : 1,  secure: true})
                goto("./IndexApp")
            })
            .catch((err)=>{
                console.error(`登入失敗`, err)
                alert(`登入失敗`)
            })
     }

    return (
        <div>
            <div className="container login">
          <div className="row justify-content-center">
            <h1 className="h3 mb-3 font-weight-normal">請先登入</h1>


            <div className="col-8">
              <form  onSubmit={login} id="form" className="form-signin">
                <div className="form-floating mb-3">
                  <input
                  type="email" 
                  className="form-control" id="username" name="username" placeholder="name@example.com" value={formData.username} required autoFocus onChange={inputSetFormData}/>
                  <label htmlFor="username">Email address</label>
                </div>
                <div className="form-floating">
                  <input  type="password"  className="form-control"  id="password" name="password" placeholder="Password" value={formData.password}  required onChange={inputSetFormData}/>
                  <label htmlFor="password">Password</label>
                </div>
                <button className="btn btn-lg btn-primary w-100 mt-3" type="submit">登入</button>
              </form>
            </div>
          </div>
          <p className="mt-5 mb-3 text-muted">&copy; 2024~∞ - 六角學院</p>
        </div>
        </div>
    );
}

export default Login;



