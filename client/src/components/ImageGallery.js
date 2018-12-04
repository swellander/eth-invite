import * as React from 'react';
import { getEventImages } from '../awsUtils/image';
import Masonry from 'react-masonry-css';

function getRandomSize(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};

class Gallery extends React.Component {
  state = {
    imageUrls: [],
  };
  componentDidMount() {
    const { eventId } = this.props;
    console.log('ID', eventId);
    getEventImages(eventId).then(imageUrls => {
      console.log('LOADED', imageUrls);
      this.setState({ imageUrls });
    });
  }
  render() {
    console.log('urls', this.state.imageUrls);

    return (
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {this.state.imageUrls.map(url => (
          <img
            style={{
              width: 200,
              height: getRandomSize(100, 300),
            }}
            src={url}
            alt="Event pic"
            key={url}
          />
        ))}
      </Masonry>
    );
  }
}

export default Gallery;
