import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Sun, Moon, ArrowRight, Sparkles } from 'lucide-react';
import { ActiveTab, ThemeMode } from '../types';
import { Logo } from './Logo';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  theme: ThemeMode;
  toggleTheme: () => void;
}

interface NavItem {
  key: ActiveTab;
  label: string;
  en: string;
}

const NAV_ITEMS: NavItem[] = [
  { key: 'home', label: '홈', en: 'HOME' },
  { key: 'story', label: '브랜드 스토리', en: 'STORY' },
  { key: 'portfolio', label: '포트폴리오', en: 'PORTFOLIO' },
  { key: 'process', label: '시공 프로세스', en: 'PROCESS' },
  { key: 'estimate', label: '견적 및 문의', en: 'ESTIMATE' },
];

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  theme,
  toggleTheme,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (tab: ActiveTab) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FBFBFA]/90 dark:bg-[#121314]/90 backdrop-blur-md shadow-xs border-b border-[#E5E7EB]/80 dark:border-[#2A2C2E]/80 py-3.5'
          : 'bg-[#FBFBFA]/60 dark:bg-[#121314]/60 backdrop-blur-xs border-b border-transparent py-5'
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <button
            id="brand-logo-btn"
            type="button"
            onClick={() => handleNavClick('home')}
            className="cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#D4C3B3] rounded-sm p-1 -m-1"
            aria-label="열린공간 홈으로 이동"
          >
            <Logo size="md" />
          </button>

          {/* Desktop Navigation Links */}
          <nav id="desktop-nav" className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="메인 메뉴">
            {NAV_ITEMS.map((item) => {
              const isActive = activeTab === item.key;
              return (
                <button
                  key={item.key}
                  id={`nav-link-${item.key}`}
                  type="button"
                  onClick={() => handleNavClick(item.key)}
                  className={`relative px-3.5 py-2 min-h-[44px] inline-flex flex-col items-center justify-center font-medium text-sm transition-colors duration-200 cursor-pointer rounded-md ${
                    isActive
                      ? 'text-[#2B2D2F] dark:text-[#EAEAEA] font-semibold'
                      : 'text-[#2B2D2F]/70 dark:text-[#EAEAEA]/70 hover:text-[#2B2D2F] dark:hover:text-white'
                  }`}
                  aria-label={`${item.label} 페이지로 이동`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span className="leading-none">{item.label}</span>
                  <span className="font-mono text-[9px] tracking-wider text-[#D4C3B3] uppercase mt-0.5 opacity-90">
                    {item.en}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#2B2D2F] dark:bg-[#D4C3B3] rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Header Controls: Theme Toggle & Quick CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Dark/Light Mode Switcher */}
            <button
              id="theme-toggle-btn"
              type="button"
              onClick={toggleTheme}
              className="p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-[#F0F2F5] dark:bg-[#1C1D1E] text-[#2B2D2F] dark:text-[#D4C3B3] hover:bg-[#E5E7EB] dark:hover:bg-[#2A2C2E] transition-all duration-200 cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#D4C3B3]"
              aria-label={theme === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환'}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-[#D4C3B3] transition-transform duration-300 hover:rotate-45" />
              ) : (
                <Moon className="w-4 h-4 text-[#2B2D2F] transition-transform duration-300 hover:-rotate-12" />
              )}
            </button>

            {/* Quick Estimate CTA Button (Desktop) */}
            <button
              id="header-estimate-cta-btn"
              type="button"
              onClick={() => handleNavClick('estimate')}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 min-h-[44px] bg-[#2B2D2F] dark:bg-[#D4C3B3] text-[#FBFBFA] dark:text-[#121314] text-xs font-semibold tracking-wider uppercase rounded-md shadow-xs hover:bg-[#1C1D1E] dark:hover:bg-[#E5D7C9] transition-all duration-200 cursor-pointer group focus:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#D4C3B3]"
              aria-label="1:1 맞춤 견적 신청하기"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D4C3B3] dark:text-[#2B2D2F]" />
              <span>무료 견적 산정</span>
              <ArrowRight className="w-3.5 h-3.5 transform transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              id="mobile-menu-toggle-btn"
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-md bg-[#F0F2F5] dark:bg-[#1C1D1E] text-[#2B2D2F] dark:text-[#EAEAEA] hover:bg-[#E5E7EB] dark:hover:bg-[#2A2C2E] transition-colors cursor-pointer focus:outline-hidden"
              aria-label={isMobileMenuOpen ? '메뉴 닫기' : '모바일 메뉴 열기'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Fullscreen Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-nav-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden border-b border-[#E5E7EB] dark:border-[#2A2C2E] bg-[#FBFBFA] dark:bg-[#121314] overflow-hidden"
          >
            <div className="w-full max-w-7xl mx-auto px-4 py-6 flex flex-col gap-2">
              {NAV_ITEMS.map((item) => {
                const isActive = activeTab === item.key;
                return (
                  <button
                    key={item.key}
                    id={`mobile-nav-${item.key}`}
                    type="button"
                    onClick={() => handleNavClick(item.key)}
                    className={`flex items-center justify-between px-4 py-3.5 min-h-[48px] rounded-lg text-left transition-all ${
                      isActive
                        ? 'bg-[#F0F2F5] dark:bg-[#1C1D1E] text-[#2B2D2F] dark:text-[#EAEAEA] font-semibold'
                        : 'text-[#2B2D2F]/80 dark:text-[#EAEAEA]/80 hover:bg-[#F0F2F5]/60 dark:hover:bg-[#1C1D1E]/60'
                    }`}
                  >
                    <span className="text-base font-medium">{item.label}</span>
                    <span className="font-mono text-xs text-[#D4C3B3] uppercase">
                      {item.en}
                    </span>
                  </button>
                );
              })}

              <div className="pt-4 mt-2 border-t border-[#E5E7EB] dark:border-[#2A2C2E]">
                <button
                  id="mobile-drawer-cta-btn"
                  type="button"
                  onClick={() => handleNavClick('estimate')}
                  className="w-full flex items-center justify-center gap-2 py-3.5 min-h-[48px] bg-[#2B2D2F] dark:bg-[#D4C3B3] text-[#FBFBFA] dark:text-[#121314] font-semibold text-sm rounded-lg"
                >
                  <Sparkles className="w-4 h-4 text-[#D4C3B3] dark:text-[#2B2D2F]" />
                  <span>맞춤 가상 견적 시뮬레이터 시작</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
