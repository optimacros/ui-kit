import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Favorite } from '.';
import './stories.css';

const meta: Meta<typeof Favorite> = {
    title: 'Ui Kit internal/Favorite',
    component: Favorite,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A heart-shaped favorite checkbox component with animation support.',
            },
        },
    },
    tags: ['autodocs', 'skip-test-runner'],
    argTypes: {
        checked: {
            control: 'boolean',
            description: 'The checked state of the favorite checkbox',
        },
        label: {
            control: 'text',
            description: 'Optional label text for the checkbox',
        },
        onChange: {
            action: 'changed',
            description: 'Callback fired when the favorite state changes',
        },
        controllable: {
            table: {
                disable: true,
            },
        },
    },
    decorators: [(Story) => <Story />],
};

export default meta;
type Story = StoryObj<typeof Favorite>;

// Basic Favorite Checkbox
export const Default: Story = {
    args: {
        checked: false,
        label: 'Add to favorites',
    },
};

// Checked State
export const Checked: Story = {
    args: {
        checked: true,
        label: 'Remove from favorites',
    },
};

// Without Label
export const NoLabel: Story = {
    args: {
        checked: false,
    },
};

// Interactive Favorite
export const Interactive: Story = {
    render: () => {
        const [isFavorite, setIsFavorite] = useState(false);

        return (
            <Favorite
                checked={isFavorite}
                onChange={setIsFavorite}
                label={isFavorite ? 'Added to favorites' : 'Add to favorites'}
                controllable
            />
        );
    },
};

// With Counter
export const WithCounter: Story = {
    render: () => {
        const [isFavorite, setIsFavorite] = useState(false);
        const [count, setCount] = useState(42);

        const handleChange = (checked: boolean) => {
            setIsFavorite(checked);
            setCount((prev) => (checked ? prev + 1 : prev - 1));
        };

        return (
            <div className="favorite-counter">
                <Favorite checked={isFavorite} onChange={handleChange} controllable />
                <span className="counter">{count}</span>
            </div>
        );
    },
};

// With Pulse Animation
export const WithPulseAnimation: Story = {
    render: () => {
        const [isFavorite, setIsFavorite] = useState(false);
        const [isPulsing, setIsPulsing] = useState(false);

        const handleChange = (checked: boolean) => {
            setIsFavorite(checked);
            if (checked) {
                setIsPulsing(true);
                setTimeout(() => setIsPulsing(false), 1000);
            }
        };

        return (
            <div className={`favorite-pulse ${isPulsing ? 'pulsing' : ''}`}>
                <Favorite
                    checked={isFavorite}
                    onChange={handleChange}
                    label="Click to favorite"
                    controllable
                />
            </div>
        );
    },
};

// Product Card Example
export const ProductCard: Story = {
    render: () => {
        const [favorites, setFavorites] = useState<number[]>([]);

        const products = [
            { id: 1, name: 'Product 1', price: '$19.99' },
            { id: 2, name: 'Product 2', price: '$29.99' },
            { id: 3, name: 'Product 3', price: '$39.99' },
        ];

        const toggleFavorite = (productId: number) => {
            setFavorites((prev) =>
                prev.includes(productId)
                    ? prev.filter((id) => id !== productId)
                    : [...prev, productId],
            );
        };

        return (
            <div className="product-grid">
                {products.map((product) => (
                    <div key={product.id} className="product-card">
                        <div className="product-info">
                            <h3>{product.name}</h3>
                            <p>{product.price}</p>
                        </div>
                        <Favorite
                            checked={favorites.includes(product.id)}
                            onChange={() => toggleFavorite(product.id)}
                            controllable
                        />
                    </div>
                ))}
            </div>
        );
    },
};

// List Example
export const FavoritesList: Story = {
    render: () => {
        const [favorites, setFavorites] = useState<number[]>([]);

        const items = [
            { id: 1, name: 'Item 1' },
            { id: 2, name: 'Item 2' },
            { id: 3, name: 'Item 3' },
        ];

        const toggleFavorite = (itemId: number) => {
            setFavorites((prev) =>
                prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId],
            );
        };

        return (
            <div className="favorites-list">
                {items.map((item) => (
                    <div key={item.id} className="list-item">
                        <span>{item.name}</span>
                        <Favorite
                            checked={favorites.includes(item.id)}
                            onChange={() => toggleFavorite(item.id)}
                            controllable
                        />
                    </div>
                ))}
                <div className="favorites-summary">Total favorites: {favorites.length}</div>
            </div>
        );
    },
};

// Interactive Grid
export const InteractiveGrid: Story = {
    render: () => {
        const [favorites, setFavorites] = useState<string[]>([]);
        const gridSize = 3;

        const toggleFavorite = (position: string) => {
            setFavorites((prev) =>
                prev.includes(position)
                    ? prev.filter((pos) => pos !== position)
                    : [...prev, position],
            );
        };

        return (
            <div className="favorite-grid">
                {Array.from({ length: gridSize * gridSize }).map((_, index) => {
                    const position = `${Math.floor(index / gridSize)}-${index % gridSize}`;
                    return (
                        <div key={position} className="grid-item">
                            <Favorite
                                checked={favorites.includes(position)}
                                onChange={() => toggleFavorite(position)}
                                controllable
                            />
                        </div>
                    );
                })}
            </div>
        );
    },
};

// Animated Notification
export const AnimatedNotification: Story = {
    render: () => {
        const [isFavorite, setIsFavorite] = useState(false);
        const [showNotification, setShowNotification] = useState(false);

        const handleChange = (checked: boolean) => {
            setIsFavorite(checked);
            if (checked) {
                setShowNotification(true);
                setTimeout(() => setShowNotification(false), 2000);
            }
        };

        return (
            <div className="favorite-notification">
                <Favorite
                    checked={isFavorite}
                    onChange={handleChange}
                    label="Add to favorites"
                    controllable
                />
                {showNotification && <div className="notification">Added to favorites!</div>}
            </div>
        );
    },
};
