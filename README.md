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

**Vibe Pilot**은 서비스 기획자와 개발자를 위한 프로젝트 관리 도구입니다.  
플랫폼 선정부터 리소스 확보, 개발, 런칭까지 **4개 주요 단계**를 체크리스트 형식으로 관리하며,  
각 항목의 진행률을 **실시간으로 시각화**하여 프로젝트 현황을 한눈에 파악할 수 있습니다.

### ✨ 주요 기능

#### 🎯 스마트 체크리스트
- **다양한 입력 타입**: 체크박스, 퍼센트 슬라이더, 드롭다운 선택
- **커스텀 항목**: 프로젝트에 맞는 항목 자유롭게 추가/수정/삭제
- **등급 시스템**: Basic(필수) / Advanced(권장) 태그로 우선순위 구분

#### 📊 프로젝트 대시보드
- **실시간 진행률**: 전체 및 단계별 완료율 자동 계산
- **시각적 피드백**: 그라데이션 프로그레스 바, 완료 애니메이션
- **Overview/Checklist 뷰**: 전체 현황과 상세 작업 뷰 전환

#### 🌍 다국어 지원
- **한국어/영어** 완벽 지원
- 원클릭 언어 전환 (모든 UI 및 콘텐츠)
- LocalStorage에 언어 설정 저장

#### 📚 프로그램 정보
- **사용자 매뉴얼**: 기능 설명 및 사용 가이드
- **개발 히스토리**: 버전별 기능 추가 및 기술 구현 내역

#### 💾 데이터 지속성
- LocalStorage를 통한 자동 저장
- 브라우저를 닫아도 작업 내용 유지

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
- **Bilingual Support**: Korean/English with one-click switching
- **Program Info**: User manual and development history
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
