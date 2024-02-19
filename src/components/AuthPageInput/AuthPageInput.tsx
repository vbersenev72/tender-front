import * as React from 'react';


export function AuthPageInput(props: any) {
    return (

        <input onChange={(e: any) => props.setInput(e.target.value)} style={{ height: '40px', border: '0.6px solid #D6D6D6' }} value={props.value} />

    );
}
