import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '.';
import { useState, useEffect, ChangeEvent } from 'react';
import './stories.css';
// Icons for demonstration
const SearchIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM19 19l-4.35-4.35"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

const ErrorIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M10 19a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM10 6v4M10 14h.01"
            stroke="#EF4444"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

const meta: Meta<typeof Input> = {
    title: 'UI Kit internal/Input',
    component: Input,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A versatile input component with various states and features.',
            },
        },
    },
    tags: ['autodocs', 'skip-test-runner'],
    decorators: [(Story) => <Story />],
    argTypes: {
        multiline: {
            control: 'boolean',
            description: 'Enable multiline input',
        },
        floating: {
            control: 'boolean',
            description: 'Enable floating label',
        },
        label: {
            control: 'text',
            description: 'Input label',
        },
        error: {
            control: 'text',
            description: 'Error message',
        },
        oneLineError: {
            control: 'boolean',
            description: 'Show error in one line',
        },
        hint: {
            control: 'text',
            description: 'Hint text',
        },
        collapsed: {
            control: 'boolean',
            description: 'Collapse input',
        },
        readonly: {
            control: 'boolean',
            description: 'Make input readonly',
        },
    },
};

export default meta;
type Story = StoryObj<typeof Input>;

// Basic input
export const Default: Story = {
    args: {
        label: 'Input Label',
        placeholder: 'Enter text...',
    },
};

// Floating label input
export const FloatingLabel: Story = {
    args: {
        label: 'Floating Label',
        floating: true,
        placeholder: 'Type something...',
    },
};

// Input with error
export const WithError: Story = {
    args: {
        label: 'Username',
        error: 'Username is required',
        floating: true,
    },
};

// Input with hint
export const WithHint: Story = {
    args: {
        label: 'Password',
        hint: 'Must be at least 8 characters',
        floating: true,
        type: 'password',
    },
};

// Multiline input
export const Multiline: Story = {
    args: {
        label: 'Description',
        multiline: true,
        floating: true,
        placeholder: 'Enter your description...',
    },
};

// Input with icon
export const WithIcon: Story = {
    args: {
        label: 'Search',
        icon: <SearchIcon />,
        floating: true,
        placeholder: 'Search...',
    },
};

// Read-only input
export const Readonly: Story = {
    args: {
        label: 'Read Only Input',
        readonly: true,
        value: 'This is read only text',
        floating: true,
    },
};

// Placeholder input
export const Placeholder: Story = {
    args: {
        placeholder: 'Placeholder',
    },
};

// Interactive form validation
export const FormValidation: Story = {
    render: () => {
        const [values, setValues] = useState({
            username: '',
            email: '',
            password: '',
        });

        const [errors, setErrors] = useState({
            username: '',
            email: '',
            password: '',
        });

        const validateField = (name: string, value: string) => {
            switch (name) {
                case 'username':
                    if (value.length < 3) {
                        return 'At least 3 characters';
                    }
                    break;
                case 'email':
                    if (!/\S+@\S+\.\S+/.test(value)) {
                        return 'Please enter a valid email';
                    }
                    break;
                case 'password':
                    if (value.length < 8) {
                        return 'At least 8 characters';
                    }
                    break;
            }
            return '';
        };

        const handleChange = (value: string, event: ChangeEvent<HTMLInputElement>) => {
            const name = event.target.name;
            setValues((prev) => ({
                ...prev,
                [name]: value,
            }));

            setErrors((prev) => ({
                ...prev,
                [name]: validateField(name, value),
            }));
        };

        return (
            <div className="form-container">
                <Input
                    name="username"
                    label="Username"
                    floating={true}
                    error={errors.username}
                    onChange={handleChange}
                    value={values.username}
                />
                <Input
                    name="email"
                    label="Email"
                    floating={true}
                    error={errors.email}
                    onChange={handleChange}
                    value={values.email}
                />
                <Input
                    name="password"
                    label="Password"
                    type="password"
                    floating={true}
                    error={errors.password}
                    onChange={handleChange}
                    value={values.password}
                />
            </div>
        );
    },
};

// Character counter
export const WithCharacterCounter: Story = {
    render: () => {
        const maxLength = 100;
        const [value, setValue] = useState('');
        const [error, setError] = useState('');

        const handleChange = (newValue: string) => {
            if (newValue.length <= maxLength) {
                setValue(newValue);
                setError('');
            } else {
                setError(`Maximum ${maxLength} characters allowed`);
            }
        };

        return (
            <div className="input-container">
                <Input
                    label="Bio"
                    multiline
                    floating
                    value={value}
                    onChange={handleChange}
                    error={error}
                    hint={`${value.length}/${maxLength} characters`}
                />
            </div>
        );
    },
};

// Search with debounce
export const SearchWithDebounce: Story = {
    render: () => {
        const [value, setValue] = useState('');
        const [isSearching, setIsSearching] = useState(false);
        const [results, setResults] = useState<string[]>([]);

        useEffect(() => {
            const timer = setTimeout(() => {
                if (value) {
                    setIsSearching(true);
                    // Simulate API call
                    setTimeout(() => {
                        setResults([
                            `Result 1 for "${value}"`,
                            `Result 2 for "${value}"`,
                            `Result 3 for "${value}"`,
                        ]);
                        setIsSearching(false);
                    }, 1000);
                } else {
                    setResults([]);
                }
            }, 300);

            return () => clearTimeout(timer);
        }, [value]);

        return (
            <div className="search-container">
                <Input
                    label="Search"
                    icon={<SearchIcon />}
                    floating
                    value={value}
                    onChange={(newValue) => setValue(newValue)}
                    hint={isSearching ? 'Searching...' : ''}
                />
                {results.length > 0 && (
                    <div className="search-results">
                        {results.map((result, index) => (
                            <div key={index} className="search-result-item">
                                {result}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    },
};

// Password strength meter
export const PasswordStrength: Story = {
    render: () => {
        const [password, setPassword] = useState('');
        const [strength, setStrength] = useState({
            score: 0,
            message: '',
        });

        const calculateStrength = (value: string) => {
            let score = 0;
            if (value.length > 8) score++;
            if (/[A-Z]/.test(value)) score++;
            if (/[a-z]/.test(value)) score++;
            if (/[0-9]/.test(value)) score++;
            if (/[^A-Za-z0-9]/.test(value)) score++;

            const messages = ['Very weak', 'Weak', 'Fair', 'Good', 'Strong'];

            return {
                score,
                message: messages[score - 1] || 'Very weak',
            };
        };

        const handleChange = (value: string) => {
            setPassword(value);
            setStrength(calculateStrength(value));
        };

        return (
            <div className="password-input-container">
                <Input
                    label="Password"
                    type="password"
                    floating
                    value={password}
                    onChange={handleChange}
                    hint={strength.message}
                />
                <div className="strength-meter">
                    {[...new Array(5)].map((_, index) => (
                        <div
                            key={index}
                            className={`strength-bar ${index < strength.score ? 'active' : ''}`}
                        />
                    ))}
                </div>
            </div>
        );
    },
};
