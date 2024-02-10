import * as React from 'react';
import { showErrorMessage } from '../../functions/Message';
import { AuthContext } from '../../AuthContext';
import { IoArrowForward } from "react-icons/io5";
import { IoArrowBack } from "react-icons/io5";

export interface IPaginationBlockProps {
}

export function PaginationBlock({ handlePageChange, currentPage, }: any) {

    const { auth, setAuth }: any = React.useContext(AuthContext)

    if (currentPage == 1) return (
        <div style={{ width: '80%', marginLeft: '10%', justifyContent: 'flex-start' }}>
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
        </div>
    )

    return (
        <div style={{ width: '80%', marginLeft: '10%', justifyContent: 'flex-start' }}>
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
        </div>
    );
}
