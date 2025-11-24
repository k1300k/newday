# [최종 PRD] New Day 스타일의 직렬형 플로우 빌더 (프로젝트명: Service Flow)

## 1. 프로젝트 개요 및 컨셉 (Context & Core Philosophy)

* **핵심 철학:** **New Day의 직관적인 프로세스 UI**를 빌려, 코딩 지식 없이도 **Opal/n8n 방식의 기능 조립(Composition)**을 가능하게 합니다.
* **UI/UX 목표:** 복잡한 그래프를 숨기고, 사용자가 To-Do 리스트를 작성하듯 순서대로 기능을 정의하면, 내부적으로는 **자동 연결된 노드 그래프**가 생성됩니다.
* **타겟 사용자:** 코드를 모르는 서비스 기획자, PO/PM.

## 2. 기술 스택 (Tech Stack) - *재확인*

* **프레임워크:** Next.js 14 (App Router)
* **스타일링:** Tailwind CSS + **Shadcn/UI** (New Day 룩앤필 구현)
* **캔버스 엔진:** **React Flow** (세로 방향의 노드 연결 및 흐름 관리용)
* **데이터 관리:** Zustand (UI 상태 및 노드 연결 관리)

## 3. UI/UX 디자인 상세 (New Day Hybrid Style)

### 3.1. 메인 뷰 (Process List as Vertical Flow)

* **디자인 참조:** `https://newday-rose.vercel.app/`의 깔끔한 Task Card 디자인.
* **구성:** 화면 중앙에 **세로로 정렬된 '서비스 구축 단계 카드'**들이 배치됩니다.
* **노드-카드:** 각 카드는 단순한 To-Do 항목이 아니라, **React Flow의 커스텀 노드** 역할을 수행합니다.
* **연결선 (Edge):**
    * 기본적으로 위에서 아래로 **자동 연결선(Straight Line Edge)**이 그려져 서비스의 기본 흐름을 나타냅니다.
    * **조건부 노드(If/Else)**가 삽입될 경우에만, 캔버스와 유사하게 **옆으로 분기되는 연결선**이 나타납니다.

### 3.2. 기능 모듈 카드 (The Lego Blocks)

드래그 앤 드롭 대신, 우측 상단의 `[+] Add Module` 버튼을 누르면 다음 카테고리의 카드가 **현재 프로세스의 가장 아랫부분에 추가**됩니다.

| 모듈 카드 (기능명) | UI/설정 내용 (우측 패널) | 내부 노드 역할 |
|:---|:---|:---|
| **Step 1. 시작 (Start)** | 서비스명, 초기 랜딩 페이지 URL 설정 | **시작 노드 (Entry Point)** |
| **🔒 인증 (Auth)** | 구글/카카오 토글 버튼, 이메일 인증 필수 체크박스 | **분기 노드 (Authentication Check)** |
| **✨ 핵심 로직 (Vibe Coding)** | **대형 텍스트 프롬프트 창.** 기획자의 자연어 설명을 입력 | **코드 생성 노드 (LLM Invocation)** |
| **💳 결제 (Payment)** | 결제 PG사 선택 (Toss/Stripe), 구독 상품 금액 입력 | **액션 노드 (External API Call)** |
| **🔀 조건 분기 (If/Else)** | '조건' 입력 창. (예: `IF user.plan == 'Premium'`) | **조건문 노드 (Conditional Flow)** |
| **🟢 완료 (End)** | 최종 성공 페이지 URL 설정 | **종료 노드 (Exit Point)** |

## 4. 핵심 기능 구현 상세 (Functional Specifications)

### 4.1. 직렬형 연결 관리 (Serialized Flow Management)

* **순차적 흐름:** 사용자가 `인증` 카드를 추가하고 다음에 `핵심 로직` 카드를 추가하면, 시스템은 자동으로 **`인증 노드` ➔ `핵심 로직 노드`**의 연결선을 그립니다.
* **순서 변경:** New Day처럼 리스트 아이템을 **드래그하여 순서를 바꾸면** 연결선도 자동으로 재정렬됩니다.

### 4.2. Vibe Coding & MCP 통합 (The Core Engine)

* **위치:** '핵심 로직' 카드 내부.
* **동작:** 기획자가 프롬프트(자연어 설명)를 입력하고 '생성' 버튼을 누르면, AI Agent는 이 노드 전후의 **다른 공통 모듈(Auth, Payment 등)의 설정값(Context)**을 파악하여 **두 모듈을 이어주는 코드**를 생성합니다.
    * *예시:* Auth와 Payment 사이에 Vibe Coding을 넣고 "로그인한 유저가 구매하기 버튼을 누르면 10% 할인 쿠폰을 적용한 가격으로 결제창을 띄워줘"라고 입력 시, AI는 Auth 정보와 Payment API 규격을 참고하여 코드를 생성.

### 4.3. 코드 스캐폴딩 및 내보내기 (Export)

* **코드 통합:** 최종적으로 모든 카드의 설정(공통 기능)과 Vibe Coding으로 생성된 코드(핵심 기능)를 통합하여 하나의 **완벽한 Next.js 프로젝트 코드**를 생성합니다.
* **내보내기:** 'Export' 버튼 클릭 시, ZIP 파일로 다운로드 제공.

---

## 5. Cursor/AI 에이전트 실행 명령 (Prompt)

> **아래 내용을 복사하여 Cursor Composer(Cmd+I)에 붙여넣고 실행하십시오. New Day 스타일의 '순차적 노드 빌더'가 생성됩니다.**

```markdown
## 역할 및 목표
나는 서비스 기획자를 위한 **'New Day 스타일의 순차적 플로우 빌더'**를 만들고 싶어.
UI는 'https://newday-rose.vercel.app/' 디자인을 철저히 따라야 해.
기능적으로는 **Opal/n8n처럼 연결 가능한 노드**여야 하지만, **세로 방향 리스트** 형태로 제한되어야 해.

## 기술 스택
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS + Shadcn/UI
- **Flow Engine:** React Flow (세로 정렬 노드와 자동/조건부 연결선 관리용)

## 구현 요구사항 (Step-by-Step)

1.  **레이아웃:** 화면 중앙에 New Day 스타일의 깔끔한 카드(최대 너비 600px)를 담는 컨테이너를 만들어줘.
2.  **노드 구현:** `Shadcn/UI Card`를 기반으로 `React Flow`의 커스텀 노드 역할을 하는 **'모듈 카드'** 컴포넌트를 만들어줘.
3.  **세로 플로우:** React Flow 캔버스를 **세로 스크롤만 가능**하게 제한하고, 노드들은 **자동으로 수직 정렬**되게 해줘.
4.  **자동 연결선:** '인증' 카드와 '결제' 카드를 순서대로 추가하면, **이 둘을 잇는 직선형 연결선(Edge)이 자동으로 그려지게** 구현해줘.
5.  **모듈 카드 종류:**
    * **🔒 Auth Node:** 토글 스위치(Google/Kakao) 포함.
    * **✨ Vibe Code Node:** 큰 텍스트 영역(Textarea) 포함.
    * **💳 Payment Node:** 금액 입력 필드 포함.
6.  **인터랙션:** 각 카드를 클릭하면 우측에 설정 패널이 나타나 해당 카드의 옵션을 변경할 수 있게 해줘.

이 명세대로 지금 바로 프로젝트 구조를 잡고, 최소한의 작동하는 **세로형 플로우 빌더** 프로토타입을 만들어줘.
```

---

## 6. 구현 우선순위

### Phase 1: 기본 UI 구조
- [ ] Next.js 14 프로젝트 생성
- [ ] Tailwind CSS + Shadcn/UI 설정
- [ ] React Flow 설치 및 기본 캔버스 구성

### Phase 2: 모듈 카드 시스템
- [ ] 기본 모듈 카드 컴포넌트 (Start, Auth, Payment, End)
- [ ] 세로 자동 정렬 로직
- [ ] 자동 연결선 생성

### Phase 3: Vibe Coding 통합
- [ ] 프롬프트 입력 UI
- [ ] AI 코드 생성 엔진 연동
- [ ] Context 파싱 및 전달

### Phase 4: Export 기능
- [ ] 전체 플로우 코드 통합
- [ ] Next.js 프로젝트 스캐폴딩
- [ ] ZIP 다운로드

---

## 7. 참고 자료

- New Day UI 참조: https://newday-rose.vercel.app/
- React Flow 문서: https://reactflow.dev/
- Shadcn/UI: https://ui.shadcn.com/
