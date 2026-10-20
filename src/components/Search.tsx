import { type Dispatch, type SetStateAction, useRef } from "react";

export function Search( {searchQuery, setSearchQuery}: 
        {
        searchQuery: string; 
        setSearchQuery: Dispatch<SetStateAction<string>>;
    }) {

    const inputRef = useRef<HTMLInputElement>(null);
    return (
        <div className="search">
            <div className="search-bar">
                <label htmlFor="search">
                    Search Products:
                </label>
                <div>
                    <input
                        ref={inputRef}
                        value={searchQuery}
                        onChange={(e) => { setSearchQuery(e.target.value); }}
                        placeholder="search..."
                        name="search"
                        id="search"
                        type="text"
                    />
                </div>
            </div>
        </div>
    )
}