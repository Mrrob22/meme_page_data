import Link from 'next/link';
import React from "react";

const Navbar: React.FC = () => {
    return (
        <nav className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                <h1 className="text-3xl font-bold text-white">
                    MemeApp
                </h1>
                <div className="flex space-x-6">
                    <Link href="/">
                        <span className="text-white font-semibold hover:text-gray-200 transition ease-in-out duration-150">Table</span>
                    </Link>
                    <Link href="/list">
                        <span className="text-white font-semibold hover:text-gray-200 transition ease-in-out duration-150">List</span>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;