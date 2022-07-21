import { useEffect } from 'react';
import { Overlay, ImageModal } from './Modal.styled';
import PropTypes from 'prop-types';

export const Modal = ({ src, alt, onModalClose }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onModalClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onModalClose]);

  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      onModalClose();
    }
  };

  return (
    <Overlay onClick={handleOverlayClick}>
      <ImageModal>
        <img src={src} alt={alt} />
      </ImageModal>
    </Overlay>
  );
};

Modal.propsTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onImageClick: PropTypes.func.isRequired,
};
