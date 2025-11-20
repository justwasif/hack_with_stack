import React from "react";
import Header from "./Header";
import Chatbot from "./Chatbot";
import Home from "./Home";
import RegisterS from "./RegisterSite";
import { Outlet } from "react-router-dom";

export default function(){
    return(
        <div>
        <Header/>
        <Outlet/>

        </div>
    )
}