import 'modern-normalize';
import { useState, useEffect } from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { Wrapper } from './App.styled';
import * as API from 'services/api';
import { Searchbar } from 'components/Searchbar/Searchbar';
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

  return (
    <Wrapper>
      <Searchbar onSubmit={handleSearchSubmit} />

      {loading && <Loader />}

      {error && (
        <Notification status="error">
          Something went wrong. Try changing the query
        </Notification>
      )}

      {totalImages === 0 && !loading && (
        <Notification status="warning">
          Sorry, there are no images matching your search query. Please change
          the request
        </Notification>
      )}

      {imageHits.length > 0 && (
        <>
          <ImageGallery
            images={imageHits}
            // onImageClick={this.handleModalImage}
          />
          {imageHits.length < totalImages ? (
            <Button onClick={handleLoadMore} />
          ) : (
            <Notification status="info">
              We're sorry, but you've reached the end of search results
            </Notification>
          )}
        </>
      )}
    </Wrapper>
  );
};

// export default class App extends Component {
//   state = {
//     imageHits: [],
//     query: '',
//     page: 1,
//     totalImages: null,
//     loading: false,
//     error: false,
//   };

//   async componentDidUpdate(_, prevState) {
//     const prevQuery = prevState.query;
//     const nextQuery = this.state.query;
//     const prevPage = prevState.page;
//     const nextPage = this.state.page;

//     if (prevQuery !== nextQuery || prevPage !== nextPage) {
//       try {
//         this.setState(() => ({ loading: true }));
//         const { hits, totalHits } = await API.fetchImages(nextQuery, nextPage);
//         this.setState(state => ({
//           imageHits: [...state.imageHits, ...hits],
//           totalImages: totalHits,
//           loading: false,
//         }));
//       } catch (error) {
//         this.setState({ error: true, loading: false });
//         console.log(error);
//       }
//     }
//   }

//   handleSearchSubmit = ({ query }) => {
//     if (this.state.query === query) {
//       return;
//     }

//     this.setState({
//       query: query,
//       page: 1,
//       imageHits: [],
//     });

//     window.scrollTo({ top: 0, left: 0 });
//   };

//   handleLoadMore = () =>
//     this.setState(({ page }) => ({
//       page: page + 1,
//     }));

//   render() {
//     const { imageHits, totalImages, loading, error } = this.state;

//     return (
//       <Wrapper>
//         <Searchbar onSubmit={this.handleSearchSubmit} />

//         {loading && <Loader />}

//         {error && (
//           <Notification status="error">
//             Something went wrong. Try changing the query
//           </Notification>
//         )}

//         {totalImages === 0 && !loading && (
//           <Notification status="warning">
//             Sorry, there are no images matching your search query. Please change
//             the request
//           </Notification>
//         )}

//         {imageHits.length > 0 && (
//           <>
//             <ImageGallery
//               images={imageHits}
//               onImageClick={this.handleModalImage}
//             />
//             {imageHits.length < totalImages ? (
//               <Button onClick={this.handleLoadMore} />
//             ) : (
//               <Notification status="info">
//                 We're sorry, but you've reached the end of search results
//               </Notification>
//             )}
//           </>
//         )}
//       </Wrapper>
//     );
//   }
// }
