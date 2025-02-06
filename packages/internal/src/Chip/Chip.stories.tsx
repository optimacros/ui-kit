import { ArgTypes, Meta, StoryObj } from '@storybook/react';
import { Chip } from './index';
import { KeyboardEvent, useEffect, useState } from 'react';
import './stories.css';

const argTypes: Partial<ArgTypes> = {
    deletable: {
        control: 'boolean',
        description: 'If `true`, the chip will be rendered with delete icon.',
    },
    children: {
        control: 'text',
        description: 'The content of the component.  ',
    },
    className: {
        table: { disable: true },
    },
    settingsDialog: {
        table: { disable: true },
    },
    customDeleteIcon: {
        table: { disable: true },
        description: 'If `true`, the chip will be rendered with delete icon.',
    },
    theme: {
        table: { disable: true },
    },
    onDeleteClick: {
        table: { disable: false },
    },
};

const meta: Meta<typeof Chip> = {
    title: 'UI Kit internal/Chip',
    component: Chip,
    argTypes,
    tags: ['autodocs', 'skip-test-runner'],
    decorators: [(Story) => <Story />],
};
export default meta;

type Story = StoryObj<typeof Chip>;

const DeleteIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* eslint-disable-next-line max-len */}
        <path
            d="M14.8284 14.8284L9.17158 9.17158M9.17157 14.8284L14.8284 9.17158M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
            stroke="#28303F"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
// Basic Stories
export const Basic: Story = {
    args: {
        children: 'Basic Chip',
    },
};

export const Deletable: Story = {
    args: {
        children: 'Deletable Chip',
        deletable: true,
    },
};

// Complex Stories

// Interactive Chip with Delete Animation
export const AnimatedDelete: Story = {
    render: () => {
        const [chips, setChips] = useState(['Chip 1', 'Chip 2', 'Chip 3']);

        const handleDelete = (index: number) => {
            setChips((prev) => prev.filter((_, i) => i !== index));
        };

        return (
            <div className="chip-container">
                {chips.map((chip, index) => (
                    <div key={chip} className="chip-wrapper">
                        <Chip deletable onDeleteClick={() => handleDelete(index)}>
                            {chip}
                        </Chip>
                    </div>
                ))}
            </div>
        );
    },
};

// Chip with Custom Delete Icon and Loading State
export const CustomDeleteWithLoading: Story = {
    render: () => {
        const [isLoading, setIsLoading] = useState(false);

        const handleDelete = () => {
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
            }, 1500);
        };

        return (
            <Chip
                deletable
                customDeleteIcon={isLoading ? <div className="loading-spinner" /> : <DeleteIcon />}
                onDeleteClick={handleDelete}
            >
                Click to Delete
            </Chip>
        );
    },
};

// Dynamic Chip Group
export const DynamicChipGroup: Story = {
    render: () => {
        const [chips, setChips] = useState(['React', 'TypeScript', 'Storybook']);
        const [inputValue, setInputValue] = useState('');

        const handleAddChip = (event: KeyboardEvent<HTMLInputElement>) => {
            if (event.key === 'Enter' && inputValue.trim()) {
                setChips((prev) => [...prev, inputValue.trim()]);
                setInputValue('');
            }
        };

        const handleDeleteChip = (indexToDelete: number) => {
            setChips((prev) => prev.filter((_, index) => index !== indexToDelete));
        };

        return (
            <div className="dynamic-chip-container">
                <div className="chip-container">
                    {chips.map((chip, index) => (
                        <Chip key={chip} deletable onDeleteClick={() => handleDeleteChip(index)}>
                            {chip}
                        </Chip>
                    ))}
                </div>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleAddChip}
                    placeholder="Type and press Enter to add chip"
                    className="chip-input"
                />
            </div>
        );
    },
};

// Filter Chips
export const FilterChips: Story = {
    render: () => {
        const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
        const filters = ['New', 'Popular', 'Trending', 'Following'];

        const toggleFilter = (filter: string) => {
            setSelectedFilters((prev) =>
                prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter],
            );
        };

        return (
            <div className="chip-container">
                {filters.map((filter) => (
                    <div
                        key={filter}
                        onClick={() => toggleFilter(filter)}
                        className="clickable-chip"
                    >
                        {/*@ts-ignore */}
                        <Chip className={selectedFilters.includes(filter) ? 'selected-chip' : ''}>
                            {filter}
                        </Chip>
                    </div>
                ))}
            </div>
        );
    },
};

// Progress Chip
export const ProgressChip: Story = {
    render: () => {
        const [progress, setProgress] = useState(0);

        useEffect(() => {
            const timer = setInterval(() => {
                setProgress((prev) => (prev >= 100 ? 0 : prev + 10));
            }, 1000);

            return () => clearInterval(timer);
        }, []);

        return (
            <div className="progress-chip-container">
                <Chip>{`Uploading... ${progress}%`}</Chip>
                <div className="progress-bar" style={{ width: `${progress}%` }} />
            </div>
        );
    },
};

// Interactive Tag System
export const TagSystem: Story = {
    render: () => {
        const [tags, setTags] = useState(['frontend', 'react', 'typescript']);
        const [suggestions] = useState(['vue', 'angular', 'svelte', 'nextjs']);
        const [inputValue, setInputValue] = useState('');

        const handleAddTag = (tag: string) => {
            if (!tags.includes(tag)) {
                setTags((prev) => [...prev, tag]);
            }
            setInputValue('');
        };

        const handleDeleteTag = (tagToDelete: string) => {
            setTags((prev) => prev.filter((tag) => tag !== tagToDelete));
        };

        return (
            <div className="tag-system">
                <div className="chip-container">
                    {tags.map((tag) => (
                        <Chip key={tag} deletable onDeleteClick={() => handleDeleteTag(tag)}>
                            {tag}
                        </Chip>
                    ))}
                </div>

                <div className="tag-input-container">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && inputValue.trim()) {
                                handleAddTag(inputValue.trim());
                            }
                        }}
                        placeholder="Add a tag"
                        className="chip-input"
                    />

                    {inputValue && (
                        <div className="suggestions-container">
                            {suggestions
                                .filter((s) => s.includes(inputValue) && !tags.includes(s))
                                .map((suggestion) => (
                                    <div
                                        key={suggestion}
                                        onClick={() => handleAddTag(suggestion)}
                                        className="clickable-chip"
                                    >
                                        <Chip>{suggestion}</Chip>
                                    </div>
                                ))}
                        </div>
                    )}
                </div>
            </div>
        );
    },
};
