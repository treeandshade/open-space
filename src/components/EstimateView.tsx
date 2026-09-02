import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Calculator,
  Building,
  Home,
  Briefcase,
  Layers,
  CheckCircle2,
  Check,
  RotateCcw,
  Send,
  PhoneCall,
  Calendar,
  ShieldCheck,
  AlertCircle,
  X,
} from 'lucide-react';
import {
  SpaceType,
  PyeongRange,
  InteriorStyle,
  ScopeType,
  EstimateState,
  ConsultationFormData,
} from '../types';

interface EstimateViewProps {
  initialPreset?: { style: string; pyeong: string } | null;
}

const STORAGE_KEY_ESTIMATE = 'openspace_estimate_state_v1';

export const EstimateView: React.FC<EstimateViewProps> = ({ initialPreset }) => {
  // 1. Interactive Estimate State with LocalStorage Persistence
  const [estimate, setEstimate] = useState<EstimateState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_ESTIMATE);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return {
      spaceType: '아파트',
      pyeongRange: '30평형대',
      exactPyeong: 34,
      style: 'Minimal',
      scope: '전체 인테리어',
    };
  });

  // Apply preset if came from portfolio modal
  useEffect(() => {
    if (initialPreset) {
      const pyeongNum = parseInt(initialPreset.pyeong.replace(/[^0-9]/g, ''), 10) || 34;
      let range: PyeongRange = '30평형대';
      if (pyeongNum < 30) range = '20평형대';
      else if (pyeongNum >= 40 && pyeongNum < 50) range = '40평형대';
      else if (pyeongNum >= 50) range = '50평형 이상';

      const matchedStyle = (['Minimal', 'Warm Wood', 'Modern', 'Classic'] as InteriorStyle[]).includes(
        initialPreset.style as InteriorStyle
      )
        ? (initialPreset.style as InteriorStyle)
        : 'Minimal';

      setEstimate((prev) => ({
        ...prev,
        exactPyeong: pyeongNum,
        pyeongRange: range,
        style: matchedStyle,
      }));
    }
  }, [initialPreset]);

  // Persist estimate state
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_ESTIMATE, JSON.stringify(estimate));
  }, [estimate]);

  // 2. Dynamic Price Calculation Formula
  // Base rate: 2,500,000 KRW/pyeong
  // Style weights: Minimal(1.0), Warm Wood(1.2), Modern(1.15), Classic(1.4)
  // Scope weights: 전체 인테리어(1.0), 부분 리모델링(0.45)
  const calculationResult = useMemo(() => {
    const basePerPyeong = 2500000;
    const styleMultipliers: Record<InteriorStyle, number> = {
      Minimal: 1.0,
      'Warm Wood': 1.2,
      Modern: 1.15,
      Classic: 1.4,
    };
    const scopeMultipliers: Record<ScopeType, number> = {
      '전체 인테리어': 1.0,
      '부분 리모델링 (주방/욕실 중심)': 0.45,
    };

    const styleMultiplier = styleMultipliers[estimate.style] || 1.0;
    const scopeMultiplier = scopeMultipliers[estimate.scope] || 1.0;

    const totalRaw = basePerPyeong * estimate.exactPyeong * styleMultiplier * scopeMultiplier;
    // Round to nearest 100,000 KRW
    const totalEstimate = Math.round(totalRaw / 100000) * 100000;
    const minEstimate = Math.round((totalEstimate * 0.92) / 100000) * 100000;
    const maxEstimate = Math.round((totalEstimate * 1.08) / 100000) * 100000;

    return {
      totalEstimate,
      minEstimate,
      maxEstimate,
      basePerPyeong,
      styleMultiplier,
      scopeMultiplier,
    };
  }, [estimate]);

  // 3. Consultation Form Validation State
  const [formData, setFormData] = useState<ConsultationFormData>({
    name: '',
    phone: '',
    preferredDate: '',
    message: '',
    agreePrivacy: false,
  });

  const [formErrors, setFormErrors] = useState<{
    name?: string;
    phone?: string;
    agreePrivacy?: string;
  }>({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittedSuccess, setIsSubmittedSuccess] = useState(false);

  // Phone auto-hyphenation format handler
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    let formatted = raw;
    if (raw.length <= 3) {
      formatted = raw;
    } else if (raw.length <= 7) {
      formatted = `${raw.slice(0, 3)}-${raw.slice(3)}`;
    } else {
      formatted = `${raw.slice(0, 3)}-${raw.slice(3, 7)}-${raw.slice(7, 11)}`;
    }
    setFormData((prev) => ({ ...prev, phone: formatted }));
    if (formErrors.phone) {
      setFormErrors((prev) => ({ ...prev, phone: undefined }));
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, name: e.target.value }));
    if (formErrors.name) {
      setFormErrors((prev) => ({ ...prev, name: undefined }));
    }
  };

  const validateForm = () => {
    const errors: typeof formErrors = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errors.name = '성함을 2자 이상 정확히 입력해 주세요.';
    }

    const phoneRegex = /^\d{3}-\d{3,4}-\d{4}$/;
    if (!formData.phone.trim() || !phoneRegex.test(formData.phone.trim())) {
      errors.phone = '올바른 휴대폰 번호 형식(010-0000-0000)을 입력해 주세요.';
    }

    if (!formData.agreePrivacy) {
      errors.agreePrivacy = '상담 진행을 위한 개인정보 수집 및 이용에 동의해 주세요.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    // Simulate instantaneous verified submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmittedSuccess(true);
      // Reset form and temporary states
      setFormData({
        name: '',
        phone: '',
        preferredDate: '',
        message: '',
        agreePrivacy: false,
      });
      setFormErrors({});
    }, 600);
  };

  const handlePyeongRangeSelect = (range: PyeongRange) => {
    let defaultExact = 34;
    if (range === '20평형대') defaultExact = 24;
    if (range === '30평형대') defaultExact = 34;
    if (range === '40평형대') defaultExact = 42;
    if (range === '50평형 이상') defaultExact = 54;

    setEstimate((prev) => ({
      ...prev,
      pyeongRange: range,
      exactPyeong: defaultExact,
    }));
  };

  const handleResetEstimate = () => {
    setEstimate({
      spaceType: '아파트',
      pyeongRange: '30평형대',
      exactPyeong: 34,
      style: 'Minimal',
      scope: '전체 인테리어',
    });
  };

  return (
    <div id="estimate-view" className="space-y-16 md:space-y-24 py-4">
      {/* View Header */}
      <section id="estimate-header" className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F0F2F5] dark:bg-[#1C1D1E] border border-[#E5E7EB] dark:border-[#2A2C2E]">
          <span className="font-mono text-[11px] uppercase tracking-widest text-[#2B2D2F] dark:text-[#D4C3B3] font-medium">
            INTERACTIVE ESTIMATE CALCULATOR
          </span>
        </div>
        <h1 className="font-light text-4xl sm:text-5xl tracking-tighter text-[#2B2D2F] dark:text-[#EAEAEA]">
          공간에 맞춘 <br />
          <span className="font-normal font-serif italic text-[#2B2D2F] dark:text-white">
            1:1 투명 가상 견적 시뮬레이터
          </span>
        </h1>
        <p className="text-base text-[#2B2D2F]/75 dark:text-zinc-300 font-sans font-light">
          원하시는 공간 유형, 정밀 평형, 디자인 스타일 및 시공 범위를 선택하시면 실시간 예상 견적을 즉시 산정해 드립니다.
        </p>
      </section>

      {/* Main 2-Column Interface: Left Simulator Controls, Right Live Summary & Consultation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: 4 Steps Calculator Form (7 cols) */}
        <div className="lg:col-span-7 space-y-10">
          {/* Step 1: 공간 유형 */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#F0F2F5]/70 dark:bg-[#1C1D1E] border border-[#E5E7EB] dark:border-[#2A2C2E] space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-widest text-[#D4C3B3] font-semibold">
                STEP 01
              </span>
              <span className="text-xs text-[#2B2D2F]/60 dark:text-zinc-400 font-mono">
                공간 유형 선택
              </span>
            </div>
            <h3 className="text-lg font-semibold text-[#2B2D2F] dark:text-[#EAEAEA]">
              어떤 공간의 시공을 계획 중이신가요?
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {(['아파트', '단독주택', '상업 공간'] as SpaceType[]).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setEstimate((prev) => ({ ...prev, spaceType: type }))}
                  className={`p-4 min-h-[56px] rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer border ${
                    estimate.spaceType === type
                      ? 'bg-[#2B2D2F] text-white dark:bg-[#D4C3B3] dark:text-[#121314] border-[#2B2D2F] dark:border-[#D4C3B3] font-semibold shadow-xs'
                      : 'bg-[#FBFBFA] dark:bg-[#121314] text-[#2B2D2F]/80 dark:text-zinc-300 border-[#E5E7EB] dark:border-[#2A2C2E] hover:border-[#D4C3B3]'
                  }`}
                >
                  <span className="text-sm font-medium">{type}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: 시공 평형대 & 정밀 평수 */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#F0F2F5]/70 dark:bg-[#1C1D1E] border border-[#E5E7EB] dark:border-[#2A2C2E] space-y-5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-widest text-[#D4C3B3] font-semibold">
                STEP 02
              </span>
              <span className="text-xs text-[#2B2D2F]/60 dark:text-zinc-400 font-mono">
                시공 평형대 선택
              </span>
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[#2B2D2F] dark:text-[#EAEAEA]">
                실제 시공 대상 면적(평형)
              </h3>
              <span className="font-mono text-lg font-semibold text-[#2B2D2F] dark:text-[#D4C3B3]">
                {estimate.exactPyeong}평
              </span>
            </div>

            {/* Range Preset Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {(['20평형대', '30평형대', '40평형대', '50평형 이상'] as PyeongRange[]).map((range) => (
                <button
                  key={range}
                  type="button"
                  onClick={() => handlePyeongRangeSelect(range)}
                  className={`py-3 min-h-[44px] text-xs font-mono rounded-lg transition-all cursor-pointer border ${
                    estimate.pyeongRange === range
                      ? 'bg-[#2B2D2F] text-white dark:bg-[#D4C3B3] dark:text-[#121314] border-[#2B2D2F] dark:border-[#D4C3B3] font-semibold shadow-xs'
                      : 'bg-[#FBFBFA] dark:bg-[#121314] text-[#2B2D2F]/80 dark:text-zinc-300 border-[#E5E7EB] dark:border-[#2A2C2E]'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>

            {/* Range Slider for Fine-tuning */}
            <div className="pt-2 space-y-2">
              <div className="flex justify-between text-xs font-mono text-[#2B2D2F]/60 dark:text-zinc-400">
                <span>15평 (최소)</span>
                <span>정밀 평수 슬라이더</span>
                <span>80평 (최대)</span>
              </div>
              <input
                type="range"
                min="15"
                max="80"
                value={estimate.exactPyeong}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  let range: PyeongRange = '30평형대';
                  if (val < 30) range = '20평형대';
                  else if (val >= 40 && val < 50) range = '40평형대';
                  else if (val >= 50) range = '50평형 이상';

                  setEstimate((prev) => ({
                    ...prev,
                    exactPyeong: val,
                    pyeongRange: range,
                  }));
                }}
                className="w-full accent-[#2B2D2F] dark:accent-[#D4C3B3] cursor-pointer"
              />
            </div>
          </div>

          {/* Step 3: 지향 스타일 (가중치 적용) */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#F0F2F5]/70 dark:bg-[#1C1D1E] border border-[#E5E7EB] dark:border-[#2A2C2E] space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-widest text-[#D4C3B3] font-semibold">
                STEP 03
              </span>
              <span className="text-xs text-[#2B2D2F]/60 dark:text-zinc-400 font-mono">
                디자인 스타일 선택
              </span>
            </div>
            <h3 className="text-lg font-semibold text-[#2B2D2F] dark:text-[#EAEAEA]">
              선호하시는 무드 및 디자인 컨셉
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { key: 'Minimal', name: 'Minimal (미니멀)', desc: '무몰딩 화이트, 히든 라인 조명 (1.0배)' },
                { key: 'Warm Wood', name: 'Warm Wood (내추럴 우드)', desc: '천연 오크 원목, 규조토 벽체 (1.2배)' },
                { key: 'Modern', name: 'Modern (모던 미드센추리)', desc: '스틸 라인, 노출 콘크리트 (1.15배)' },
                { key: 'Classic', name: 'Classic (프렌치 클래식)', desc: '수작업 웨인스코팅, 아치 게이트 (1.4배)' },
              ].map((st) => (
                <button
                  key={st.key}
                  type="button"
                  onClick={() => setEstimate((prev) => ({ ...prev, style: st.key as InteriorStyle }))}
                  className={`p-4 min-h-[64px] rounded-xl text-left transition-all cursor-pointer border flex flex-col justify-between ${
                    estimate.style === st.key
                      ? 'bg-[#2B2D2F] text-white dark:bg-[#D4C3B3] dark:text-[#121314] border-[#2B2D2F] dark:border-[#D4C3B3] shadow-xs'
                      : 'bg-[#FBFBFA] dark:bg-[#121314] text-[#2B2D2F] dark:text-[#EAEAEA] border-[#E5E7EB] dark:border-[#2A2C2E] hover:border-[#D4C3B3]'
                  }`}
                >
                  <span className="text-sm font-semibold">{st.name}</span>
                  <span className={`text-xs mt-1 ${estimate.style === st.key ? 'text-[#D4C3B3] dark:text-[#2B2D2F]' : 'text-[#2B2D2F]/60 dark:text-zinc-400'}`}>
                    {st.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 4: 시공 범위 */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#F0F2F5]/70 dark:bg-[#1C1D1E] border border-[#E5E7EB] dark:border-[#2A2C2E] space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-widest text-[#D4C3B3] font-semibold">
                STEP 04
              </span>
              <span className="text-xs text-[#2B2D2F]/60 dark:text-zinc-400 font-mono">
                시공 범위 선택
              </span>
            </div>
            <h3 className="text-lg font-semibold text-[#2B2D2F] dark:text-[#EAEAEA]">
              공사 범위를 설정해 주세요
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { key: '전체 인테리어', desc: '올철거, 바닥/벽체/창호/주방/욕실/조명 풀패키지' },
                { key: '부분 리모델링 (주방/욕실 중심)', desc: '주방 아일랜드 및 욕실, 거실 주요 라인 공사' },
              ].map((sc) => (
                <button
                  key={sc.key}
                  type="button"
                  onClick={() => setEstimate((prev) => ({ ...prev, scope: sc.key as ScopeType }))}
                  className={`p-4 min-h-[64px] rounded-xl text-left transition-all cursor-pointer border ${
                    estimate.scope === sc.key
                      ? 'bg-[#2B2D2F] text-white dark:bg-[#D4C3B3] dark:text-[#121314] border-[#2B2D2F] dark:border-[#D4C3B3] shadow-xs'
                      : 'bg-[#FBFBFA] dark:bg-[#121314] text-[#2B2D2F] dark:text-[#EAEAEA] border-[#E5E7EB] dark:border-[#2A2C2E] hover:border-[#D4C3B3]'
                  }`}
                >
                  <div className="text-sm font-semibold">{sc.key}</div>
                  <div className={`text-xs mt-1 ${estimate.scope === sc.key ? 'text-[#D4C3B3] dark:text-[#2B2D2F]' : 'text-[#2B2D2F]/60 dark:text-zinc-400'}`}>
                    {sc.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Live Summary Display & Consultation Form (5 cols) */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
          {/* Real-time Estimate Result Display Box */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#2B2D2F] text-[#FBFBFA] shadow-xl border border-[#2B2D2F] dark:border-[#2A2C2E] space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/15">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D4C3B3]" />
                <span className="font-mono text-xs uppercase tracking-widest text-[#D4C3B3] font-semibold">
                  ESTIMATE SUMMARY
                </span>
              </div>
              <button
                type="button"
                onClick={handleResetEstimate}
                className="text-xs text-zinc-400 hover:text-white inline-flex items-center gap-1 cursor-pointer"
                title="기본값으로 초기화"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>초기화</span>
              </button>
            </div>

            {/* Selected Spec Matrix */}
            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 rounded-lg bg-white/5">
                <div className="text-zinc-400">공간 / 면적</div>
                <div className="text-white font-medium mt-0.5">
                  {estimate.spaceType} · {estimate.exactPyeong}평
                </div>
              </div>
              <div className="p-3 rounded-lg bg-white/5">
                <div className="text-zinc-400">스타일 컨셉</div>
                <div className="text-white font-medium mt-0.5">{estimate.style}</div>
              </div>
              <div className="col-span-2 p-3 rounded-lg bg-white/5">
                <div className="text-zinc-400">시공 범위</div>
                <div className="text-white font-medium mt-0.5">{estimate.scope}</div>
              </div>
            </div>

            {/* Big Total Price */}
            <div className="pt-2">
              <div className="text-xs font-mono text-zinc-400">예상 표준 시공 견적 (VAT 별도)</div>
              <div className="text-3xl sm:text-4xl font-light font-mono text-white tracking-tight mt-1">
                {calculationResult.totalEstimate.toLocaleString('ko-KR')}
                <span className="text-lg font-normal text-[#D4C3B3] ml-1">원</span>
              </div>
              <div className="mt-2 text-xs font-mono text-[#D4C3B3]/90">
                예상 예산 레인지: {calculationResult.minEstimate.toLocaleString('ko-KR')}원 ~ {calculationResult.maxEstimate.toLocaleString('ko-KR')}원
              </div>
            </div>

            <div className="text-[11px] text-zinc-400 leading-relaxed pt-2 border-t border-white/10">
              * 위 견적은 기준 자재 단가에 기반한 시뮬레이션이며, 현장 실측 및 맞춤 설계 렌더링 후 확정 견적이 산출됩니다.
            </div>
          </div>

          {/* In-App Consultation Booking Form */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#F0F2F5]/70 dark:bg-[#1C1D1E] border border-[#E5E7EB] dark:border-[#2A2C2E] space-y-5">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#D4C3B3] font-semibold">
                1:1 PRIVATE CONSULTATION
              </span>
              <h3 className="text-xl font-semibold text-[#2B2D2F] dark:text-[#EAEAEA] mt-1">
                대표 디자이너 1:1 상담 신청
              </h3>
              <p className="text-xs text-[#2B2D2F]/70 dark:text-zinc-400 mt-1">
                견적 산정 결과를 바탕으로 심층 대면/유선 카운셀링을 예약합니다.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#2B2D2F] dark:text-zinc-300">
                  고객 성함 <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="예: 홍길동"
                  value={formData.name}
                  onChange={handleNameChange}
                  className="w-full px-3.5 py-2.5 min-h-[44px] text-sm rounded-lg bg-[#FBFBFA] dark:bg-[#121314] text-[#2B2D2F] dark:text-[#EAEAEA] border border-[#E5E7EB] dark:border-[#2A2C2E] focus:outline-hidden focus:border-[#D4C3B3]"
                />
                {formErrors.name && (
                  <div className="flex items-center gap-1 text-xs text-rose-500 mt-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{formErrors.name}</span>
                  </div>
                )}
              </div>

              {/* Phone Field with Auto-Hyphen */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#2B2D2F] dark:text-zinc-300">
                  연락처 (휴대폰) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="010-0000-0000"
                  maxLength={13}
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  className="w-full px-3.5 py-2.5 min-h-[44px] text-sm rounded-lg bg-[#FBFBFA] dark:bg-[#121314] text-[#2B2D2F] dark:text-[#EAEAEA] border border-[#E5E7EB] dark:border-[#2A2C2E] focus:outline-hidden focus:border-[#D4C3B3]"
                />
                {formErrors.phone && (
                  <div className="flex items-center gap-1 text-xs text-rose-500 mt-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{formErrors.phone}</span>
                  </div>
                )}
              </div>

              {/* Preferred Date Field */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#2B2D2F] dark:text-zinc-300">
                  상담 희망 일시 (선택)
                </label>
                <input
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) => setFormData((prev) => ({ ...prev, preferredDate: e.target.value }))}
                  className="w-full px-3.5 py-2.5 min-h-[44px] text-sm rounded-lg bg-[#FBFBFA] dark:bg-[#121314] text-[#2B2D2F] dark:text-[#EAEAEA] border border-[#E5E7EB] dark:border-[#2A2C2E] focus:outline-hidden focus:border-[#D4C3B3]"
                />
              </div>

              {/* Message Field */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#2B2D2F] dark:text-zinc-300">
                  공간 특이사항 및 문의 (선택)
                </label>
                <textarea
                  rows={2}
                  placeholder="예: 입주 예정일 11월, 시스템 에어컨 신규 설치 희망"
                  value={formData.message}
                  onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-[#FBFBFA] dark:bg-[#121314] text-[#2B2D2F] dark:text-[#EAEAEA] border border-[#E5E7EB] dark:border-[#2A2C2E] focus:outline-hidden focus:border-[#D4C3B3]"
                />
              </div>

              {/* Privacy Agreement Checkbox */}
              <div className="space-y-1 pt-1">
                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={formData.agreePrivacy}
                    onChange={(e) => {
                      setFormData((prev) => ({ ...prev, agreePrivacy: e.target.checked }));
                      if (formErrors.agreePrivacy) {
                        setFormErrors((prev) => ({ ...prev, agreePrivacy: undefined }));
                      }
                    }}
                    className="mt-1 w-4 h-4 rounded-sm accent-[#2B2D2F] dark:accent-[#D4C3B3] cursor-pointer"
                  />
                  <span className="text-xs text-[#2B2D2F]/80 dark:text-zinc-300 leading-tight">
                    [필수] 상담 안내 및 견적 리포트 발송을 위한 개인정보 수집·이용에 동의합니다.
                  </span>
                </label>
                {formErrors.agreePrivacy && (
                  <div className="flex items-center gap-1 text-xs text-rose-500 mt-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{formErrors.agreePrivacy}</span>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 min-h-[48px] bg-[#2B2D2F] dark:bg-[#D4C3B3] text-[#FBFBFA] dark:text-[#121314] font-semibold text-sm rounded-lg shadow-md hover:bg-[#1C1D1E] dark:hover:bg-[#E5D7C9] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>상담 접수 처리 중...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-[#D4C3B3] dark:text-[#2B2D2F]" />
                    <span>맞춤 상담 신청서 제출하기</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Success Modal Notification */}
      <AnimatePresence>
        {isSubmittedSuccess && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSubmittedSuccess(false)}
              className="fixed inset-0 bg-black/75 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-[#FBFBFA] dark:bg-[#1C1D1E] rounded-2xl p-8 border border-[#E5E7EB] dark:border-[#2A2C2E] shadow-2xl z-10 text-center space-y-5"
            >
              <div className="w-14 h-14 rounded-full bg-[#2B2D2F] dark:bg-[#D4C3B3] text-[#D4C3B3] dark:text-[#121314] flex items-center justify-center mx-auto">
                <Check className="w-7 h-7" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-semibold text-[#2B2D2F] dark:text-[#EAEAEA]">
                  상담 신청이 완료되었습니다
                </h3>
                <p className="text-sm text-[#2B2D2F]/75 dark:text-zinc-300 font-light leading-relaxed">
                  열린공간 수석 큐레이터가 고객님의 산정 견적 내역을 검토한 후, 24시간 이내에 안내 연락을 드리겠습니다.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#F0F2F5] dark:bg-[#121314] text-xs font-mono text-[#2B2D2F]/80 dark:text-zinc-400">
                접수 견적: {estimate.spaceType} ({estimate.exactPyeong}평) · {calculationResult.totalEstimate.toLocaleString('ko-KR')}원 기준
              </div>

              <button
                type="button"
                onClick={() => setIsSubmittedSuccess(false)}
                className="w-full py-3 min-h-[44px] bg-[#2B2D2F] text-white dark:bg-[#D4C3B3] dark:text-[#121314] font-semibold text-xs rounded-lg cursor-pointer"
              >
                확인
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
