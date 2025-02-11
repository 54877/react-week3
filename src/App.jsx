import React, { useEffect } from "react";
import {Routes, Route} from "react-router-dom";
import Login from "./Login";
import IndexApp from "./IndexApp";
import Cookies from "js-cookie";
import axios from "axios";


function App() {
    useEffect(()=>{
      const token = Cookies.get('token')
      //避免未登入時取得token
      if(token){
        axios.defaults.headers.common['Authorization'] = token;
      }
    },[])


    return (
      <>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/IndexApp" element={<IndexApp />} />
        </Routes>
      </>
    );
}

export default App;

