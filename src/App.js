import React from 'react';
import { ContentList } from './ContentList';
import { Modal } from './Modal';
import './App.css';

class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentDate: new Date(),
      images: null,
      showImage: 237
    };
  }

  componentDidMount() {
    fetch('https://boiling-refuge-66454.herokuapp.com/images')
      .then(response => response.json())
      .then(images => {
        this.setState({images})
      });
  }

  closeModal = () => {
    this.setState({showImage: null});
  }

  showImage = (imageId) => {
    console.log(imageId);
    this.setState({showImage: imageId});
  }

  render() {
    const {currentDate, images, showImage} = this.state;

    return (
      <>
        <h1 className="app-header">
          Test App
        </h1>
        <main className="app-content">
          {images
            ? <ContentList items={images} action={this.showImage} />
            : 'Loading...'}
        </main>
        {
          showImage && <Modal
            id={showImage}
            closeHandler={this.closeModal} />
        }
        <footer className="app-footer">
          © 2018 - {currentDate.getFullYear()}
        </footer>
      </>
    );
  }
}

export default App;
