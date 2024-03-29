import * as React from 'react';
import { showErrorMessage } from '../../functions/Message';
import { AuthContext } from '../../AuthContext';
import { IoArrowForward } from "react-icons/io5";
import { IoArrowBack } from "react-icons/io5";
import { Footer } from '../Footer/Footer';
import { MenuContext } from '../../MenuContext';

export interface IPaginationBlockProps {
}

export function PaginationBlock({ handlePageChange, currentPage, countShowElements, setCountShowElements }: any) {

    const { auth, setAuth }: any = React.useContext(AuthContext)
    const { openMenu, setOpenMenu }: any = React.useContext(MenuContext);

    if (currentPage == 1) return (
        <div style={{ width: '80%', marginLeft: '10%', justifyContent: 'space-between', display: 'flex' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginBottom: '40px', padding: '14px', fontSize: '18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '90px' }}>
                    <p style={{ fontWeight: 'bold' }}>{currentPage}</p>
                    <p style={{ fontWeight: '' }}>{currentPage + 1}</p>
                    <p style={{ fontWeight: '' }}>{currentPage + 2}</p>
                    <p style={{ fontWeight: '' }}>... </p>
                </div>
                <div style={{ cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '6px' }} onClick={() => handlePageChange(currentPage + 1)}>
                    <IoArrowForward color='dodgerblue' size={30} />
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginBottom: '40px', padding: '14px', fontSize: '18px' }}>

                <div style={{ color: 'gray', margin: '10px' }}><p>Показать по</p></div>
                <div onClick={() => setCountShowElements(10)} style={{ cursor: 'pointer', margin: '10px', fontWeight: countShowElements == 10 ? 'bold' : '' }}><p>10</p></div>
                <div onClick={() => setCountShowElements(20)} style={{ cursor: 'pointer', margin: '10px', fontWeight: countShowElements == 20 ? 'bold' : '' }}><p>20</p></div>
                <div onClick={() => setCountShowElements(30)} style={{ cursor: 'pointer', margin: '10px', fontWeight: countShowElements == 30 ? 'bold' : '' }}><p>30</p></div>
                <div onClick={() => setCountShowElements(50)} style={{ cursor: 'pointer', margin: '10px', fontWeight: countShowElements == 50 ? 'bold' : '' }}><p>50</p></div>

            </div>
        </div>
    )

    return (
        <>
            <div style={{ width: '80%', marginLeft: '10%', justifyContent: 'space-between', display: 'flex' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginBottom: '40px', padding: '14px', fontSize: '18px' }}>

                    <div style={{ cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '6px' }} onClick={() => handlePageChange(currentPage - 1)}>
                        <IoArrowBack color='dodgerblue' size={30} />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '90px' }}>
                        <p style={{ fontWeight: '' }}>... </p>
                        <p style={{ fontWeight: '' }}>{currentPage - 1}</p>
                        <p style={{ fontWeight: 'bold' }}>{currentPage}</p>
                        <p style={{ fontWeight: '' }}>{currentPage + 1}</p>
                        <p style={{ fontWeight: '' }}>... </p>
                    </div>

                    <div style={{ cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '6px' }} onClick={() => handlePageChange(currentPage + 1)}>
                        <IoArrowForward color='dodgerblue' size={30} />
                    </div>

                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginBottom: '40px', padding: '14px', fontSize: '18px' }}>

                    <div style={{ color: 'gray', margin: '10px' }}><p>Показать по</p></div>
                    <div onClick={() => setCountShowElements(10)} style={{ cursor: 'pointer', margin: '10px', fontWeight: countShowElements == 10 ? 'bold' : '' }}><p>10</p></div>
                    <div onClick={() => setCountShowElements(20)} style={{ cursor: 'pointer', margin: '10px', fontWeight: countShowElements == 20 ? 'bold' : '' }}><p>20</p></div>
                    <div onClick={() => setCountShowElements(30)} style={{ cursor: 'pointer', margin: '10px', fontWeight: countShowElements == 30 ? 'bold' : '' }}><p>30</p></div>
                    <div onClick={() => setCountShowElements(50)} style={{ cursor: 'pointer', margin: '10px', fontWeight: countShowElements == 50 ? 'bold' : '' }}><p>50</p></div>

                </div>
            </div>
            <div style={{ width: openMenu ? '' : '', paddingLeft: openMenu ? '30%' : '7%', backgroundColor: 'white' }}><Footer/></div>
        </>

    );
}
