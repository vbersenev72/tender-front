import * as React from 'react';
import { FaRegCopyright } from "react-icons/fa6";

export function Footer() {


    return (
        <div id='footer_copyright' style={{ height: '70px', position: 'relative', bottom: '0', display: 'flex', justifyContent: 'flex-start', backgroundColor: 'white', width: '100%', padding: '20px', marginLeft: '0' }}>
            <p style={{ display: 'flex', alignItems: 'center', gap: '4px'}}>Copyright <FaRegCopyright /> 2024 TENDER. All rights reserved</p>
        </div>
    );
}
