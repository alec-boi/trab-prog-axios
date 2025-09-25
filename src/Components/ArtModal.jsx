import React from 'react';

const ArtworkModal = ({ artwork, onClose }) => {
    if (!artwork) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="fixed inset-0 bg-black opacity-75"
                onClick={onClose}
            ></div>

            <div className="bg-white text-black rounded-lg shadow-xl overflow-hidden w-full max-w-lg max-h-[90vh] z-50 relative flex flex-col">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl font-bold z-10"
                >
                    &times;
                </button>
                <div className="p-6 flex flex-col items-center overflow-y-auto">
                    <img
                        src={artwork.imageUrl}
                        alt={artwork.title}
                        className="w-full h-auto object-contain rounded-md mb-4"
                    />
                    <h2 className="text-2xl font-bold mb-1">{artwork.title}</h2>
                    <p className="text-lg italic">{artwork.artist}</p>
                </div>
            </div>
        </div>
    );
};

export default ArtworkModal;