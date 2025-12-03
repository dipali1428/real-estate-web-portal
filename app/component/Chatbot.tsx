// components/Chatbot.tsx
'use client';

import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { 
  MessageCircle, 
  X, 
  Bot, 
  User, 
  Send, 
  Minimize2, 
  Maximize2, 
  HelpCircle,
  Paperclip,
  Upload,
  FileText,
  Image as ImageIcon,
  Globe,
  Database
} from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  time: string;
  type?: 'text' | 'image' | 'file';
  data?: any;
}

interface TrainingFile {
  id: string;
  name: string;
  type: 'csv' | 'pdf' | 'image' | 'url' | 'text';
  status: 'uploading' | 'processing' | 'trained' | 'failed';
  uploadedAt: string;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 1, 
      text: "Hello! Welcome to Infinity Arthvishva. I'm your AI financial assistant. How can I help you today?", 
      sender: 'bot', 
      time: 'Just now' 
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showTrainingPanel, setShowTrainingPanel] = useState(false);
  const [trainingFiles, setTrainingFiles] = useState<TrainingFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load trained files from backend on component mount
  useEffect(() => {
    fetchTrainingFiles();
  }, []);

  const fetchTrainingFiles = async () => {
    try {
      const response = await fetch('/api/training/files');
      const data = await response.json();
      setTrainingFiles(data.files || []);
    } catch (error) {
      console.error('Error fetching training files:', error);
    }
  };

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);
    setShowWelcome(false);

    try {
      // Send message to OpenAI API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputText,
          chatHistory: messages.slice(-10), // Send last 10 messages for context
          useKnowledgeBase: true
        }),
      });

      const data = await response.json();

      const botResponse: Message = {
        id: messages.length + 2,
        text: data.response || "I apologize, but I couldn't process your request at the moment.",
        sender: 'bot',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Fallback to local responses if API fails
      const fallbackResponses = [
        "I understand you're interested in financial services. We offer comprehensive solutions for loans, investments, and insurance. Which service are you looking for?",
        "For loan inquiries, we provide competitive rates: Home Loan (8.5-9.5%), Personal Loan (10.5-14%), Business Loan (11-15%). Would you like to know more about eligibility?",
        "Our investment portfolio includes Mutual Funds (expected returns 12-18%), Fixed Deposits (7-8%), Stock Market investments, and Portfolio Management Services.",
        "For insurance, we offer Life Insurance starting at ₹500/month for ₹10L coverage, Health Insurance family plans, Motor Insurance, and comprehensive property coverage.",
        "You can check your CIBIL score through our secure portal. A good credit score (750+) helps in getting better loan rates. Need guidance on improving your score?"
      ];

      const botResponse: Message = {
        id: messages.length + 2,
        text: fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)],
        sender: 'bot',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    
    for (const file of Array.from(files)) {
      const fileType = getFileType(file);
      const newFile: TrainingFile = {
        id: Date.now().toString(),
        name: file.name,
        type: fileType,
        status: 'uploading',
        uploadedAt: new Date().toISOString()
      };

      setTrainingFiles(prev => [...prev, newFile]);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', fileType);
      formData.append('name', file.name);

      try {
        const response = await fetch('/api/training/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();

        setTrainingFiles(prev => 
          prev.map(f => 
            f.id === newFile.id 
              ? { ...f, status: data.success ? 'processing' : 'failed' }
              : f
          )
        );

        // Simulate processing progress
        simulateProcessing(newFile.id);
      } catch (error) {
        console.error('Upload failed:', error);
        setTrainingFiles(prev => 
          prev.map(f => 
            f.id === newFile.id ? { ...f, status: 'failed' } : f
          )
        );
      }
    }

    setIsUploading(false);
    event.target.value = '';
  };

  const simulateProcessing = (fileId: string) => {
    setTimeout(() => {
      setTrainingFiles(prev => 
        prev.map(f => 
          f.id === fileId ? { ...f, status: 'trained' } : f
        )
      );
    }, 3000);
  };

  const getFileType = (file: File): 'csv' | 'pdf' | 'image' | 'text' => {
    if (file.type === 'text/csv') return 'csv';
    if (file.type === 'application/pdf') return 'pdf';
    if (file.type.startsWith('image/')) return 'image';
    return 'text';
  };

  const handleWebsiteTraining = async (url: string) => {
    const newFile: TrainingFile = {
      id: Date.now().toString(),
      name: url,
      type: 'url',
      status: 'processing',
      uploadedAt: new Date().toISOString()
    };

    setTrainingFiles(prev => [...prev, newFile]);

    try {
      const response = await fetch('/api/training/website', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (data.success) {
        setTrainingFiles(prev => 
          prev.map(f => 
            f.id === newFile.id ? { ...f, status: 'trained' } : f
          )
        );
      }
    } catch (error) {
      console.error('Website training failed:', error);
      setTrainingFiles(prev => 
        prev.map(f => 
          f.id === newFile.id ? { ...f, status: 'failed' } : f
        )
      );
    }
  };

  const clearChat = () => {
    setMessages([
      { 
        id: 1, 
        text: "Hello! I'm here to help with your financial queries. What would you like to know?", 
        sender: 'bot', 
        time: 'Just now' 
      }
    ]);
    setShowWelcome(true);
  };

  const quickQuestions = [
    'Loan Interest Rates',
    'Investment Options',
    'Insurance Plans',
    'Check CIBIL Score',
    'Contact Support'
  ];

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen ? (
          <button
            onClick={() => setIsOpen(true)}
            className="group relative flex flex-col items-center focus:outline-none"
            aria-label="Open chat"
          >
            <div 
              className="w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transform transition-transform duration-300 hover:scale-110 hover:shadow-2xl"
              style={{
                background: 'linear-gradient(135deg, #2076C7 0%, #1CADA3 100%)',
                boxShadow: '0 10px 25px rgba(32, 118, 199, 0.3)'
              }}
            >
              <MessageCircle className="w-8 h-8 text-white" />
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center text-xs text-white font-bold">
                <span>💬</span>
              </div>
            </div>
            
            <div className="absolute -top-12 right-0 mb-2 px-3 py-2 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-lg pointer-events-none">
              Chat with our AI Assistant
              <div className="absolute -bottom-1 right-6 w-3 h-3 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] transform rotate-45"></div>
            </div>
          </button>
        ) : (
          <div className={`transition-all duration-300 ${isMinimized ? 'translate-y-20' : 'translate-y-0'}`}>
            {/* Chat Window */}
            <div 
              className="rounded-2xl shadow-2xl overflow-hidden mb-4 transition-all duration-300"
              style={{
                width: '420px',
                height: isMinimized ? '60px' : showTrainingPanel ? '600px' : '550px',
                background: 'linear-gradient(135deg, #E8F6FA 0%, #F0FAFB 50%, #E9F8F6 100%)',
              }}
            >
              {/* Header */}
              <div 
                className="px-4 py-3 flex items-center justify-between cursor-pointer"
                onClick={() => isMinimized && setIsMinimized(false)}
                style={{
                  background: 'linear-gradient(to right, #2076C7, #1CADA3)',
                }}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">AI Financial Assistant</h3>
                    <p className="text-white/80 text-sm">{isMinimized ? 'Click to expand' : 'Trained AI • Powered by OpenAI'}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {!isMinimized && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowTrainingPanel(!showTrainingPanel);
                        }}
                        className="p-2 hover:bg-white/20 rounded-lg transition-colors focus:outline-none"
                        title="Training panel"
                        aria-label="Toggle training panel"
                      >
                        <Database className="w-4 h-4 text-white" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          clearChat();
                        }}
                        className="p-2 hover:bg-white/20 rounded-lg transition-colors focus:outline-none"
                        title="Clear chat"
                        aria-label="Clear chat"
                      >
                        <span className="text-white text-sm">Clear</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsMinimized(true);
                        }}
                        className="p-2 hover:bg-white/20 rounded-lg transition-colors focus:outline-none"
                        title="Minimize"
                        aria-label="Minimize chat"
                      >
                        <Minimize2 className="w-4 h-4 text-white" />
                      </button>
                    </>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsOpen(false);
                    }}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors focus:outline-none"
                    title="Close"
                    aria-label="Close chat"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>

              {!isMinimized && (
                <>
                  {/* Training Panel */}
                  {showTrainingPanel ? (
                    <div className="p-4 h-full overflow-y-auto">
                      <div className="mb-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-2">Train Your AI Assistant</h3>
                        <p className="text-sm text-gray-600 mb-4">
                          Upload documents to train your AI with custom knowledge
                        </p>
                        
                        {/* Upload Section */}
                        <div className="mb-6">
                          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center mb-4">
                            <input
                              type="file"
                              ref={fileInputRef}
                              onChange={handleFileUpload}
                              multiple
                              accept=".csv,.pdf,.txt,.jpg,.jpeg,.png,.xlsx"
                              className="hidden"
                            />
                            <button
                              onClick={() => fileInputRef.current?.click()}
                              className="px-4 py-3 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-lg font-medium hover:opacity-90 transition-opacity mb-3 flex items-center justify-center mx-auto"
                              disabled={isUploading}
                            >
                              <Upload className="w-5 h-5 mr-2" />
                              {isUploading ? 'Uploading...' : 'Upload Files'}
                            </button>
                            <p className="text-xs text-gray-500">CSV, PDF, Images, Text files</p>
                          </div>

                          {/* Website URL Input */}
                          <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Train from Website URL
                            </label>
                            <div className="flex gap-2">
                              <input
                                type="url"
                                placeholder="https://example.com"
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1CADA3]"
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter' && e.currentTarget.value) {
                                    handleWebsiteTraining(e.currentTarget.value);
                                    e.currentTarget.value = '';
                                  }
                                }}
                              />
                              <button
                                onClick={() => {
                                  const input = document.querySelector('input[type="url"]') as HTMLInputElement;
                                  if (input.value) {
                                    handleWebsiteTraining(input.value);
                                    input.value = '';
                                  }
                                }}
                                className="px-4 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-lg hover:opacity-90"
                              >
                                <Globe className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Uploaded Files List */}
                        <div>
                          <h4 className="font-medium text-gray-700 mb-3">Training Files</h4>
                          {trainingFiles.length === 0 ? (
                            <p className="text-sm text-gray-500 text-center py-4">No files uploaded yet</p>
                          ) : (
                            <div className="space-y-2 max-h-60 overflow-y-auto">
                              {trainingFiles.map((file) => (
                                <div
                                  key={file.id}
                                  className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200"
                                >
                                  <div className="flex items-center space-x-3">
                                    {file.type === 'pdf' && <FileText className="w-5 h-5 text-red-500" />}
                                    {file.type === 'csv' && <FileText className="w-5 h-5 text-green-500" />}
                                    {file.type === 'image' && <ImageIcon className="w-5 h-5 text-blue-500" />}
                                    {file.type === 'url' && <Globe className="w-5 h-5 text-purple-500" />}
                                    <div>
                                      <p className="text-sm font-medium text-gray-800 truncate max-w-[200px]">
                                        {file.name}
                                      </p>
                                      <p className="text-xs text-gray-500">
                                        {new Date(file.uploadedAt).toLocaleDateString()}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-center">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                      file.status === 'trained' 
                                        ? 'bg-green-100 text-green-800'
                                        : file.status === 'processing'
                                        ? 'bg-yellow-100 text-yellow-800'
                                        : file.status === 'failed'
                                        ? 'bg-red-100 text-red-800'
                                        : 'bg-blue-100 text-blue-800'
                                    }`}>
                                      {file.status}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* Chat Content */}
                      <div className="flex flex-col h-[calc(100%-60px)]">
                        {/* Welcome Banner */}
                        {showWelcome && (
                          <div className="px-4 pt-4">
                            <div className="bg-gradient-to-r from-[#2076C7]/10 to-[#1CADA3]/10 rounded-xl p-4 border border-[#1CADA3]/20">
                              <div className="flex items-start space-x-2">
                                <HelpCircle className="w-5 h-5 text-[#1CADA3] mt-0.5" />
                                <div>
                                  <p className="font-semibold text-[#2076C7] mb-1">How can I help you today?</p>
                                  <p className="text-sm text-gray-600">I'm trained on your documents and ready to assist!</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                          {messages.map((message) => (
                            <div
                              key={message.id}
                              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                              <div
                                className={`max-w-[85%] rounded-2xl p-3 ${message.sender === 'user'
                                    ? 'rounded-br-none bg-gradient-to-r from-[#2076C7] to-[#1CADA3]'
                                    : 'rounded-bl-none bg-white'
                                  } shadow-md`}
                              >
                                <div className="flex items-center justify-between mb-1">
                                  <div className="flex items-center space-x-2">
                                    {message.sender === 'bot' ? (
                                      <Bot className="w-3 h-3 text-[#1CADA3]" />
                                    ) : (
                                      <User className="w-3 h-3 text-white" />
                                    )}
                                    <span className={`text-xs ${message.sender === 'user' ? 'text-white/80' : 'text-gray-500'}`}>
                                      {message.sender === 'bot' ? 'AI Assistant' : 'You'}
                                    </span>
                                  </div>
                                  <span className={`text-xs ${message.sender === 'user' ? 'text-white/80' : 'text-gray-500'}`}>
                                    {message.time}
                                  </span>
                                </div>
                                <p className={message.sender === 'user' ? 'text-white' : 'text-gray-800'}>
                                  {message.text}
                                </p>
                              </div>
                            </div>
                          ))}

                          {isTyping && (
                            <div className="flex justify-start">
                              <div className="bg-white rounded-2xl rounded-bl-none p-3 shadow-md">
                                <div className="flex items-center space-x-2 mb-2">
                                  <Bot className="w-3 h-3 text-[#1CADA3]" />
                                  <span className="text-xs text-gray-500">AI Assistant is thinking...</span>
                                </div>
                                <div className="flex space-x-1">
                                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#2076C7] to-[#1CADA3] animate-pulse"></div>
                                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#2076C7] to-[#1CADA3] animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#2076C7] to-[#1CADA3] animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                                </div>
                              </div>
                            </div>
                          )}

                          <div ref={messagesEndRef} />
                        </div>

                        {/* Quick Questions */}
                        <div className="px-4 py-2 border-t border-gray-200 bg-white/50">
                          <p className="text-xs text-gray-500 mb-2">Quick questions:</p>
                          <div className="flex flex-wrap gap-2">
                            {quickQuestions.map((question, index) => (
                              <button
                                key={index}
                                onClick={() => handleSend()}
                                className="px-3 py-1.5 text-xs rounded-full border border-gray-300 hover:border-[#1CADA3] hover:text-[#1CADA3] transition-all duration-300 bg-white hover:shadow-sm whitespace-nowrap focus:outline-none"
                                aria-label={`Ask about ${question}`}
                              >
                                {question}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Input Area */}
                        <div className="p-4 border-t border-gray-200 bg-white">
                          <div className="flex items-end space-x-2">
                            <button
                              onClick={() => setShowTrainingPanel(true)}
                              className="p-2 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none"
                              title="Train AI"
                              aria-label="Train AI with documents"
                            >
                              <Database className="w-5 h-5 text-gray-600" />
                            </button>
                            <div className="flex-1 relative">
                              <textarea
                                ref={inputRef}
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSend();
                                  }
                                }}
                                placeholder="Ask about your financial data..."
                                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1CADA3]/50 focus:border-[#1CADA3] placeholder-gray-400 text-sm resize-none"
                                rows={2}
                                style={{
                                  background: 'linear-gradient(to right, #f8fafc, #f1f5f9)'
                                }}
                              />
                              <button
                                onClick={handleSend}
                                disabled={!inputText.trim()}
                                className="absolute right-3 bottom-3 p-1.5 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none"
                                style={{
                                  background: inputText.trim()
                                    ? 'linear-gradient(to right, #2076C7, #1CADA3)'
                                    : '#e5e7eb'
                                }}
                                aria-label="Send message"
                              >
                                <Send className={`w-4 h-4 ${inputText.trim() ? 'text-white' : 'text-gray-400'}`} />
                              </button>
                            </div>
                          </div>
                          <p className="text-[10px] text-gray-500 text-center mt-2">
                            Powered by OpenAI GPT-4 • Trained on your documents • Your data is secure
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>

            {/* Minimized State Icon */}
            {isMinimized && (
              <button
                onClick={() => setIsMinimized(false)}
                className="absolute -top-16 right-0 group focus:outline-none"
                aria-label="Expand chat"
              >
                <div 
                  className="w-12 h-12 rounded-full shadow-lg flex items-center justify-center transform transition-transform duration-300 hover:scale-110"
                  style={{
                    background: 'linear-gradient(135deg, #2076C7 0%, #1CADA3 100%)',
                  }}
                >
                  <Maximize2 className="w-5 h-5 text-white" />
                </div>
                <div className="absolute -top-8 right-0 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                  Expand chat
                </div>
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Chatbot;