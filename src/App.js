import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import ImageGallery from './components/ImageGallery';
import StarredImagesPage from './components/StarredImagesPage';
import unsplashService from './services/unsplashService';

const App = () => {
  const [randomBackground, setRandomBackground] = useState('');
  const [starredImages, setStarredImages] = useState([]);
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isHomePage, setIsHomePage] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const searchSuggestions = ['birds', 'cats', 'cars', 'house', 'shoes'];
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    const fetchRandomBackground = async () => {
      try {
        const response = await unsplashService.getRandomImage();
        setRandomBackground(response.data.urls.regular);
      } catch (error) {
        console.error('Error fetching random background:', error);
      }
    };

    fetchRandomBackground();
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        let response;

        if (searchQuery && searchQuery.length >= 2) {
          response = await unsplashService.getImages(searchQuery, currentPage);
          setImages(response.data?.results);
        } else {
          response = await unsplashService.getAllImages(currentPage);
          setImages(response.data);
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, [searchQuery, currentPage]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prevIndex) => (prevIndex + 1) % searchSuggestions.length);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const handleToggleStar = (imageId) => {
    const isStarred = starredImages.some((image) => image.id === imageId);

    if (isStarred) {
      const updatedStarredImages = starredImages.filter((image) => image.id !== imageId);
      setStarredImages(updatedStarredImages);
    } else {
      const imageToAdd = images.find((image) => image.id === imageId);
      setStarredImages([...starredImages, imageToAdd]);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleToggleNavigation = () => {
    setIsHomePage(!isHomePage);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col items-center justify-center" style={{ backgroundImage: `url(${randomBackground})`, backgroundSize: 'cover' }}>
        <div className="bg-white bg-opacity-80 p-8 mt-2 mb-2 rounded-md shadow-md w-full max-w-2xl">
          <header className="text-center mb-8">
            <h1 className="text-4xl font-bold text-blue-600">Unsplash Image Gallery</h1>
            <p className="text-sm text-gray-600">Discover and save stunning images.</p>
          </header>

          <Routes>
            <Route path="/" element={<div className="mb-8"><input type="text" className="w-full p-3 border  border-blue-400 rounded-md focus:outline-none focus:ring focus:border-blue-600" placeholder={`Search for ${searchSuggestions[placeholderIndex]}...`} onChange={(e) => handleSearch(e.target.value)} /></div>} />
          </Routes>

          <div className="flex justify-end mb-4">
            <Link to={isHomePage ? "/starred" : "/"} className={`text-blue-600 hover:text-blue-800 focus:outline-none flex items-center font-bold ${isHomePage ? 'text-blue-800 bg-blue-100' : ''} py-2 px-4 rounded-full`} onClick={handleToggleNavigation}>
              <FontAwesomeIcon icon={isHomePage ? '' : faHome} className="mr-2" />
              {isHomePage ? ` View Starred Images (${starredImages.length})` : 'Back to Home'}
            </Link>
          </div>

          <Routes>
            <Route path="/starred" element={<StarredImagesPage starredImages={starredImages} onToggleStar={handleToggleStar} />} />
            <Route path="/" element={<ImageGallery onToggleStar={handleToggleStar} currentPage={currentPage} images={images} starredImages={starredImages} />} />
          </Routes>

          {isHomePage && images.length > 9 && (
            <div className="flex justify-between mt-4">
              <button className={`bg-blue-500 text-white px-4 py-2 rounded-full ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={handlePreviousPage} disabled={currentPage === 1}>
                Previous
              </button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-full" onClick={handleNextPage}>
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </Router>
  );
};

export default App;
