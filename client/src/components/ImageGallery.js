import * as React from 'react';
import Masonry from 'react-masonry-component';
import { getEventImages } from '../awsUtils/image';

const masonryOptions = {
  transitionDuration: 0
};

const imagesLoadedOptions = { background: '.my-bg-image-el' }

class Gallery extends React.Component {
  state = {
    imageUrls: []
  }
  componentDidMount() {
    const { eventId } = this.props;
    console.log('ID', eventId)
    getEventImages(eventId)
      .then(imageUrls => {
        console.log('LOADED', imageUrls)
        this.setState({ imageUrls })
      });
  }
  render() {
    console.log('urls', this.state.imageUrls)

    return (
      <Masonry
        className={'my-gallery-class'} // default ''
        elementType={'ul'} // default 'div'
        options={masonryOptions} // default {}
        disableImagesLoaded={false} // default false
        updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
        imagesLoadedOptions={imagesLoadedOptions} // default {}
      >
        {
          this.state.imageUrls.map(function (url) {
            return (
              <div key={url} className="image-element-class">
                <img src={url} />
              </div>
            );
          })
        }
      </Masonry>
    );
  }
}

export default Gallery;