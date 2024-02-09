import React, { Fragment, useContext } from 'react';
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
import { TagsPage } from './pages/Tags/Tags/TagsPage';
import { TagCard } from './pages/Tags/TagCard/TagCard';
import { AutoSearchPage } from './pages/AutoSearchPage/AutoSearchPage';
import { AutoSearchCard } from './pages/AutoSearchPage/AutoSearchCard/AutoSearchCard';
import { MenuContext } from './MenuContext';

function App() {

    const [auth, setAuth]: any = useState(false)
    const { openMenu, setOpenMenu }: any = useContext(MenuContext);

    async function getAllTags() {

        const getAllTags: any = await axios.get(`${process.env.REACT_APP_API}/api/tags/getall`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });

        const tags = JSON.stringify(getAllTags.data.message)
        return tags

    }


    async function getAllAutoSearches() {

        const getAll: any = await axios.get(`${process.env.REACT_APP_API}/api/autosearch/autosearches/all`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        const autoSearches = JSON.stringify(getAll.data.message)

        return autoSearches
    }



    useEffect(() => {
        checkAuth().then((auth) => setAuth(auth))

    }, [])

    // @ts-ignore
    return (
        <Fragment>
            <ToastContainer />
            <div style={{width: openMenu ? '80%' : '', marginLeft: openMenu ? '15%' : ''}}><Header /> </div>
            {/* <Header /> */}
            <Menu auth={auth} />

            {
                auth
                    ?
                    <Routes>
                        <Route path="/" element={<div style={{width: openMenu ? '80%' : '', marginLeft: openMenu ? '15%' : ''}}><Catalog /> </div>} />
                        <Route path="/contracts" element={<div style={{width: openMenu ? '80%' : '', marginLeft: openMenu ? '15%' : ''}}><ContractsPage /> </div>} />
                        <Route path="/tender/:id" element={<div style={{width: openMenu ? '80%' : '', marginLeft: openMenu ? '15%' : ''}}><TenderCard /> </div>} />
                        <Route path='/personal' element={<div style={{width: openMenu ? '80%' : '', marginLeft: openMenu ? '15%' : ''}}><PersonalPage /></div>} />
                        <Route path="/auth" element={<div style={{width: openMenu ? '80%' : '', marginLeft: openMenu ? '15%' : ''}}><AuthPage /> </div>} />
                        <Route path="/mytenders" element={<div style={{width: openMenu ? '80%' : '', marginLeft: openMenu ? '15%' : ''}}><MyTendersPage auth={auth} /> </div>} />

                        <Route path='/tags' element={<div style={{width: openMenu ? '80%' : '', marginLeft: openMenu ? '15%' : ''}}><TagsPage /> </div>} />
                        <Route path='/tags/:id' element={<div style={{width: openMenu ? '80%' : '', marginLeft: openMenu ? '15%' : ''}}> <TagCard /></div>} />

                        <Route path='/autosearch' element={<div style={{width: openMenu ? '80%' : '', marginLeft: openMenu ? '15%' : ''}}><AutoSearchPage /> </div>} />
                        <Route path='/autosearch/:id' element={<div style={{width: openMenu ? '80%' : '', marginLeft: openMenu ? '15%' : ''}}><AutoSearchCard /> </div>} />
                    </Routes>
                    :
                    <Routes>
                        <Route path="/" element={<div style={{width: openMenu ? '80%' : '', marginLeft: openMenu ? '15%' : ''}}><Catalog /> </div>} />
                        <Route path="/auth" element={<div style={{width: openMenu ? '80%' : '', marginLeft: openMenu ? '15%' : ''}}><AuthPage /> </div>} />
                    </Routes>
            }


        </Fragment>
    );
}

export default App;


