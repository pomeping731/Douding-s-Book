/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Moon, Stars, ChevronRight, ChevronLeft, Volume2, VolumeX, Wand2, Loader2, Edit3, Save, Upload, Check, Sparkles } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const BirthdayCake = ({ isBlownOut, onBlowOut }: { isBlownOut: boolean, onBlowOut: () => void }) => {
  return (
    <div className="relative flex flex-col items-center justify-center scale-90 md:scale-110">
      {/* Candles */}
      <div className="flex gap-4 mb-[-10px] z-20">
        {[1].map((i) => (
          <div key={i} className="relative flex flex-col items-center">
            <AnimatePresence>
              {!isBlownOut && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [1, 1.2, 1], y: [0, -2, 0] }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ repeat: Infinity, duration: 0.6 }}
                  className="w-4 h-6 bg-orange-400 rounded-full blur-[2px] absolute -top-6 shadow-[0_0_15px_rgba(251,146,60,0.8)]"
                />
              )}
            </AnimatePresence>
            <div className="w-3 h-12 bg-pink-200 rounded-t-sm border-b-2 border-pink-300" />
          </div>
        ))}
      </div>

      {/* Cake Layers */}
      <div className="w-40 h-16 bg-white rounded-t-xl shadow-inner border-x-2 border-t-2 border-pink-100 relative overflow-hidden">
        <div className="absolute top-2 left-0 w-full h-4 bg-pink-50 opacity-50" />
        <div className="absolute bottom-0 left-0 w-full h-2 bg-pink-200" />
      </div>
      <div className="w-48 h-20 bg-pink-100 rounded-t-lg shadow-md border-x-2 border-t-2 border-pink-200 relative">
        <div className="absolute top-4 left-4 flex gap-2">
          <Heart size={12} className="text-white opacity-60" />
          <Heart size={12} className="text-white opacity-60" />
        </div>
        <div className="absolute bottom-0 left-0 w-full h-3 bg-pink-300 opacity-30" />
      </div>

      {/* Plate */}
      <div className="w-56 h-4 bg-white rounded-full shadow-lg border-b-4 border-gray-100" />

      {!isBlownOut ? (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBlowOut}
          className="mt-6 px-6 py-2 bg-pink-500 text-white rounded-full font-serif text-sm shadow-lg flex items-center gap-2 z-30 hover:bg-pink-600 transition-colors"
        >
          <Sparkles size={16} />
          许个愿，吹灭蜡烛！
        </motion.button>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 text-pink-600 font-serif text-base font-bold flex flex-col items-center gap-1"
        >
          <div className="flex gap-2 items-center">
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity }}>🎂</motion.div>
            <span>愿望成真！</span>
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity }}>✨</motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

const INITIAL_STORY = [
  {
    id: 0,
    type: 'birthday',
    text: "Happy 1st Birthday to Ms. Douding! 祝豆丁女士1岁生日快乐！",
    image: "https://picsum.photos/seed/birthday_cake/800/600",
    bgColor: "bg-rose-50",
    icon: <Heart className="text-rose-400" size={48} />,
  },
  {
    id: 1,
    text: "Far, far away, there is a sparkling Peace Garden. Chubby bears, hopping bunnies, and singing birds all live here together.",
    image: "http://ipome.cn/douding/001.png",
    bgColor: "bg-emerald-50",
    icon: <Heart className="text-emerald-400" size={48} />,
  },
  {
    id: 2,
    text: "One morning, a little star slid down the rainbow slide. 'Waa!' She landed in the flowers and became a sweet baby named Douding.",
    image: "http://ipome.cn/douding/002.png",
    bgColor: "bg-yellow-50",
    icon: <Stars className="text-yellow-400" size={48} />,
  },
  {
    id: 3,
    text: "Bunny and Squirrel were fighting over a pinecone. They were very grumpy! Douding crawled over and gave them a big, warm hug.",
    image: "http://ipome.cn/douding/003.png",
    bgColor: "bg-orange-50",
    icon: <Heart className="text-orange-400" size={48} />,
  },
  {
    id: 4,
    text: "'Hug, no fight,' Douding whispered. Bunny and Squirrel smiled and shared the pinecone together.",
    image: "http://ipome.cn/douding/004.png",
    bgColor: "bg-blue-50",
    icon: <Heart className="text-blue-400" size={48} />,
  },
  {
    id: 5,
    text: "A little bird brought a shiny seed from the sky. Douding planted it in the soft dirt and gave it a little water.",
    image: "http://ipome.cn/douding/005.png",
    bgColor: "bg-sky-50",
    icon: <Stars className="text-sky-400" size={48} />,
  },
  {
    id: 6,
    text: "Soon, a beautiful rainbow flower grew! Its petals glowed with gentle light, making the whole garden happy.",
    image: "http://ipome.cn/douding/006.png",
    bgColor: "bg-pink-50",
    icon: <Heart className="text-pink-400" size={48} />,
  },
  {
    id: 7,
    text: "Now, everyone in the Peace Garden is the best of friends. They hug, share, and sing songs every single day.",
    image: "http://ipome.cn/douding/007.png",
    bgColor: "bg-green-50",
    icon: <Heart className="text-green-400" size={48} />,
  },
  {
    id: 8,
    text: "At night, Grandma Moon tucked Douding in with a soft cloud blanket. 'Goodnight, Douding. Goodnight, Peace.'",
    image: "http://ipome.cn/douding/008.png",
    bgColor: "bg-indigo-50",
    icon: <Moon className="text-indigo-400" size={48} />,
  },
  {
    id: 9,
    text: "Dear Douding, May your world always be filled with love and peace.",
    image: "http://ipome.cn/douding/end.png",
    bgColor: "bg-rose-50",
    icon: <Heart className="text-rose-400" size={48} />,
  },
];

export default function App() {
  const [story, setStory] = useState(INITIAL_STORY);
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for prev, 1 for next
  const [isMuted, setIsMuted] = useState(true); // Default to muted/off
  const [isGenerating, setIsGenerating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isBlownOut, setIsBlownOut] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    synthRef.current = window.speechSynthesis;
    return () => {
      synthRef.current?.cancel();
    };
  }, []);

  const speak = (text: string) => {
    if (!synthRef.current) return;
    synthRef.current.cancel(); // Stop any current speech
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US'; // The story is in English
    utterance.rate = 0.9; // Slightly slower for a 1-year-old
    utterance.pitch = 1.1; // Slightly higher/friendlier pitch
    
    synthRef.current.speak(utterance);
  };

  // Automatically read when page changes if not muted
  useEffect(() => {
    if (!isMuted && !isEditing) {
      speak(story[currentPage].text);
    }
  }, [currentPage, isMuted, isEditing]);

  const toggleSound = () => {
    if (!isMuted) {
      synthRef.current?.cancel();
    } else {
      speak(story[currentPage].text);
    }
    setIsMuted(!isMuted);
  };

  // Load saved story from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('douding_story');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Reconstruct the story with icons and colors
          const bgColors = ["bg-rose-50", "bg-emerald-50", "bg-yellow-50", "bg-orange-50", "bg-blue-50", "bg-sky-50", "bg-pink-50", "bg-green-50", "bg-indigo-50", "bg-rose-50"];
          const icons = [
            <Heart className="text-rose-400" size={48} />,
            <Heart className="text-emerald-400" size={48} />,
            <Stars className="text-yellow-400" size={48} />,
            <Heart className="text-orange-400" size={48} />,
            <Heart className="text-blue-400" size={48} />,
            <Stars className="text-sky-400" size={48} />,
            <Heart className="text-pink-400" size={48} />,
            <Heart className="text-green-400" size={48} />,
            <Moon className="text-indigo-400" size={48} />,
            <Heart className="text-rose-400" size={48} />,
          ];

          const reconstructed = parsed.map((page: any, idx: number) => ({
            ...page,
            id: idx,
            type: idx === 0 ? 'birthday' : (page.type || 'story'),
            bgColor: bgColors[idx % bgColors.length],
            icon: icons[idx % icons.length],
          }));
          setStory(reconstructed);
        }
      } catch (e) {
        console.error("Failed to load saved story", e);
      }
    }
  }, []);

  const saveToLocalStorage = (newStory: typeof INITIAL_STORY) => {
    // Only save serializable data
    const serializable = newStory.map(p => ({ 
      text: p.text, 
      image: p.image,
      type: p.type 
    }));
    localStorage.setItem('douding_story', JSON.stringify(serializable));
    setSaveStatus('saved');
    setTimeout(() => setSaveStatus('idle'), 2000);
  };

  const handleTextChange = (newText: string) => {
    const newStory = [...story];
    newStory[currentPage].text = newText;
    setStory(newStory);
  };

  const handleImageClick = () => {
    if (isEditing) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newStory = [...story];
        newStory[currentPage].image = reader.result as string;
        setStory(newStory);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleEditMode = () => {
    if (isEditing) {
      saveToLocalStorage(story);
    }
    setIsEditing(!isEditing);
  };

  const generateNewStory = async () => {
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: "Create a short bedtime story for a 1-year-old girl named Douding about a 'Peace Garden' filled with love and peace. Please return 9 very short sentences in English, each no more than 15 words. Return as a JSON array: [\"Sentence 1\", \"Sentence 2\", ...]",
        config: {
          responseMimeType: "application/json",
        }
      });

      const sentences = JSON.parse(response.text || "[]");
      if (Array.isArray(sentences) && sentences.length >= 9) {
        const bgColors = ["bg-emerald-50", "bg-yellow-50", "bg-orange-50", "bg-blue-50", "bg-sky-50", "bg-pink-50", "bg-green-50", "bg-indigo-50", "bg-rose-50"];
        const icons = [
          <Heart className="text-emerald-400" size={48} />,
          <Stars className="text-yellow-400" size={48} />,
          <Heart className="text-orange-400" size={48} />,
          <Heart className="text-blue-400" size={48} />,
          <Stars className="text-sky-400" size={48} />,
          <Heart className="text-pink-400" size={48} />,
          <Heart className="text-green-400" size={48} />,
          <Moon className="text-indigo-400" size={48} />,
          <Heart className="text-rose-400" size={48} />,
        ];

        const newStory = [
          INITIAL_STORY[0], // Keep the birthday page
          ...sentences.slice(0, 9).map((text, index) => ({
            id: index + 1,
            text,
            image: `https://picsum.photos/seed/peace_garden_gen_${index}_${Date.now()}/800/600`,
            bgColor: bgColors[index],
            icon: icons[index],
          }))
        ];

        setStory(newStory);
        setCurrentPage(0);
        saveToLocalStorage(newStory);
      }
    } catch (error) {
      console.error("Failed to generate story:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const nextPage = () => {
    if (currentPage < story.length - 1) {
      setDirection(1);
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setDirection(-1);
      setCurrentPage(currentPage - 1);
    }
  };

  const jumpToPage = (idx: number) => {
    if (idx === currentPage) return;
    setDirection(idx > currentPage ? 1 : -1);
    setCurrentPage(idx);
  };

  const page = story[currentPage];

  return (
    <div className={`fixed inset-0 transition-colors duration-1000 ${page.bgColor} flex flex-col items-center justify-center p-4 md:p-8`}>
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*" 
        onChange={handleFileChange} 
      />

      {/* Background Decorative Elements */}
      <div className="absolute top-10 left-10 opacity-20 animate-pulse">
        <Stars size={100} />
      </div>
      <div className="absolute bottom-10 right-10 opacity-20 animate-bounce">
        <Heart size={120} />
      </div>

      {/* Top Bar */}
      <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-10">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
            <Heart className="text-pink-500" size={20} />
          </div>
          <span className="font-serif text-lg font-medium">豆丁的和平花园</span>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={toggleEditMode}
            className={`p-3 rounded-full transition-all flex items-center gap-2 ${
              isEditing ? 'bg-green-500 text-white shadow-lg' : 'bg-white/50 hover:bg-white'
            }`}
            title={isEditing ? "保存修改" : "编辑绘本"}
          >
            {isEditing ? (
              saveStatus === 'saved' ? <Check size={24} /> : <Save size={24} />
            ) : (
              <Edit3 size={24} />
            )}
            {isEditing && <span className="text-sm font-medium pr-1">{saveStatus === 'saved' ? '已保存' : '完成'}</span>}
          </button>
          
          {!isEditing && (
            <button 
              onClick={generateNewStory}
              disabled={isGenerating}
              className="p-3 rounded-full bg-white/50 hover:bg-white transition-colors flex items-center gap-2"
              title="AI 创作新故事"
            >
              {isGenerating ? <Loader2 className="animate-spin" size={24} /> : <Wand2 size={24} />}
            </button>
          )}

          <button 
            onClick={toggleSound}
            className={`p-3 rounded-full transition-colors ${
              !isMuted ? 'bg-pink-100 text-pink-600 shadow-inner' : 'bg-white/50 hover:bg-white'
            }`}
            title={isMuted ? "开启朗读" : "关闭朗读"}
          >
            {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
          </button>
        </div>
      </div>

      {/* Story Container */}
      <div className="relative w-full max-w-5xl flex flex-col items-center justify-center z-0" style={{ perspective: "1200px" }}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={`${story[0].text.substring(0, 5)}-${currentPage}`}
            custom={direction}
            initial={{ 
              opacity: 0, 
              rotateY: direction > 0 ? 45 : -45,
              x: direction > 0 ? 100 : -100,
              scale: 0.9
            }}
            animate={{ 
              opacity: 1, 
              rotateY: 0,
              x: 0,
              scale: 1
            }}
            exit={{ 
              opacity: 0, 
              rotateY: direction > 0 ? -45 : 45,
              x: direction > 0 ? -100 : 100,
              scale: 0.9
            }}
            transition={{ 
              duration: 0.7, 
              ease: [0.23, 1, 0.32, 1] 
            }}
            style={{ transformOrigin: direction > 0 ? "right center" : "left center" }}
            className="w-full"
          >
            {page.type === 'birthday' ? (
              <div className="flex flex-col items-center justify-center text-center gap-8 md:gap-12 py-8 md:py-12 w-full min-h-[70vh]">
                <div className="relative transform hover:scale-105 transition-transform duration-500">
                  <BirthdayCake isBlownOut={isBlownOut} onBlowOut={() => setIsBlownOut(true)} />
                </div>
                
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="space-y-3"
                >
                  <h1 className="text-3xl md:text-5xl font-serif font-bold text-pink-600 tracking-tight">
                    祝豆丁女士1岁生日快乐！
                  </h1>
                  <p className="text-lg md:text-xl font-serif text-pink-400 italic">
                    Happy 1st Birthday to Ms. Douding!
                  </p>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="flex justify-center mt-4"
                >
                  <button
                    onClick={nextPage}
                    className="group px-10 py-4 bg-pink-500 hover:bg-pink-600 text-white rounded-full shadow-xl font-serif font-medium transition-all flex items-center gap-3 text-xl hover:scale-105 active:scale-95"
                  >
                    开始阅读故事 
                    <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row items-center gap-8 w-full aspect-[4/3] md:aspect-[16/9]">
                {/* Image Section */}
                <div 
                  className={`w-full md:w-1/2 h-full relative group flex items-center justify-center ${isEditing ? 'cursor-pointer' : ''}`}
                  onClick={handleImageClick}
                >
                  <div className="absolute inset-0 bg-white/20 rounded-3xl -rotate-2 group-hover:rotate-0 transition-transform duration-500"></div>
                  <img
                    src={page.image}
                    alt="Story Illustration"
                    className={`w-full h-full object-cover rounded-3xl shadow-2xl relative z-10 border-4 border-white transition-all ${
                      isEditing ? 'brightness-75 group-hover:brightness-90' : ''
                    }`}
                    referrerPolicy="no-referrer"
                  />
                  {isEditing && (
                    <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-black/50 text-white p-4 rounded-full backdrop-blur-sm flex flex-col items-center gap-2">
                        <Upload size={32} />
                        <span className="text-xs font-bold uppercase tracking-wider">更换图片</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Text Section */}
                <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left">
                  {isEditing ? (
                    <motion.textarea
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      value={page.text}
                      onChange={(e) => handleTextChange(e.target.value)}
                      className="story-text text-[#5d4037] bg-white/30 p-4 rounded-2xl border-2 border-dashed border-[#5d4037]/30 focus:outline-none focus:border-[#5d4037] w-full min-h-[150px] resize-none"
                      autoFocus
                    />
                  ) : (
                    <motion.p 
                      key={page.text}
                      initial={{ y: 15, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ 
                        duration: 0.8, 
                        delay: 0.4,
                        ease: [0.21, 0.47, 0.32, 0.98] 
                      }}
                      className="story-text text-[#5d4037]"
                    >
                      {page.text}
                    </motion.p>
                  )}
                  
                  <div className="mt-12 flex justify-center md:justify-start gap-4">
                    <button
                      onClick={prevPage}
                      disabled={currentPage === 0}
                      className={`p-4 rounded-full transition-all ${
                        currentPage === 0 ? 'opacity-30 cursor-not-allowed' : 'bg-white hover:scale-110 shadow-md'
                      }`}
                    >
                      <ChevronLeft size={32} />
                    </button>
                    <button
                      onClick={nextPage}
                      disabled={currentPage === story.length - 1}
                      className={`p-4 rounded-full transition-all ${
                        currentPage === story.length - 1 ? 'opacity-30 cursor-not-allowed' : 'bg-white hover:scale-110 shadow-md'
                      }`}
                    >
                      <ChevronRight size={32} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress Indicator */}
      <div className="absolute bottom-10 flex gap-2 items-center">
        {story.map((_, idx) => (
          <button
            key={idx}
            onClick={() => jumpToPage(idx)}
            className={`h-2 rounded-full transition-all duration-500 hover:scale-125 ${
              idx === currentPage ? 'w-8 bg-[#5d4037]' : 'w-2 bg-[#5d4037]/20'
            }`}
            title={`跳转到第 ${idx + 1} 页`}
          />
        ))}
        <span className="ml-4 text-xs font-serif text-[#5d4037]/60">
          {currentPage + 1} / {story.length}
        </span>
      </div>

      {/* Interactive Floating Bubbles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: "110%", x: `${Math.random() * 100}%` }}
            animate={{ 
              y: "-10%",
              x: `${(Math.random() * 100) + (Math.sin(i) * 10)}%`
            }}
            transition={{ 
              duration: 10 + Math.random() * 10, 
              repeat: Infinity,
              ease: "linear",
              delay: i * 2
            }}
            className="absolute w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
          />
        ))}
      </div>
    </div>
  );
}
