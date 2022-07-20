import axios from 'axios';

const API_KEY = 'key=27754305-6c0117069a54d6a4ab2d99661';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export const fetchImages = async (query, page) => {
  const PER_PAGE = 'per_page=12';

  try {
    const response = await axios.get(
      `/?q=${query}&page=${page}&${API_KEY}&image_type=photo&orientation=horizontal&${PER_PAGE}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
