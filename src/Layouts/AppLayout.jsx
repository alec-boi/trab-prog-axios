import React from "react";
import Header from '../Components/Header';

const MainLayout = ({ children }) => {
    return (
        <div className="app h-screen w-full flex flex-col">
            <Header />
            <main className="w-full flex-1 font-roboto">{children}</main>
        </div>
    );
}

export default MainLayout;