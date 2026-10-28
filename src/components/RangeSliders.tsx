import { useMemo, useState } from "react";

interface RangeSliderProps {
    min?: number;
    max?: number;
    step?: number;
    initialMin?: number;
    initialMax?: number;
    onChange?: (minPrice: number, maxPrice: number) => void;
}

export default function RangeSliders({
    min = 0, max= 99, step = 1, initialMin = 0, initialMax = 99, onChange,
    }: RangeSliderProps) {
          const [minPrice, setMinPrice] = useState(initialMin);
          const [maxPrice, setMaxPrice] = useState(initialMax);
          
        const handleMinChange = (value: number) => {
            if (Number.isNaN(value)) return;
            const newMin = Math.min(maxPrice - step, Math.max(min, value));
            setMinPrice(newMin);
            onChange?.(newMin, maxPrice);
        }
        const handleMaxChange = (value: number) => {
            if (Number.isNaN(value)) return;
            const newMax = Math.max(minPrice - step, Math.min(max, value));
            setMaxPrice(newMax);
            onChange?.(minPrice, newMax);
        }


        const handleMinSlider = (value: number) => {
            if (Number.isNaN(value)) return;
            const newMin = Math.min(maxPrice - step, Math.max(min, value));
            setMinPrice(newMin);
            return newMin;
        };

        const handleMaxSlider = (value: number) => {
            if (Number.isNaN(value)) return;
            const newMax = Math.max(minPrice + step, Math.min(max, value));
            setMaxPrice(newMax);
            return newMax;
        };

        const rangeStyle = useMemo(() => {
            const range = max - min;
            const minPosition = ((minPrice - min) / range) * 100;
            const maxPosition = ((maxPrice - min) / range) * 100;

            return {
                background: `linear-gradient(to right,
                #c6c6c6 0%,
                #c6c6c6 ${minPosition}%,
                #a5e6ba ${minPosition}%,
                #a5e6ba ${maxPosition - 3}%,
                #c6c6c6 ${maxPosition}%,
                #c6c6c6 100%
                )`
            };
        }, [minPrice, maxPrice, min, max])

    return (
        <div className="price-range-container">
            <div className="price-range">
                <input 
                    type="range" id="minPriceRange" name="minPriceRange" min={min} max={max} step={step} value={minPrice}
                    className="range-sliders min-slider"
                    onMouseUp={() => onChange?.(minPrice, maxPrice)}
                    onTouchEnd={() => onChange?.(minPrice, maxPrice)}
                    onChange={(e) => handleMinSlider(Number(e.currentTarget.value))}
                    style={{...rangeStyle, zIndex: minPrice <= min ? 5 : 3}}
                />
                <input 
                    type="range" id="maxPriceRange" name="maxPriceRange" min={min} max={max} step={step} value={maxPrice}
                    className="range-sliders max-slider"
                    onChange={(e) => handleMaxSlider(Number(e.currentTarget.value))}
                    onMouseUp={() => onChange?.(minPrice, maxPrice)}
                    onTouchEnd={() => onChange?.(minPrice, maxPrice)}
                    style={{...rangeStyle, zIndex: minPrice <= min ? 4 : 2}}
                />
            </div>

            <div className="inputs">
                <input 
                    type="number" id="minInput" name="minInput" min={min} max={max} step={step} value={minPrice}
                    onChange={(e) => handleMinChange(Number(e.currentTarget.value))}
                />
                <input 
                    type="number" id="maxInput" name="maxInput" min={min} max={max} step={step} value={maxPrice}
                    onChange={(e) => handleMaxChange(Number(e.currentTarget.value))}
                />
            </div>
        </div>
    )
}
