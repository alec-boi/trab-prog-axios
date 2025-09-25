import React, { useState, useEffect } from "react";
import axios from "axios";
import MainLayout from "../Layouts/AppLayout";
import ArtworkModal from "../Components/ArtModal";

const List = () => {
    const [artworks, setArtworks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedArtwork, setSelectedArtwork] = useState(null);

    useEffect(() => {
        const fetchArtworks = async () => {
            try {
                setLoading(true);

                //buscando lista de cerca de 30 objetos utilizando o mesmo método que antes
                const searchResponse = await axios.get(
                    "/metapi/public/collection/v1/search?q=painting&hasImages=true"
                );
                const objectIds = searchResponse.data.objectIDs.slice(0, 30);

                const validArtworks = [];
                //fetching subsequente em loop para evitar bad requests
                for (const id of objectIds) {
                    const artworkResponse = await axios.get(
                        `/metapi/public/collection/v1/objects/${id}`
                    );
                    const data = artworkResponse.data;

                    if (data.primaryImage && data.primaryImage.trim() !== '') {
                        validArtworks.push({
                            id: data.objectID,
                            title: data.title,
                            artist: data.artistDisplayName,
                            imageUrl: data.primaryImage,
                        });
                    }

                    //uso de set timeout para estabelecer intervalos entre cada promessa
                    await new Promise(resolve => setTimeout(resolve, 50));
                }

                setArtworks(validArtworks);

            } catch (err) {
                setError("Failed to fetch artworks. Please try again.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchArtworks();
    }, []);


    const openModal = (artwork) => {
        setSelectedArtwork(artwork);
    };

    const closeModal = () => {
        setSelectedArtwork(null);
    };

    if (loading) return <div className="text-red-500 text-xl mt-10">Loading...</div>;
    if (error) return <div className="text-red-500 text-xl mt-10">{error}</div>;

    return (
        <MainLayout>
            <div className="p-10">
                <h1 className="text-4xl font-bold text-center text-red-500 mb-8">Artworks</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {artworks.map((artwork) => (
                        <div
                            key={artwork.id}
                            className="bg-gray-800 rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-105"
                            onClick={() => openModal(artwork)}
                        >
                            <img
                                src={artwork.imageUrl}
                                alt={artwork.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h2 className="text-xl font-semibold text-red-500 truncate">{artwork.title}</h2>
                                <p className="text-sm text-gray-400 italic truncate">{artwork.artist}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <ArtworkModal artwork={selectedArtwork} onClose={closeModal} />
        </MainLayout>
    );
};

export default List;