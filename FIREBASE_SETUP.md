# Firebase Cloud Sync 설정 가이드

이 가이드는 **Vibe Pilot**에서 Cloud Sync 기능을 활성화하는 방법을 안내합니다.

## 🔥 Firebase 프로젝트 생성

### 1. Firebase Console 접속
1. [Firebase Console](https://console.firebase.google.com/)에 접속
2. **프로젝트 추가** 클릭

### 2. 프로젝트 설정
1. **프로젝트 이름** 입력 (예: `vibe-pilot`)
2. **Google Analytics** 활성화 (선택사항)
3. **프로젝트 만들기** 클릭

### 3. 웹 앱 추가
1. 프로젝트 개요 페이지에서 **웹 앱 추가** (\u003c/\u003e 아이콘) 클릭
2. **앱 닉네임** 입력 (예: `Vibe Pilot Web`)
3. **Firebase Hosting** 체크 (선택사항)
4. **앱 등록** 클릭

### 4. Firebase SDK 구성 정보 복사
Firebase가 제공하는 구성 객체를 복사합니다:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXX",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:xxxxx"
};
```

---

## 📝 프로젝트에 Firebase 설정 적용

### 1. src/config/firebase.js 파일 수정

```javascript
// src/config/firebase.js
const firebaseConfig = {
  apiKey: "여기에_실제_API_KEY_입력",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:xxxxx"
};

export default firebaseConfig;
```

> ⚠️ **중요**: `YOUR_API_KEY` 등의 플레이스홀더를 실제 Firebase 값으로 교체하세요!

---

## 🔐 Firebase Storage 보안 규칙 설정

### 1. Firebase Console에서 Storage 활성화
1. Firebase Console → **Build** → **Storage**
2. **시작하기** 클릭
3. **프로덕션 모드**로 시작 (권장)
4. **Cloud Storage 위치** 선택 (예: `asia-northeast3 (Seoul)`)
5. **완료** 클릭

### 2. 보안 규칙 설정

**옵션 A: 공개 읽기/쓰기 (테스트용, 주의!)**
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /projects/{projectId} {
      // 누구나 읽고 쓸 수 있음 (테스트용)
      allow read, write: if true;
    }
  }
}
```

**옵션 B: 익명 인증 + 사용자별 제한 (추천)**
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /projects/{projectId} {
      // 누구나 읽을 수 있음
      allow read: if true;
      // 프로젝트 소유자만 쓸 수 있음 (추후 인증 추가 시)
      allow write: if request.auth != null;
    }
  }
}
```

**옵션 C: 완전 공개 (빠른 테스트용)**
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if true;
    }
  }
}
```

> ⚠️ **보안 주의**: 프로덕션 환경에서는 옵션 B 이상을 사용하세요!

### 3. 규칙 적용
1. Storage → **Rules** 탭
2. 위 규칙 중 하나를 복사
3. **게시** 클릭

---

## ✅ 동작 확인

### 1. 개발 서버 재시작
```bash
# 터미널에서 Ctrl+C로 서버 중지 후
npm run dev
```

### 2. Cloud Sync 버튼 확인
- 헤더에 **"Cloud Sync"** 버튼이 표시되어야 함
- 버튼이 보이지 않으면 Firebase 설정이 올바르지 않은 것임

### 3. 기능 테스트
1. **Cloud Sync** 버튼 클릭
2. **ID 생성** 버튼으로 Project ID 생성
3. **Save to Cloud** 클릭
4. 성공 메시지 및 공유 링크 확인
5. 다른 브라우저(또는 시크릿 모드)에서:
   - 공유 링크 접속 또는
   - Cloud Sync → Project ID 입력 → **Load from Cloud**

---

## 🐛 문제 해결

### Cloud Sync 버튼이 보이지 않음
- `src/config/firebase.js` 파일 확인
- `apiKey`가 `"YOUR_API_KEY"`가 아닌 실제 값인지 확인
- 브라우저 콘솔에서 에러 메시지 확인

### "Firebase is not configured" 에러
- `firebase.js` 파일의 모든 값이 실제 Firebase 값으로 교체되었는지 확인
- Firebase SDK 설치 확인: `npm list firebase`

### "Permission denied" 에러
- Firebase Storage 보안 규칙 확인
- Storage가 활성화되어 있는지 확인

### CORS 에러
- Firebase Console → Storage → 설정 확인
- 대부분의 경우 Firebase가 자동으로 CORS 설정

---

## 📱 사용 시나리오

### 시나리오 1: 개인 백업
1. 작업 완료 후 **Cloud Sync** 클릭
2. **ID 생성** → **Save to Cloud**
3. Project ID를 안전한 곳에 보관

### 시나리오 2: 다른 기기에서 작업
1. 첫 번째 기기에서 Cloud Sync로 저장
2. 두 번째 기기에서 공유 링크 접속 또는
3. Cloud Sync → Project ID 입력 → Load

### 시나리오 3: 팀 협업
1. 팀장이 프로젝트 생성 및 Cloud에 저장
2. 공유 링크를 팀원에게 전달
3. 팀원들이 링크를 통해 최신 프로젝트 로드

---

## 💡 팁

### URL 자동 로드
공유 링크 형식: `https://your-app.com?projectId=project-xxx-yyy`
- 이 링크를 클릭하면 자동으로 해당 Project ID를 로드하려고 시도합니다 (추후 기능)

### 자동 동기화 (선택적 구현)
- 현재는 수동 저장/로드
- 향후 자동 동기화 기능 추가 가능 (Firebase Realtime Database 사용)

---

## 🔒 보안 권장사항

1. **.env 파일 사용** (선택사항)
   ```bash
   # .env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_PROJECT_ID=your_project_id
   ```

2. **.gitignore에 추가**
   ```
   .env
   .env.local
   src/config/firebase.js  # 선택사항
   ```

3. **인증 추가** (고급)
   - Firebase Anonymous Auth 활성화
   - 사용자별 프로젝트 격리

---

## 📚 참고 자료

- [Firebase Storage 문서](https://firebase.google.com/docs/storage)
- [Firebase 보안 규칙](https://firebase.google.com/docs/storage/security)
- [Firebase Anonymous Auth](https://firebase.google.com/docs/auth/web/anonymous-auth)

---

**설정 완료 후 Cloud Sync를 마음껏 사용하세요! 🚀**
