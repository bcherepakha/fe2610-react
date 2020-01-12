import React from 'react';
import { ThumbImage } from './../ThumbImage';
import './index.css';

export function ContentList(props) {
    const { items } = props; // items = props.items

    return <ul className='content-list'>
        {items.map(item => (
            <li className='content-list__item' key={item.id}>
                <ThumbImage id={item.id} url={item.url} action={props.action} />
            </li>
        ))}
    </ul>;
}
