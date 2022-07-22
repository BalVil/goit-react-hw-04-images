import { useState } from 'react';
import { createPortal } from 'react-dom';
import { GalleryItem, Image } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';
import { Modal } from 'components/Modal/Modal';

export const ImageGalleryItem = ({ smallSize, tags, largeSize }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <>
      <GalleryItem onClick={link => setSelectedImage(link)}>
        <Image src={smallSize} alt={tags} />
      </GalleryItem>

      {selectedImage &&
        createPortal(
          <Modal
            src={largeSize}
            alt={tags}
            onModalClose={link => setSelectedImage(link)}
          />,
          document.querySelector('#modal-root')
        )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  tags: PropTypes.string.isRequired,
  smallSize: PropTypes.string.isRequired,
  largeSize: PropTypes.string.isRequired,
};
