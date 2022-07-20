import { TailSpin } from 'react-loader-spinner';
import { Spinner } from './Loader.styled';

export const Loader = () => (
  <Spinner>
    <TailSpin height="120" width="120" color="#4679e6" />
  </Spinner>
);
