import React, { useState, useRef, useEffect } from 'react';
import { Box, Button, Card, Container, Flex, Text, TextArea } from '@radix-ui/themes';
import { useNavigate } from 'react-router-dom';

const Chatbot = () => {
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, isUser: true }]);
      setInput('');
      // 模拟AI回复
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          text: '这是一个模拟的AI回复。在实际应用中，这里会连接到真实的AI服务。', 
          isUser: false 
        }]);
      }, 1000);
    }
  };

  return (
    <Container size="3" style={{ 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      position: 'relative',
    }}>
      {/* 顶部导航栏 */}
      <Flex
        px="5"
        py="3"
        justify="between"
        align="center"
        style={{
          background: 'rgba(26, 26, 46, 0.7)',
          backdropFilter: 'blur(15px)',
          borderBottom: '1px solid rgba(144, 224, 239, 0.3)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
        }}
      >
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          style={{ color: '#ade8f4' }}
        >
          返回主页
        </Button>
        <Text size="5" weight="bold" style={{ color: '#ade8f4' }}>
          Memory Orb AI
        </Text>
        <div style={{ width: '100px' }} />
      </Flex>

      {/* 聊天区域 */}
      <Box
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '2rem',
          background: 'rgba(26, 26, 46, 0.3)',
          backdropFilter: 'blur(10px)',
          marginTop: '60px', // 为顶部导航栏留出空间
          marginBottom: '100px', // 为底部输入框留出空间
        }}
      >
        {messages.map((message, index) => (
          <Flex
            key={index}
            justify={message.isUser ? 'end' : 'start'}
            mb="4"
          >
            <Card
              style={{
                maxWidth: '70%',
                background: message.isUser
                  ? 'linear-gradient(135deg, rgba(173, 232, 244, 0.2), rgba(144, 224, 239, 0.4))'
                  : 'linear-gradient(135deg, rgba(144, 224, 239, 0.2), rgba(173, 232, 244, 0.4))',
                border: '1px solid rgba(173, 232, 244, 0.5)',
                borderRadius: '20px',
                padding: '1rem',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'radial-gradient(circle at 50% 50%, rgba(173, 232, 244, 0.1) 0%, rgba(255, 255, 255, 0) 70%)',
                  pointerEvents: 'none',
                }}
              />
              <Text
                style={{
                  color: '#ade8f4',
                  lineHeight: 1.6,
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                {message.text}
              </Text>
            </Card>
          </Flex>
        ))}
        <div ref={messagesEndRef} />
      </Box>

      {/* 输入区域 - 固定在底部 */}
      <Box
        p="4"
        style={{
          background: 'rgba(26, 26, 46, 0.7)',
          backdropFilter: 'blur(15px)',
          borderTop: '1px solid rgba(144, 224, 239, 0.3)',
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 100,
        }}
      >
        <Flex gap="3">
          <TextArea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="输入您的问题..."
            style={{
              flex: 1,
              background: 'rgba(173, 232, 244, 0.1)',
              border: '1px solid rgba(173, 232, 244, 0.5)',
              color: '#ade8f4',
              borderRadius: '20px',
              padding: '1rem',
              resize: 'none',
              minHeight: '60px',
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <Button
            onClick={handleSend}
            style={{
              background: 'linear-gradient(135deg, rgba(173, 232, 244, 0.2), rgba(144, 224, 239, 0.4))',
              color: '#ade8f4',
              border: '1px solid rgba(173, 232, 244, 0.5)',
              borderRadius: '20px',
              padding: '0 2rem',
              height: '60px',
            }}
          >
            发送
          </Button>
        </Flex>
      </Box>
    </Container>
  );
};

export default Chatbot; 