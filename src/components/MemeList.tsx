import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Card, CardHeader, CardBody, CardFooter } from '@heroui/card';
import { Image } from '@heroui/image';
import memes, { Meme } from '../memeData';

const MemeList: React.FC = () => {
    const [cookies] = useCookies(['memes']);
    const [memeList, setMemeList] = useState<Meme[]>(memes);

    useEffect(() => {
        if (cookies.memes && JSON.stringify(cookies.memes) !== JSON.stringify(memeList)) {
            setMemeList(cookies.memes);
        }
    }, [cookies.memes]);

    const renderedMemes = React.useMemo(() => {
        return memeList.map((meme) => (
            <Card key={meme.id} className="shadow-xl rounded-lg overflow-hidden bg-white hover:shadow-2xl transition-shadow duration-200">
                <CardHeader>
                    <Image src={meme.image} alt={meme.name} className="w-full h-52 object-cover" />
                </CardHeader>
                <CardBody className="p-4">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{meme.name}</h3>
                    <p className="text-gray-500 font-medium">👍 {meme.likes}</p>
                </CardBody>
                <CardFooter className="p-4">
                    <a
                        href={meme.link}
                        className="inline-block bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-4 py-2 rounded-md hover:from-purple-600 hover:to-indigo-700 transition duration-200"
                    >
                        View Meme
                    </a>
                </CardFooter>
            </Card>
        ));
    }, [memeList]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 container mx-auto py-8 px-4">
            {renderedMemes}
        </div>
    );
};

export default MemeList;