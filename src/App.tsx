import React, { Fragment } from 'react';
import { useState, useEffect } from 'react';
import { TenderCard } from "./pages/TenderCard/TenderCard";
import { Header } from "./components/Header/Header";
import { Menu } from "./components/Menu/Menu";
import JsonRenderer from "./pages/JsonRenderer";
import { Catalog } from "./pages/Catalog/Catalog";
import { FlexTextColumn } from "./containers/containers";
import { Route, Router, Routes } from "react-router-dom";
import { ContractsPage } from "./pages/ContractsPage/ContractsPage";
import axios from 'axios'
import { PersonalPage } from './pages/Personal/PersonalPage';

async function checkAuth() {

    const token = localStorage.getItem('token')

    if (token) {
        const response = await axios.post('/api/auth/auth', {}, {
            headers: {
                authorization: token
            }
        })

        if (response.status == 400 || response.status == 401) {
            // console.log('Вы не авторизованы');
        } else {
            const token = response.data.token
            localStorage.setItem('token', token)

            return true
        }
    } 

    console.log('Вы не авторизованы');
    

    return false

}


function App() {

    const [auth, useAuth] = useState<boolean>(false)

    useEffect(() => { 
         checkAuth()
     })


    return (
        <Fragment>
            <Header />
            <Menu />
            <Routes>
                {/*<TenderCard />*/}
                <Route path="/" element={<Catalog />} />
                <Route path="/contracts" element={<ContractsPage />} />
                <Route path="/tender/:id" element={<TenderCard />} />
                {/* <Route path="/testtender" element={<TenderCard />} /> */}
                <Route path='/personal' element={<PersonalPage/>} />
                {/*<JsonRenderer data={test_data} />*/}
            </Routes>
        </Fragment>
    );
}

export default App;


