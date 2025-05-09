import { useEffect, useState } from "react"
import MDEditor from '@uiw/react-md-editor';
import { Box, Button, Container, Flex, Text } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";

export const MarkdownMemory = () => {
    const [markdown, setMarkdown] = useState<string | undefined>("**Hello world!!!**");
    const navigate = useNavigate();

    useEffect(() => {
        const mdContent = localStorage.getItem("markdown-content");
        if (mdContent) {
            setMarkdown(mdContent);
        }
    }, [])

    const handleDownloadFile = () => {
        const blob = new Blob([markdown || ''], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'markdown.md';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    return (
        <Flex style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        }}>
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

                <Flex gap="1rem">
                    <Button style={{ cursor: 'pointer' }} onClick={handleDownloadFile}>
                        Download File
                    </Button>
                </Flex>
            </Flex>

            <div style={{
                marginTop: '60px',
                width: '100%',
                flexGrow: 1,
                padding: '20px',
            }}>
                <MDEditor
                    height="100%"
                    value={markdown}
                    onChange={setMarkdown} />
            </div>
        </Flex>
    )
}