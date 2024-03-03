import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarSolid, faStar } from '@fortawesome/free-solid-svg-icons';

const ImageGallery = ({ onToggleStar, images, starredImages }) => {
  const imagesArray = Array.isArray(images) ? images : [];

  if (imagesArray.length === 0) {
    return <p className="text-center text-gray-600">No results found.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {imagesArray.map((image) => {
        const isStarred = starredImages.some((starredImage) => starredImage.id === image.id);

        return (
          <div key={image.id} className="relative group">
            <img
              src={image.urls.regular}
              alt={image.alt_description}
              className="w-full h-40 object-cover rounded-md"
            />
            <div className="absolute top-2 right-2">
              <button
                onClick={() => onToggleStar(image.id)}
                className={`text-${isStarred ? 'yellow' : 'gray'}-400 group-hover:text-${isStarred ? 'yellow' : 'gray'}-600 focus:outline-none`}
              >
                <FontAwesomeIcon
                  icon={isStarred ? faStarSolid : faStar}
                  className="text-2xl"
                />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ImageGallery;
