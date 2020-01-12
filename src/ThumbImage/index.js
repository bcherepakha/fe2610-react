import React from 'react';
import './index.css';

export function ThumbImage(props) {
    return <a
        href='/'
        className='thumb-image'
        onClick={(event) => { event.preventDefault(); props.action(props.id) }}>
        <img className='thumb-image__content' alt='' src={props.url} />
    </a>;
}
