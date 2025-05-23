// Copyright (c), Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import { ConnectButton, useCurrentAccount } from '@mysten/dapp-kit';
import { Box, Button, Card, Container, Flex, Grid, Heading, Text } from '@radix-ui/themes';
import WalrusUpload from './EncryptAndUpload';
import { useState } from 'react';
import { CreateService } from './CreateSubscriptionService';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import './App.css'; // Ensure App.css includes scrolling-wrapper and scrolling-content animations
import StarBackground from './components/StarBackground';
import Chatbot from './components/Chatbot';
import { OwnedSpaces } from './OwnedSpaces';
import SubscribedSpaces from './SubscribedSpaces';
import SpaceInfo from './SpaceInfo';
import { ManageSpace } from './ManageSpace';
import { MarkdownMemory } from './MarkdownEditor';
import { ScrollingCreators } from './components/ScrollingCreators';

// --- Enhanced Subtle Water Background ---
const SubtleWaterBackground = () => (
  <Box
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: -2,
      overflow: 'hidden',
      background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 30%, #0f3460 60%, #0a192f 100%)',
    }}
  />
);

// --- Optimized Wave Separator ---
const WaveSeparator = () => (
  <Box
    style={{
      height: '30px',
      width: '100%',
      background: 'linear-gradient(to right, rgba(173, 232, 244, 0.1), rgba(144, 224, 239, 0.5), rgba(173, 232, 244, 0.1))',
      opacity: 0.8,
      margin: '2.5rem 0',
    }}
  />
);

// --- Optimized LandingPage ---
function LandingPage() {
  return (
    <Grid columns="1" gap="5" style={{ maxWidth: '600px', margin: '4rem auto 2rem auto' }}>
      <Card style={{ background: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(10px)', borderRadius: '16px', boxShadow: '0 8px 32px rgba(144, 224, 239, 0.3)' }}>
        <Flex direction="column" gap="4" align="center" style={{ padding: '2.5rem 1.5rem' }}>
          <div style={{ textAlign: 'center' }}>
            <Heading as="h2" size="8" style={{ color: '#023e8a', marginBottom: '1.2rem', fontWeight: 'bold' }}>
              Launch Your Creative Space
            </Heading>
            <Text as="p" color="gray" size="4" style={{ maxWidth: '480px', lineHeight: '1.7', color: '#005f73' }}>
              Create exclusive content and unique experiences for your loyal fans. Easily set up membership plans, share your work, and build deep connections with your core supporters.
            </Text>
          </div>
          <Link to="/subscription-example" style={{ textDecoration: 'none', marginTop: '2rem' }}>
            <Button size="4" radius="full" style={{ background: 'linear-gradient(to right, #0077b6, #00b4d8)', color: 'white', padding: '1rem 2.5rem', fontWeight: '600', boxShadow: '0 4px 15px rgba(0, 119, 182, 0.3)' }}>Create My Page</Button>
          </Link>
        </Flex>
      </Card>
    </Grid>
  );
}


// --- Main Page Content Component ---
function HomePage() {
  const currentAccount = useCurrentAccount();
  const [recipientAllowlist, setRecipientAllowlist] = useState<string>('');
  const [capId, setCapId] = useState<string>('');
  const [showCreateService, setShowCreateService] = useState(false);
  const navigate = useNavigate();

  return (
    <Container style={{ position: 'relative', paddingBottom: '4rem', minHeight: '100vh' }}>
      <SubtleWaterBackground />
      <StarBackground />
      <Flex
        position="sticky"
        px="5"
        py="3"
        justify="between"
        align="center"
        style={{
          top: 0,
          zIndex: 10,
          width: '100%',
          background: 'rgba(26, 26, 46, 0.7)',
          backdropFilter: 'blur(15px)',
          borderBottom: '1px solid rgba(144, 224, 239, 0.3)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Heading as="h1" size="8" style={{ color: '#ade8f4', fontWeight: 'bold' }}>
          Meme Chat
        </Heading>
        <Flex gap="4" align="center">
          {currentAccount && (
            <Link to="/myspaces">
              <Button className="water-button-soft">My Spaces</Button>
            </Link>
          )}
          {currentAccount && (
            <Link to="/mysubscriptions">
              <Button className="water-button-soft">My Subscriptions</Button>
            </Link>
          )}
        </Flex>
        <Box>
          <ConnectButton />
        </Box>
      </Flex>

      <Box p={{ initial: '4', md: '5' }}>
        {/* Experience Button */}
        <Box style={{
          maxWidth: '1200px',
          margin: '50px auto 50px auto',
          textAlign: 'center',
          position: 'relative',
        }}>
          <Button
            size="4"
            style={{
              background: 'linear-gradient(135deg, rgba(173, 232, 244, 0.2), rgba(144, 224, 239, 0.4))',
              color: '#ade8f4',
              padding: '2rem 4rem',
              fontSize: '2rem',
              fontWeight: '500',
              borderRadius: '50px',
              border: '1px solid rgba(173, 232, 244, 0.5)',
              boxShadow: '0 0 20px rgba(173, 232, 244, 0.3)',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 0 30px rgba(173, 232, 244, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 0 20px rgba(173, 232, 244, 0.3)';
            }}
            onClick={() => navigate('/chat')}
          >
            <span style={{ position: 'relative', zIndex: 1 }}>
              New here? Come try Meme Chat
            </span>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'radial-gradient(circle at 50% 50%, rgba(173, 232, 244, 0.2) 0%, rgba(255, 255, 255, 0) 70%)',
              pointerEvents: 'none',
              animation: 'pulse 2s infinite',
            }} />
          </Button>
        </Box>

        {/* First Screen: Launch Your Creative Space */}
        {!showCreateService ? (
          <Grid columns="2" gap="5" style={{ maxWidth: '1200px', margin: '4rem auto 2rem auto' }}>
            {/* Left: Launch Your Creative Space */}
            <Card style={{
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)',
              borderRadius: '32px',
              boxShadow: '0 8px 32px rgba(144, 224, 239, 0.3)',
              border: '1px solid rgba(173, 232, 244, 0.5)',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(circle at 50% 50%, rgba(173, 232, 244, 0.1) 0%, rgba(255, 255, 255, 0) 70%)',
                pointerEvents: 'none',
              }} />
              <Flex direction="column" gap="4" align="center" style={{ padding: '2.5rem 1.5rem', position: 'relative' }}>
                <div style={{ textAlign: 'center' }}>
                  <Heading as="h2" size="8" style={{ color: '#023e8a', marginBottom: '1.2rem', fontWeight: 'bold' }}>
                    Launch Your Creative Space
                  </Heading>
                  <Text as="p" color="gray" size="4" style={{ maxWidth: '480px', lineHeight: '1.7', color: '#005f73' }}>
                    Create exclusive content and unique experiences for your loyal fans. Easily set up membership plans, share your work, and build deep connections with your core supporters.
                  </Text>
                </div>
                <Button
                  size="4"
                  radius="full"
                  onClick={() => setShowCreateService(true)}
                  style={{
                    background: 'linear-gradient(to right, #0077b6, #00b4d8)',
                    color: 'white',
                    padding: '1rem 2.5rem',
                    fontWeight: '600',
                    boxShadow: '0 4px 15px rgba(0, 119, 182, 0.3)',
                    borderRadius: '24px',
                  }}
                >
                  Create My Page
                </Button>
              </Flex>
            </Card>

            {/* Right: Explore Others' Spaces */}
            <Card style={{
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)',
              borderRadius: '32px',
              boxShadow: '0 8px 32px rgba(144, 224, 239, 0.3)',
              border: '1px solid rgba(173, 232, 244, 0.5)',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(circle at 50% 50%, rgba(173, 232, 244, 0.1) 0%, rgba(255, 255, 255, 0) 70%)',
                pointerEvents: 'none',
              }} />
              <Flex direction="column" gap="4" align="center" style={{ padding: '2.5rem 1.5rem', position: 'relative' }}>
                <div style={{ textAlign: 'center' }}>
                  <Heading as="h2" size="8" style={{ color: '#023e8a', marginBottom: '1.2rem', fontWeight: 'bold' }}>
                    Explore Others' Spaces
                  </Heading>
                  <Text as="p" color="gray" size="4" style={{ maxWidth: '480px', lineHeight: '1.7', color: '#005f73' }}>
                    Discover like-minded creators and explore their amazing worlds. Here, you can find resonance and grow with friends who share your interests.
                  </Text>
                </div>
                <Button
                  size="4"
                  radius="full"
                  onClick={() => window.scrollTo({ top: document.getElementById('creators')?.offsetTop, behavior: 'smooth' })}
                  style={{
                    background: 'linear-gradient(to right, #0077b6, #00b4d8)',
                    color: 'white',
                    padding: '1rem 2.5rem',
                    fontWeight: '600',
                    boxShadow: '0 4px 15px rgba(0, 119, 182, 0.3)',
                    borderRadius: '24px',
                  }}
                >
                  Start Exploring
                </Button>
              </Flex>
            </Card>
          </Grid>
        ) : (
          <CreateService onBack={() => setShowCreateService(false)} />
        )}

        {/* Wave Separator */}
        <WaveSeparator />

        {/* Second Screen: Discover Hidden Gem Creators */}
        <Box id="creators">
          <ScrollingCreators />
        </Box>

        {/* Wave Separator */}
        <WaveSeparator />

        {/* Third Screen: Platform Guide */}
        <Card id="guide" style={{ marginBottom: '3rem', background: 'rgba(230, 249, 253, 0.8)', borderRadius: '16px', backdropFilter: 'blur(8px)', border: '1px solid rgba(173, 232, 244, 0.7)', boxShadow: '0 6px 24px rgba(173, 232, 244, 0.2)' }}>
          <Box p="5">
            <Heading as="h3" size="6" mb="4" style={{ color: '#01579b', fontWeight: 'bold' }}>
              Platform Guide
            </Heading>
            <Grid columns={{ initial: '1', md: '2' }} gap="5">
              <Box>
                <Heading size="5" mb="3" style={{ color: '#0277bd' }}>For Creators:</Heading>
                <Text as="p" size="3" color="gray" mb="2" style={{ lineHeight: '1.7', color: '#005f73' }}>
                  1. **Connect Wallet:** Securely connect using your Sui Testnet wallet.
                </Text>
                <Text as="p" size="3" color="gray" mb="2" style={{ lineHeight: '1.7', color: '#005f73' }}>
                  2. **Create Page:** Click "Create My Page" to set up your membership service details.
                </Text>
                <Text as="p" size="3" color="gray" mb="2" style={{ lineHeight: '1.7', color: '#005f73' }}>
                  3. **Manage Content:** Get your `Policy Object ID` and `Admin Cap ID` to manage members and publish content.
                </Text>
                <Text as="p" size="3" color="gray" mb="2" style={{ lineHeight: '1.7', color: '#005f73' }}>
                  4. **Publish Encrypted Works:** Upload exclusive content for members only (e.g., text, images, audio, video - current example supports chat logs).
                </Text>
              </Box>
              <Box>
                <Heading size="5" mb="3" style={{ color: '#0277bd' }}>For Supporters:</Heading>
                <Text as="p" size="3" color="gray" mb="2" style={{ lineHeight: '1.7', color: '#005f73' }}>
                  1. **Connect Wallet:** Easily join using your Sui Testnet wallet.
                </Text>
                <Text as="p" size="3" color="gray" mb="2" style={{ lineHeight: '1.7', color: '#005f73' }}>
                  2. **Browse & Support:** Discover your favorite creators and subscribe to suitable membership spaces.
                </Text>
                <Text as="p" size="3" color="gray" mb="2" style={{ lineHeight: '1.7', color: '#005f73' }}>
                  3. **Unlock Content:** Enjoy exclusive content and benefits published by creators during your membership period.
                </Text>
              </Box>
            </Grid>
          </Box>
        </Card>
      </Box>
    </Container>
  );
}

// --- Main App Component ---
function App() {
  const currentAccount = useCurrentAccount();
  const [recipientAllowlist, setRecipientAllowlist] = useState<string>('');
  const [capId, setCapId] = useState<string>('');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chat" element={<Chatbot />} />
        <Route path="/myspaces" element={<OwnedSpaces />} />
        <Route path="/mysubscriptions" element={<SubscribedSpaces />} />
        <Route path="/view/space/:id" element={<SpaceInfo />} />
        <Route
          path="/admin/space/:id"
          element={
            <Flex direction="column" gap="6">
              <ManageSpace
                setRecipientAllowlist={setRecipientAllowlist}
                setCapId={setCapId}
              />
              <WalrusUpload
                policyObject={recipientAllowlist}
                cap_id={capId}
                moduleName="subscription"
              />
            </Flex>
          }
        />
        <Route path='/md' element={<MarkdownMemory />} />
      </Routes>
    </Router>
  );
}

// Add styles at the end of the file
const styles = `
  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 0.5;
    }
    50% {
      transform: scale(1.1);
      opacity: 0.8;
    }
    100% {
      transform: scale(1);
      opacity: 0.5;
    }
  }
`;

// Add styles to the component
document.head.insertAdjacentHTML('beforeend', `<style>${styles}</style>`);

export default App;
