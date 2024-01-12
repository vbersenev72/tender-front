import * as React from 'react';


export function AuthPageInput(props: any) {
    return (

        <input onChange={(e: any) => props.setInput(e.target.value)} style={{ height: '40px' }} value={props.value} />

    );
}
