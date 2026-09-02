import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Quote, Award, CheckCircle, ArrowRight, ShieldCheck, HeartHandshake, Compass } from 'lucide-react';
import { ActiveTab } from '../types';
import { DESIGNER_INTERVIEWS, PHILOSOPHY_MILESTONES, BRAND_VALUES } from '../data';

interface StoryViewProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const StoryView: React.FC<StoryViewProps> = ({ setActiveTab }) => {
  return (
    <div id="story-view" className="space-y-20 md:space-y-28 py-4">
      {/* Story Header */}
      <section id="story-header" className="space-y-6 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F0F2F5] dark:bg-[#1C1D1E] border border-[#E5E7EB] dark:border-[#2A2C2E]">
          <span className="font-mono text-[11px] uppercase tracking-widest text-[#2B2D2F] dark:text-[#D4C3B3] font-medium">
            BRAND STORY & PHILOSOPHY
          </span>
        </div>
        <h1 className="font-light text-4xl sm:text-5xl md:text-6xl tracking-tighter text-[#2B2D2F] dark:text-[#EAEAEA] leading-tight">
          비움으로 채우는 <br />
          <span className="font-normal font-serif italic text-[#2B2D2F] dark:text-white">
            가장 온전한 휴식의 미학
          </span>
        </h1>
        <p className="text-base sm:text-lg text-[#2B2D2F]/75 dark:text-zinc-300 font-sans font-light leading-relaxed">
          '열린공간'은 벽을 세워 공간을 가두는 대신, 빛과 공기, 그리고 거주자의 라이프스타일이 자유롭게 순환하는 열린 캔버스를 만듭니다. 눈부신 기교보다는 머무를수록 깊어지는 공간의 본질을 연구합니다.
        </p>
      </section>

      {/* Visual Manifesto Section */}
      <section id="manifesto-section" className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6 space-y-6">
          <span className="font-mono uppercase text-xs tracking-widest text-[#D4C3B3] font-semibold">
            DESIGN MANIFESTO
          </span>
          <h2 className="font-light text-3xl sm:text-4xl tracking-tighter text-[#2B2D2F] dark:text-[#EAEAEA]">
            선과 면, 빛의 조화로 빚어내는 <br />
            1:1 커스텀 공간 큐레이션
          </h2>
          <div className="space-y-4 text-sm sm:text-base text-[#2B2D2F]/75 dark:text-zinc-300 leading-relaxed font-sans font-light">
            <p>
              우리는 인테리어를 단순한 시각적 마감재의 교체로 보지 않습니다. 문지방의 1mm 턱을 없애고, 몰딩을 벽체 속으로 숨기며, 조명의 광원을 은폐하여 시선에 걸리는 모든 시각적 노이즈를 정제합니다.
            </p>
            <p>
              시선이 머무는 곳마다 평온이 깃들고, 손길이 닿는 모든 원목과 석재의 질감에서 자연의 온기가 전해질 때 비로소 진정한 프리미엄이 완성됩니다.
            </p>
          </div>

          <div className="pt-4 grid grid-cols-2 gap-4 border-t border-[#E5E7EB] dark:border-[#2A2C2E]">
            <div className="flex items-start gap-2.5">
              <CheckCircle className="w-5 h-5 text-[#D4C3B3] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-[#2B2D2F] dark:text-[#EAEAEA]">무몰딩·무문선 특화</h4>
                <p className="text-xs text-[#2B2D2F]/60 dark:text-zinc-400 mt-0.5">극도의 미니멀 마감</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle className="w-5 h-5 text-[#D4C3B3] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-[#2B2D2F] dark:text-[#EAEAEA]">천연 친환경 자재</h4>
                <p className="text-xs text-[#2B2D2F]/60 dark:text-zinc-400 mt-0.5">E0/Super E0 기준 엄수</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="relative rounded-2xl overflow-hidden shadow-xl border border-[#E5E7EB] dark:border-[#2A2C2E] aspect-[4/3] bg-zinc-900">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
              alt="열린공간 디테일 마감 및 천연 자재"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
              loading="lazy"
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.dataset.fallback) {
                  target.dataset.fallback = 'true';
                  target.src = 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80';
                }
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6 text-white text-xs font-mono">
              <span className="text-[#D4C3B3]">DETAIL & MATERIAL</span> · 이태리 직수입 대리석 및 친환경 규조토 벽체
            </div>
          </div>
        </div>
      </section>

      {/* Chief Designer Profile & Interview Section */}
      <section id="designer-interview-section" className="space-y-10">
        <div className="p-8 sm:p-12 rounded-2xl bg-[#F0F2F5]/70 dark:bg-[#1C1D1E] border border-[#E5E7EB] dark:border-[#2A2C2E]">
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between pb-8 border-b border-[#E5E7EB] dark:border-[#2A2C2E]">
            <div>
              <span className="font-mono uppercase text-xs tracking-widest text-[#D4C3B3] font-semibold">
                HEAD ARCHITECT & DESIGNER
              </span>
              <h2 className="font-light text-3xl sm:text-4xl tracking-tight text-[#2B2D2F] dark:text-[#EAEAEA] mt-2">
                대표 디자이너 서승협 인터뷰
              </h2>
              <p className="text-sm text-[#2B2D2F]/70 dark:text-zinc-400 mt-1">
                "공간은 사람의 마음을 담는 가장 큰 그릇입니다."
              </p>
            </div>

            <div className="px-5 py-3 rounded-lg bg-[#2B2D2F] text-[#FBFBFA] font-mono text-xs text-center">
              <div className="text-[#D4C3B3] font-semibold">SEO SEUNG-HYEOP</div>
              <div className="text-zinc-400 text-[10px] mt-0.5">CHIEF EXECUTIVE DESIGNER</div>
            </div>
          </div>

          <div className="mt-8 space-y-6">
            {DESIGNER_INTERVIEWS.map((item, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-[#FBFBFA] dark:bg-[#121314] border border-[#E5E7EB] dark:border-[#2A2C2E]/70 space-y-3"
              >
                <div className="flex items-start gap-3">
                  <span className="font-mono text-xs font-bold text-[#D4C3B3] bg-[#2B2D2F] dark:bg-[#2A2C2E] px-2 py-0.5 rounded-sm">
                    Q{index + 1}
                  </span>
                  <h3 className="text-base sm:text-lg font-semibold text-[#2B2D2F] dark:text-[#EAEAEA]">
                    {item.question}
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-[#2B2D2F]/80 dark:text-zinc-300 leading-relaxed pl-8 font-light">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* History & Milestones Timeline */}
      <section id="milestones-section" className="space-y-10">
        <div>
          <span className="font-mono uppercase text-xs tracking-widest text-[#D4C3B3] font-semibold">
            HERITAGE & TIMELINE
          </span>
          <h2 className="font-light text-3xl sm:text-4xl tracking-tighter text-[#2B2D2F] dark:text-[#EAEAEA] mt-2">
            열린공간이 걸어온 발자취
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PHILOSOPHY_MILESTONES.map((mile) => (
            <div
              key={mile.year}
              className="p-6 rounded-xl bg-[#F0F2F5]/50 dark:bg-[#1C1D1E] border border-[#E5E7EB] dark:border-[#2A2C2E] flex flex-col justify-between"
            >
              <div>
                <div className="font-mono text-2xl font-light text-[#D4C3B3] mb-3">
                  {mile.year}
                </div>
                <h3 className="text-base font-semibold text-[#2B2D2F] dark:text-[#EAEAEA] mb-2">
                  {mile.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#2B2D2F]/70 dark:text-zinc-400 leading-relaxed font-light">
                  {mile.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Direct CTA */}
      <section id="story-cta-section" className="p-8 sm:p-12 rounded-2xl bg-[#2B2D2F] text-[#FBFBFA] flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="font-light text-2xl sm:text-3xl text-white">
            당신만의 특별한 공간 이야기를 시작하세요
          </h3>
          <p className="text-xs sm:text-sm text-[#D4C3B3]">
            수석 디자이너 서승협과의 1:1 심층 상담을 통해 최적의 공간 솔루션을 제안해 드립니다.
          </p>
        </div>
        <button
          id="story-cta-estimate-btn"
          type="button"
          onClick={() => {
            setActiveTab('estimate');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="px-8 py-3.5 min-h-[48px] bg-[#D4C3B3] text-[#2B2D2F] font-semibold text-sm rounded-lg hover:bg-[#E5D7C9] transition-colors cursor-pointer inline-flex items-center gap-2 shrink-0"
        >
          <Sparkles className="w-4 h-4 text-[#2B2D2F]" />
          <span>상담 및 견적 신청</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>
    </div>
  );
};
