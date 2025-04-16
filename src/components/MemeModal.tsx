import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Input } from '@heroui/input';
import { Button } from '@heroui/button';
import { Meme } from '@/memeData';

interface MemeModalProps {
    isOpen: boolean;
    onClose: () => void;
    meme: Meme | null;
    onSave: (meme: Meme) => void;
}

const MemeModal: React.FC<MemeModalProps> = ({ isOpen, onClose, meme, onSave }) => {
    const [cookies, setCookie] = useCookies(['memes']);
    const [localMeme, setLocalMeme] = useState<Meme | null>(null);
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        if (meme) {
            setLocalMeme(meme);
        }
    }, [meme]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.key === 'Backspace' || e.key === 'Delete') && document.activeElement instanceof HTMLInputElement) {
                e.stopPropagation();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    if (!isOpen || !localMeme) return null;

    const handleChange = (field: keyof Meme, value: string | number) => {
        const updated = { ...localMeme, [field]: value };
        setLocalMeme(updated);

        if (field === 'image') {
            const isValidUrl = /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(value.toString());
            setImageError(!isValidUrl);
        }
    };

    const handleSave = () => {
        if (!localMeme) return;
        const updatedMemes: Meme[] = (cookies.memes || []).map((m: { id: number; }) => (m.id === localMeme.id ? localMeme : m));
        setCookie('memes', updatedMemes, { path: '/' });
        onSave(localMeme);
        onClose();
    };

    const inputClass = "flex flex-col gap-1";

    return (
        <div className="space-y-6 w-full max-w-3xl bg-white rounded-lg p-6 shadow-xl">
            <div className={inputClass}>
                <label className="text-sm font-medium text-gray-700">ID</label>
                <Input
                    value={localMeme.id.toString()}
                    readOnly
                    className="bg-gray-100 cursor-not-allowed"
                />
            </div>

            <div className={inputClass}>
                <label className="text-sm font-medium text-gray-700">Name</label>
                <Input
                    value={localMeme.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    required
                    minLength={3}
                    maxLength={100}
                    className="focus:ring-indigo-500"
                />
            </div>

            <div className={inputClass}>
                <label className="text-sm font-medium text-gray-700">Image URL</label>
                <Input
                    value={localMeme.image}
                    onChange={(e) => handleChange('image', e.target.value)}
                    type="url"
                    required
                    className={`focus:ring-indigo-500 ${imageError ? 'border-red-500' : ''}`}
                />
                {imageError && <p className="text-sm text-red-600">Please enter a valid image URL (must end in .jpg, .jpeg, .png, .gif, or .webp)</p>}
            </div>

            <div className={inputClass}>
                <label className="text-sm font-medium text-gray-700">Likes</label>
                <Input
                    value={localMeme.likes}
                    type="number"
                    onChange={(e) => handleChange('likes', Math.max(0, Math.min(99, Number(e.target.value))))}
                    required
                    min={0}
                    max={99}
                    className="focus:ring-indigo-500"
                />
            </div>

            <div className="flex justify-end space-x-4 pt-4">
                <Button
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-150"
                    onClick={handleSave}
                    disabled={imageError}
                >
                    Save
                </Button>
                <Button
                    variant="light"
                    className="text-gray-600 hover:text-gray-800"
                    onClick={onClose}
                >
                    Cancel
                </Button>
            </div>
        </div>
    );
};

export default MemeModal;