import axios from 'axios';

const unsplashService = {
  getAllImages: async (page = 1) => {
    const response = await axios.get('https://api.unsplash.com/photos', {
      params: {
        page,
        client_id: 'rotoDwd-ys7g_EZJckoZJuQfCNbDDDTVz65UY85IB-8',
      },
    });

    return response;
  },

  getImages: async (query, page = 1) => {
    const response = await axios.get('https://api.unsplash.com/search/photos', {
      params: {
        query,
        page,
        client_id: 'rotoDwd-ys7g_EZJckoZJuQfCNbDDDTVz65UY85IB-8',
      },
    });

    return response;
  },

  getRandomImage: async () => {
    const response = await axios.get('https://api.unsplash.com/photos/random', {
      params: {
        client_id: 'rotoDwd-ys7g_EZJckoZJuQfCNbDDDTVz65UY85IB-8',
      },
    });

    return response;
  },
};

export default unsplashService;
