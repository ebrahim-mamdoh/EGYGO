"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import styles from './AIChatWidget.module.css';
import axios from 'axios';



export default function AIChatWidget() {

    const [isOpen, setIsOpen] = useState(false);
    // Initial welcome message
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "مرحباً! أنا نفرتيتي، مرشدتك السياحية الذكية. كيف يمكنني مساعدتك في رحلتك اليوم؟",
            sender: 'bot',
            type: 'text'
        }
    ]);
    const [inputText, setInputText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const handleSendMessage = async () => {
        if (!inputText.trim()) return;

        const newUserMessage = {
            id: Date.now(),
            text: inputText,
            sender: 'user',
            type: 'text'
        };

        // Add user message to state
        setMessages(prev => [...prev, newUserMessage]);
        setInputText("");
        setIsLoading(true);

        try {
            // Prepare history for API
            // Map 'sender' to 'role' (user -> user, bot -> model)
            const history = messages.map(msg => ({
                role: msg.sender === 'user' ? 'user' : 'model',
                content: msg.text // Assuming 'text' holds the content
            }));

            const response = await axios.post('/api/chat', {
                message: newUserMessage.text,
                history: history
            });

            const data = response.data;

            if (data.success) {
                const newBotMessage = {
                    id: Date.now() + 1,
                    sender: 'bot',
                    type: 'text',
                    text: data.reply,
                    places: data.data || [], // Store places if available
                    source: data.source
                };
                setMessages(prev => [...prev, newBotMessage]);
            } else {
                throw new Error('Unsuccessful response from server');
            }

        } catch (error) {
            console.error('Chat Error:', error);
            const errorMessage = {
                id: Date.now() + 1,
                text: "عذراً، حدث خطأ أثناء المعالجة. يرجى المحاولة مرة أخرى.",
                sender: 'bot',
                isError: true,
                type: 'text'
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !isLoading) {
            handleSendMessage();
        }
    };

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {/* Widget Container (Chat Window) */}
            <div className={styles.container} style={{ pointerEvents: isOpen ? 'auto' : 'none' }}>
                <div className={`${styles.chatWindow} ${isOpen ? styles.open : ''}`}>
                    {/* Header */}
                    <div className={styles.header}>
                        <div className={styles.headerInfo}>
                            <div className={styles.avatar}>
                                <Image
                                    src="/images/chatbot_icon.png"
                                    alt="Nefertiti"
                                    width={45}
                                    height={45}
                                />
                            </div>
                            <div className={styles.titles}>
                                <span className={styles.name}>Nefertiti</span>
                                <span className={styles.status}>Online</span>
                            </div>
                        </div>
                        <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13 1L1 13M1 1L13 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>

                    {/* Messages */}
                    <div className={styles.messagesContainer}>
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`${styles.message} ${msg.sender === 'user' ? styles.sent : styles.received} ${msg.isError ? styles.error : ''}`}
                                dir="auto"
                            >
                                {/* Text Content with Markdown */}
                                <div className={styles.markdownContent}>
                                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                                </div>

                                {/* Source Badge (Optional) */}
                                {msg.source === 'database' && (
                                    <div className={styles.verifiedBadge}>
                                        <span>✓ Verified Info</span>
                                    </div>
                                )}

                                {/* Places Carousel */}
                                {msg.places && msg.places.length > 0 && (
                                    <div className={styles.placesContainer}>
                                        {msg.places.map((place, idx) => (
                                            <div key={place._id || place.id || idx} className={styles.placeCard}>
                                                {place.images && place.images.length > 0 && (
                                                    <div className={styles.placeImageWrapper}>
                                                        <Image
                                                            src={place.images[0]}
                                                            alt={place.name}
                                                            fill
                                                            style={{ objectFit: 'cover' }}
                                                        />
                                                    </div>
                                                )}
                                                <div className={styles.placeContent}>
                                                    <div className={styles.placeHeader}>
                                                        <h4 className={styles.placeName} title={place.name}>{place.name}</h4>
                                                        {(place.category || place.type) && <span className={styles.placeCategory}>{place.category || place.type}</span>}
                                                    </div>

                                                    {place.province && (
                                                        <div className={styles.provinceBadge}>
                                                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                                                <circle cx="12" cy="10" r="3"></circle>
                                                            </svg>
                                                            {typeof place.province === 'object' ? place.province.name : place.province}
                                                        </div>
                                                    )}

                                                    {place.rating > 0 && (
                                                        <div className={styles.ratingStars}>
                                                            {'★'.repeat(Math.round(place.rating))}
                                                            {'☆'.repeat(5 - Math.round(place.rating))}
                                                        </div>
                                                    )}

                                                    {/* Description removed for compactness in card, or kept short */}
                                                    {/* <p className={styles.placeDescription}>{place.description}</p> */}

                                                    <Link
                                                        href={`/place/${place._id || place.id}`}
                                                        className={styles.viewBtn}
                                                        onClick={() => setIsOpen(false)}
                                                    >
                                                        عرض التفاصيل
                                                    </Link>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}

                        {isLoading && (
                            <div className={`${styles.message} ${styles.received}`}>
                                <span className={styles.typingDot}>.</span>
                                <span className={styles.typingDot}>.</span>
                                <span className={styles.typingDot}>.</span>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className={styles.inputArea}>
                        <div className={styles.inputWrapper}>
                            <input
                                type="text"
                                className={styles.input}
                                placeholder="Chat with Nefertiti..."
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                onKeyPress={handleKeyPress}
                                disabled={isLoading}
                                dir="auto"
                            />
                            <button
                                className={styles.sendBtn}
                                onClick={handleSendMessage}
                                disabled={!inputText.trim() || isLoading}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22 2L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating Toggle Button */}
            <div className={styles.floatingBtnWrapper}>
                <button
                    className={`${styles.floatingBtn} ${isOpen ? styles.opened : styles.closed}`}
                    onClick={toggleChat}
                    aria-label="Toggle Chat"
                >
                    {isOpen ? (
                        // X Icon
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    ) : (
                        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                            <Image
                                src="/images/chatbot_icon.png"
                                alt="Chat"
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                    )}
                </button>
            </div>
        </>
    );
}
