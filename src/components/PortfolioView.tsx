import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  SlidersHorizontal,
  X,
  Sparkles,
  ArrowRight,
  Maximize2,
  CheckCircle2,
  Layers,
  Building,
  DollarSign,
  Tag,
} from 'lucide-react';
import { PortfolioItem, ActiveTab } from '../types';
import { PORTFOLIO_DATA } from '../data';

interface PortfolioViewProps {
  selectedItem: PortfolioItem | null;
  setSelectedItem: (item: PortfolioItem | null) => void;
  setActiveTab: (tab: ActiveTab) => void;
  onApplyEstimatePreset?: (style: string, pyeong: string) => void;
}

export const PortfolioView: React.FC<PortfolioViewProps> = ({
  selectedItem,
  setSelectedItem,
  setActiveTab,
  onApplyEstimatePreset,
}) => {
  const [selectedPyeong, setSelectedPyeong] = useState<string>('전체');
  const [selectedStyle, setSelectedStyle] = useState<string>('전체');
  const [selectedBudget, setSelectedBudget] = useState<string>('전체');

  const pyeongFilters = ['전체', '30평대', '40평대', '50평 이상'];
  const styleFilters = ['전체', 'Minimal', 'Warm Wood', 'Modern', 'Classic'];
  const budgetFilters = ['전체', '1억 미만', '1억 ~ 1.5억', '1.5억 이상'];

  const filteredData = useMemo(() => {
    return PORTFOLIO_DATA.filter((item) => {
      // Pyeong matching
      if (selectedPyeong !== '전체') {
        const num = parseInt(item.pyeong.replace(/[^0-9]/g, ''), 10) || 0;
        if (selectedPyeong === '30평대' && (num < 30 || num >= 40)) return false;
        if (selectedPyeong === '40평대' && (num < 40 || num >= 50)) return false;
        if (selectedPyeong === '50평 이상' && num < 50) return false;
      }

      // Style matching
      if (selectedStyle !== '전체' && item.style !== selectedStyle) {
        return false;
      }

      // Budget matching
      if (selectedBudget !== '전체') {
        const budgetStr = item.budget;
        const isUnder100M = budgetStr.includes('9천') || budgetStr.includes('8천') || budgetStr.includes('7천');
        const is100to150M = budgetStr.includes('1억 2천') || budgetStr.includes('1억 5천');
        const isOver150M = budgetStr.includes('2억') || budgetStr.includes('1억 8천');

        if (selectedBudget === '1억 미만' && !isUnder100M) return false;
        if (selectedBudget === '1억 ~ 1.5억' && !is100to150M) return false;
        if (selectedBudget === '1.5억 이상' && !(isOver150M || budgetStr.includes('1억 5천'))) return false;
      }

      return true;
    });
  }, [selectedPyeong, selectedStyle, selectedBudget]);

  const handleEstimateWithThisProject = (item: PortfolioItem) => {
    if (onApplyEstimatePreset) {
      onApplyEstimatePreset(item.style, item.pyeong);
    }
    setSelectedItem(null);
    setActiveTab('estimate');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div id="portfolio-view" className="space-y-12 py-4">
      {/* Portfolio Header */}
      <section id="portfolio-header" className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F0F2F5] dark:bg-[#1C1D1E] border border-[#E5E7EB] dark:border-[#2A2C2E]">
          <span className="font-mono text-[11px] uppercase tracking-widest text-[#2B2D2F] dark:text-[#D4C3B3] font-medium">
            PORTFOLIO & RESIDENTIAL SPACES
          </span>
        </div>
        <h1 className="font-light text-4xl sm:text-5xl tracking-tighter text-[#2B2D2F] dark:text-[#EAEAEA]">
          열린공간이 완성한 <br />
          <span className="font-normal font-serif italic text-[#2B2D2F] dark:text-white">
            독창적인 공간 아카이브
          </span>
        </h1>
        <p className="text-base text-[#2B2D2F]/75 dark:text-zinc-300 font-sans font-light">
          한남, 반포, 성수, 평창동 등 프리미엄 주거 공간에 적용된 실제 시공 사례와 세밀한 건축 공법을 확인하세요.
        </p>
      </section>

      {/* Real-time Multi-Filter Toolbar */}
      <section
        id="portfolio-filters"
        className="p-6 rounded-2xl bg-[#F0F2F5]/70 dark:bg-[#1C1D1E] border border-[#E5E7EB] dark:border-[#2A2C2E] space-y-5"
      >
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#D4C3B3] font-semibold">
          <SlidersHorizontal className="w-4 h-4" />
          <span>실시간 카테고리 필터링</span>
        </div>

        {/* Filter Rows */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pyeong Filter */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-[#2B2D2F]/80 dark:text-zinc-300 flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-[#D4C3B3]" />
              <span>평형대별</span>
            </label>
            <div className="flex flex-wrap gap-1.5">
              {pyeongFilters.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setSelectedPyeong(p)}
                  className={`px-3 py-1.5 min-h-[36px] text-xs font-mono rounded-md transition-all cursor-pointer ${
                    selectedPyeong === p
                      ? 'bg-[#2B2D2F] text-white dark:bg-[#D4C3B3] dark:text-[#121314] font-semibold shadow-xs'
                      : 'bg-[#FBFBFA] dark:bg-[#121314] text-[#2B2D2F]/70 dark:text-zinc-400 hover:text-[#2B2D2F] dark:hover:text-white border border-[#E5E7EB] dark:border-[#2A2C2E]'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Style Filter */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-[#2B2D2F]/80 dark:text-zinc-300 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-[#D4C3B3]" />
              <span>디자인 스타일별</span>
            </label>
            <div className="flex flex-wrap gap-1.5">
              {styleFilters.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSelectedStyle(s)}
                  className={`px-3 py-1.5 min-h-[36px] text-xs font-mono rounded-md transition-all cursor-pointer ${
                    selectedStyle === s
                      ? 'bg-[#2B2D2F] text-white dark:bg-[#D4C3B3] dark:text-[#121314] font-semibold shadow-xs'
                      : 'bg-[#FBFBFA] dark:bg-[#121314] text-[#2B2D2F]/70 dark:text-zinc-400 hover:text-[#2B2D2F] dark:hover:text-white border border-[#E5E7EB] dark:border-[#2A2C2E]'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Budget Filter */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-[#2B2D2F]/80 dark:text-zinc-300 flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-[#D4C3B3]" />
              <span>예산 범위별</span>
            </label>
            <div className="flex flex-wrap gap-1.5">
              {budgetFilters.map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => setSelectedBudget(b)}
                  className={`px-3 py-1.5 min-h-[36px] text-xs font-mono rounded-md transition-all cursor-pointer ${
                    selectedBudget === b
                      ? 'bg-[#2B2D2F] text-white dark:bg-[#D4C3B3] dark:text-[#121314] font-semibold shadow-xs'
                      : 'bg-[#FBFBFA] dark:bg-[#121314] text-[#2B2D2F]/70 dark:text-zinc-400 hover:text-[#2B2D2F] dark:hover:text-white border border-[#E5E7EB] dark:border-[#2A2C2E]'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Reset Active Filters Info */}
        {(selectedPyeong !== '전체' || selectedStyle !== '전체' || selectedBudget !== '전체') && (
          <div className="pt-2 flex items-center justify-between text-xs text-[#2B2D2F]/70 dark:text-zinc-400">
            <span>{filteredData.length}개의 프로젝트가 검색되었습니다.</span>
            <button
              type="button"
              onClick={() => {
                setSelectedPyeong('전체');
                setSelectedStyle('전체');
                setSelectedBudget('전체');
              }}
              className="text-[#D4C3B3] dark:text-[#D4C3B3] underline font-medium cursor-pointer"
            >
              필터 초기화
            </button>
          </div>
        )}
      </section>

      {/* Portfolio Grid */}
      <section id="portfolio-grid" className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              onClick={() => setSelectedItem(item)}
              className="group cursor-pointer rounded-2xl overflow-hidden border border-[#E5E7EB] dark:border-[#2A2C2E] bg-[#F0F2F5]/50 dark:bg-[#1C1D1E] shadow-sm flex flex-col justify-between"
            >
              {/* Image Container with Hover Scale */}
              <div className="relative aspect-[16/11] overflow-hidden bg-zinc-900">
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                {/* Top Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="px-3 py-1 text-xs font-mono font-medium rounded-md bg-[#121314]/80 text-white backdrop-blur-md">
                    {item.pyeong}
                  </span>
                  <span className="px-3 py-1 text-xs font-mono font-medium rounded-md bg-[#D4C3B3] text-[#2B2D2F] font-semibold backdrop-blur-md">
                    {item.style}
                  </span>
                </div>

                {/* Hover overlay hint */}
                <div className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 text-white text-xs backdrop-blur-md opacity-90 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-3.5 h-3.5 text-[#D4C3B3]" />
                  <span>상세 보기</span>
                </div>
              </div>

              {/* Content Panel */}
              <div className="p-6 space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-[#D4C3B3]">
                    <span>BUDGET {item.budget}</span>
                    <span className="text-[#2B2D2F]/50 dark:text-zinc-500">PROJECT #{item.id}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-[#2B2D2F] dark:text-[#EAEAEA] mt-1 group-hover:text-[#8C7A6B] dark:group-hover:text-[#D4C3B3] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#2B2D2F]/70 dark:text-zinc-400 mt-2 font-light line-clamp-2">
                    {item.concept}
                  </p>
                </div>

                {/* Key Spec Highlights */}
                <div className="pt-3 border-t border-[#E5E7EB] dark:border-[#2A2C2E] space-y-1">
                  {(item.details || []).slice(0, 2).map((detail, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-[#2B2D2F]/80 dark:text-zinc-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4C3B3] shrink-0" />
                      <span className="truncate">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-2 py-16 text-center space-y-4 bg-[#F0F2F5]/40 dark:bg-[#1C1D1E] rounded-2xl border border-dashed border-[#E5E7EB] dark:border-[#2A2C2E]">
            <p className="text-sm text-[#2B2D2F]/60 dark:text-zinc-400">
              선택하신 조건에 부합하는 포트폴리오가 없습니다.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedPyeong('전체');
                setSelectedStyle('전체');
                setSelectedBudget('전체');
              }}
              className="px-4 py-2 bg-[#2B2D2F] text-white dark:bg-[#D4C3B3] dark:text-[#121314] text-xs font-semibold rounded-md"
            >
              전체 포트폴리오 보기
            </button>
          </div>
        )}
      </section>

      {/* Portfolio Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="fixed inset-0 bg-black/75 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="relative w-full max-w-4xl bg-[#FBFBFA] dark:bg-[#1C1D1E] rounded-2xl shadow-2xl border border-[#E5E7EB] dark:border-[#2A2C2E] overflow-hidden z-10 max-h-[90vh] flex flex-col"
            >
              {/* Header Close Bar */}
              <div className="p-4 sm:p-6 flex items-center justify-between border-b border-[#E5E7EB] dark:border-[#2A2C2E]">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-[#D4C3B3] font-semibold uppercase tracking-wider">
                    PORTFOLIO ARCHIVE
                  </span>
                  <span className="text-zinc-400">|</span>
                  <span className="text-xs font-mono text-[#2B2D2F]/70 dark:text-zinc-400">
                    {selectedItem.pyeong} · {selectedItem.style}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full hover:bg-[#F0F2F5] dark:hover:bg-[#2A2C2E] text-[#2B2D2F] dark:text-[#EAEAEA] transition-colors cursor-pointer"
                  aria-label="모달 닫기"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
                {/* Large Hero Showcase */}
                <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-zinc-900 border border-[#E5E7EB] dark:border-[#2A2C2E]">
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-md bg-black/75 text-[#D4C3B3] font-mono text-xs backdrop-blur-md">
                    시공 예산: {selectedItem.budget}
                  </div>
                </div>

                {/* Title & Concept */}
                <div className="space-y-3">
                  <h2 className="font-light text-2xl sm:text-3xl tracking-tight text-[#2B2D2F] dark:text-[#EAEAEA]">
                    {selectedItem.title}
                  </h2>
                  <p className="text-base text-[#2B2D2F]/80 dark:text-zinc-300 leading-relaxed font-light">
                    {selectedItem.concept}
                  </p>
                </div>

                {/* Technical Construction Details */}
                <div className="p-6 rounded-xl bg-[#F0F2F5]/60 dark:bg-[#121314] border border-[#E5E7EB] dark:border-[#2A2C2E] space-y-4">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-[#D4C3B3] font-semibold flex items-center gap-2">
                    <Layers className="w-4 h-4" />
                    <span>적용된 정밀 공법 및 마감 사양</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(selectedItem.details || []).map((detail, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-sm text-[#2B2D2F] dark:text-zinc-200">
                        <CheckCircle2 className="w-4 h-4 text-[#D4C3B3] shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action CTA */}
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#E5E7EB] dark:border-[#2A2C2E]">
                  <div className="text-xs text-[#2B2D2F]/60 dark:text-zinc-400">
                    * 본 프로젝트의 스타일과 평형대를 기반으로 맞춤 견적을 산정할 수 있습니다.
                  </div>
                  <button
                    type="button"
                    onClick={() => handleEstimateWithThisProject(selectedItem)}
                    className="w-full sm:w-auto px-6 py-3 min-h-[44px] bg-[#2B2D2F] dark:bg-[#D4C3B3] text-[#FBFBFA] dark:text-[#121314] font-semibold text-xs rounded-lg hover:bg-[#1C1D1E] dark:hover:bg-[#E5D7C9] transition-colors cursor-pointer inline-flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-[#D4C3B3] dark:text-[#2B2D2F]" />
                    <span>이 스타일로 견적 산정하기</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
