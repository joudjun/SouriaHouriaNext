"use client";

import { useState } from "react";

interface FilterBarProps {
    filters: string[];
    defaultActive?: number;
}

export default function FilterBar({
    filters,
    defaultActive = 0,
}: FilterBarProps) {
    const [active, setActive] = useState(defaultActive);

    return (
        <div className="filter-bar mb-8">
            {filters.map((label, i) => (
                <button
                    key={label}
                    className={`filter-btn${i === active ? " active" : ""}`}
                    onClick={() => setActive(i)}
                >
                    {label}
                </button>
            ))}
        </div>
    );
}
