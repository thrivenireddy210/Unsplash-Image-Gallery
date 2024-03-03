import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';

const StarredImagesPage = ({ starredImages, onToggleStar }) => {
  return (
    <div>
      {starredImages.length === 0 ? (
        <p className="text-center text-gray-600">No starred images found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {starredImages.map((image) => (
            <div key={image.id} className="relative group">
              <img
                src={image.urls.regular}
                alt={image.alt_description}
                className="w-full h-40 object-cover rounded-md"
              />
              <div className="absolute top-2 right-2">
                <button
                  onClick={() => onToggleStar(image.id)}
                  className="text-yellow-400 group-hover:text-yellow-600 focus:outline-none"
                >
                  <FontAwesomeIcon icon={faStarSolid} className="text-2xl" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StarredImagesPage;
