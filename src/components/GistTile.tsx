import React from "react";
import { Gist, File } from "../types";

interface GistTileProps {
    gist: Gist;
    setFile: React.Dispatch<React.SetStateAction<File | undefined>>;
}

const GistTile: React.FC<GistTileProps> = ({ gist, setFile }) => {
    const description = gist.description
        ? gist.description
        : "No description available";
    return (
        <div className="container w-64 shadow-lg p-2">
            <div className="flex items-center">
                <img
                    className="object-contain h-12 rounded-full hover:rounded-lg mx-2"
                    src={gist.owner.avatar_url}
                    alt="avatar url"
                />
                <p className="line-clamp-2" title={description}>
                    {description}
                </p>
            </div>
            <hr className="m-2" />
            <div className="ml-6">
                {Object.keys(gist.files).map((filename, idx) => {
                    const file = gist.files[filename];
                    return (
                        <p
                            key={idx}
                            className="line-clamp-1"
                            title={file.filename}
                            onClick={() => setFile(file)}
                        >
                            {file.filename}
                        </p>
                    );
                })}
            </div>
        </div>
    );
};

export default GistTile;
