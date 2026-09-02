import React from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Sparkles,
  Layers,
  ShieldCheck,
  Award,
  ChevronRight,
  SlidersHorizontal,
  Compass,
  CheckCircle2,
} from 'lucide-react';
import { ActiveTab, PortfolioItem } from '../types';
import { PORTFOLIO_DATA, BRAND_VALUES } from '../data';

interface HomeViewProps {
  setActiveTab: (tab: ActiveTab) => void;
  onSelectPortfolio: (item: PortfolioItem) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  setActiveTab,
  onSelectPortfolio,
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <div id="home-view" className="space-y-20 md:space-y-32">
      {/* Hero Section */}
      <section id="hero-section" className="relative pt-6 pb-12 md:pt-12 md:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Hero Typography & CTA */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 space-y-6 md:space-y-8"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F0F2F5] dark:bg-[#1C1D1E] border border-[#E5E7EB] dark:border-[#2A2C2E]">
              <span className="w-2 h-2 rounded-full bg-[#D4C3B3] animate-pulse" />
              <span className="font-mono text-[11px] uppercase tracking-widest text-[#2B2D2F] dark:text-[#D4C3B3] font-medium">
                PREMIUM INTERIOR ARCHITECTURE STUDIO
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="font-light text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tighter leading-[1.12] text-[#2B2D2F] dark:text-[#EAEAEA]"
            >
              감각을 짓다, <br />
              <span className="font-normal font-serif italic text-[#2B2D2F] dark:text-white">
                호흡이 머무는 공간
              </span>
              <span className="text-[#D4C3B3]">.</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-[#2B2D2F]/75 dark:text-zinc-300 font-sans font-light leading-relaxed max-w-xl"
            >
              열린공간은 불필요한 장식을 덜어내고 선과 면의 완벽한 비례로 삶의 품격을 완성합니다. 
              수석 디자이너 서승협의 1:1 맞춤형 하이엔드 공간 큐레이션을 경험해보세요.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 pt-2">
              <button
                id="hero-quote-btn"
                type="button"
                onClick={() => setActiveTab('estimate')}
                className="px-6 sm:px-8 py-3.5 min-h-[48px] bg-[#2B2D2F] dark:bg-[#D4C3B3] text-[#FBFBFA] dark:text-[#121314] font-medium text-sm rounded-md shadow-sm hover:bg-[#1C1D1E] dark:hover:bg-[#E5D7C9] transition-all duration-200 cursor-pointer inline-flex items-center gap-2.5 group"
                aria-label="가상 견적 시뮬레이터 바로가기"
              >
                <Sparkles className="w-4 h-4 text-[#D4C3B3] dark:text-[#2B2D2F]" />
                <span>1:1 가상 견적 산정하기</span>
                <ArrowRight className="w-4 h-4 transform transition-transform duration-200 group-hover:translate-x-1" />
              </button>

              <button
                id="hero-portfolio-btn"
                type="button"
                onClick={() => setActiveTab('portfolio')}
                className="px-6 py-3.5 min-h-[48px] bg-transparent hover:bg-[#F0F2F5] dark:hover:bg-[#1C1D1E] text-[#2B2D2F] dark:text-[#EAEAEA] border border-[#2B2D2F]/20 dark:border-[#2A2C2E] font-medium text-sm rounded-md transition-colors cursor-pointer inline-flex items-center gap-2"
                aria-label="포트폴리오 갤러리 둘러보기"
              >
                <span>대표 시공 사례</span>
                <ChevronRight className="w-4 h-4 text-[#D4C3B3]" />
              </button>
            </motion.div>

            {/* Micro Badges */}
            <motion.div variants={itemVariants} className="pt-4 grid grid-cols-3 gap-4 border-t border-[#E5E7EB] dark:border-[#2A2C2E]">
              <div>
                <div className="font-mono text-xl sm:text-2xl font-light text-[#2B2D2F] dark:text-[#EAEAEA]">
                  100%
                </div>
                <div className="text-xs text-[#2B2D2F]/60 dark:text-zinc-400 mt-0.5">
                  책임 감리 시공
                </div>
              </div>
              <div>
                <div className="font-mono text-xl sm:text-2xl font-light text-[#2B2D2F] dark:text-[#EAEAEA]">
                  0.1mm
                </div>
                <div className="text-xs text-[#2B2D2F]/60 dark:text-zinc-400 mt-0.5">
                  정밀 오차 공법
                </div>
              </div>
              <div>
                <div className="font-mono text-xl sm:text-2xl font-light text-[#2B2D2F] dark:text-[#EAEAEA]">
                  LIFETIME
                </div>
                <div className="text-xs text-[#2B2D2F]/60 dark:text-zinc-400 mt-0.5">
                  사후관리 케어 패스
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Visual Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#E5E7EB] dark:border-[#2A2C2E] bg-[#1C1D1E] aspect-[4/5] group">
              <img
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80"
                alt="열린공간 프리미엄 미니멀 거실 인테리어"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121314]/90 via-[#121314]/20 to-transparent pointer-events-none" />

              {/* Floating Highlight Card */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-xl bg-[#FBFBFA]/90 dark:bg-[#1C1D1E]/90 backdrop-blur-md border border-white/20 dark:border-[#2A2C2E] shadow-lg">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] tracking-wider uppercase text-[#D4C3B3] font-semibold">
                    FEATURED PROJECT
                  </span>
                  <span className="text-xs font-mono text-[#2B2D2F]/60 dark:text-zinc-400">
                    52평 · Minimal
                  </span>
                </div>
                <h3 className="text-base font-semibold text-[#2B2D2F] dark:text-[#EAEAEA] mt-1">
                  한남 더 힐 프리미엄 미니멀 하우스
                </h3>
                <p className="text-xs text-[#2B2D2F]/70 dark:text-zinc-400 mt-1 line-clamp-1">
                  비움의 미학을 극대화한 무몰딩 화이트 공간과 월넛의 조화
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Brand Values Section */}
      <section id="values-section" className="py-12 border-y border-[#E5E7EB] dark:border-[#2A2C2E]">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="font-mono uppercase text-xs tracking-widest text-[#D4C3B3] font-semibold">
              CORE PHILOSOPHY
            </span>
            <h2 className="font-light text-3xl sm:text-4xl tracking-tighter text-[#2B2D2F] dark:text-[#EAEAEA] mt-2">
              공간을 대하는 세 가지 원칙
            </h2>
          </div>
          <p className="text-sm text-[#2B2D2F]/70 dark:text-zinc-400 max-w-md">
            단순한 인테리어 시공을 넘어 머무는 사람의 정서와 일상의 가치를 높이는 독자적인 설계 규범입니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {BRAND_VALUES.map((val) => (
            <div
              key={val.number}
              className="p-8 rounded-xl bg-[#F0F2F5]/60 dark:bg-[#1C1D1E] border border-[#E5E7EB] dark:border-[#2A2C2E] flex flex-col justify-between transition-all duration-300 hover:border-[#D4C3B3] dark:hover:border-[#D4C3B3]"
            >
              <div>
                <span className="font-mono text-2xl font-light text-[#D4C3B3]">
                  {val.number}
                </span>
                <h3 className="text-xl font-semibold text-[#2B2D2F] dark:text-[#EAEAEA] mt-4 mb-2">
                  {val.title}
                </h3>
                <p className="font-mono text-xs uppercase tracking-wider text-[#2B2D2F]/50 dark:text-zinc-400 mb-3">
                  {val.en}
                </p>
                <p className="text-sm text-[#2B2D2F]/75 dark:text-zinc-300 leading-relaxed">
                  {val.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Curated Portfolio Showcase Grid */}
      <section id="featured-portfolio-section" className="space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="font-mono uppercase text-xs tracking-widest text-[#D4C3B3] font-semibold">
              SELECTED WORKS
            </span>
            <h2 className="font-light text-3xl sm:text-4xl tracking-tighter text-[#2B2D2F] dark:text-[#EAEAEA] mt-2">
              열린공간 대표 시공 포트폴리오
            </h2>
          </div>
          <button
            id="view-all-portfolio-btn"
            type="button"
            onClick={() => setActiveTab('portfolio')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#2B2D2F] dark:text-[#D4C3B3] hover:underline cursor-pointer"
          >
            <span>전체 갤러리 보기</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PORTFOLIO_DATA.slice(0, 4).map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              onClick={() => onSelectPortfolio(item)}
              className="group cursor-pointer rounded-xl overflow-hidden border border-[#E5E7EB] dark:border-[#2A2C2E] bg-[#F0F2F5]/40 dark:bg-[#1C1D1E] shadow-sm flex flex-col"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-zinc-900">
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 inline-flex gap-2">
                  <span className="px-2.5 py-1 text-xs font-mono font-medium rounded-md bg-[#121314]/80 text-white backdrop-blur-md">
                    {item.pyeong}
                  </span>
                  <span className="px-2.5 py-1 text-xs font-mono font-medium rounded-md bg-[#D4C3B3]/90 text-[#2B2D2F] backdrop-blur-md">
                    {item.style}
                  </span>
                </div>
                <div className="absolute bottom-4 right-4">
                  <span className="px-3 py-1 text-xs font-medium rounded-md bg-[#2B2D2F]/80 text-white backdrop-blur-md">
                    예산 {item.budget}
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-[#2B2D2F] dark:text-[#EAEAEA] group-hover:text-[#8C7A6B] dark:group-hover:text-[#D4C3B3] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#2B2D2F]/70 dark:text-zinc-400 mt-2 line-clamp-2">
                    {item.concept}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E5E7EB] dark:border-[#2A2C2E] flex items-center justify-between text-xs text-[#2B2D2F]/60 dark:text-zinc-400 font-mono">
                  <span>상세 시공 기법 보기</span>
                  <ChevronRight className="w-4 h-4 text-[#D4C3B3] transform transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Chief Designer Spotlight Section */}
      <section id="designer-spotlight-section" className="rounded-2xl p-8 sm:p-12 md:p-16 bg-[#2B2D2F] text-[#FBFBFA] relative overflow-hidden">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#D4C3B3] font-mono text-xs tracking-wider">
              <span>CHIEF DESIGNER PHILOSOPHY</span>
            </div>
            <blockquote className="font-light text-2xl sm:text-3xl md:text-4xl tracking-tight leading-snug text-[#EAEAEA]">
              “진정한 프리미엄은 화려한 치장이 아니라, <br className="hidden sm:inline" />
              머무는 이의 숨결과 시선이 닿는 모든 곳에 깃든 <br className="hidden sm:inline" />
              <span className="font-serif italic text-[#D4C3B3]">단정한 비움과 세심한 배려</span>에서 시작됩니다.”
            </blockquote>
            <div className="pt-2">
              <div className="text-base font-semibold text-white">서승협 (Seo Seung-hyeop)</div>
              <div className="text-xs text-[#D4C3B3] font-mono">주식회사 열린공간 대표 디자이너 / 수석 공간 큐레이터</div>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4 justify-end">
            <button
              id="designer-story-btn"
              type="button"
              onClick={() => setActiveTab('story')}
              className="px-6 py-3.5 bg-[#D4C3B3] text-[#2B2D2F] font-semibold text-sm rounded-md hover:bg-[#E5D7C9] transition-colors cursor-pointer text-center"
            >
              브랜드 스토리 & 인터뷰 읽기
            </button>
            <button
              id="process-view-btn"
              type="button"
              onClick={() => setActiveTab('process')}
              className="px-6 py-3.5 bg-white/10 text-white font-medium text-sm rounded-md hover:bg-white/20 transition-colors cursor-pointer text-center border border-white/20"
            >
              시공 프로세스 4단계
            </button>
          </div>
        </div>
      </section>

      {/* Interactive Quick Estimate Teaser & Action Box */}
      <section id="estimate-teaser-section" className="p-8 sm:p-12 rounded-2xl bg-[#F0F2F5]/80 dark:bg-[#1C1D1E] border border-[#E5E7EB] dark:border-[#2A2C2E]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-[#D4C3B3] tracking-widest font-semibold uppercase">
              <SlidersHorizontal className="w-4 h-4" />
              <span>INTERACTIVE ESTIMATE ENGINE</span>
            </div>
            <h2 className="font-light text-2xl sm:text-3xl md:text-4xl tracking-tight text-[#2B2D2F] dark:text-[#EAEAEA]">
              나의 공간에 맞춘 가상 시공 견적을 1분 만에 확인하세요
            </h2>
            <p className="text-sm text-[#2B2D2F]/70 dark:text-zinc-400 max-w-xl">
              아파트·단독주택·상업 공간 유형, 평형대, 미니멀·우드·모던·클래식 스타일 및 시공 범위를 실시간으로 조합하여 투명한 예산 가이드를 산정해 드립니다.
            </p>
          </div>

          <div className="lg:col-span-4 flex justify-start lg:justify-end">
            <button
              id="start-estimate-btn"
              type="button"
              onClick={() => setActiveTab('estimate')}
              className="w-full sm:w-auto px-8 py-4 bg-[#2B2D2F] dark:bg-[#D4C3B3] text-[#FBFBFA] dark:text-[#121314] font-semibold text-sm rounded-lg shadow-md hover:bg-[#1C1D1E] dark:hover:bg-[#E5D7C9] transition-all cursor-pointer flex items-center justify-center gap-2 group"
            >
              <Sparkles className="w-4 h-4 text-[#D4C3B3] dark:text-[#2B2D2F]" />
              <span>가상 견적 시뮬레이터 시작</span>
              <ArrowRight className="w-4 h-4 transform transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
