/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Moon, Stars, ChevronRight, ChevronLeft, Volume2, VolumeX, Wand2, Loader2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const INITIAL_STORY = [
  {
    id: 1,
    text: "Far, far away, there is a sparkling Peace Garden. Chubby bears, hopping bunnies, and singing birds all live here together.",
    image: "https://ais-pre-nybeqpxmgshpqyyyotocib-95992970969.us-west2.run.app/input_file_0.png",
    bgColor: "bg-emerald-50",
    icon: <Heart className="text-emerald-400" size={48} />,
  },
  {
    id: 2,
    text: "One morning, a little star slid down the rainbow slide. 'Waa!' She landed in the flowers and became a sweet baby named Douding.",
    image: "https://ais-pre-nybeqpxmgshpqyyyotocib-95992970969.us-west2.run.app/input_file_1.png",
    bgColor: "bg-yellow-50",
    icon: <Stars className="text-yellow-400" size={48} />,
  },
  {
    id: 3,
    text: "Bunny and Squirrel were fighting over a pinecone. They were very grumpy! Douding crawled over and gave them a big, warm hug.",
    image: "https://ais-pre-nybeqpxmgshpqyyyotocib-95992970969.us-west2.run.app/input_file_2.png",
    bgColor: "bg-orange-50",
    icon: <Heart className="text-orange-400" size={48} />,
  },
  {
    id: 4,
    text: "'Hug, no fight,' Douding whispered. Bunny and Squirrel smiled and shared the pinecone together.",
    image: "https://ais-pre-nybeqpxmgshpqyyyotocib-95992970969.us-west2.run.app/input_file_3.png",
    bgColor: "bg-blue-50",
    icon: <Heart className="text-blue-400" size={48} />,
  },
  {
    id: 5,
    text: "A little bird brought a shiny seed from the sky. Douding planted it in the soft dirt and gave it a little water.",
    image: "https://ais-pre-nybeqpxmgshpqyyyotocib-95992970969.us-west2.run.app/input_file_4.png",
    bgColor: "bg-sky-50",
    icon: <Stars className="text-sky-400" size={48} />,
  },
  {
    id: 6,
    text: "Soon, a beautiful rainbow flower grew! Its petals glowed with gentle light, making the whole garden happy.",
    image: "https://ais-pre-nybeqpxmgshpqyyyotocib-95992970969.us-west2.run.app/input_file_5.png",
    bgColor: "bg-pink-50",
    icon: <Heart className="text-pink-400" size={48} />,
  },
  {
    id: 7,
    text: "Now, everyone in the Peace Garden is the best of friends. They hug, share, and sing songs every single day.",
    image: "https://ais-pre-nybeqpxmgshpqyyyotocib-95992970969.us-west2.run.app/input_file_6.png",
    bgColor: "bg-green-50",
    icon: <Heart className="text-green-400" size={48} />,
  },
  {
    id: 8,
    text: "At night, Grandma Moon tucked Douding in with a soft cloud blanket. 'Goodnight, Douding. Goodnight, Peace.'",
    image: "https://ais-pre-nybeqpxmgshpqyyyotocib-95992970969.us-west2.run.app/input_file_7.png",
    bgColor: "bg-indigo-50",
    icon: <Moon className="text-indigo-400" size={48} />,
  },
  {
    id: 9,
    text: "Dear Douding, May your world always be filled with love and peace.",
    image: "https://ais-pre-nybeqpxmgshpqyyyotocib-95992970969.us-west2.run.app/input_file_8.png",
    bgColor: "bg-rose-50",
    icon: <Heart className="text-rose-400" size={48} />,
  },
];

export default function App() {
  const [story, setStory] = useState(INITIAL_STORY);
  const [currentPage, setCurrentPage] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

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

        const newStory = sentences.slice(0, 9).map((text, index) => ({
          id: index + 1,
          text,
          image: `https://picsum.photos/seed/peace_garden_gen_${index}_${Date.now()}/800/600`,
          bgColor: bgColors[index],
          icon: icons[index],
        }));

        setStory(newStory);
        setCurrentPage(0);
      }
    } catch (error) {
      console.error("Failed to generate story:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const nextPage = () => {
    if (currentPage < story.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const page = story[currentPage];

  return (
    <div className={`fixed inset-0 transition-colors duration-1000 ${page.bgColor} flex flex-col items-center justify-center p-4 md:p-8`}>
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
          <span className="font-serif text-lg font-medium">豆丁的美梦</span>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={generateNewStory}
            disabled={isGenerating}
            className="p-3 rounded-full bg-white/50 hover:bg-white transition-colors flex items-center gap-2"
            title="生成新故事"
          >
            {isGenerating ? <Loader2 className="animate-spin" size={24} /> : <Wand2 size={24} />}
          </button>
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className="p-3 rounded-full bg-white/50 hover:bg-white transition-colors"
          >
            {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
          </button>
        </div>
      </div>

      {/* Story Container */}
      <div className="relative w-full max-w-4xl aspect-[4/3] md:aspect-[16/9] flex flex-col md:flex-row items-center gap-8 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${story[0].text.substring(0, 5)}-${currentPage}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col md:flex-row items-center gap-8 w-full"
          >
            {/* Image Section */}
            <div className="w-full md:w-1/2 h-full relative group">
              <div className="absolute inset-0 bg-white/20 rounded-3xl -rotate-2 group-hover:rotate-0 transition-transform duration-500"></div>
              <img
                src={page.image}
                alt="Story Illustration"
                className="w-full h-full object-cover rounded-3xl shadow-2xl relative z-10 border-4 border-white"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-4 -right-4 z-20 bg-white p-4 rounded-2xl shadow-lg">
                {page.icon}
              </div>
            </div>

            {/* Text Section */}
            <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left">
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="story-text text-[#5d4037]"
              >
                {page.text}
              </motion.p>
              
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
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress Indicator */}
      <div className="absolute bottom-10 flex gap-2">
        {story.map((_, idx) => (
          <div
            key={idx}
            className={`h-2 rounded-full transition-all duration-500 ${
              idx === currentPage ? 'w-8 bg-[#5d4037]' : 'w-2 bg-[#5d4037]/20'
            }`}
          />
        ))}
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
