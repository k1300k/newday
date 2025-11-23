# 🚀 Vibe Pilot

> 서비스 기획부터 런칭까지, 모든 단계를 체계적으로 관리하는 스마트 체크리스트 대시보드

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://newday.vercel.app)
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.0.5-646CFF?logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4.0.0-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)

[English](#english) | [한국어](#korean)

---

<a name="korean"></a>

## 📖 프로젝트 소개

**Vibe Pilot**은 서비스 기획자와 개발자를 위한 **올인원 프로젝트 관리 도구**입니다.  
플랫폼 선정부터 리소스 확보, 개발, 런칭까지 **4개 주요 단계**를 체크리스트 형식으로 관리하며,  
각 항목의 진행률을 **실시간으로 시각화**하여 프로젝트 현황을 한눈에 파악할 수 있습니다.

### 🎯 해결하는 문제

- **산재된 작업 관리**: 여러 도구에 흩어진 작업을 하나의 대시보드로 통합
- **진행률 추적 어려움**: 실시간 진행률 자동 계산 및 시각화
- **산출물 관리 부재**: 회의록, 프롬프트, 코드 링크를 항목별로 체계적 관리
- **언어 장벽**: 한/영 완벽 지원으로 글로벌 협업 가능

### ✨ 주요 기능

#### 🎯 스마트 체크리스트
- **다양한 입력 타입**
  - ✅ **체크박스**: 완료/미완료 단순 토글
  - 📊 **퍼센트 슬라이더**: 0-100% 세밀한 진행률 관리 (100% 도달 시 자동 완료)
  - 🔽 **드롭다운 선택**: 플랫폼 선택 등 옵션 선택형 항목
- **커스텀 항목 관리**
  - ➕ 프로젝트에 맞는 항목 자유롭게 추가
  - ✏️ 항목명 실시간 수정
  - 🗑️ 불필요한 항목 삭제
- **등급 시스템**: `Basic`(필수) / `Advanced`(권장) 태그로 우선순위 시각적 구분
- **비주얼 스테퍼**: 단계별 한글/영문 라벨 및 현재 단계 강조 표시

#### 📊 프로젝트 대시보드
- **실시간 진행률 계산**
  - 전체 프로젝트 완료율 (모든 단계 통합)
  - 단계별 완료율 (Phase 1~4 개별 추적)
  - 항목별 진행률 (퍼센트 타입 항목)
- **시각적 피드백**
  - 🌈 그라데이션 프로그레스 바 (Indigo → Purple)
  - ✨ 완료 시 애니메이션 효과
  - 📈 단계별 진행 상태 색상 코딩
- **듀얼 뷰 모드**
  - **Overview**: 전체 프로젝트 현황 한눈에 보기
  - **Detailed Checklist**: 단계별 상세 작업 관리

#### 🌍 다국어 지원 (i18n)
- **한국어/영어** 완벽 지원 (UI, 콘텐츠, 데이터 모두 번역)
- 원클릭 언어 전환 (헤더 토글 버튼)
- LocalStorage에 언어 설정 자동 저장
- 번역 키 기반 구조로 확장 용이 (`translations.js`)

#### 📚 프로그램 정보 & 도움말
- **사용자 매뉴얼**: 기능별 사용 가이드 및 팁
- **개발 히스토리**: 버전별 기능 추가 및 기술 구현 내역 타임라인
- **참고 자료 링크**: 각 체크리스트 항목에 📖 Book 아이콘으로 가이드 제공

#### 📝 프로젝트 관리 & 산출물
- **프로젝트 등록**
  - 프로젝트명, 설명, 시작일 설정
  - 상태 관리: `기획` → `진행중` → `완료`
  - 헤더에 프로젝트 정보 표시
- **산출물 관리** (각 체크리스트 항목별)
  - 📄 **회의록**: 회의 내용 및 결정사항 기록
  - 🤖 **프롬프트**: AI 활용 프롬프트 저장 (다크 모드 에디터)
  - 🔗 **GitHub 링크**: 관련 코드/이슈 링크 첨부 (URL + 설명)
- **진도 관리**
  - 체크박스를 퍼센트 타입으로 전환 가능
  - 슬라이더 + 숫자 입력으로 정밀 조정
  - 100% 도달 시 자동으로 항목 완료 처리

#### 💾 데이터 지속성
- **LocalStorage 자동 저장**
  - 모든 체크리스트 상태
  - 프로젝트 정보
  - 산출물 데이터
  - 언어 설정
- 브라우저를 닫아도 작업 내용 100% 유지
- 데이터 손실 걱정 없이 안전하게 작업

---

## 🖼️ 스크린샷

### 대시보드 (한국어)
![Dashboard Korean](https://via.placeholder.com/800x500?text=Dashboard+Korean)

### 대시보드 (영어)
![Dashboard English](https://via.placeholder.com/800x500?text=Dashboard+English)

### 체크리스트 상세
![Checklist Detail](https://via.placeholder.com/800x500?text=Checklist+Detail)

### 프로그램 정보 모달
![Program Info Modal](https://via.placeholder.com/800x500?text=Program+Info+Modal)

---

## 🛠️ 기술 스택

### Frontend
- **React 18.3.1** - UI 라이브러리
- **Vite 6.0.5** - 빌드 도구 (빠른 HMR)
- **Tailwind CSS 4.0** - 유틸리티-퍼스트 CSS 프레임워크
- **Lucide React** - 아이콘 라이브러리

### 상태 관리
- **React Context API** - 언어 설정 전역 상태 관리
- **LocalStorage** - 데이터 영구 저장

### 개발 도구
- **ESLint** - 코드 품질 관리
- **PostCSS** - CSS 후처리

---

## 🚀 시작하기

### 필수 조건
- Node.js 18.0 이상
- npm 또는 yarn

### 설치 및 실행

```bash
# 저장소 클론
git clone https://github.com/k1300k/newday.git
cd newday

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

개발 서버가 실행되면 브라우저에서 `http://localhost:5173`으로 접속하세요.

### 빌드

```bash
# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

---

## 📘 사용 가이드

### 1️⃣ 프로젝트 등록

1. 우측 상단 **"프로젝트 등록"** 버튼 클릭
2. 프로젝트 정보 입력
   - **프로젝트명**: 서비스 이름
   - **설명**: 간단한 프로젝트 소개
   - **시작일**: 프로젝트 시작 날짜
3. **"저장"** 클릭
4. 헤더에 프로젝트 정보 표시 확인

### 2️⃣ 체크리스트 작업

#### 기본 작업
- ✅ **체크박스 클릭**: 항목 완료/미완료 토글
- 🔽 **옵션 선택**: 플랫폼 선택 등 드롭다운에서 선택
- ➕ **항목 추가**: 하단 "+ Add Item" 버튼으로 커스텀 항목 추가

#### 진도 관리 (Progress Management)
1. 항목 우측 **펼치기 버튼** (⌄) 클릭
2. **"진도 관리"** 체크박스 활성화
3. 슬라이더 또는 숫자 입력으로 진행률 설정
4. 100% 도달 시 자동으로 항목 완료 처리

#### 산출물 첨부
1. 항목 펼치기 (⌄)
2. **Deliverables** 섹션에서:
   - 📄 **회의록**: 회의 내용 입력
   - 🤖 **프롬프트**: AI 프롬프트 저장
   - 🔗 **GitHub 링크**: URL과 설명 입력 후 "Add Link"

### 3️⃣ 진행률 확인

- **Overview 뷰**: 전체 프로젝트 및 단계별 진행률 한눈에 확인
- **Detailed Checklist**: 각 단계별 상세 작업 현황 관리
- 프로그레스 바로 시각적 진행 상태 파악

### 4️⃣ 언어 전환

- 우측 상단 **KO/EN** 토글 버튼 클릭
- 모든 UI 및 콘텐츠 즉시 전환
- 설정 자동 저장

### 5️⃣ 도움말 확인

- 우측 상단 **ℹ️ 아이콘** 클릭
- **Manual** 탭: 기능 사용법
- **History** 탭: 개발 히스토리

---

## 🏗️ 아키텍처

### 컴포넌트 구조

```
App.jsx (Root)
├── LanguageContext (전역 언어 상태)
├── DashboardLayout
│   ├── Header (프로젝트 정보, 언어 토글, 프로그램 정보)
│   ├── Sidebar (모바일: 햄버거 메뉴)
│   └── Main Content
│       ├── Overview (대시보드 뷰)
│       │   ├── 전체 진행률 카드
│       │   ├── 단계별 진행률 카드
│       │   └── 항목별 상세 리스트
│       └── Workflow (체크리스트 뷰)
│           ├── Stepper (단계 네비게이션)
│           └── StepCard (단계별 체크리스트)
│               ├── 항목 리스트
│               ├── 산출물 섹션 (펼침)
│               ├── 진도 관리 (퍼센트 타입)
│               └── 항목 추가 폼
└── ProgramInfoModal (매뉴얼 & 히스토리)
```

### 데이터 흐름

1. **초기 로드**: `App.jsx`에서 LocalStorage 데이터 복원
2. **상태 관리**: React State로 체크리스트 데이터 관리
3. **자동 저장**: 모든 변경사항 즉시 LocalStorage 저장
4. **언어 전환**: Context API로 전역 언어 상태 관리

### 주요 데이터 구조

```javascript
// 단계 데이터
step = {
  id: 1,
  titleKey: 'steps.1.title',
  descKey: 'steps.1.desc',
  items: [
    {
      id: 'p1',
      type: 'select',  // 'checkbox' | 'percentage' | 'select'
      textKey: 'steps.1.items.p1',
      options: ['web', 'app'],
      value: 'web',
      checked: false,
      grade: 'Basic',  // 'Basic' | 'Advanced'
      refLink: { url: '...', titleKey: '...' },
      guide: { descKey: '...', links: [...] },
      deliverables: {
        meetingNotes: '...',
        prompts: '...',
        githubLinks: [{ url: '...', desc: '...' }]
      }
    }
  ]
}
```

---

## 📦 Vercel 배포

### 방법 1: Vercel CLI (권장)

```bash
# Vercel CLI 설치
npm i -g vercel

# 배포
vercel

# 프로덕션 배포
vercel --prod
```

### 방법 2: GitHub 연동

1. [Vercel](https://vercel.com/)에 로그인
2. "Import Project" 클릭
3. GitHub 저장소 선택 (`k1300k/newday`)
4. 자동 감지된 설정 확인:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. "Deploy" 클릭

배포 후 자동으로 생성되는 URL로 접속하세요!

---

## 📁 프로젝트 구조

```
newday/
├── src/
│   ├── components/         # React 컴포넌트
│   │   ├── DashboardLayout.jsx
│   │   ├── Overview.jsx
│   │   ├── StepCard.jsx
│   │   ├── ProgramInfoModal.jsx
│   │   └── ...
│   ├── contexts/          # Context API
│   │   └── LanguageContext.jsx
│   ├── data/              # 정적 데이터
│   │   ├── translations.js
│   │   └── devHistory.js
│   ├── App.jsx            # 메인 앱
│   └── main.jsx           # 엔트리 포인트
├── public/                # 정적 파일
├── DEPLOY.md             # 배포 가이드
└── README.md             # 프로젝트 문서
```

---

## 🎨 디자인 시스템

### 컬러 팔레트
- **Primary**: Indigo (#4F46E5)
- **Success**: Emerald (#10B981)
- **Background**: Slate (#F9FAFB)
- **Text**: Slate 900/600

### 타이포그래피
- **Font**: System UI / SF Pro / Segoe UI

---

## 🤝 기여하기

이슈와 Pull Request를 환영합니다!

1. Fork this repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 라이선스

This project is licensed under the MIT License.

---

## 👤 작성자

**k1300k**
- GitHub: [@k1300k](https://github.com/k1300k)

---

## 🙏 감사의 말

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)

---

<a name="english"></a>

# 🚀 Vibe Pilot (English)

> Smart checklist dashboard for managing every stage from service planning to launch

## 📖 About

**Vibe Pilot** is a project management tool for service planners and developers.  
Manage **4 major stages** in checklist format, from platform selection to resource acquisition, development, and launch.  
**Visualize progress in real-time** to grasp project status at a glance.

## ✨ Key Features

- **Smart Checklists**: Multiple input types (checkbox, percentage slider, dropdown)
- **Project Dashboard**: Real-time progress tracking with visual feedback
- **Visual Stepper**: Step-by-step navigation with translated labels and active state indicators
- **Bilingual Support**: Korean/English with one-click switching
- **Program Info**: User manual and development history
- **Project Management**: Register project details and track lifecycle
- **Deliverables**: Attach notes, prompts, and GitHub links to items
- **Reference Links**: Built-in guides and examples for checklist items
- **Data Persistence**: Auto-save to LocalStorage

## 🚀 Quick Start

```bash
git clone https://github.com/k1300k/newday.git
cd newday
npm install
npm run dev
```

Visit `http://localhost:5173` in your browser.

## 📦 Deploy to Vercel

```bash
npm i -g vercel
vercel --prod
```

Or connect your GitHub repository to Vercel for automatic deployments.

## 🛠️ Tech Stack

- React 18.3.1
- Vite 6.0.5
- Tailwind CSS 4.0
- Lucide React (Icons)

## 📄 License

MIT License

---

**Built with ❤️ by k1300k**
