# CPFG Benefit

제휴 회사 임직원(미국 보험 가입자)을 위한 한국 대학병원 건강검진 예약 사이트. Vite + React.

흐름: 보험사 선택 → Company ID 인증 → 검진 프로그램 → 병원·날짜 → 신청 정보 → 접수 완료

## 실행

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # dist/ 에 배포용 정적 파일 생성
```

## 구조

```
src/
  data/strings.js     UI 문구 (ko / en)
  data/catalog.js     보험사 · 검진 프로그램 · 병원 (모두 예시 데이터)
  i18n.jsx            언어 Context — useLang() 으로 t(키), L({ko,en}) 사용
  dates.js            예약 가능 날짜, KST → 미국 시간 변환 (서머타임 반영)
  App.jsx             예약 단계 상태 관리
  components/         헤더 · 공지 팝업 · 단계 표시 · 티켓 등
  steps/              단계별 화면 (보험사 → Company ID → 프로그램 → 병원·날짜 → 신청서 → 완료)
server/
  companies.js        제휴 회사 Company ID 목록 — 서버에만 있고 사이트 코드에는 들어가지 않음
  verifyCompany.js    Company ID 확인 (POST /api/verify-company)
api/
  verify-company.js   Vercel 배포용 함수 (위 확인 코드를 그대로 씀)
```

## Company ID 추가

`server/companies.js` 에 한 줄씩 추가합니다. ID는 대문자로 적고, 입력할 때는 대소문자 상관없이 인식됩니다.

```js
"ACME-2026": { name: { ko: "에이크미 주식회사", en: "Acme Inc." } },
```

`npm run dev` 에서는 Vite 가, 배포하면 Vercel 함수(`api/`)가 같은 코드로 확인합니다. Vercel 이 아닌 곳(Netlify 등)에 올리면 `api/verify-company.js` 만 그 플랫폼 형식으로 바꿔 주면 됩니다.

이 목록은 저장소(repo)에는 들어 있으니, GitHub 에 올린다면 **비공개 저장소**로 해 주세요.

## 신청서 전송 설정

`.env.example` 을 `.env` 로 복사하고 둘 중 하나를 채운 뒤 dev 서버를 다시 시작하세요.

- `VITE_WEB3FORMS_KEY` — [web3forms.com](https://web3forms.com) 에서 이메일로 무료 키를 받으면, 신청이 들어올 때마다 그 이메일로 내용이 옵니다. 제목: `[CPFG 예약 신청] CP-123456 · 이름 · 회사명`
- `VITE_BOOKING_ENDPOINT` — 직접 만든 URL(구글 Apps Script, 서버리스 함수 등)로 JSON 을 POST 합니다.

둘 다 비어 있으면 지금처럼 아무 데도 보내지 않고 완료 화면에 "시안" 안내가 나옵니다. 전송 코드는 `src/api/submitBooking.js` 에 있습니다.

신청서에는 생년월일·보험 회원번호가 들어갑니다. 외부 폼 서비스를 거치게 되니, 실제 운영 전에 개인정보 처리 방식(HIPAA 문구 포함)을 한 번 점검해 주세요.

## 아직 시안인 부분

- Company ID 인증 화면의 "시안용 ID: CPFG-DEMO" 안내 문구와 데모 회사는 운영 전에 지워 주세요 (`src/data/strings.js`, `server/companies.js`).
- 틀린 ID 를 여러 번 넣는 것은 지금 0.6초 지연만 걸려 있습니다. 운영 시 호스팅의 요청 제한(rate limit) 기능을 켜 주세요.
- 병원, 가격, 제휴 병원 수는 예시 값입니다 — `src/data/catalog.js` 에서 바꿔 주세요.
- 신청서 기본값(HONG GILDONG 등)은 `App.jsx` 의 `INITIAL_FORM` 에 있습니다. 실서비스 전 비워 주세요.
