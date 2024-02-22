import * as React from 'react';
import { FaRegCopyright } from "react-icons/fa6";

export interface IMenuFooterProps {
}

export function MenuFooter(props: IMenuFooterProps) {
    return (
        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'column', color: '#C4C4C4' }}>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <div style={{padding: '2px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}><FaRegCopyright/></div>
                <p style={{padding: '2px'}}>2024</p>
                <p style={{padding: '2px'}}>TENDER</p>
            </div>
            <div>
                <p style={{textDecoration: 'underline'}}>Политика конфиденциальности</p>
            </div>
        </div>
    );
}