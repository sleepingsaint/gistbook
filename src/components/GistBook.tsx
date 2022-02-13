import { Gist, File } from "../types";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import GistTile from "./GistTile";
import CustomEditor from "./CustomEditor";

const GistBook: React.FC = () => {
    const [gists, setGists] = useState<Gist[]>([]);
    const [file, setFile] = useState<File>();
    const [page, setPage] = useState<number>(1);

    const getGists = () => {
        fetch(`https://api.github.com/gists/public?page=${page}`)
            .then((data) => data.json())
            .then((data) => {
                console.log(data);
                setGists((gists) => [...gists, ...data]);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        getGists();
    }, [page]);

    return (
        <div className="flex">
            <InfiniteScroll
                style={{
                    overflow: "hidden",
                    overflowY: "scroll",
                    width: "17rem",
                    height: "100%",
                }}
                className="scrollbar-hide"
                dataLength={gists.length}
                hasMore={gists.length !== 3000}
                next={() => setPage((page) => page + 1)}
                loader={<div>Loading Gists...</div>}
            >
                {gists.map((gist, idx) => (
                    <GistTile gist={gist} key={idx} setFile={setFile} />
                ))}
            </InfiniteScroll>

            <CustomEditor file={file} />
        </div>
    );
};

export default GistBook;
