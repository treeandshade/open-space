export type ActiveTab = 'home' | 'story' | 'portfolio' | 'process' | 'estimate';

export type ThemeMode = 'light' | 'dark';

export interface PortfolioItem {
  id: number;
  title: string;
  pyeong: string;
  style: 'Minimal' | 'Warm Wood' | 'Modern' | 'Classic';
  budget: string;
  concept: string;
  image: string;
  details: string[];
}

export interface ProcessStep {
  step: string;
  phase: string;
  title: string;
  description: string;
}

export type SpaceType = '아파트' | '단독주택' | '상업 공간';
export type PyeongRange = '20평형대' | '30평형대' | '40평형대' | '50평형 이상';
export type InteriorStyle = 'Minimal' | 'Warm Wood' | 'Modern' | 'Classic';
export type ScopeType = '전체 인테리어' | '부분 리모델링 (주방/욕실 중심)';

export interface EstimateState {
  spaceType: SpaceType;
  pyeongRange: PyeongRange;
  exactPyeong: number;
  style: InteriorStyle;
  scope: ScopeType;
}

export interface ConsultationFormData {
  name: string;
  phone: string;
  preferredDate: string;
  message: string;
  agreePrivacy: boolean;
}
