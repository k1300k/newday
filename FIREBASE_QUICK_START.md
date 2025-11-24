# Firebase 빠른 설정 가이드 (Quick Start)

## 🎯 목표
Vibe Pilot에서 Cloud Sync 기능을 사용하기 위한 Firebase 설정 (5-10분 소요)

---

## 📝 Firebase 구성 객체 가져오기

### 1단계: Firebase Console 접속
**링크**: [https://console.firebase.google.com/](https://console.firebase.google.com/)

### 2단계: 프로젝트 만들기
1. **"프로젝트 추가"** 또는 **"Create a project"** 클릭
2. 프로젝트 이름 입력 (예: `vibe-pilot`)
3. Google Analytics **건너뛰기** (선택사항, 필요없음)
4. **"프로젝트 만들기"** 클릭
5. 완료되면 **"계속"** 클릭

### 3단계: 웹 앱 추가 (중요!)
1. 프로젝트 개요 화면에서 **웹 아이콘 (`</>`)** 클릭
   - 또는 **"시작하기"** 섹션에서 **"웹"** 선택
2. 앱 닉네임 입력: `Vibe Pilot Web`
3. ✅ **"Firebase Hosting도 설정"은 체크 해제** (필요없음)
4. **"앱 등록"** 클릭

### 4단계: 구성 객체 복사 ⭐ (가장 중요!)

앱 등록 후 다음과 같은 화면이 나타납니다:

```javascript
// SDK 추가 화면에서 이 부분을 찾으세요
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXX",           // ← 이것들을 복사!
  authDomain: "vibe-pilot-xxx.firebaseapp.com",
  projectId: "vibe-pilot-xxx",
  storageBucket: "vibe-pilot-xxx.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:xxxxx"
};
```

**📋 전체 객체를 복사하세요!**

#### 이미 화면을 닫았다면?
1. Firebase Console → 프로젝트 선택
2. 왼쪽 메뉴 하단의 **⚙️ 프로젝트 설정** 클릭
3. 스크롤 내려서 **"내 앱"** 섹션 확인
4. 웹 앱 아래 **"SDK 설정 및 구성"** 선택
5. **구성** 라디오 버튼 선택
6. 코드 복사

---

## 🔧 프로젝트에 적용하기

### 5단계: firebase.js 파일 수정

**파일 위치**: `src/config/firebase.js`

**기존 코드 (템플릿):**
```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",                        // ❌ 이런 형태
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  // ...
};
```

**수정 후 (실제 값):**
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXX",           // ✅ Firebase에서 복사한 실제 값
  authDomain: "vibe-pilot-xxx.firebaseapp.com",  // ✅ 실제 프로젝트 ID
  projectId: "vibe-pilot-xxx",
  storageBucket: "vibe-pilot-xxx.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:xxxxx"
};

export default firebaseConfig;  // ← 이 줄은 그대로 유지!
```

---

## 💾 Storage 활성화

### 6단계: Cloud Storage 설정

1. Firebase Console 왼쪽 메뉴에서 **"Build"** → **"Storage"** 클릭
2. **"시작하기"** 버튼 클릭
3. 보안 규칙 화면:
   - **"프로덕션 모드로 시작"** 선택 (첫 번째 옵션)
   - **"다음"** 클릭
4. Cloud Storage 위치:
   - **"asia-northeast3 (Seoul)"** 선택 (한국 서버)
   - **"완료"** 클릭

### 7단계: 보안 규칙 설정 (테스트용)

Storage가 활성화되면:
1. **"Rules"** 탭 클릭
2. 기존 코드를 다음으로 **전체 교체**:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /projects/{projectId} {
      // 테스트용: 누구나 읽고 쓸 수 있음
      allow read, write: if true;
    }
  }
}
```

3. **"게시"** 버튼 클릭

> ⚠️ **주의**: 이 규칙은 테스트용입니다. 실제 서비스에서는 보안 규칙을 강화하세요!

---

## ✅ 동작 확인

### 8단계: 개발 서버 재시작

```bash
# 터미널에서 Ctrl+C 로 서버 중지 후
npm run dev
```

### 9단계: Cloud Sync 버튼 확인

브라우저에서 `http://localhost:5173` 접속 후:
- 헤더에 **파란색 "Cloud Sync" 버튼**이 보이면 ✅ **성공!**
- 안 보이면 ❌ Firebase 설정 다시 확인

---

## 🎉 사용하기

### Cloud에 저장하기
1. **"Cloud Sync"** 버튼 클릭
2. **"ID 생성"** 버튼 클릭
3. **"Save to Cloud"** 버튼 클릭
4. 성공 메시지와 **공유 링크** 확인!

### 다른 브라우저에서 불러오기
1. 공유 링크 클릭 또는
2. **"Cloud Sync"** → Project ID 입력 → **"Load from Cloud"**

---

## 🐛 문제 해결

### Cloud Sync 버튼이 안 보여요
**확인 사항:**
- [ ] `src/config/firebase.js` 파일 수정했나요?
- [ ] `apiKey`가 `"YOUR_API_KEY"`가 아닌 실제 값인가요?
- [ ] 개발 서버를 재시작했나요? (`Ctrl+C` → `npm run dev`)
- [ ] 브라우저 콘솔(F12)에 에러가 있나요?

### "Permission denied" 에러
**해결 방법:**
- Firebase Console → Storage → Rules 탭
- 위의 7단계 보안 규칙을 다시 복사/붙여넣기
- "게시" 클릭

### Firebase Console에서 config를 못 찾겠어요
**방법 1:**
1. Firebase Console 접속
2. 프로젝트 클릭
3. 왼쪽 하단 **⚙️ (톱니바퀴)** → **프로젝트 설정**
4. 스크롤 내려서 **"내 앱"** 섹션
5. 웹 앱 선택 → **"구성"** 라디오 버튼

**방법 2:**
```bash
# 또는 npm으로 확인
npm list firebase
```

---

## 📌 체크리스트

설정 완료 확인:
- [ ] Firebase 프로젝트 생성
- [ ] 웹 앱 추가 (`</>` 아이콘)
- [ ] `firebaseConfig` 복사
- [ ] `src/config/firebase.js` 파일 수정
- [ ] Cloud Storage 활성화
- [ ] 보안 규칙 설정
- [ ] 개발 서버 재시작
- [ ] Cloud Sync 버튼 확인

**모두 완료하면 Cloud Sync를 사용할 수 있습니다! 🚀**
