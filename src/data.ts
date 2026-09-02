import { PortfolioItem, ProcessStep } from './types';

export const PORTFOLIO_DATA: PortfolioItem[] = [
  {
    id: 1,
    title: '한남 더 힐 프리미엄 미니멀 하우스',
    pyeong: '52평',
    style: 'Minimal',
    budget: '1억 5천만 원',
    concept: '비움의 미학을 극대화한 무몰딩 화이트 공간과 월넛 가구의 정교한 밸런스',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    details: [
      '무몰딩 및 무문선 공법 적용',
      '천장 히든 라인 조명 설계',
      '이태리 수입 대리석 아일랜드 식탁 시공'
    ]
  },
  {
    id: 2,
    title: '반포 자이 따뜻한 우드 & 스톤 레지던스',
    pyeong: '42평',
    style: 'Warm Wood',
    budget: '1억 2천만 원',
    concept: '자연석의 거친 질감과 오크 원목이 만들어내는 내추럴 아늑함',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
    details: [
      '천연 오크 브러쉬 원목 마루',
      '거실 벽면 친환경 규조토 및 대리석 매칭',
      '맞춤형 빌트인 무늬목 수장고'
    ]
  },
  {
    id: 3,
    title: '성수 아크로포레스트 모던 미드센추리 플랫',
    pyeong: '34평',
    style: 'Modern',
    budget: '9천 5백만 원',
    concept: '스틸 아웃라인과 비비드 컬러 에센셜이 돋보이는 도시형 예술 공간',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
    details: [
      '노출 콘크리트 텍스처 월 시공',
      '모듈형 가구 및 커스텀 조명 레일 연출',
      '욕실 매트 블랙 탑볼 세면대 인스톨'
    ]
  },
  {
    id: 4,
    title: '평창동 타운하우스 프렌치 클래식 빌라',
    pyeong: '65평',
    style: 'Classic',
    budget: '2억 1천만 원',
    concept: '웨인스코팅의 리드미컬한 장식성과 웅장한 아치형 도어가 자아내는 정통 헤리티지',
    image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80',
    details: [
      '정밀 수작업 도장 웨인스코팅 웨이브 벽면',
      '유럽풍 수입 골드 크리스탈 샹들리에',
      '마스터 베드룸 아치 게이트 웨이 구현'
    ]
  }
];

export const PROCESS_DATA: ProcessStep[] = [
  {
    step: '01',
    phase: 'CONTACT & CONSULTING',
    title: '첫 만남과 공간 탐색',
    description: '고객님의 라이프스타일, 예산 범위, 선호 스타일을 분석하여 최적의 디자인 방향성을 도출하는 심층 1:1 카운셀링 단계입니다.'
  },
  {
    step: '02',
    phase: 'PREMIUM 3D DESIGNING',
    title: '가상 공간 정밀 설계',
    description: '실측 데이터를 기반으로 3D 모델링 및 렌더링 작업을 진행하여, 시공 후의 공간을 오차 없이 미리 경험하는 크리에이티브 단계입니다.'
  },
  {
    step: '03',
    phase: 'TRANSPARENT CONSTRUCTION',
    title: '투명하고 정교한 책임 시공',
    description: '엄격히 선별된 전문 엔지니어링 팀이 상주하며 일일 공정표와 자재 검증 결과를 매일 투명하게 업데이트하며 완벽하게 시공합니다.'
  },
  {
    step: '04',
    phase: 'PRESTIGE POST-CARE',
    title: '사후 관리 및 보증 제도',
    description: '준공 후 무상 보증 및 평생 케어 케어 패스를 발급하여, 시간이 지나도 변함없는 공간의 가치를 유지해 드리는 약속의 단계입니다.'
  }
];

export const BRAND_VALUES = [
  {
    number: '01',
    title: '비움과 여백의 미학',
    en: 'Aesthetic of Emptiness',
    desc: '불필요한 장식을 덜어내고 빛과 그림자, 그리고 거주자의 호흡이 채워지는 순수한 공간을 빚어냅니다.'
  },
  {
    number: '02',
    title: '0.1mm 정밀 시공 철학',
    en: 'Precision Craftsmanship',
    desc: '눈에 보이지 않는 벽체 수직도부터 문틀의 히든 엣지까지 타협 없는 공학적 완벽성을 고집합니다.'
  },
  {
    number: '03',
    title: '시간을 견디는 천연 자재',
    en: 'Timeless Materials',
    desc: '자연에서 온 석재, 원목, 도료를 사용하여 세월이 흐를수록 깊은 파티나와 품격을 더해가는 공간을 완성합니다.'
  }
];

export const DESIGNER_INTERVIEWS = [
  {
    question: "공간을 설계할 때 가장 먼저 집중하는 것은 무엇인가요?",
    answer: "가장 먼저 공간을 사용하는 사람의 '시선의 궤적'과 '하루의 리듬'을 관찰합니다. 아름다운 사진 한 장을 위한 공간이 아니라, 아침에 눈을 떠서 밤에 잠들 때까지 마주하는 빛의 농도와 공기의 흐름이 온전히 편안해야 합니다."
  },
  {
    question: "'열린공간'이 정의하는 프리미엄 인테리어의 본질은 무엇입니까?",
    answer: "프리미엄이란 비싼 자재를 무분별하게 나열하는 것이 아닙니다. 덜어냄으로써 비로소 드러나는 공간의 본래 비례감, 손끝에 닿는 촉감의 정교함, 그리고 보이지 않는 공정에서의 정직함이 진정한 럭셔리라고 믿습니다."
  },
  {
    question: "앞으로 추구하는 공간적 비전은 어떤 모습인가요?",
    answer: "트렌드에 흔들리지 않고 10년, 20년 뒤에도 여전히 우아하고 따뜻한 유산(Heritage)이 되는 공간을 고객과 함께 짓는 것입니다. 집은 가장 개인적이면서도 가장 숭고한 안식처여야 합니다."
  }
];

export const PHILOSOPHY_MILESTONES = [
  {
    year: '2016',
    title: '열린공간 아뜰리에 설립',
    desc: '미니멀리즘과 공간 비례학을 기반으로 한 건축 및 인테리어 랩 출범'
  },
  {
    year: '2019',
    title: '한국 공간디자인 프리미엄 어워드 수상',
    desc: '한남동·성수동 하이엔드 주거 레지던스 프로젝트 연속 수주 및 완공'
  },
  {
    year: '2022',
    title: '3D 가상 실측 시뮬레이션 시스템 도입',
    desc: '오차 없는 1:1 맞춤형 VR 렌더링 및 스마트 공정 투명화 솔루션 구축'
  },
  {
    year: '2024',
    title: '프레스티지 평생 사후관리(Post-Care) 공표',
    desc: '준공 이후 공간의 생애주기를 함께하는 전담 마스터 케어 제도 운영'
  }
];
