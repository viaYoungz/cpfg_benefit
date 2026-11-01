// Insurers, programs and hospitals for checkups in Korea. All entries are examples —
// replace with real partner information before launch.

export const INSURERS = [
  { id: "uhc", name: "UnitedHealthcare", short: "UHC", meta: { ko: "UHC 회원 전용 검진 예약", en: "Checkup booking for UHC members" } },
  { id: "cigna", name: "Cigna", short: "Cigna", meta: { ko: "Cigna 회원 전용 검진 예약", en: "Checkup booking for Cigna members" } },
  { id: "aetna", name: "Aetna", short: "Aetna", meta: { ko: "Aetna 회원 전용 검진 예약", en: "Checkup booking for Aetna members" } },
  { id: "geoblue", name: "GeoBlue", short: "GeoBlue", meta: { ko: "GeoBlue 해외 근무자 플랜 회원", en: "GeoBlue expatriate plan members" } },
  { id: "bcbs", name: "Blue Cross Blue Shield", short: "BCBS", meta: { ko: "CareFirst · Anthem 등 지역 BCBS", en: "CareFirst, Anthem and other local BCBS plans" } },
];

// Bookings open this many days out, to leave time for coverage checks.
export const LEAD_DAYS = 21;

// Indexes (within the upcoming date list) shown as fully booked.
export const FULL_DATES = new Set([2, 5]);

export const PROGRAMS = [
  { id: "basic", name: { ko: "기본 종합검진", en: "Standard comprehensive exam" }, tag: { ko: "3–4시간", en: "3–4 hrs" }, price: { ko: "$480부터", en: "From $480" }, items: { ko: ["혈액·소변 40여 항목", "흉부 X-ray, 복부 초음파", "위내시경 (수면 선택)"], en: ["40+ blood and urine tests", "Chest X-ray, abdominal ultrasound", "Upper endoscopy (sedation optional)"] } },
  { id: "premium", name: { ko: "프리미엄 정밀검진", en: "Premium in-depth exam" }, tag: { ko: "5–6시간", en: "5–6 hrs" }, price: { ko: "$1,350부터", en: "From $1,350" }, items: { ko: ["기본 항목 전체", "저선량 흉부 CT", "대장내시경 (수면)", "심장 초음파"], en: ["Everything in the standard exam", "Low-dose chest CT", "Colonoscopy (sedated)", "Echocardiogram"] } },
  { id: "women", name: { ko: "여성 특화검진", en: "Women's exam" }, tag: { ko: "4–5시간", en: "4–5 hrs" }, price: { ko: "$860부터", en: "From $860" }, items: { ko: ["유방 초음파·촬영", "갑상선 초음파", "자궁경부 세포검사"], en: ["Breast ultrasound and mammogram", "Thyroid ultrasound", "Pap test"] } },
  { id: "senior", name: { ko: "시니어 집중검진", en: "Senior exam" }, tag: { ko: "5시간", en: "5 hrs" }, price: { ko: "$1,120부터", en: "From $1,120" }, items: { ko: ["뇌 MRA", "골밀도", "심혈관 위험도 평가"], en: ["Brain MRA", "Bone density", "Cardiovascular risk assessment"] } },
];

export const HOSPITALS = [
  { id: "k1", name: { ko: "서울 A대학교병원 건강증진센터", en: "Seoul A University Hospital Health Center" }, meta: { ko: "종로구 · 영어 코디네이터 상주", en: "Jongno-gu · English-speaking coordinator" } },
  { id: "k2", name: { ko: "서울 B대학교병원 검진센터", en: "Seoul B University Hospital Checkup Center" }, meta: { ko: "강서구 · 김포공항 20분", en: "Gangseo-gu · 20 min from Gimpo Airport" } },
  { id: "k3", name: { ko: "분당 C의료원 건강검진센터", en: "Bundang C Medical Center" }, meta: { ko: "성남시 · 인천공항 리무진 직행", en: "Seongnam · Direct airport limousine from Incheon" } },
  { id: "k4", name: { ko: "부산 D병원 종합검진센터", en: "Busan D Hospital Checkup Center" }, meta: { ko: "해운대구 · KTX 부산역 15분", en: "Haeundae-gu · 15 min from Busan KTX station" } },
];
