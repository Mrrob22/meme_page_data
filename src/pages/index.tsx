import Navbar from '@/components/Navbar';
import MemeTable from '../components/MemeTable';
import React from "react";

const Home: React.FC = () => {
    return (
        <div>
            <Navbar />
            <MemeTable />
        </div>
    );
};

export default Home;