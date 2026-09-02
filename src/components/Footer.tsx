import React from 'react';
import { ActiveTab } from '../types';
import { Logo } from './Logo';
import { ArrowRight, Phone, Mail, MapPin, Clock, ShieldCheck } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  const handleTabClick = (tab: ActiveTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="main-footer"
      className="border-t border-[#E5E7EB] dark:border-[#2A2C2E] bg-[#F0F2F5]/50 dark:bg-[#121314] text-[#2B2D2F] dark:text-[#EAEAEA] transition-colors duration-300"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Col 1: Brand & Identity (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              <button
                id="footer-brand-logo-btn"
                type="button"
                onClick={() => handleTabClick('home')}
                className="text-left cursor-pointer focus:outline-hidden"
                aria-label="열린공간 홈으로 이동"
              >
                <Logo size="lg" />
              </button>
              <p className="mt-4 text-sm text-[#2B2D2F]/70 dark:text-zinc-400 font-sans leading-relaxed max-w-sm">
                머무는 이의 호흡과 삶의 궤적을 온전히 담아내는 하이엔드 주거·상업 공간 큐레이션 스튜디오. 비움과 채움의 완벽한 밸런스로 세월을 견디는 공간적 유산을 완성합니다.
              </p>
            </div>

            {/* Strict Placement Designer & Developer Credits */}
            <div className="pt-4 border-t border-[#E5E7EB] dark:border-[#2A2C2E]/60">
              <div className="font-mono text-[11px] text-[#2B2D2F]/50 dark:text-zinc-500/80 leading-relaxed space-y-1">
                <div>주식회사 열린공간 | 대표 디자이너 서승협</div>
                <div>강원 원주시 관설안길 23-8 1층 열린공간</div>
                <div>Copyright © 2024 OPEN SPACE. Developed by 서승협. All rights reserved.</div>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-mono uppercase text-xs tracking-widest text-[#D4C3B3] font-semibold">
              NAVIGATION
            </h4>
            <ul className="space-y-2.5 text-sm font-medium">
              <li>
                <button
                  id="footer-nav-home"
                  type="button"
                  onClick={() => handleTabClick('home')}
                  className="text-[#2B2D2F]/80 dark:text-zinc-300 hover:text-[#2B2D2F] dark:hover:text-white transition-colors cursor-pointer"
                >
                  홈 (Overview)
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-story"
                  type="button"
                  onClick={() => handleTabClick('story')}
                  className="text-[#2B2D2F]/80 dark:text-zinc-300 hover:text-[#2B2D2F] dark:hover:text-white transition-colors cursor-pointer"
                >
                  브랜드 스토리 (Story)
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-portfolio"
                  type="button"
                  onClick={() => handleTabClick('portfolio')}
                  className="text-[#2B2D2F]/80 dark:text-zinc-300 hover:text-[#2B2D2F] dark:hover:text-white transition-colors cursor-pointer"
                >
                  포트폴리오 (Works)
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-process"
                  type="button"
                  onClick={() => handleTabClick('process')}
                  className="text-[#2B2D2F]/80 dark:text-zinc-300 hover:text-[#2B2D2F] dark:hover:text-white transition-colors cursor-pointer"
                >
                  시공 프로세스 (Process)
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-estimate"
                  type="button"
                  onClick={() => handleTabClick('estimate')}
                  className="text-[#2B2D2F]/80 dark:text-zinc-300 hover:text-[#2B2D2F] dark:hover:text-white transition-colors cursor-pointer"
                >
                  견적 및 문의 (Estimate)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Studio & Services (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-mono uppercase text-xs tracking-widest text-[#D4C3B3] font-semibold">
              SERVICES
            </h4>
            <ul className="space-y-2.5 text-sm text-[#2B2D2F]/70 dark:text-zinc-400">
              <li>프리미엄 하이엔드 주거</li>
              <li>무몰딩·히든도어 설계</li>
              <li>3D VR 공간 실측 렌더링</li>
              <li>커스텀 빌트인 가구 제작</li>
              <li>평생 사후관리 케어 패스</li>
            </ul>
          </div>

          {/* Col 4: Contact & Studio Info (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-mono uppercase text-xs tracking-widest text-[#D4C3B3] font-semibold">
              STUDIO & INQUIRY
            </h4>
            <div className="space-y-3 text-xs text-[#2B2D2F]/80 dark:text-zinc-300 font-sans">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D4C3B3] shrink-0 mt-0.5" />
                <span>강원 원주시 관설안길 23-8 1층 열린공간</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D4C3B3] shrink-0" />
                <span>0507-1386-0970 (대표 직통 카운셀링)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D4C3B3] shrink-0" />
                <span>contact@openspace-design.kr</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#D4C3B3] shrink-0" />
                <span>24시간 영업 연중무휴</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                id="footer-consult-btn"
                type="button"
                onClick={() => handleTabClick('estimate')}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 min-h-[44px] bg-[#2B2D2F] dark:bg-[#1C1D1E] text-[#FBFBFA] dark:text-[#D4C3B3] border border-[#2B2D2F] dark:border-[#2A2C2E] hover:border-[#D4C3B3] text-xs font-semibold rounded-md transition-all cursor-pointer"
              >
                <span>1:1 프라이빗 상담 예약</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Regulatory & Safe Notice */}
        <div className="mt-12 pt-8 border-t border-[#E5E7EB] dark:border-[#2A2C2E] flex flex-col sm:flex-row items-center justify-between text-xs text-[#2B2D2F]/50 dark:text-zinc-500 gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#D4C3B3]" />
            <span>실내건축공사업 면허 등록업체 | 전문건설공제조합 가입 인증</span>
          </div>
          <div>
            개인정보처리방침 및 시공품질보증규약 준수
          </div>
        </div>
      </div>
    </footer>
  );
};
