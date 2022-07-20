import { MoreBtn } from './Button.styled';
import PropTypes from 'prop-types';

export const Button = ({ onClick }) => (
  <MoreBtn onClick={onClick} type="submit">
    Load More
  </MoreBtn>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
