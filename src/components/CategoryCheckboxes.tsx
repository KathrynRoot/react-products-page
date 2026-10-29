import { useState } from "react";

type Props = {
    categories: string[];
    selectedCategories: string[];
    onCategoryChange: (
        category: string,
        checked: boolean
    ) => void;
};

export default function CategoryCheckboxes({ categories, selectedCategories, onCategoryChange }: Props) {
    // const [pending, setPending] = useState(true);
    return (
        <div id="categories">
            {categories.map((category) => 
                <label htmlFor={category} key={category}>
                    <input 
                        id={category}
                        value={category}
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={e => {
                            // console.log(pending);
                            // setPending(false);
                            // console.log(pending);
                            // setTimeout(() => {
                                onCategoryChange(category, e.target.checked)
                            // }, 1000);
                            // setPending(false);
                            // console.log(pending);
                            }
                        }
                        // onClick={() => {
                            
                            
                        // }}
                    />
                    {category}
                </label>
            )}
        </div>
    );
}
