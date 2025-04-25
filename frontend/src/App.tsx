// Copyright (c), Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import { ConnectButton, useCurrentAccount } from '@mysten/dapp-kit';
import { Box, Button, Card, Container, Flex, Grid, Heading, Text, Avatar } from '@radix-ui/themes';
import { CreateAllowlist } from './CreateAllowlist';
import { Allowlist } from './Allowlist';
import WalrusUpload from './EncryptAndUpload';
import { useState } from 'react';
import { CreateService } from './CreateSubscriptionService';
import FeedsToSubscribe from './SubscriptionView';
import { Service } from './SubscriptionService';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AllAllowlist } from './OwnedAllowlists';
import { AllServices } from './OwnedSubscriptionServices';
import Feeds from './AllowlistView';
import './App.css'; // 确保 App.css 包含 scrolling-wrapper 和 scrolling-content 的动画

// --- 增强的水波纹背景 ---
const SubtleWaterBackground = () => (
  <Box
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: -1,
      overflow: 'hidden',
      // 使用更丰富、柔和的蓝色渐变模拟水面层次
      background: 'linear-gradient(180deg, #e0f7fa 0%, #caf0f8 30%, #ade8f4 60%, #90e0ef 100%)',
      // 可以考虑添加微妙的动画效果（需 CSS）
    }}
  />
);

// --- 优化的波浪分隔线 ---
const WaveSeparator = () => (
  <Box
    style={{
      height: '30px', // 增加高度以便观察
      width: '100%',
      // 使用更融入背景的渐变，模拟波光
      background: 'linear-gradient(to right, rgba(173, 232, 244, 0.1), rgba(144, 224, 239, 0.5), rgba(173, 232, 244, 0.1))',
      opacity: 0.8,
      margin: '2.5rem 0', // 调整边距
      // 移除 border-radius，渐变本身模拟效果
    }}
  />
);

// --- 优化后的 LandingPage ---
function LandingPage() {
  return (
    <Grid columns="1" gap="5" style={{ maxWidth: '600px', margin: '4rem auto 2rem auto' }}>
      {/* 卡片样式：圆角、半透明、阴影 */}
      <Card style={{ background: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(10px)', borderRadius: '16px', boxShadow: '0 8px 32px rgba(144, 224, 239, 0.3)' }}>
        <Flex direction="column" gap="4" align="center" style={{ padding: '2.5rem 1.5rem' }}>
          <div style={{ textAlign: 'center' }}>
            {/* 标题和描述文字颜色调整 */}
            <Heading as="h2" size="8" style={{ color: '#023e8a', marginBottom: '1.2rem', fontWeight: 'bold' }}>
              启航您的创作空间
            </Heading>
            <Text as="p" color="gray" size="4" style={{ maxWidth: '480px', lineHeight: '1.7', color: '#005f73' }}>
              为您的忠实粉丝打造专属内容与独特体验。轻松设定会员计划，分享您的心血之作，与核心支持者建立深厚连接。
            </Text>
          </div>
          <Link to="/subscription-example" style={{ textDecoration: 'none', marginTop: '2rem' }}>
            {/* 按钮样式：渐变、圆角 */}
            <Button size="4" radius="full" style={{ background: 'linear-gradient(to right, #0077b6, #00b4d8)', color: 'white', padding: '1rem 2.5rem', fontWeight: '600', boxShadow: '0 4px 15px rgba(0, 119, 182, 0.3)' }}>创建我的主页</Button>
          </Link>
        </Flex>
      </Card>
    </Grid>
  );
}

// --- 优化后的滚动创作者列表 ---
const ScrollingCreators = () => {
  const creators = [ // 保持数据不变
    { name: '艺术家A', avatar: 'A' }, { name: '作家B', avatar: 'B' }, { name: '音乐人C', avatar: 'C' },
    { name: '开发者D', avatar: 'D' }, { name: '设计师E', avatar: 'E' }, { name: '摄影师F', avatar: 'F' },
    { name: '播客G', avatar: 'G' }, { name: '教育家H', avatar: 'H' },
    { name: '艺术家A', avatar: 'A' }, { name: '作家B', avatar: 'B' }, { name: '音乐人C', avatar: 'C' },
    { name: '开发者D', avatar: 'D' }, { name: '设计师E', avatar: 'E' }, { name: '摄影师F', avatar: 'F' },
    { name: '播客G', avatar: 'G' }, { name: '教育家H', avatar: 'H' },
  ];

  return (
    // 背景：浅水波纹感
    <Box mt="8" style={{ overflow: 'hidden', background: 'linear-gradient(to right, rgba(207, 249, 255, 0.7), rgba(224, 247, 250, 0.9))', padding: '2rem 0', borderRadius: '16px', backdropFilter: 'blur(5px)' }}>
      {/* 标题颜色 */}
      <Heading size="6" align="center" mb="5" style={{ color: '#014f86', fontWeight: 'bold' }}>发现宝藏创作者</Heading>
      <div className="scrolling-wrapper">
        <Flex gap="6" align="center" className="scrolling-content" pl="5" pr="5">
          {creators.map((creator, index) => (
            <Flex key={index} direction="column" align="center" gap="2" style={{ minWidth: '100px' }}>
              {/* 头像：水滴渐变 */}
              <Avatar fallback={creator.avatar} size="5" radius="full" style={{ background: 'linear-gradient(135deg, #80deea, #4dd0e1)', color: '#004d40', fontWeight: 'bold', boxShadow: '0 2px 8px rgba(0, 77, 64, 0.3)' }} />
              {/* 文字颜色 */}
              <Text size="3" weight="medium" style={{ color: '#023e8a', marginTop: '0.5rem' }}>{creator.name}</Text>
            </Flex>
          ))}
        </Flex>
      </div>
    </Box>
  );
};


// --- 主应用组件 ---
function App() {
  const currentAccount = useCurrentAccount();
  const [recipientAllowlist, setRecipientAllowlist] = useState<string>('');
  const [capId, setCapId] = useState<string>('');

  return (
    // 整体容器，应用背景
    <Container style={{ position: 'relative', paddingBottom: '4rem', minHeight: '100vh' }}>
      <SubtleWaterBackground />
      {/* 粘性导航栏：增强毛玻璃效果 */}
      <Flex
        position="sticky"
        px="5" // 增加内边距
        py="3"
        justify="between"
        align="center"
        style={{
          top: 0,
          zIndex: 10,
          background: 'rgba(255, 255, 255, 0.75)', // 降低一点透明度
          backdropFilter: 'blur(15px)', // 增强模糊
          borderBottom: '1px solid rgba(144, 224, 239, 0.6)', // 更柔和的边框颜色 #90e0ef
        }}
      >
        {/* 标题颜色 */}
        <Heading as="h1" size="8" style={{ color: '#003f5c', fontWeight: 'bold' }}>
          BrainDance
        </Heading>
        <Box>
          <ConnectButton />
        </Box>
      </Flex>

      <Box p={{ initial: '4', md: '5' }}> {/* 增加整体内边距 */}
        {/* --- 优化后的使用指南卡片 --- */}
        <Card style={{ marginBottom: '3rem', background: 'rgba(230, 249, 253, 0.8)', borderRadius: '16px', backdropFilter: 'blur(8px)', border: '1px solid rgba(173, 232, 244, 0.7)', boxShadow: '0 6px 24px rgba(173, 232, 244, 0.2)' }}>
          <Box p="5"> {/* 增加内边距 */}
            {/* 标题颜色 */}
            <Heading as="h3" size="6" mb="4" style={{ color: '#01579b', fontWeight: 'bold' }}>
              平台指南
            </Heading>
            <Grid columns={{ initial: '1', md: '2' }} gap="5"> {/* 增加 gap */}
              <Box>
                {/* 标题和文本颜色 */}
                <Heading size="5" mb="3" style={{ color: '#0277bd' }}>对于创作者:</Heading>
                <Text as="p" size="3" color="gray" mb="2" style={{ lineHeight: '1.7', color: '#005f73' }}>
                  1. **连接钱包:** 使用您的 Sui Testnet 钱包安全连接。
                </Text>
                <Text as="p" size="3" color="gray" mb="2" style={{ lineHeight: '1.7', color: '#005f73' }}>
                  2. **创建主页:** 点击“创建我的主页”，设定您的会员服务详情。
                </Text>
                <Text as="p" size="3" color="gray" mb="2" style={{ lineHeight: '1.7', color: '#005f73' }}>
                  3. **管理内容:** 获取您的 `Policy Object ID` 和 `Admin Cap ID`，用于管理会员和发布内容。
                </Text>
                <Text as="p" size="3" color="gray" mb="2" style={{ lineHeight: '1.7', color: '#005f73' }}>
                  4. **发布加密作品:** 上传仅限会员访问的独家内容（如图文、音视频等 - 当前示例支持图片）。
                </Text>
              </Box>
              <Box>
                {/* 标题和文本颜色 */}
                <Heading size="5" mb="3" style={{ color: '#0277bd' }}>对于支持者:</Heading>
                <Text as="p" size="3" color="gray" mb="2" style={{ lineHeight: '1.7', color: '#005f73' }}>
                  1. **连接钱包:** 使用您的 Sui Testnet 钱包轻松加入。
                </Text>
                <Text as="p" size="3" color="gray" mb="2" style={{ lineHeight: '1.7', color: '#005f73' }}>
                  2. **浏览与支持:** 发现您喜爱的创作者，选择合适的会员等级进行订阅。
                </Text>
                <Text as="p" size="3" color="gray" mb="2" style={{ lineHeight: '1.7', color: '#005f73' }}>
                  3. **解锁内容:** 在会员期内，畅享创作者发布的专属内容和福利。
                </Text>
              </Box>
            </Grid>
            {/* 提示区域样式 */}

          </Box>
        </Card>

        {currentAccount ? (
          <BrowserRouter>
            <Routes>
              {/* 路由结构保持不变 */}
              <Route path="/" element={<LandingPage />} />
              <Route
                path="/allowlist-example/*"
                element={
                  <Routes>
                    <Route path="/" element={<CreateAllowlist />} />
                    <Route
                      path="/admin/allowlist/:id"
                      element={
                        <Box>
                          <Allowlist
                            setRecipientAllowlist={setRecipientAllowlist}
                            setCapId={setCapId}
                          />
                          <WaveSeparator /> {/* 使用优化后的分隔线 */}
                          <WalrusUpload
                            policyObject={recipientAllowlist}
                            cap_id={capId}
                            moduleName="allowlist"
                          />
                        </Box>
                      }
                    />
                    <Route path="/admin/allowlists" element={<AllAllowlist />} />
                    <Route
                      path="/view/allowlist/:id"
                      element={<Feeds suiAddress={currentAccount.address} />}
                    />
                  </Routes>
                }
              />
              <Route
                path="/subscription-example/*"
                element={
                  <Routes>
                    <Route path="/" element={<CreateService />} />
                    <Route
                      path="/admin/service/:id"
                      element={
                        <Box>
                          <Service
                            setRecipientAllowlist={setRecipientAllowlist}
                            setCapId={setCapId}
                          />
                          <WaveSeparator /> {/* 使用优化后的分隔线 */}
                          <WalrusUpload
                            policyObject={recipientAllowlist}
                            cap_id={capId}
                            moduleName="subscription"
                          />
                        </Box>
                      }
                    />
                    <Route path="/admin/services" element={<AllServices />} />
                    <Route
                      path="/view/service/:id"
                      element={<FeedsToSubscribe suiAddress={currentAccount.address} />}
                    />
                  </Routes>
                }
              />
            </Routes>
          </BrowserRouter>
        ) : (
          // 未连接钱包提示卡片样式
          <Card style={{ textAlign: 'center', padding: '3.5rem 2.5rem', background: 'rgba(230, 249, 253, 0.8)', borderRadius: '16px', backdropFilter: 'blur(8px)', border: '1px solid rgba(173, 232, 244, 0.7)', maxWidth: '550px', margin: '6rem auto', boxShadow: '0 6px 24px rgba(173, 232, 244, 0.2)' }}>
            <Heading size="6" weight="bold" style={{ color: '#01579b' }}>
              请先连接您的钱包
            </Heading>
            <Text as="p" color="gray" mt="3" size="4" style={{ color: '#005f73' }}>
              连接钱包后，即可启航您的创作之旅或支持心仪的创作者。
            </Text>
            <Box mt="5">
              <ConnectButton />
            </Box>
          </Card>
        )}

        {/* 滚动创作者列表 (如果已连接钱包) */}
        {currentAccount && <ScrollingCreators />}
      </Box>
    </Container>
  );
}

export default App;
