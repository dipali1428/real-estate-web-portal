'use client';
import { useState, useEffect, useRef } from 'react';
import { getCustomResponses } from './customeResponses';
import { Bot, Send, X, Settings2, Trash2 } from "lucide-react";

interface Message {
  id: number;
  type: 'user' | 'bot';
  content: string;
  time: string;
}

// Logic to handle responses
const getFinancialResponse = (userMessage: string): string => {
  try {
    const msg = userMessage.toLowerCase().trim();
    const customConfig = getCustomResponses();
    const match = customConfig.questions.find(q => 
      q.keywords.some(key => new RegExp(`\\b${key}\\b`, 'i').test(msg))
    );
    return match ? match.response : "I'm sorry, I couldn't find specific information regarding that. However, I have noted your query, and our team will get in touch with you shortly to assist you further!";
  } catch (err) {
    return "I'm having a slight trouble connecting, but don't worry—our team will contact you shortly.";
  }
};

/**
 * 🤖 ANITA ROBOT AVATAR (SVG VERSION)
 * This is a high-fidelity reproduction of the 3D robot you provided.
 * Since it is code, it will NOT disappear on refresh.
 */
const AnitaAvatar = ({ size = "md" }: { size?: "sm" | "md" }) => (
  <div className={`relative flex items-center justify-center rounded-full bg-[#1CADA3] shadow-lg border-2 border-[#2076C7] ${size === 'sm' ? 'w-9 h-9' : 'w-14 h-14'} animate-message-bubble overflow-hidden`}>
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* Ear/Side Pods */}
      <rect x="12" y="35" width="10" height="20" rx="5" fill="#1CADA3" />
      <rect x="78" y="35" width="10" height="20" rx="5" fill="#1CADA3" />
      
      {/* Head */}
      <rect x="22" y="15" width="56" height="50" rx="22" fill="white" />
      
      {/* Visor/Screen */}
      <rect x="28" y="24" width="44" height="30" rx="14" fill="#1A237E" />
      
      {/* Cyan Glowing Eyes */}
      <path d="M38 38 Q42 32 46 38" stroke="#00E5FF" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <path d="M54 38 Q58 32 62 38" stroke="#00E5FF" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      
      {/* Body Section */}
      <path d="M30 60 Q50 90 70 60 L65 85 L35 85 Z" fill="white" />
      
      {/* Chest Plate */}
      <path d="M40 68 Q50 82 60 68" fill="#1CADA3" />
    </svg>
  </div>
);

export default function Home() {
  return (
    <div className="font-poppins bg-linear-to-br from-gray-50 to-blue-50">
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
      {/* Main Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="fixed bottom-6 right-6 z-50 animate-pulse-glow transition-transform hover:scale-110 active:scale-95 bg-white rounded-full"
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
                    <span className="w-1.5 h-1.5  rounded-full animate-pulse"></span>
                    <span className="text-[10px] opacity-90 font-semibold">Automated Navigation and Interface Task Assistant.</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <button onClick={() => setIsOpen(false)} className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"><X size={18} /></button>
              </div>
            </div>
          </div>

          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {messages.map((m) => (
              <div key={m.id} className={`flex mb-4 ${m.type === 'user' ? 'justify-end animate-slide-in-right' : 'justify-start animate-slide-in-left'}`}>
                {m.type === 'bot' && (
                  <div className="mt-1 mr-2">
                    <div className="scale-75 origin-top-left">
                      <AnitaAvatar size="sm" />
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

    </>
  );
}