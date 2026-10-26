type Props = {
    categories: string[];
    selectedCategories: string[];
    onCategoryChange: (
        category: string,
        checked: boolean
    ) => void;
};

export default function CategoryCheckboxes({ categories, selectedCategories, onCategoryChange }: Props) {
    return (
        <div id="categories">
            {categories.map((category) => 
                <label htmlFor={category} key={category}>
                    <input 
                        id={category}
                        value={category}
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={e => onCategoryChange(category, e.target.checked)}
                    />
                    {category}
                </label>
            )}
        </div>
    );
}
