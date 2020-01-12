import React from 'react';
import './index.css';

export class Modal extends React.PureComponent {
    constructor(props) {
        super(props);

        this.contentRef = React.createRef();
    }

    closeHandler = (event) => {
        if (this.contentRef.current &&
            event.target.closest('.modal__content') !== this.contentRef.current &&
            this.props.closeHandler) {
            this.props.closeHandler();
        }
    }

    render() {
        const {closeHandler} = this.props;

        return <div className='modal' onClick={this.closeHandler}>
            <div className='modal__content' ref={this.contentRef}>
                <button
                    onClick={closeHandler}
                    className='modal__close'
                    aria-label='close modal window'>
                    X
                </button>

                <div className='modal__content-wrapper'>
                    <div className='modal__content-column'>
                        <img
                            className='modal__image'
                            src='https://source.unsplash.com/331x205/?nature,water'
                            alt=''/>
                    </div>
                    <ul className='modal__content-column'>
                        <li className='modal__comment'>
                            <div className='modal__comment-date'>18.12.2019</div>
                            <div className='modal__comment-text'>
                                Отличное фото
                            </div>
                        </li>
                    </ul>
                </div>
                <form className='modal__add-comment'>
                    <label className='modal__input-wrapper'>
                        <input className='modal__input' type='text' name='name' />
                        <span className='modal__input-label'>Ваше имя</span>
                    </label>
                    <label className='modal__input-wrapper'>
                        <input className='modal__input' type='text' name='comment' />
                        <span className='modal__input-label'>Ваш комментарий</span>
                    </label>
                    <button className='modal__submit' type='submit'>
                        Оставить комментарий
                    </button>
                </form>
            </div>
        </div>
    }
}
