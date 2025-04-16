import React, { useState, useEffect, useRef } from 'react';
import { useCookies } from 'react-cookie';
import {
    Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
} from '@heroui/table';
import { Button } from '@heroui/button';
import memes, { Meme } from '../memeData';
import MemeModal from './MemeModal';

const MemeTable: React.FC = () => {
    const [cookies, setCookie] = useCookies(['memes']);
    const [memeList, setMemeList] = useState<Meme[]>([]);
    const [selectedMeme, setSelectedMeme] = useState<Meme | null>(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalStyle, setModalStyle] = useState<React.CSSProperties>({});

    const tableContainerRef = useRef<HTMLDivElement>(null);
    const rowRefs = useRef<Record<number, HTMLDivElement | null>>({});

    useEffect(() => {
        const isValid = Array.isArray(cookies.memes) && cookies.memes.every(m => typeof m.id === 'number');
        setMemeList(isValid ? cookies.memes : memes);
        if (!isValid) {
            setCookie('memes', memes, { path: '/' });
        }
    }, []);

    const openEditModal = (meme: Meme) => {
        const ref = rowRefs.current[meme.id];
        const container = tableContainerRef.current;

        if (ref && container) {
            const rect = ref.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();

            const left = Math.min(
                Math.max(rect.left + window.scrollX, containerRect.left + window.scrollX),
                containerRect.right + window.scrollX - 384 // 384px = w-96
            );

            const top = rect.bottom + window.scrollY + 8;

            setModalStyle({
                position: 'absolute',
                top,
                left,
                zIndex: 50
            });

            setSelectedMeme(meme);
            setModalOpen(true);
        }
    };

    const handleSave = (updatedMeme: Meme) => {
        const updated = memeList.map((meme) => (meme.id === updatedMeme.id ? updatedMeme : meme));
        setMemeList(updated);
        setCookie('memes', updated, { path: '/' });
        setModalOpen(false);
    };

    return (
        <div className="relative max-w-6xl mx-auto px-4 py-8" ref={tableContainerRef}>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Meme Table</h2>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <Table className="min-w-full text-sm text-gray-700">
                    <TableHeader>
                        <TableColumn className="bg-gray-100 px-6 py-4 text-left font-semibold">ID</TableColumn>
                        <TableColumn className="bg-gray-100 px-6 py-4 text-left font-semibold">Name</TableColumn>
                        <TableColumn className="bg-gray-100 px-6 py-4 text-left font-semibold">Likes</TableColumn>
                        <TableColumn className="bg-gray-100 px-6 py-4 text-left font-semibold">Actions</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {memeList.map((meme) => (
                            <TableRow
                                key={meme.id}
                                className="hover:bg-gray-50 transition duration-150"
                            >
                                <TableCell className="px-6 py-4 border-b border-gray-200">
                                    <div ref={(el) => { rowRefs.current[meme.id] = el; }}>{meme.id}</div>
                                </TableCell>
                                <TableCell className="px-6 py-4 border-b border-gray-200">{meme.name}</TableCell>
                                <TableCell className="px-6 py-4 border-b border-gray-200">{meme.likes}</TableCell>
                                <TableCell className="px-6 py-4 border-b border-gray-200">
                                    <Button
                                        className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-150"
                                        onClick={() => openEditModal(meme)}
                                    >
                                        Edit
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {isModalOpen && selectedMeme && (
                <div
                    style={modalStyle}
                    className="absolute bg-white rounded-lg shadow-2xl border w-96 p-6"
                >
                    <MemeModal
                        isOpen={isModalOpen}
                        onClose={() => setModalOpen(false)}
                        meme={selectedMeme}
                        onSave={handleSave}
                    />
                </div>
            )}
        </div>
    );
};

export default MemeTable;