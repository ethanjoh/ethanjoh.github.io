# ETHANJOH | 방구석 개발자 💻

ETHANJOH의 개인 GitHub 홈이자 포트폴리오를 위한 인터랙티브 2.5D 랜딩 페이지입니다.  
골방 구석에서 조용히 코딩하며 상상을 현실로 빌드하는 개발자의 공간을 게임 감성으로 연출하였습니다.

👉 **라이브 데모:** [https://ethanjoh.github.io](https://ethanjoh.github.io)

---

## 🛠️ Tech Stack & Architecture

- **Markup:** Semantic HTML5
- **Styling:** Vanilla CSS (Cyberpunk Dark Mode / Grid Layout / Responsive Design)
- **Logic & Interactions:** Vanilla JavaScript (ES6)
- **Fonts:** Outfit, Share Tech Mono, Noto Sans KR (Google Fonts)

---

## ✨ Key Features & Interactions

### 1. 2.5D Isometric Room (입체적 마우스 패럴랙스)
- 마우스의 미세한 움직임에 따라 방 전체 레이아웃이 3D 공간 안에서 부드럽게 회전하고 반응합니다.
- CSS 3D Transforms (`perspective`, `transform-style: preserve-3d`) 및 JS 마우스 이벤트를 결합하여 입체감을 극대화했습니다.

### 2. Interactive Hotspots (방구석 핀 클릭 이벤트)
- 방 안의 중요 요소(듀얼 모니터, 침대, 책장, 창문)에 상호작용 가능한 핀이 존재합니다.
- 각 핀을 클릭하면 왼쪽 대시보드의 **터미널 콘솔 로그 창**에 해당하는 파일 조회 명령어 및 디스크립션이 출력됩니다.

### 3. Light Switch (레트로 매트릭스 테마 토글)
- 상단 네비게이션바의 **Light Switch** 버튼을 누르면 방 전체가 클래식한 녹색의 매트릭스 터미널 스타일로 전환됩니다.
- 전체 CSS 변수가 일괄 스위칭되며, 2.5D 방 이미지에 고대비 그린 필터 효과가 부여됩니다.

### 4. Terminal Command Center (실시간 터미널 카드)
- 개발자의 커피 섭취량, 작성 코드 라인 수, 주요 기술 스택, 현재 위치 상태를 보여줍니다.
- **방 두드리기 (Ping)** 버튼을 누르면 개발자 뇌(brain)와의 레이턴시 핑 테스트 출력을 보여주고 busy 알림 모달을 띄웁니다.

---

## 📂 File Directory

- `index.html` - 마크업 및 핵심 레이아웃 구조
- `style.css` - 디자인 시스템, 글래스모피즘, 3D 퍼스펙티브, 애니메이션 스타일
- `script.js` - 타이핑 루프, 마우스 패럴랙스 기울기 계산, 핀 클릭 로그 결합 동작
- `assets/` - AI로 설계된 고해상도 2.5D 개발자 방 리소스 (`dev_room_2_5d.png`)
