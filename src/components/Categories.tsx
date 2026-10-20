// import { type Dispatch, type SetStateAction, useRef } from "react";

export function Categories() {
// ( 
//     {category, setCategory}: 
//         {
//         category: string; 
//         setCategory: Dispatch<SetStateAction<string>>;
//     }) 
    // {

    // const inputRef = useRef<HTMLInputElement>(null);
    return (
        <div className="search">
            <div className="category-checkboxes">
                <input type="checkbox" id="books" name="books" value="Books" 
                // onChange={setCategory()} 
                />
                <label htmlFor="books">
                    Books
                </label>
                <input type="checkbox" id="clothing" name="clothing" value="clothing" 
                // onChange={setCategory()} 
                />
                <label htmlFor="clothing">
                    clothing
                </label>
                <input type="checkbox" id="decoration" name="decoration" value="decoration" 
                // onChange={setCategory()} 
                />
                <label htmlFor="decoration">
                    decoration
                </label>
                <input type="checkbox" id="accessories" name="accessories" value="accessories" 
                // onChange={setCategory()} 
                />
                <label htmlFor="accessories">
                    accessories
                </label>
                <input type="checkbox" id="bedding" name="bedding" value="bedding" 
                // onChange={setCategory()} 
                />
                <label htmlFor="bedding">
                    bedding
                </label>
                <input type="checkbox" id="dining" name="dining" value="dining" 
                // onChange={setCategory()} 
                />
                <label htmlFor="dining">
                    dining
                </label>
            </div>
        </div>
    )
}