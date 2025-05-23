import { Avatar, Box, Flex, Heading, Text } from "@radix-ui/themes";
import { Link } from "react-router-dom";
import sunnyDoll from './assets/sunny-doll.png?url';
import maga from './assets/maga.jpg?url';
import pepe from './assets/pepe.jpg?url';
import sushiFarm from './assets/sushi-farm.png?url';

// --- Optimized Scrolling Creators List ---
export const ScrollingCreators = () => {
    const creators = [
        { name: 'Sunny Doll', avatar: sunnyDoll, id: '0x3f5b0643ad8a331ba5aafa497cbe5b8bec26dae6a7ba917b1c7bfadc80ee20ab' },
        { name: 'MAGA World', avatar: maga, id: '0x5c6ff2a36cf5c46d76ea4ea60c56c5e86d74e1fbc692a0e1fef85fb3e51a29a7' },
        { name: 'PEPE Lover', avatar: pepe, id: '0x6cb2052e866c52288477cd4f2cd21090154f99fdf8a6e3240d4db1c4e951c17d' },
        { name: 'Sushi Farm', avatar: sushiFarm, id: '0x9eec083dd968fc5f08dd6a3389292eea4d4b6d207c87fb033a34938ed0bf5e49' },
    ];

    return (
        <Box mt="8" style={{ overflow: 'hidden', background: 'linear-gradient(to right, rgba(207, 249, 255, 0.7), rgba(224, 247, 250, 0.9))', padding: '2rem 0', borderRadius: '16px', backdropFilter: 'blur(5px)' }}>
            <Heading size="6" align="center" mb="5" style={{ color: '#014f86', fontWeight: 'bold' }}>Discover Hidden Gem Creators</Heading>
            <div className="scrolling-wrapper">
                <Flex gap="6" align="center" className="scrolling-content" pl="5" pr="5">
                    {creators.map((creator, index) => (
                        <Link
                            key={index}
                            to={`/view/space/${creator.id}`}
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            <Flex
                                direction="column"
                                align="center"
                                gap="2"
                                style={{
                                    minWidth: '120px',
                                    padding: '1rem',
                                    background: 'rgba(255, 255, 255, 0.8)',
                                    borderRadius: '12px',
                                    boxShadow: '0 4px 10px rgba(0, 121, 107, 0.1)',
                                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                                    cursor: 'pointer',
                                }}
                                onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 7px 15px rgba(0, 121, 107, 0.15)'; }}
                                onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 10px rgba(0, 121, 107, 0.1)'; }}
                            >
                                <Avatar
                                    size="4"
                                    src={creator.avatar}
                                    fallback={creator.avatar}
                                    radius="full"
                                    style={{
                                        background: 'linear-gradient(135deg, #00b4d8, #0077b6)',
                                        color: 'white',
                                        fontWeight: 'bold',
                                        boxShadow: '0 2px 8px rgba(0, 180, 216, 0.4)'
                                    }}
                                />
                                <Text size="2" weight="medium" style={{ color: '#006064', textAlign: 'center' }}>{creator.name}</Text>
                            </Flex>
                        </Link>
                    ))}
                </Flex>
            </div>
        </Box>
    );
};
  