//@ts-nocheck

import type { Meta, StoryObj } from '@storybook/react';
import { Image } from '.';
import { Flex } from '@optimacros-ui/flex';

const meta: Meta<typeof Image.Root> = {
    title: 'Ui kit core/Image',
    component: Image.Root,
    args: {
        children: 'Image Content',
    },
    decorators: [
        (Story) => (
            <div style={{ margin: '0 auto' }}>
                <Story />
            </div>
        ),
    ],
    tags: ['skip-test-runner'],
};

export default meta;
type Story = StoryObj<typeof Image.Root>;

// Basic usage with all subcomponents
export const Basic: Story = {
    render: () => (
        <Image.Root>
            <Image.Image src="https://picsum.photos/800/600" alt="Random landscape" />
            <Image.Fallback>Loading...</Image.Fallback>
        </Image.Root>
    ),
};

export const AspectRatios = () => {
    const SquareImage = () => (
        <Image.Root className="image-root" ratio="square">
            <Image.Image
                className="image"
                src="https://picsum.photos/id/1015/800/800"
                alt="Square image"
            />
            <Image.Fallback className="fallback">Loading...</Image.Fallback>
        </Image.Root>
    );

    // Portrait aspect ratio
    const PortraitImage = () => (
        <Image.Root className="image-root" ratio="portrait">
            <Image.Image
                className="image"
                src="https://picsum.photos/id/1016/800/1200"
                alt="Portrait image"
            />
            <Image.Fallback className="fallback">Loading...</Image.Fallback>
        </Image.Root>
    );

    // Landscape aspect ratio
    const LandscapeImage = () => (
        <Image.Root className="image-root" ratio="landscape">
            <Image.Image
                className="image"
                src="https://picsum.photos/id/1018/1200/900"
                alt="Landscape image"
            />
            <Image.Fallback className="fallback">Loading...</Image.Fallback>
        </Image.Root>
    );

    // Custom aspect ratio
    const CustomRatioImage = () => (
        <Image.Root className="image-root" ratio="custom" style={{ '--aspect-ratio': '70%' }}>
            <Image.Image
                className="image"
                src="https://picsum.photos/id/1019/1000/700"
                alt="Custom ratio image"
            />
            <Image.Fallback className="fallback">Loading...</Image.Fallback>
        </Image.Root>
    );

    // Image Grid

    return (
        <div
            className="image-grid"
            style={{
                display: 'grid',
                gap: '1rem',
                gridTemplateColumns: 'repeat(4, 1fr)',
            }}
        >
            <SquareImage />
            <PortraitImage />
            <LandscapeImage />
            <CustomRatioImage />
        </div>
    );
};
// Gallery implementation
export const Gallery: Story = {
    render: () => {
        const galleryImages = [
            { id: '1043', alt: 'Woman walking through woods', aspectRatio: 'landscape' },
            { id: '1044', alt: 'Mountain range at sunset', aspectRatio: 'portrait' },
            { id: '1045', alt: 'Urban architecture', aspectRatio: 'landscape' },
            { id: '1047', alt: 'Rocky coastline', aspectRatio: 'portrait' },
            { id: '1048', alt: 'Desert landscape', aspectRatio: 'landscape' },
            { id: '1049', alt: 'Aerial city view', aspectRatio: 'square' },
            { id: '1050', alt: 'Mountain lake reflection', aspectRatio: 'landscape' },
            { id: '1051', alt: 'Forest waterfall', aspectRatio: 'portrait' },
            { id: '1052', alt: 'Misty mountains', aspectRatio: 'landscape' },
        ];

        return (
            <div
                style={{
                    padding: '2rem',
                    backgroundColor: '#f8fafc',
                    borderRadius: '12px',
                }}
            >
                <h2
                    style={{
                        marginBottom: '2rem',
                        fontSize: '1.5rem',
                        fontWeight: 600,
                        color: '#1e293b',
                    }}
                >
                    Photography Collection
                </h2>

                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '1.5rem',
                        gridAutoRows: '250px',
                    }}
                >
                    {galleryImages.map((img, index) => (
                        <Image.Root
                            key={img.id}
                            style={{
                                position: 'relative',
                                width: '100%',
                                height: '100%',
                                gridRow: img.aspectRatio === 'portrait' ? 'span 2' : 'span 1',
                                borderRadius: '8px',
                                overflow: 'hidden',
                                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                cursor: 'pointer',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-4px)';
                                e.currentTarget.style.boxShadow =
                                    '0 10px 15px -3px rgb(0 0 0 / 0.1)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
                            }}
                        >
                            <Image.Image
                                src={`https://picsum.photos/id/${img.id}/800/800`}
                                alt={img.alt}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    transition: 'transform 0.3s ease',
                                }}
                            />
                            <Image.Fallback>
                                <div
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: '#e2e8f0',
                                        color: '#64748b',
                                    }}
                                >
                                    Loading...
                                </div>
                            </Image.Fallback>

                            {/* Image overlay with caption */}
                            <div
                                style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    padding: '1.5rem',
                                    background:
                                        'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                                    color: 'white',
                                    opacity: 0,
                                    transition: 'opacity 0.3s ease',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.opacity = '1';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.opacity = '0';
                                }}
                            >
                                <p
                                    style={{
                                        margin: 0,
                                        fontSize: '0.875rem',
                                        fontWeight: 500,
                                    }}
                                >
                                    {img.alt}
                                </p>
                            </div>
                        </Image.Root>
                    ))}
                </div>
            </div>
        );
    },
};

// Shows fallback when image fails to load
export const WithError: Story = {
    render: () => (
        <Image.Root>
            <Image.Image src="invalid-url.jpg" alt="Invalid image" />
            <Image.Fallback>⚠️ Failed to load image</Image.Fallback>
        </Image.Root>
    ),
};

// Custom dimensions
export const CustomSize: Story = {
    render: () => (
        <Image.Root style={{ width: '300px', height: '200px' }}>
            <Image.Image
                src="https://picsum.photos/id/1018/800/600"
                alt="Mountain landscape"
                style={{ objectFit: 'cover' }}
            />
            <Image.Fallback>Loading...</Image.Fallback>
        </Image.Root>
    ),
};

export const Avatar: Story = {
    render: () => (
        <Flex gap={3}>
            <Image.Root style={{ width: 100 }}>
                <Image.Avatar
                    src="https://picsum.photos/id/1018/800/600"
                    alt="Mountain landscape"
                />
                <Image.Fallback>Loading...</Image.Fallback>
            </Image.Root>
            <Image.Root style={{ width: 100 }}>
                <Image.Avatar
                    src="https://picsum.photos/id/1018/800/600"
                    alt="Mountain landscape"
                />
                <Image.Fallback>Loading...</Image.Fallback>
            </Image.Root>

            <Image.Root style={{ width: 100 }}>
                <Image.Avatar
                    src="https://picsum.photos/id/1018/800/600"
                    alt="Mountain landscape"
                />
                <Image.Fallback>Loading...</Image.Fallback>
            </Image.Root>

            <Image.Root style={{ width: 100 }}>
                <Image.Avatar
                    src="https://picsum.photos/id/1018/800/600"
                    alt="Mountain landscape"
                />
                <Image.Fallback>Loading...</Image.Fallback>
            </Image.Root>
        </Flex>
    ),
};

// Custom fallback content
export const CustomFallback: Story = {
    render: () => (
        <Image.Root>
            <Image.Image src="invalid-url.jpg" alt="Invalid image" />
            <Image.Fallback>
                <div
                    style={{
                        padding: '2rem',
                        backgroundColor: '#f3f4f6',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        gap: '0.5rem',
                    }}
                >
                    <span style={{ fontSize: '2rem' }}>🖼️</span>
                    <span>Image unavailable</span>
                </div>
            </Image.Fallback>
        </Image.Root>
    ),
};

// Loading state demonstration
export const LoadingStates: Story = {
    render: () => {
        const images = [
            'https://picsum.photos/id/1024/800/600',
            'https://picsum.photos/id/1025/800/600',
            'invalid-url.jpg',
        ];

        return (
            <div style={{ display: 'flex', gap: '1rem' }}>
                {images.map((src, index) => (
                    <Image.Root key={index} style={{ width: '200px', height: '150px' }}>
                        <Image.Image src={src} alt={`Image ${index + 1}`} />
                        <Image.Fallback>
                            {index === 2 ? '❌ Error' : '⌛ Loading...'}
                        </Image.Fallback>
                    </Image.Root>
                ))}
            </div>
        );
    },
};

// With custom styles
export const Styled: Story = {
    render: () => (
        <Image.Root
            style={{
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
            }}
        >
            <Image.Image
                src="https://picsum.photos/id/1029/800/600"
                alt="Mountain lake"
                style={{ transition: 'transform 0.3s ease' }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                }}
            />
            <Image.Fallback>Loading...</Image.Fallback>
        </Image.Root>
    ),
};

// Previous stories remain the same...
