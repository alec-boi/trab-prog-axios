import React from "react";
import MainLayout from "../Layouts/AppLayout";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <MainLayout>
            <div className="absolute top-0 left-0 h-full w-full flex flex-col items-center p-10 pt-46 bg-gray-200">
                <h1 className="text-3xl text-center text-red-500 font-plex font-bold pb-8">Meet Our Very Talented Team!</h1>

                <p className="w-1/2 text-lg text-center text-white text-shadow-sm text-shadow-black/30 font-roboto">Our team is composed of a singular genius of his own area. This website is permeated by its... impressive genius... using some kind of fucking SVG as a damn header, but that's also ok. Our goal is to spread knowledge about art to the rest of the world in a way that's not only fun but also doesn't waste too much time.</p>
            
                <div className="flex items-center justify-center gap-4 pt-10">
                    <Link className="px-4 py-2 shadow-lg bg-red-700 text-white rounded" to="/">Go to Home, now illuminated</Link>
                    <Link className="px-4 py-2 shadow-lg text-white text-shadow-sm text-shadow-black/30 bg-gradient-to-br from-white/75 to-white/20 rounded" to="/">Go to Home also, I guess</Link>
                </div>
            </div>
        </MainLayout>
    );
}

export default Home;