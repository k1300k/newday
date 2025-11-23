# Vercel 배포 가이드

이 문서는 **Vibe Pilot** 프로젝트를 Vercel에 배포하는 방법을 안내합니다.

## 🚀 배포 방법

### 방법 1: Vercel CLI (권장)

#### 1. Vercel CLI 설치

```bash
npm i -g vercel
```

#### 2. Vercel 로그인

```bash
vercel login
```

이메일 또는 GitHub 계정으로 로그인하세요.

#### 3. 프로젝트 배포

```bash
# 개발 환경 배포 (테스트용)
vercel

# 프로덕션 배포
vercel --prod
```

첫 배포 시 다음 질문에 답변하세요:
- **Set up and deploy?** → Y
- **Which scope?** → 본인 계정 선택
- **Link to existing project?** → N
- **What's your project's name?** → `vibe-pilot` (또는 원하는 이름)
- **In which directory is your code located?** → `./`
- **Want to override the settings?** → N

#### 4. 배포 확인

배포가 완료되면 URL이 표시됩니다:
```
✅ Production: https://vibe-pilot.vercel.app
```

---

### 방법 2: GitHub 연동 (자동 배포)

#### 1. Vercel 대시보드 접속

[https://vercel.com](https://vercel.com)에 로그인하세요.

#### 2. 새 프로젝트 생성

1. **"Add New..."** → **"Project"** 클릭
2. GitHub 저장소 연동 (처음이라면 GitHub 계정 연결)
3. `k1300k/newday` 저장소 선택
4. **"Import"** 클릭

#### 3. 프로젝트 설정

Vercel이 자동으로 설정을 감지합니다:

- **Framework Preset**: Vite
- **Root Directory**: `./`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

> 💡 **팁**: 설정이 자동으로 감지되지 않으면 수동으로 입력하세요.

#### 4. 배포 시작

**"Deploy"** 버튼을 클릭하면 배포가 시작됩니다.

#### 5. 자동 배포 설정

GitHub 연동 시 다음과 같이 자동 배포됩니다:
- **`main` 브랜치 푸시** → 프로덕션 배포
- **다른 브랜치 푸시** → 프리뷰 배포
- **Pull Request 생성** → 프리뷰 배포 (PR 코멘트에 URL 표시)

---

## ⚙️ 환경 변수 설정 (선택사항)

현재 Vibe Pilot은 환경 변수가 필요하지 않지만, 향후 API 키 등을 추가할 경우:

### Vercel 대시보드에서 설정

1. 프로젝트 선택
2. **Settings** → **Environment Variables**
3. 변수 추가:
   - **Name**: 변수명 (예: `VITE_API_KEY`)
   - **Value**: 값
   - **Environment**: Production / Preview / Development 선택
4. **Save** 클릭
5. 재배포 필요 시 **Deployments** → **Redeploy**

### `.env` 파일 (로컬 개발용)

```bash
# .env.local
VITE_API_KEY=your_api_key_here
```

> ⚠️ **주의**: `.env` 파일은 `.gitignore`에 추가하여 GitHub에 업로드하지 마세요!

---

## 🔧 커스텀 도메인 설정

### 1. 도메인 추가

1. Vercel 프로젝트 → **Settings** → **Domains**
2. 도메인 입력 (예: `vibepilot.com`)
3. **Add** 클릭

### 2. DNS 설정

도메인 등록 업체(예: GoDaddy, Namecheap)에서:

#### A 레코드 설정
```
Type: A
Name: @
Value: 76.76.21.21
```

#### CNAME 레코드 설정 (www 서브도메인)
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### 3. SSL 인증서

Vercel이 자동으로 Let's Encrypt SSL 인증서를 발급합니다 (무료).

---

## 📊 배포 후 확인사항

### ✅ 체크리스트

- [ ] 애플리케이션이 정상적으로 로드되는가?
- [ ] 모든 페이지가 작동하는가? (Overview, Detailed Checklist)
- [ ] 언어 전환이 정상 작동하는가? (KO/EN)
- [ ] LocalStorage 데이터가 저장되는가?
- [ ] 모바일 반응형이 정상 작동하는가?
- [ ] 프로젝트 등록 기능이 작동하는가?
- [ ] 산출물 첨부 기능이 작동하는가?

### 🐛 문제 해결

#### 빌드 실패 시

1. **로컬에서 빌드 테스트**
   ```bash
   npm run build
   npm run preview
   ```

2. **Vercel 로그 확인**
   - Vercel 대시보드 → **Deployments** → 실패한 배포 클릭
   - **Build Logs** 확인

3. **의존성 문제**
   ```bash
   # package-lock.json 재생성
   rm -rf node_modules package-lock.json
   npm install
   git add package-lock.json
   git commit -m "fix: update package-lock.json"
   git push
   ```

#### 404 에러 (페이지를 찾을 수 없음)

Vite는 SPA이므로 `vercel.json` 파일이 필요할 수 있습니다:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

#### 환경 변수가 적용되지 않음

- Vercel 대시보드에서 환경 변수 재확인
- 변수명이 `VITE_`로 시작하는지 확인 (Vite 규칙)
- 재배포 필요

---

## 🔄 재배포 방법

### CLI로 재배포

```bash
vercel --prod
```

### GitHub 푸시로 자동 재배포

```bash
git add .
git commit -m "update: 기능 개선"
git push origin main
```

### Vercel 대시보드에서 수동 재배포

1. **Deployments** 탭
2. 최신 배포 선택
3. **⋯** (점 3개) → **Redeploy**

---

## 📈 성능 최적화

### 1. 빌드 최적화

Vite는 기본적으로 최적화되어 있지만, 추가 설정:

```javascript
// vite.config.js
export default {
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          icons: ['lucide-react']
        }
      }
    }
  }
}
```

### 2. Vercel Analytics (선택사항)

1. Vercel 대시보드 → **Analytics** 탭
2. **Enable Analytics** 클릭
3. 무료 플랜: 2,500 이벤트/월

---

## 💰 비용

- **Hobby 플랜 (무료)**
  - 대역폭: 100GB/월
  - 빌드 시간: 100시간/월
  - 프로젝트: 무제한
  - **Vibe Pilot에 충분합니다!**

- **Pro 플랜 ($20/월)**
  - 대역폭: 1TB/월
  - 빌드 시간: 400시간/월
  - 팀 협업 기능

---

## 🔗 유용한 링크

- [Vercel 공식 문서](https://vercel.com/docs)
- [Vite 배포 가이드](https://vitejs.dev/guide/static-deploy.html)
- [Vercel CLI 문서](https://vercel.com/docs/cli)

---

## 📞 지원

문제가 발생하면:
1. [Vercel 커뮤니티](https://github.com/vercel/vercel/discussions)
2. [GitHub Issues](https://github.com/k1300k/newday/issues)

---

**배포 성공을 기원합니다! 🎉**
