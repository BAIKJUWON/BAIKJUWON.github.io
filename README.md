# 백주원 포트폴리오 GitHub Pages

백주원의 개발자 이력서, 교육자 경력, 외부 링크를 페이지별로 분리한 정적 포트폴리오입니다.

## 페이지 구성

- `index.html` : 메인
- `developer.html` : 개발자 이력서
- `educator.html` : 교육자 경력
- `links.html` : 외부 링크
- `private.html` : 백주원 전용 페이지 자리
- `project_smarthome.html` : ESP32 스마트홈 상세
- `project_gpt.html` : 시큐어지피티 상세
- `404.html` : 잘못된 주소 안내

## GitHub Pages 게시

### 권장 저장소 이름

GitHub 사용자명이 `BAIKJUWON`이라면 저장소 이름을 아래처럼 만들면 기본 주소로 게시됩니다.

```text
BAIKJUWON.github.io
```

다른 저장소 이름을 사용해도 모든 내부 경로가 상대경로이므로 정상 동작합니다.

### 게시 순서

1. 이 폴더의 파일과 폴더를 저장소 최상위에 그대로 올립니다.
2. 기본 브랜치를 `main`으로 사용합니다.
3. 저장소의 `Settings → Pages`로 이동합니다.
4. `Build and deployment → Source`에서 `GitHub Actions`를 선택합니다.
5. `main` 브랜치에 파일을 올리면 `.github/workflows/pages.yml`이 자동으로 사이트를 게시합니다.

## 로컬 미리보기

파일을 직접 열어도 볼 수 있지만, 아래 명령으로 간단한 웹 서버를 실행하는 방식이 더 정확합니다.

```bash
python -m http.server 8000
```

브라우저에서 `http://localhost:8000`으로 접속합니다.

윈도우에서는 `미리보기.bat`을 실행해도 됩니다.

## 개인정보 처리

- 주민등록번호, 주소, 전화번호가 포함된 봉사·경력 증빙 원본은 포함하지 않았습니다.
- NCS 자료는 마스킹된 공개용 파일만 사용했습니다.
- `private.html`은 안내 화면일 뿐 실제 비공개 페이지가 아닙니다.
- GitHub Pages 저장소에 올린 파일은 화면에서 링크하지 않아도 공개될 수 있으므로 비공개 문서를 저장소에 넣으면 안 됩니다.
