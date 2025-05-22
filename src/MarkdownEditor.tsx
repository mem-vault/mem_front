import { useEffect, useRef, useState } from "react"
import MDEditor from '@uiw/react-md-editor';
import { Button, Flex, Text } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";
import { MARKDOWN_CONTENT_KEY } from "./constants";

export const MarkdownMemory = () => {
    const [markdown, setMarkdown] = useState<string | undefined>("**Hello world!!!**");
    const navigate = useNavigate();
    const importInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        const mdContent = localStorage.getItem(MARKDOWN_CONTENT_KEY);
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

    const handleImportMarkdown = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const text = reader.result as string;
                setMarkdown(text);
            };
            reader.readAsText(file);
        }
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
                    Back to Home
                </Button>
                <Text size="5" weight="bold" style={{ color: '#ade8f4' }}>
                    Meme Chat AI
                </Text>

                <Flex gap="1rem">
                    <Button style={{ cursor: 'pointer' }} onClick={handleDownloadFile}>
                        Download Markdown
                    </Button>
                    <Button style={{ cursor: "pointer" }} onClick={() => importInputRef.current?.click()}>
                        Upload Markdown
                    </Button>
                    <input
                        ref={importInputRef}
                        hidden
                        type="file"
                        accept=".md"
                        onChange={handleImportMarkdown} />
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