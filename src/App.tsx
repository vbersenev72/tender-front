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
import { TagsPage } from './pages/Tags/Tags/TagsPage';
import { TagCard } from './pages/Tags/TagCard/TagCard';
import { AutoSearchPage } from './pages/AutoSearchPage/AutoSearchPage';
import { AutoSearchCard } from './pages/AutoSearchPage/AutoSearchCard/AutoSearchCard';

function App() {

    const [auth, setAuth]: any = useState(false)

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
        getAllTags().then((tags) => localStorage.setItem('tags', tags)).catch(() => console.log('Не авторизован'))
        getAllAutoSearches().then((autoSearches) => localStorage.setItem('autosearches', autoSearches)).catch(() => console.log('Не авторизован'))
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

                        <Route path='/tags' element={<TagsPage />} />
                        <Route path='/tags/:id' element={<TagCard />} />

                        <Route path='/autosearch' element={<AutoSearchPage />} />
                        <Route path='/autosearch/:id' element={<AutoSearchCard />} />
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


