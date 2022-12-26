import 'modern-normalize';
import { useState, useEffect } from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { Wrapper } from './App.styled';
import * as API from 'services/api';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { Greeting } from 'components/Greeting/Greeting';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { Notification } from 'components/Notification/Notification';

export const App = () => {
  const [imageHits, setImageHits] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalImages, setTotalImages] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (query === '') {
      return;
    }

    setLoading(true);

    API.fetchImages(query, page)
      .then(({ hits, totalHits }) => {
        setImageHits(prev => [...prev, ...hits]);
        setTotalImages(totalHits);
        setLoading(false);
      })
      .catch(error => {
        setError(true);
        setLoading(false);
        console.log(error);
      });
  }, [query, page]);

  const handleSearchSubmit = newQuery => {
    if (query === newQuery) {
      return;
    }

    setQuery(newQuery);
    setPage(1);
    setImageHits([]);

    window.scrollTo({ top: 0, left: 0 });
  };

  const handleLoadMore = () => setPage(prev => prev + 1);

  // computable data (обчислювані дані)
  const showImageGallery = imageHits.length > 0;
  const showLoadMore =
    showImageGallery && imageHits.length < totalImages && !loading;
  const showNoImages = totalImages === 0 && !loading;
  const showEndSearch =
    showImageGallery && imageHits.length === totalImages && !loading;

  return (
    <Wrapper>
      <Searchbar onSubmit={handleSearchSubmit} />
      {!loading && !error && <Greeting />}

      {loading && <Loader />}
      {error && (
        <Notification status="error">
          Something went wrong. Try changing the query
        </Notification>
      )}
      {showNoImages && (
        <Notification status="warning">
          Sorry, there are no images matching your search query. Please change
          the request
        </Notification>
      )}
      {showImageGallery && <ImageGallery images={imageHits} />}
      {showLoadMore && <Button onClick={handleLoadMore} />}
      {showEndSearch && (
        <Notification status="info">
          We're sorry, but you've reached the end of search results
        </Notification>
      )}
    </Wrapper>
  );
};
