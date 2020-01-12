import React from 'react';
import './index.css';

export class Modal extends React.PureComponent {
    constructor(props) {
        super(props);

        this.contentRef = React.createRef();
        this.mounted = true;
        this.state = {
            infoLoaded: false,
            formData: {},
            dataSending: false,
            errors: {}
        };
    }

    componentDidMount() {
        const {id} = this.props;

        fetch(`https://boiling-refuge-66454.herokuapp.com/images/${id}`)
            .then(response => response.json())
            .then(data => {
                if (this.mounted && id === data.id) {
                    this.setState({
                        ...data,
                        infoLoaded: true
                    });
                }
            });
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    closeHandler = (event) => {
        if (this.contentRef.current &&
            event.target.closest('.modal__content') !== this.contentRef.current &&
            this.props.closeHandler) {
            this.props.closeHandler();
        }
    }

    renderLoader() {
        const {closeHandler} = this.props;

        return <div className='modal' onClick={this.closeHandler}>
            <div className='modal__content' ref={this.contentRef}>
                <button
                    onClick={closeHandler}
                    className='modal__close'
                    aria-label='close modal window'>
                    X
                </button>
                Loading ...
            </div>
        </div>
    }

    getDateStr(date) {
        const d = new Date(date),
            yy = d.getFullYear(),
            mm = (d.getMonth() + 1).toString().padStart(2, '0'),
            dd = d.getDate().toString().padStart(2, '0');

        return `${dd}.${mm}.${yy}`;
    }

    renderComment = (comment) => {
        const {id, text, date} = comment;

        return <li key={id} className='modal__comment'>
                <div className='modal__comment-date'>
                    {this.getDateStr(date)}
                </div>
                <div className='modal__comment-text'>
                    {text}
                </div>
            </li>;
    }

    changeInput = (event) => {
        const {target} = event,
            {name, value} = target,
            {formData} = this.state;

        this.setState({
            formData: {
                ...formData,
                [name]: value
            }
        });
    }

    submitForm = event => {
        event.preventDefault();

        const {formData} = this.state,
            {id} = this.props;

        this.setState({
            dataSending: true
        });

        fetch(`https://boiling-refuge-66454.herokuapp.com/images/${id}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            const {status} = response;

            if (status === 204) {
                this.setState({
                    dataSending: false,
                    formData: {},
                    errors: {}
                });

                return false;
            } else {
                return response.json();
            }
        })
        .then(data => {
            if (data) {
                this.setState({
                    dataSending: false,
                    errors: data.errors
                });
            }
        });
    }

    render() {
        const {closeHandler} = this.props,
            {infoLoaded, url, comments, formData, dataSending, errors} = this.state,
            {name = '', comment = ''} = formData;

        if (!infoLoaded) {
            return this.renderLoader();
        }

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
                            src={url}
                            alt=''/>
                    </div>
                    <ul className='modal__content-column'>
                        {comments && comments.length > 0 &&
                            comments.map(this.renderComment)}
                    </ul>
                </div>
                <form className='modal__add-comment' onSubmit={this.submitForm}>
                    <label className='modal__input-wrapper'>
                        <input
                            disabled={dataSending}
                            className='modal__input'
                            type='text'
                            name='name'
                            value={name}
                            onChange={this.changeInput}/>
                        <span className='modal__input-label'>Ваше имя</span>
                        {errors.name &&
                            <div>{errors.name}</div>}
                    </label>
                    <label className='modal__input-wrapper'>
                        <input
                            disabled={dataSending}
                            className='modal__input'
                            type='text'
                            name='comment'
                            value={comment}
                            onChange={this.changeInput}/>
                        <span className='modal__input-label'>Ваш комментарий</span>
                        {errors.comment &&
                            <div>{errors.comment}</div>}
                    </label>
                    <button className='modal__submit' type='submit' disabled={dataSending}>
                        Оставить комментарий
                    </button>
                </form>
            </div>
        </div>
    }
}
