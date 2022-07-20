import {
  Wrap,
  FormFormik,
  FormBtn,
  FormLabel,
  Input,
  IconBtn,
} from './Searchbar.styled';
import PropTypes from 'prop-types';
import { Formik } from 'formik';

export const Searchbar = ({ onSubmit }) => {
  const handleSubmit = (values, actions) => {
    if (!values.query) {
      return;
    }
    onSubmit(values);
    actions.resetForm();
  };

  return (
    <Wrap>
      <Formik initialValues={{ query: '' }} onSubmit={handleSubmit}>
        {({ setFieldValue }) => (
          <FormFormik>
            <FormBtn type="submit">
              <IconBtn />
              <FormLabel />
            </FormBtn>
            <Input
              onChange={e => {
                setFieldValue('query', e.target.value.toLowerCase().trim());
              }}
              type="text"
              name="query"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
            />
          </FormFormik>
        )}
      </Formik>
    </Wrap>
  );
};

Searchbar.propTypes = { onSubmit: PropTypes.func.isRequired };
