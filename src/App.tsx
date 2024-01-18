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
import { checkAuth } from './functions/CheckAuth';
import AuthPage from './pages/Auth/AuthPage';
import { ToastContainer } from 'react-toastify';
import { AccesNotif } from './components/AccessNotif/AccesNotif';
import { MyTendersPage } from './pages/MyTenders/MyTendesPage';

function App() {

    const [auth, setAuth]:any = useState(false)


    useEffect(() => {
        checkAuth().then((auth) => setAuth(auth))
    }, [])

// @ts-ignore
    return (
        <Fragment>
            <ToastContainer />
            <Header />
            <Menu auth={auth} />

            {
                auth
                    ?
                    <Routes>
                        <Route path="/" element={<Catalog />} />
                        <Route path="/contracts" element={<ContractsPage />} />
                        <Route path="/tender/:id" element={<TenderCard />} />
                        <Route path='/personal' element={<PersonalPage />} />
                        <Route path="/auth" element={<AuthPage />} />
                        <Route path="/mytenders" element={<MyTendersPage auth={auth} />} />
                    </Routes>
                    :
                    <Routes>
                        <Route path="/" element={<Catalog />} />
                        <Route path="/auth" element={<AuthPage />} />

                    </Routes>
            }


        </Fragment>
    );
}

export default App;


