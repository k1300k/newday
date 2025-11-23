export const translations = {
    en: {
        appTitle: "Vibe Pilot",
        nav: {
            overview: "Project Status",
            checklist: "Detailed Checklist",
            programInfo: "Program Info",
            info: "Info"
        },
        overview: {
            title: "Project Status Board",
            totalProgress: "Total Progress",
            completed: "Completed",
            pending: "Pending",
            viewDetails: "View Details",
            items: "items"
        },
        checklist: {
            title: "Detailed Checklist",
            addItem: "Add Item",
            edit: "Edit Item",
            delete: "Delete Item",
            cancel: "Cancel",
            placeholder: "Enter new item...",
            checkbox: "Checkbox",
            percentage: "Percentage (%)",
            select: "Select Option",
            reference: "View Reference / Example"
        },
        phases: {
            1: {
                title: "Platform",
                description: "Define service type and core requirements."
            },
            2: {
                title: "Resource",
                description: "Prepare design assets and legal documents."
            },
            3: {
                title: "Dev & Git",
                description: "Setup development environment and collaboration."
            },
            4: {
                title: "Launch",
                description: "Final testing and deployment."
            }
        },
        items: {
            p1: "Define Service Concept & Target",
            p2: "Market & Competitor Analysis",
            p3: "Select Service Type (Web/App)",
            p4: "Define Core Features (MVP)",
            p5: "Design Information Architecture (IA)",
            p6: "Write User Stories",
            p7: "Plan Admin Dashboard",
            r1: "Figma Design Progress",
            r2: "Logo & Branding Assets",
            r3: "Privacy Policy & Terms",
            r4: "Domain Purchased",
            r5: "Server/Cloud Account (AWS/Vercel)",
            r6: "Empty/Error States Design",
            r7: "Favicon & OG Tags (Link Preview)",
            d1: "GitHub Repository Created",
            d2: "Invite Team Members",
            d3: "Frontend Setup (Vite/React)",
            d4: "Backend/API Setup",
            d5: "Core Feature Implementation",
            d6: ".env Security & .gitignore",
            d7: "README Documentation",
            l1: "QA Testing Progress",
            l2: "GA4/Analytics Setup",
            l3: "SEO Meta Tags Configured",
            l4: "Production Deployment",
            l5: "Post-Launch Monitoring",
            l6: "404 Error Page",
            l7: "Google Search Console Registration"
        },
        grades: {
            Basic: "Basic",
            Advanced: "Advanced"
        },
        modal: {
            userManual: "User Manual",
            devHistory: "Dev History",
            introTitle: "Vibe Pilot User Manual",
            introText: "Welcome to Vibe Pilot, your intelligent companion for service planning. This dashboard helps you track every step of your project from conception to launch.",
            featureChecklist: "Smart Checklists",
            featureChecklistDesc: "Manage tasks with ease. Items are categorized by phase and support checkboxes, percentage sliders, and selection inputs.",
            featureOverview: "Project Overview",
            featureOverviewDesc: "Get a bird's-eye view of your project status. The dashboard aggregates progress from all individual items to show real-time completion rates.",
            howToUse: "How to Use",
            step1Title: "Managing Items",
            step1Desc: "Navigate to any phase card. You can toggle checkboxes, adjust progress sliders, or select options from dropdowns. To add a new item, click the \"+ Add Item\" button.",
            tip: "Tip:",
            tipDesc: "Use the slider for items that aren't binary (Done/Not Done), like \"Design Progress\" or \"QA Testing\".",
            step2Title: "Understanding Grades",
            step2Desc: "Items are tagged to help you prioritize:",
            gradeBasicDesc: "Essential items required for a Minimum Viable Product (MVP).",
            gradeAdvancedDesc: "Recommended for scalability, better UX, or post-launch growth.",
            step3Title: "Data Persistence",
            step3Desc: "Your progress is automatically saved to your browser's local storage. You can refresh the page or close the browser without losing your data.",
            userPrompt: "User Prompt",
            newFeatures: "New Features",
            techImpl: "Tech Implementation",
            poweredBy: "Powered by Vibe Coding",
            viewSource: "View Source"
        },
        project: {
            register: "Register Project",
            settings: "Project Settings",
            name: "Project Name",
            description: "Description",
            startDate: "Start Date",
            status: "Status",
            planning: "Planning",
            active: "In Progress",
            completed: "Completed",
            save: "Save Project",
            placeholderName: "My Awesome Project",
            placeholderDesc: "Briefly describe your project..."
        },
        deliverables: {
            title: "Deliverables",
            meetingNotes: "Meeting Notes",
            prompts: "Prompts",
            githubLinks: "GitHub Links",
            addLink: "Add Link",
            linkUrl: "URL",
            linkDesc: "Description",
            noLinks: "No links added yet.",
            placeholderNotes: "Record key decisions and meeting minutes here...",
            placeholderPrompts: "Paste useful prompts used for this task..."
        },
        options: {
            web: "Web Service",
            mobile: "Mobile App",
            hybrid: "Hybrid"
        },
        alerts: {
            webTitle: "Web Service Notice",
            webDesc: "Background location tracking is not supported on Web. Consider PWA support and SEO strategies.",
            appTitle: "Mobile App Notice",
            appDesc: "Prepare Apple/Google developer accounts and review app store guidelines in advance."
        },
        guides: {
            p1: { desc: "Define who your users are and what problem you are solving. Use the Value Proposition Canvas to align your product with customer needs." },
            p2: { desc: "Analyze 3-5 direct competitors. Identify their strengths, weaknesses, and pricing models to find your competitive edge." },
            p3: { desc: "Choose the right platform based on your target audience and budget. Web is faster to launch; Apps offer better engagement." },
            p4: { desc: "List all features and prioritize them using the MoSCoW method (Must have, Should have, Could have, Won't have)." },
            p5: { desc: "Create a sitemap to organize content and navigation. This ensures a logical flow for your users." },
            p6: { desc: "Write user stories in the format: 'As a [user], I want to [action], so that [benefit]'." },
            p7: { desc: "Plan the internal dashboard for managing users, content, and analytics. Don't overlook this!" }
        },
        checklist: {
            title: "Detailed Checklist",
            addItem: "Add Item",
            edit: "Edit Item",
            delete: "Delete Item",
            cancel: "Cancel",
            placeholder: "Enter new item...",
            checkbox: "Checkbox",
            percentage: "Percentage (%)",
            select: "Select Option",
            reference: "View Reference / Example",
            guideTitle: "Usage Examples",
            progressTitle: "Progress Management",
            ref: {
                valueProp: "Value Proposition Canvas",
                competitorAnalysis: "Competitive Analysis Template",
                webVsNative: "Web vs Native vs Hybrid",
                mvpGuide: "MVP Guide",
                iaGuide: "IA for Beginners",
                userStories: "User Stories with Gherkin"
            }
        },
    },
    ko: {
        appTitle: "바이브 파일럿",
        nav: {
            overview: "프로젝트 현황",
            checklist: "상세 체크리스트",
            programInfo: "프로그램 정보",
            info: "정보"
        },
        overview: {
            title: "프로젝트 현황판",
            totalProgress: "전체 진행률",
            completed: "완료",
            pending: "대기",
            viewDetails: "상세 보기",
            items: "개 항목"
        },
        checklist: {
            title: "상세 체크리스트",
            addItem: "항목 추가",
            edit: "항목 수정",
            delete: "항목 삭제",
            cancel: "취소",
            placeholder: "새로운 항목 입력...",
            checkbox: "체크박스",
            percentage: "진행률 (%)",
            select: "옵션 선택",
            reference: "참고 자료 / 예시 보기",
            guideTitle: "활용 예시",
            progressTitle: "진도 관리",
            ref: {
                valueProp: "가치 제안 캔버스",
                competitorAnalysis: "경쟁사 분석 템플릿",
                webVsNative: "웹 vs 네이티브 vs 하이브리드",
                mvpGuide: "MVP 가이드",
                iaGuide: "초보자를 위한 IA(정보구조) 설계",
                userStories: "User Stories 작성법 (Gherkin)"
            }
        },
        phases: {
            1: {
                title: "플랫폼 기획",
                description: "서비스 형태 및 핵심 요구사항 정의"
            },
            2: {
                title: "리소스 준비",
                description: "디자인 자산 및 법적 문서 준비"
            },
            3: {
                title: "개발 & 깃",
                description: "개발 환경 설정 및 협업 준비"
            },
            4: {
                title: "출시 준비",
                description: "최종 테스트 및 배포"
            }
        },
        items: {
            p1: "서비스 컨셉 및 타겟 정의",
            p2: "시장 조사 및 경쟁사 분석",
            p3: "서비스 형태 선택 (웹/앱)",
            p4: "핵심 기능 정의 (MVP)",
            p5: "정보 구조(IA) 설계",
            p6: "사용자 스토리 작성",
            p7: "관리자(Admin) 페이지 기획",
            r1: "Figma 디자인 진행률",
            r2: "로고 및 브랜딩 자산",
            r3: "개인정보처리방침 및 약관",
            r4: "도메인 구매",
            r5: "서버/클라우드 계정 (AWS/Vercel)",
            r6: "빈 화면/에러 화면 디자인",
            r7: "파비콘 및 OG 태그 (링크 미리보기)",
            d1: "GitHub 레포지토리 생성",
            d2: "팀원 초대",
            d3: "프론트엔드 설정 (Vite/React)",
            d4: "백엔드/API 설정",
            d5: "핵심 기능 구현율",
            d6: ".env 보안 및 .gitignore 설정",
            d7: "README 문서 작성",
            l1: "QA 테스트 진행률",
            l2: "GA4/데이터 분석 설정",
            l3: "SEO 메타 태그 설정",
            l4: "실서버 배포",
            l5: "출시 후 모니터링",
            l6: "404 에러 페이지",
            l7: "구글 서치 콘솔 등록"
        },
        grades: {
            Basic: "기본",
            Advanced: "심화"
        },
        modal: {
            userManual: "사용자 매뉴얼",
            devHistory: "개발 이력",
            introTitle: "바이브 파일럿 사용자 매뉴얼",
            introText: "바이브 파일럿에 오신 것을 환영합니다. 이 대시보드는 서비스 기획부터 출시까지의 모든 단계를 체계적으로 관리할 수 있도록 도와줍니다.",
            featureChecklist: "스마트 체크리스트",
            featureChecklistDesc: "단계별(플랫폼, 리소스, 개발, 출시)로 작업을 관리하세요. 체크박스, 진행률 슬라이더 등 다양한 입력 방식을 지원합니다.",
            featureOverview: "프로젝트 현황판",
            featureOverviewDesc: "프로젝트의 전체 진행 상황을 한눈에 파악하세요. 모든 항목의 진행률을 종합하여 실시간으로 보여줍니다.",
            howToUse: "사용 방법",
            step1Title: "항목 관리하기",
            step1Desc: "각 단계 카드를 클릭하여 상세 항목을 확인하세요. 체크박스를 선택하거나 슬라이더를 조절할 수 있습니다. 새로운 항목을 추가하려면 하단의 \"+ 항목 추가\" 버튼을 누르세요.",
            tip: "팁:",
            tipDesc: "\"디자인 진행률\"이나 \"QA 테스트\"처럼 완료/미완료로 나누기 어려운 항목은 슬라이더를 활용해 보세요.",
            step2Title: "등급 이해하기",
            step2Desc: "각 항목은 중요도에 따라 태그가 붙어 있습니다:",
            gradeBasicDesc: "MVP(최소 기능 제품) 출시에 필수적인 항목입니다.",
            gradeAdvancedDesc: "확장성, 사용자 경험 개선, 출시 후 성장을 위해 권장되는 항목입니다.",
            step3Title: "데이터 저장",
            step3Desc: "작업 내용은 브라우저에 자동으로 저장됩니다. 페이지를 새로고침하거나 창을 닫아도 데이터는 유지됩니다.",
            userPrompt: "사용자 요청",
            newFeatures: "추가된 기능",
            techImpl: "기술 구현",
            poweredBy: "Powered by Vibe Coding",
            viewSource: "소스 보기"
        },
        project: {
            register: "프로젝트 등록",
            settings: "프로젝트 설정",
            name: "프로젝트명",
            description: "설명",
            startDate: "시작일",
            status: "상태",
            planning: "기획 중",
            active: "진행 중",
            completed: "완료",
            save: "프로젝트 저장",
            placeholderName: "나의 멋진 프로젝트",
            placeholderDesc: "프로젝트에 대한 간단한 설명을 입력하세요..."
        },
        deliverables: {
            title: "산출물 관리",
            meetingNotes: "회의록",
            prompts: "프롬프트",
            githubLinks: "GitHub 링크",
            addLink: "링크 추가",
            linkUrl: "URL",
            linkDesc: "설명",
            noLinks: "등록된 링크가 없습니다.",
            placeholderNotes: "주요 의사결정 사항이나 회의 내용을 기록하세요...",
            placeholderPrompts: "이 작업에 사용된 유용한 프롬프트를 기록하세요..."
        },
        options: {
            web: "웹 서비스",
            mobile: "모바일 앱",
            hybrid: "하이브리드"
        },
        alerts: {
            webTitle: "웹 서비스 알림",
            webDesc: "웹에서는 백그라운드 위치 추적이 불가능합니다. PWA 지원 여부와 SEO 전략을 고려하세요.",
            appTitle: "모바일 앱 알림",
            appDesc: "앱 스토어(Apple/Google) 계정 준비와 심사 가이드라인을 미리 확인해야 합니다."
        },
        guides: {
            p1: { desc: "사용자가 누구이며 어떤 문제를 해결하는지 정의하세요. 가치 제안 캔버스를 사용하여 제품과 고객의 니즈를 일치시키세요." },
            p2: { desc: "3-5개의 직접 경쟁사를 분석하세요. 그들의 강점, 약점, 가격 모델을 파악하여 경쟁 우위를 찾으세요." },
            p3: { desc: "타겟 고객과 예산에 맞춰 플랫폼을 선택하세요. 웹은 출시가 빠르고, 앱은 사용자 참여도가 높습니다." },
            p4: { desc: "모든 기능을 나열하고 MoSCoW 방법(Must, Should, Could, Won't)을 사용하여 우선순위를 정하세요." },
            p5: { desc: "사이트맵을 작성하여 콘텐츠와 탐색 구조를 정리하세요. 이는 사용자의 논리적인 흐름을 보장합니다." },
            p6: { desc: "사용자 스토리는 '사용자로서 [행동]을 하여 [이익]을 얻고 싶다' 형식으로 작성하세요." },
            p7: { desc: "사용자, 콘텐츠, 통계를 관리할 내부 관리자 페이지를 기획하세요. 이 부분을 간과하면 운영이 힘들어집니다!" }
        }
    }
};
