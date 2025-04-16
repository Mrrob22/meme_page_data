import Navbar from '../components/Navbar';
import MemeList from '../components/MemeList';
import React from "react";

const List: React.FC = () => {
    return (
        <div>
            <Navbar />
            <MemeList />
        </div>
    );
};

export default List;