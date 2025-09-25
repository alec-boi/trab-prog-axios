import React, { useState, useEffect } from "react";
import axios from "axios";
import MainLayout from "../Layouts/AppLayout";

const Home = () => {
    const [artwork, setArtwork] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRandomArtwork = async () => {
            try {
                setLoading(true);

                // Fetch de IDs dos objetos de artes
                const idResponse = await axios.get(
                    "/metapi/public/collection/v1/objects"
                );
                const objectIds = idResponse.data.objectIDs;

                if (objectIds.length === 0) {
                    throw new Error("No artwork IDs found.");
                }

                let data = null;
                let imageUrl = null;
                let attempts = 0;
                const maxAttempts = 10;

                // Loop para encontrar arte com imagem
                while (imageUrl === null && attempts < maxAttempts) {
                    const randomId = objectIds[Math.floor(Math.random() * objectIds.length)];

                    const artworkResponse = await axios.get(
                        `/metapi/public/collection/v1/objects/${randomId}`
                    );
                    data = artworkResponse.data;

                    //checar se há imagem principal na arte escolhida
                    if (data.primaryImage && data.primaryImage.trim() !== '') {
                        imageUrl = data.primaryImage;
                    }

                    attempts++;
                }

                if (imageUrl === null) {
                    //usando randomização pode ocorrer diversas falhas ocasionalmente, como ocorreu com a chicago art institute API
                    throw new Error("Could not find an artwork with a primary image after several attempts.");
                }

                setArtwork({
                    title: data.title,
                    artist: data.artistDisplayName,
                    imageUrl,
                });

            } catch (err) {
                setError("Failed to fetch artwork. Please try again.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchRandomArtwork();
    }, []);

    if (loading) return <div className="text-red-500 text-xl">Loading...</div>;
    if (error) return <div className="text-red-500 text-xl">{error}</div>;

    const backgroundStyle = {
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${artwork.imageUrl}')`,
    };

    return (
        <MainLayout>
            <div
                style={backgroundStyle}
                className="absolute top-0 left-0 h-full w-full flex flex-col items-center p-10 pt-46 bg-cover bg-no-repeat text-white transition-all duration-1000 ease-in-out"
            >
                {artwork && (
                    <div className="text-center mt-auto mb-12">
                        <h1 className="text-4xl font-bold mb-2">{artwork.title}</h1>
                        <p className="text-xl italic">{artwork.artist}</p>
                    </div>
                )}
            </div>
        </MainLayout>
    );
};

export default Home;