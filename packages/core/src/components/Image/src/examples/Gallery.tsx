import { Image } from '../';

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

export const Gallery = () => {
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
                {galleryImages.map((img) => (
                    <Image.Root
                        ratio="square"
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
                            e.currentTarget.style.boxShadow = '0 10px 15px -3px rgb(0 0 0 / 0.1)';
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
                                background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
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
};
