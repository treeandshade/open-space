import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  Layers,
  Compass,
  Eye,
  ShieldCheck,
  CheckCircle2,
  Maximize2,
  RotateCcw,
  Sun,
  Moon,
  Lamp,
  ArrowRight,
} from 'lucide-react';
import { ActiveTab } from '../types';
import { PROCESS_DATA } from '../data';

interface ProcessViewProps {
  setActiveTab: (tab: ActiveTab) => void;
}

type ShowroomSpace = 'living' | 'kitchen' | 'master' | 'bath';
type LightingMode = 'daylight' | 'mood' | 'hidden';

export const ProcessView: React.FC<ProcessViewProps> = ({ setActiveTab }) => {
  const [activeSpace, setActiveSpace] = useState<ShowroomSpace>('living');
  const [lightingMode, setLightingMode] = useState<LightingMode>('daylight');
  const [showWireframe, setShowWireframe] = useState<boolean>(false);
  const [isVREntered, setIsVREntered] = useState<boolean>(false);

  const showroomSpaces = {
    living: {
      name: '미니멀 리빙룸 (Living Room)',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
      specs: '무몰딩 6500K/3000K 듀얼 간접등 · 천연 규조토 미장 · 오크 브러쉬 원목',
      pyeong: '52평 기준 공간',
    },
    kitchen: {
      name: '아일랜드 키친 & 다이닝 (Kitchen)',
      image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
      specs: '이태리 세라믹 대형 아일랜드 · 히든 후드 시스템 · 빌트인 무늬목 수장고',
      pyeong: '대형 다이닝 존',
    },
    master: {
      name: '마스터 베드룸 스위트 (Master Bedroom)',
      image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80',
      specs: '패브릭 아트월 · 아치 게이트 웨이 · 헤리티지 웨인스코팅 도장',
      pyeong: '독립형 마스터 존',
    },
    bath: {
      name: '스톤 텍스처 배스룸 (Minimal Bath)',
      image: 'https://images.unsplash.com/photo-1617806118233-18e1db207f62?auto=format&fit=crop&w=1200&q=80',
      specs: '졸리컷 정밀 마감 600×1200 대형 타일 · 매트 블랙 매립 수전 · 매립 선반',
      pyeong: '하이엔드 습식 공간',
    },
  };

  const currentSpaceData = showroomSpaces[activeSpace];

  return (
    <div id="process-view" className="space-y-20 md:space-y-28 py-4">
      {/* Process Header */}
      <section id="process-header" className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F0F2F5] dark:bg-[#1C1D1E] border border-[#E5E7EB] dark:border-[#2A2C2E]">
          <span className="font-mono text-[11px] uppercase tracking-widest text-[#2B2D2F] dark:text-[#D4C3B3] font-medium">
            CONSTRUCTION TIMELINE & VR LAB
          </span>
        </div>
        <h1 className="font-light text-4xl sm:text-5xl tracking-tighter text-[#2B2D2F] dark:text-[#EAEAEA]">
          오차 없는 정밀함, <br />
          <span className="font-normal font-serif italic text-[#2B2D2F] dark:text-white">
            투명한 4단계 시공 프로세스
          </span>
        </h1>
        <p className="text-base text-[#2B2D2F]/75 dark:text-zinc-300 font-sans font-light">
          열린공간은 계약 순간부터 3D 가상 실측, 일일 공정 공유, 준공 후 평생 케어까지 한 치의 오차도 허용하지 않는 엄격한 감리 표준을 고수합니다.
        </p>
      </section>

      {/* 4-Step Process Timeline Cards */}
      <section id="process-timeline" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {PROCESS_DATA.map((item, index) => (
          <div
            key={item.step}
            className="p-8 rounded-2xl bg-[#F0F2F5]/60 dark:bg-[#1C1D1E] border border-[#E5E7EB] dark:border-[#2A2C2E] flex flex-col justify-between relative group hover:border-[#D4C3B3] dark:hover:border-[#D4C3B3] transition-colors"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-3xl font-light text-[#D4C3B3]">
                  {item.step}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#2B2D2F]/60 dark:text-zinc-400 bg-white/60 dark:bg-[#121314] px-2.5 py-1 rounded-sm border border-[#E5E7EB] dark:border-[#2A2C2E]">
                  STEP {index + 1}
                </span>
              </div>

              <div className="font-mono text-[11px] uppercase tracking-wider text-[#D4C3B3] font-semibold mb-1">
                {item.phase}
              </div>

              <h3 className="text-xl font-semibold text-[#2B2D2F] dark:text-[#EAEAEA] mb-3">
                {item.title}
              </h3>

              <p className="text-xs sm:text-sm text-[#2B2D2F]/75 dark:text-zinc-300 leading-relaxed font-light">
                {item.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E5E7EB] dark:border-[#2A2C2E] flex items-center gap-1.5 text-[11px] text-[#2B2D2F]/60 dark:text-zinc-400 font-mono">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#D4C3B3]" />
              <span>전담 엔지니어 책임 감리</span>
            </div>
          </div>
        ))}
      </section>

      {/* Virtual VR Showroom Experience Card */}
      <section id="vr-showroom-lab" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 font-mono uppercase text-xs tracking-widest text-[#D4C3B3] font-semibold">
              <Sparkles className="w-4 h-4" />
              <span>VIRTUAL REALITY LAB</span>
            </div>
            <h2 className="font-light text-3xl sm:text-4xl tracking-tighter text-[#2B2D2F] dark:text-[#EAEAEA] mt-2">
              가상 3D VR 공간 시뮬레이터
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#2B2D2F]/70 dark:text-zinc-400 max-w-md">
            실측 3D 렌더링 엔진으로 시공 전 공간의 채광, 조명 색온도, 마감재 비례를 실시간으로 탐색해 보세요.
          </p>
        </div>

        {/* VR Container Screen */}
        <div className="relative rounded-2xl overflow-hidden border border-[#2B2D2F]/20 dark:border-[#2A2C2E] bg-[#121314] text-white shadow-2xl">
          {/* Main Simulation Viewport */}
          <div className="relative aspect-[16/9] w-full overflow-hidden">
            <img
              src={currentSpaceData.image}
              alt={currentSpaceData.name}
              className={`w-full h-full object-cover transition-all duration-700 ${
                lightingMode === 'mood'
                  ? 'brightness-90 sepia-[0.25] saturate-125'
                  : lightingMode === 'hidden'
                  ? 'brightness-75 contrast-125'
                  : 'brightness-100'
              }`}
            />

            {/* In-Game Style Ambient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#121314] via-transparent to-black/40 pointer-events-none" />

            {/* Wireframe Grid Overlay Mode */}
            {showWireframe && (
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#D4C3B3_1px,transparent_1px),linear-gradient(to_bottom,#D4C3B3_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-25 pointer-events-none" />
            )}

            {/* Pre-entrance overlay if not clicked */}
            {!isVREntered && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#2B2D2F]/90 border border-[#D4C3B3] flex items-center justify-center text-[#D4C3B3] animate-pulse">
                  <Compass className="w-8 h-8" />
                </div>
                <div className="space-y-1 max-w-md">
                  <h3 className="text-xl font-semibold text-white">
                    3D 자이로스코픽 쇼룸 시뮬레이션
                  </h3>
                  <p className="text-xs text-zinc-300">
                    클릭하여 3D 인터랙티브 뷰를 활성화하고 조명 모드와 정밀 치수 계측 그리드를 체험하세요.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsVREntered(true)}
                  className="px-6 py-3 min-h-[44px] bg-[#D4C3B3] text-[#121314] font-semibold text-xs tracking-wider uppercase rounded-md hover:bg-[#E5D7C9] transition-colors cursor-pointer inline-flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  <span>실시간 가상 VR 쇼룸 입장</span>
                </button>
              </div>
            )}

            {/* Top HUD Bar */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-black/70 backdrop-blur-md border border-white/10 text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-[#D4C3B3]">3D VR ENGINE ACTIVE</span>
                <span className="text-zinc-400">· {currentSpaceData.pyeong}</span>
              </div>

              {isVREntered && (
                <div className="pointer-events-auto flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowWireframe(!showWireframe)}
                    className={`px-3 py-1.5 min-h-[36px] text-xs font-mono rounded-md border transition-all cursor-pointer ${
                      showWireframe
                        ? 'bg-[#D4C3B3] text-[#121314] border-[#D4C3B3] font-semibold'
                        : 'bg-black/60 text-zinc-300 border-white/20 hover:text-white'
                    }`}
                  >
                    0.1mm 계측 그리드 {showWireframe ? 'ON' : 'OFF'}
                  </button>
                </div>
              )}
            </div>

            {/* Bottom HUD Metadata */}
            {isVREntered && (
              <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-xl bg-black/80 backdrop-blur-md border border-white/15">
                <div className="space-y-0.5">
                  <div className="text-sm font-semibold text-white flex items-center gap-2">
                    <span>{currentSpaceData.name}</span>
                  </div>
                  <div className="text-xs text-[#D4C3B3] font-mono">
                    {currentSpaceData.specs}
                  </div>
                </div>

                {/* Lighting Mode Selector */}
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setLightingMode('daylight')}
                    className={`p-2 min-w-[36px] min-h-[36px] rounded-md text-xs font-mono flex items-center gap-1 transition-all cursor-pointer ${
                      lightingMode === 'daylight'
                        ? 'bg-[#D4C3B3] text-[#121314] font-semibold'
                        : 'bg-white/10 text-zinc-300 hover:text-white'
                    }`}
                    title="자연 주광 모드"
                  >
                    <Sun className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">주광 5000K</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setLightingMode('mood')}
                    className={`p-2 min-w-[36px] min-h-[36px] rounded-md text-xs font-mono flex items-center gap-1 transition-all cursor-pointer ${
                      lightingMode === 'mood'
                        ? 'bg-[#D4C3B3] text-[#121314] font-semibold'
                        : 'bg-white/10 text-zinc-300 hover:text-white'
                    }`}
                    title="웜 무드 조명 모드"
                  >
                    <Moon className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">웜 3000K</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setLightingMode('hidden')}
                    className={`p-2 min-w-[36px] min-h-[36px] rounded-md text-xs font-mono flex items-center gap-1 transition-all cursor-pointer ${
                      lightingMode === 'hidden'
                        ? 'bg-[#D4C3B3] text-[#121314] font-semibold'
                        : 'bg-white/10 text-zinc-300 hover:text-white'
                    }`}
                    title="히든 라인 조명 모드"
                  >
                    <Lamp className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">히든 라인</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Showroom Space Switcher Bar */}
          <div className="p-4 bg-[#1C1D1E] border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap gap-2">
              {(['living', 'kitchen', 'master', 'bath'] as ShowroomSpace[]).map((sp) => (
                <button
                  key={sp}
                  type="button"
                  onClick={() => {
                    setActiveSpace(sp);
                    setIsVREntered(true);
                  }}
                  className={`px-4 py-2 min-h-[40px] rounded-md text-xs font-medium transition-all cursor-pointer ${
                    activeSpace === sp
                      ? 'bg-[#D4C3B3] text-[#121314] font-semibold'
                      : 'bg-white/5 text-zinc-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {showroomSpaces[sp].name.split(' (')[0]}
                </button>
              ))}
            </div>

            <div className="text-xs font-mono text-zinc-400">
              * 1:1 상담 시 실제 설계 도면을 3D VR 렌더링으로 제공합니다.
            </div>
          </div>
        </div>
      </section>

      {/* Post-Care Lifetime Pass Feature */}
      <section id="post-care-pass" className="p-8 sm:p-12 rounded-2xl bg-[#F0F2F5]/70 dark:bg-[#1C1D1E] border border-[#E5E7EB] dark:border-[#2A2C2E]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-3">
            <div className="flex items-center gap-2 font-mono uppercase text-xs tracking-widest text-[#D4C3B3] font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>PRESTIGE POST-CARE PASS</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-light tracking-tight text-[#2B2D2F] dark:text-[#EAEAEA]">
              준공 이후에도 안심할 수 있는 열린공간만의 평생 케어
            </h3>
            <p className="text-sm text-[#2B2D2F]/75 dark:text-zinc-300 leading-relaxed font-light">
              완공 1년 후 정기 무상 점검, 계절별 실내 목재 수축/팽창 컨디션 체크, 전문 기술팀의 긴급 출동 지원 서비스를 담은 고유의 시리얼 넘버 케어 패스를 발급해 드립니다.
            </p>
          </div>
          <div className="lg:col-span-4 flex justify-start lg:justify-end">
            <button
              type="button"
              onClick={() => setActiveTab('estimate')}
              className="px-6 py-3.5 min-h-[44px] bg-[#2B2D2F] dark:bg-[#D4C3B3] text-[#FBFBFA] dark:text-[#121314] font-semibold text-xs rounded-lg hover:bg-[#1C1D1E] dark:hover:bg-[#E5D7C9] transition-colors cursor-pointer inline-flex items-center gap-2"
            >
              <span>시공 상담 신청하기</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
