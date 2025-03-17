"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export function ChatRoom() {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // if (!process.env.GEMINI_API_KEY) {
  //   throw new Error("GEMINI_API_KEY is not set in .env.local");
  // }
  const apiKey = "AIzaSyAHvOS_mmO_HFOaKcoF-43GUaBVdJ8KdDM";
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: "Studying the symptoms give a clear follow up having medicine recommendation, precautions, probable causes, dietary changes and other information needed . Reply back in points and subpoints concisely.\n",
  });
  
  const generationConfig = {
    temperature: 0.75,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  async function run(userInput: string) {
    const chatSession = model.startChat({
      generationConfig,
      history: [
      ],
    });
  
    const result = await chatSession.sendMessage(userInput);
    return result.response.text();
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    const aiResponse = await run(inputText);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: Math.random().toString(36).substr(2, 9),
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className={`h-[calc(100vh-12rem)] ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg flex flex-col`}>
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-sm rounded-lg px-4 py-2 ${
                      message.sender === 'user'
                        ? 'bg-blue-600 text-white'
                        : isDarkMode
                        ? 'bg-gray-700'
                        : 'bg-gray-200'
                    }`}
                  >
                    <p>{message.text}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'user'
                        ? 'text-blue-200'
                        : isDarkMode
                        ? 'text-gray-400'
                        : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          <form onSubmit={handleSend} className="p-4 border-t border-gray-200">
            <div className="flex space-x-4">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your message..."
                className={`flex-1 px-4 py-2 rounded-lg ${
                  isDarkMode
                    ? 'bg-gray-700 text-white placeholder-gray-400'
                    : 'bg-gray-100 text-gray-900 placeholder-gray-500'
                }`}
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Send size={20} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}