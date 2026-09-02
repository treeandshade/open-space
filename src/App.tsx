import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ActiveTab, ThemeMode, PortfolioItem } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { StoryView } from './components/StoryView';
import { PortfolioView } from './components/PortfolioView';
import { ProcessView } from './components/ProcessView';
import { EstimateView } from './components/EstimateView';

export default function App() {
  // 1. Theme State & LocalStorage Persistence
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const savedTheme = localStorage.getItem('openspace_theme');
    if (savedTheme === 'dark' || savedTheme === 'light') {
      return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('openspace_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // 2. Tab Routing State
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [selectedPortfolioItem, setSelectedPortfolioItem] = useState<PortfolioItem | null>(null);
  const [estimatePreset, setEstimatePreset] = useState<{ style: string; pyeong: string } | null>(null);

  // 3. In-App SEO Title Synchronization
  useEffect(() => {
    const titles: Record<ActiveTab, string> = {
      home: '열린공간 | 감각을 짓는 프리미엄 실내 인테리어 디자인 스튜디오',
      story: '브랜드 스토리 | 열린공간 - 비움과 채움의 공간 철학',
      portfolio: '포트폴리오 | 열린공간 - 프리미엄 주거 인테리어 아카이브',
      process: '시공 프로세스 | 열린공간 - 4단계 정밀 책임 시공 및 VR 랩',
      estimate: '가상 견적 시뮬레이터 | 열린공간 - 1:1 맞춤형 투명 견적 산정',
    };
    document.title = titles[activeTab] || '열린공간 | 감각을 짓는 프리미엄 실내 인테리어 디자인 스튜디오';
  }, [activeTab]);

  const handleSelectPortfolio = (item: PortfolioItem) => {
    setSelectedPortfolioItem(item);
  };

  const handleApplyEstimatePreset = (style: string, pyeong: string) => {
    setEstimatePreset({ style, pyeong });
  };

  return (
    <div
      id="app-root"
      className="min-h-screen bg-[#FBFBFA] dark:bg-[#121314] text-[#2B2D2F] dark:text-[#EAEAEA] font-sans transition-colors duration-300 flex flex-col justify-between"
    >
      {/* Fixed Glassmorphism Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Main Viewport Container */}
      <main
        id="main-content"
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 md:pt-32 md:pb-24 flex-1"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            {activeTab === 'home' && (
              <HomeView
                setActiveTab={setActiveTab}
                onSelectPortfolio={(item) => {
                  setSelectedPortfolioItem(item);
                  setActiveTab('portfolio');
                }}
              />
            )}

            {activeTab === 'story' && <StoryView setActiveTab={setActiveTab} />}

            {activeTab === 'portfolio' && (
              <PortfolioView
                selectedItem={selectedPortfolioItem}
                setSelectedItem={setSelectedPortfolioItem}
                setActiveTab={setActiveTab}
                onApplyEstimatePreset={handleApplyEstimatePreset}
              />
            )}

            {activeTab === 'process' && <ProcessView setActiveTab={setActiveTab} />}

            {activeTab === 'estimate' && (
              <EstimateView initialPreset={estimatePreset} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Structured Grid Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
