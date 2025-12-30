'use client';
import { useState, useEffect, useRef } from 'react';
import { getCustomResponses } from './customeResponses';
import { Bot, UserRound, Send, X, Settings2, Trash2 } from "lucide-react";

interface Message {
  id: number;
  type: 'user' | 'bot';
  content: string;
  time: string;
}

// Updated Logic to handle unknown queries
const getFinancialResponse = (userMessage: string): string => {
  try {
    const msg = userMessage.toLowerCase().trim();
    const customConfig = getCustomResponses();
    
    // Exact word boundary matching for high accuracy
    const match = customConfig.questions.find(q => 
      q.keywords.some(key => {
        const regex = new RegExp(`\\b${key}\\b`, 'i');
        return regex.test(msg);
      })
    );

    // If a match is found, return it. 
    // Otherwise, return the specific "get in touch" fallback message.
    return match ? match.response : "I'm sorry, I couldn't find specific information regarding that. However, I have noted your query, and our team will get in touch with you shortly to assist you further!";
  } catch (err) {
    return "I'm having a slight trouble connecting, but don't worry—our team will contact you shortly to answer your query directly.";
  }
};

// Anita Avatar Component
const AnitaAvatar = ({ size = "md" }: { size?: "sm" | "md" }) => (
  <div className={`relative flex items-center justify-center rounded-full bg-gradient-to-tr from-[#2076C7] to-[#1CADA3] shadow-md border-2 border-white ${size === 'sm' ? 'w-9 h-9' : 'w-12 h-12'} animate-message-bubble`}>
    <UserRound className={`${size === 'sm' ? 'w-5 h-5' : 'w-7 h-7'} text-white`} strokeWidth={2.5} />
    <div className="absolute bottom-0.5 right-0.5 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
  </div>
);

export default function Home() {
  return (
    <div className="font-poppins min-h-screen bg-linear-to-br from-gray-50 to-blue-50">
      <ChatbotWidget />
      
      <style jsx global>{`
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-5px); } }
        @keyframes gradientFlow { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        @keyframes pulse-glow { 0%, 100% { box-shadow: 0 0 15px rgba(32, 118, 199, 0.4); } 50% { box-shadow: 0 0 25px rgba(28, 173, 163, 0.5); } }
        @keyframes fadeInUp { from { transform: translateY(15px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes slideInRight { from { transform: translateX(20px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes slideInLeft { from { transform: translateX(-20px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes messageBubbleFloat { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-3px) rotate(2deg); } }
        
        .moving-gradient {
          background: linear-gradient(90deg, #2076C7 0%, #1CADA3 25%, #2076C7 50%, #1CADA3 75%, #2076C7 100%);
          background-size: 200% 100%;
          animation: gradientFlow 5s linear infinite;
        }
        .animate-pulse-glow { animation: pulse-glow 2s infinite; }
        .animate-fade-in-up { animation: fadeInUp 0.4s ease-out; }
        .animate-slide-in-right { animation: slideInRight 0.3s ease-out; }
        .animate-slide-in-left { animation: slideInLeft 0.3s ease-out; }
        .animate-message-bubble { animation: messageBubbleFloat 4s ease-in-out infinite; }
        .google-style-response { background: white; border-left: 4px solid #1CADA3; padding-left: 12px; margin: 8px 0; }
      `}</style>
    </div>
  );
}

const ChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, type: 'bot', content: "👋 Hello! I'm **ANITA**, your personal assistant at Infinity Arthvishva. How can I assist you today?", time: 'Now' }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = () => {
    if (!userInput.trim()) return;

    const userMsg: Message = { 
      id: Date.now(), 
      type: 'user', 
      content: userInput, 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    };

    setMessages(prev => [...prev, userMsg]);
    const inputForBot = userInput;
    setUserInput('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = getFinancialResponse(inputForBot);
      const botMsg: Message = { 
        id: Date.now() + 1, 
        type: 'bot', 
        content: botResponse, 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-[#2076C7] to-[#1CADA3] text-white rounded-full shadow-2xl flex items-center justify-center z-50 animate-pulse-glow transition-transform hover:scale-110 active:scale-95"
      >
        <AnitaAvatar />
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[380px] h-[550px] bg-white rounded-2xl shadow-2xl flex flex-col z-40 overflow-hidden border border-gray-200 animate-fade-in-up">
          
          <div className="moving-gradient p-4 text-white">
            <div className="flex justify-between items-center relative z-10">
              <div className="flex items-center space-x-3">
                <AnitaAvatar size="sm" />
                <div>
                  <h3 className="font-bold text-sm leading-tight">ANITA</h3>
                  <div className="flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                    <span className="text-[10px] opacity-90 font-semibold">Automated Navigation and Interface Task Assistant.</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <button onClick={() => setIsSettingsOpen(true)} className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"><Settings2 size={16} /></button>
                <button onClick={() => setIsOpen(false)} className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"><X size={18} /></button>
              </div>
            </div>
          </div>

          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {messages.map((m) => (
              <div key={m.id} className={`flex mb-4 ${m.type === 'user' ? 'justify-end animate-slide-in-right' : 'justify-start animate-slide-in-left'}`}>
                {m.type === 'bot' && (
                  <div className="mt-1 mr-2">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center border border-blue-200 shadow-sm">
                       <Bot size={14} className="text-blue-600" />
                    </div>
                  </div>
                )}
                <div className={`max-w-[80%] rounded-2xl p-3 text-sm shadow-sm leading-relaxed ${
                  m.type === 'user' 
                  ? 'bg-[#2076C7] text-white rounded-tr-none' 
                  : 'bg-white border border-gray-100 text-gray-900 rounded-tl-none google-style-response'
                }`}>
                  <div style={{ whiteSpace: 'pre-line' }}>
                    {m.content.split('**').map((part, i) => i % 2 === 1 ? <strong key={i} className="font-bold">{part}</strong> : part)}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && <div className="flex items-center space-x-2 animate-pulse mb-4 text-gray-400 text-xs italic"><Bot size={12}/> Anita is typing...</div>}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 bg-white border-t border-gray-100">
            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-1 focus-within:border-[#2076C7] focus-within:bg-white transition-all shadow-inner">
              <input 
                type="text" 
                value={userInput} 
                onChange={(e) => setUserInput(e.target.value)} 
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()} 
                placeholder="Ask ANITA..." 
                className="flex-1 bg-transparent border-none outline-none py-2 text-sm text-gray-900 placeholder:text-gray-400" 
              />
              <button 
                onClick={handleSendMessage} 
                disabled={!userInput.trim()} 
                className={`p-2 rounded-full transition-all ${userInput.trim() ? 'bg-[#2076C7] text-white shadow-md' : 'text-gray-300'}`}
              >
                <Send size={16} />
              </button>
            </div>
            <p className="text-[10px] text-center text-gray-400 mt-2 font-medium">Infinity Arthvishva Team</p>
          </div>
        </div>
      )}

      {isSettingsOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-2xl w-full max-w-xs overflow-hidden shadow-2xl animate-fade-in-up">
            <div className="moving-gradient p-4 text-white font-bold text-center">Chat Settings</div>
            <div className="p-6 space-y-4">
              <button 
                onClick={() => { setMessages([{ id: 1, type: 'bot', content: "Conversation cleared. How can I help?", time: 'Now' }]); setIsSettingsOpen(false); }}
                className="w-full flex items-center justify-center gap-2 py-3 bg-red-50 text-red-600 rounded-xl text-sm font-semibold hover:bg-red-100 transition-colors"
              >
                <Trash2 size={16} /> Clear Conversation
              </button>
              <button onClick={() => setIsSettingsOpen(false)} className="w-full py-3 bg-gray-100 text-gray-600 rounded-xl text-sm font-semibold">Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}