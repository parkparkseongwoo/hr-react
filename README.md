# hr-react

#Java, MyBatis, JPA, Oracle, PL/SQL을 활용해 백엔드를 개발하고, TypeScript와 Next.js를 사용해 프론트엔드를 구현하며 HR(인사) 관리 시스템 개발하였습니다

<!DOCTYPE html>
<html lang="ko">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>신정헌 | 함께 성장하는 개발자</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Space Grotesk', sans-serif;
        }

        :root {
            --bg-primary: #030303;
            --text-primary: #ffffff;
        
            /* 기존 색상 */
            /* --accent-1: #FF006E;
            --accent-2: #3A86FF; */
        
            /* 새로운 블루 톤으로 변경 */
            --accent-1: #38bdf8;  /* sky-400 */
            --accent-2: #0ea5e9;  /* sky-500 */
        
            --glass: rgba(255, 255, 255, 0.1);
        }


        body {
            background-color: var(--bg-primary);
            color: var(--text-primary);
            overflow-x: hidden;
        }

        .cursor {
            width: 20px;
            height: 20px;
            border: 2px solid var(--accent-1);
            border-radius: 50%;
            position: fixed;
            pointer-events: none;
            z-index: 9999;
            mix-blend-mode: difference;
            transition: transform 0.2s ease;
        }

        .cursor-follower {
            width: 40px;
            height: 40px;
            background: rgba(255, 0, 110, 0.2);
            border-radius: 50%;
            position: fixed;
            pointer-events: none;
            z-index: 9998;
            transition: transform 0.4s ease;
        }

        /* 3D 캔버스 */
        /* #background-canvas {
            position: fixed;
            top: 0;
            left: 0;
            z-index: -1;
        } */

        /* 네비게이션 */
        .nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .nav-links {
          display: flex;
          flex-direction: row; /* 이걸 꼭 추가해줘야 함! */
          gap: 40px;
          height: 100%;
          align-items: center;
          justify-content: center;
        }

        .nav-section.center {
          display: flex;        /* 필수 */
          justify-content: center;
          align-items: center;
        }


        
        .nav-section {
          flex: 1; /* 전체 너비를 3등분 */
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .nav-section.left {
          justify-content: flex-start;
        }
        
        .nav-section.right {
          justify-content: flex-end;
        }

        .logo {
          font-size: 2.0rem; /* 기존보다 키움 */
          font-weight: 700;
          background: linear-gradient(to right, var(--accent-1), var(--accent-2));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          cursor: pointer;
          margin-left: 50px; /* ← 이거 추가해서 오른쪽으로 이동 */
        }


        .nav-link {
          color: var(--text-primary);
          text-decoration: none;
          font-weight: 600;
          position: relative;
          font-size: 1.5rem; /* ← 기존보다 살짝 키움 */
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          line-height: 70px;
        }


        
        .nav-link {
          color: var(--text-primary);
          text-decoration: none;
          font-weight: 600;
          position: relative;
          font-size: 1.15rem;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          line-height: 70px; /* 추가: 부모 높이와 동일하게 맞추기 */
        }



        .nav-link::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 0;
            height: 2px;
            background: linear-gradient(to right, var(--accent-1), var(--accent-2));
            transition: width 0.3s ease;
        }

        .nav-link:hover::after {
            width: 100%;
        }

        /* 히어로 섹션 */
        .hero {
            min-height: 100vh;
            display: flex;
            align-items: center;
            padding: 0 10vw;
            position: relative;
        }

        .hero-content {
            max-width: 1000px;
        }

        .hero-title {
            font-size: clamp(3rem, 8vw, 8rem);
            line-height: 1;
            margin-bottom: 30px;
            display: flex;
            flex-direction: column;
        }

        .hero-title span {
            display: block;
            opacity: 0;
            transform: translateY(50px);
        }

        .hero-description {
            font-size: clamp(1rem, 2vw, 1.2rem);
            color: rgba(255, 255, 255, 0.7);
            max-width: 600px;
            margin-bottom: 50px;
            opacity: 0;
        }

        .cta-container {
            display: flex;
            gap: 20px;
            opacity: 0;
        }

        .cta-button {
            padding: 15px 40px;
            border: none;
            border-radius: 30px;
            font-size: 1rem;
            font-weight: 500;
            cursor: pointer;
            transition: transform 0.3s ease;
            text-decoration: none;
        }

        .cta-primary {
          background: rgba(59, 130, 246, 0.1); /* 연한 파랑 배경 */
          border: 1px solid rgba(59, 130, 246, 0.3);
          color: #93c5fd; /* 밝은 하늘색 텍스트 */
          backdrop-filter: blur(4px);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
          transition: all 0.3s ease;
        }
        .cta-primary:hover {
          background: rgba(59, 130, 246, 0.3);
          color: #ffffff;
          transform: translateY(-5px);
        }


        .cta-secondary {
          background: rgba(59, 130, 246, 0.1); /* 연한 파랑 배경 */
          border: 1px solid rgba(59, 130, 246, 0.3);
          color: #93c5fd; /* 밝은 하늘색 텍스트 */
          backdrop-filter: blur(4px);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
          transition: all 0.3s ease;
        }
        .cta-secondary:hover {
          background: rgba(59, 130, 246, 0.3);
          color: #ffffff;
          transform: translateY(-5px);
        }


        .cta-button:hover {
            transform: translateY(-5px);
        }

        /* 프로젝트 섹션 */
        .projects {
            padding: 100px 10vw;
        }

        .section-header {
            margin-bottom: 80px;
            opacity: 0;
        }

        .section-title {
            font-size: clamp(2rem, 5vw, 4rem);
            margin-bottom: 20px;
            background: linear-gradient(to right, var(--accent-1), var(--accent-2));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .section-subtitle {
            color: rgba(255, 255, 255, 0.7);
            font-size: 1.2rem;
            max-width: 600px;
        }

        .projects-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 40px;
        }

        .project-card {
            position: relative;
            background: var(--glass);
            border-radius: 20px;
            padding: 30px;
            cursor: pointer;
            overflow: hidden;
            border: 1px solid rgba(255, 255, 255, 0.1);
            opacity: 0;
            transform: translateY(50px);
        }

        .project-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, var(--accent-1), var(--accent-2));
            opacity: 0;
            transition: opacity 0.3s ease;
            z-index: -1;
        }

        .project-card:hover::before {
            opacity: 0.1;
        }

        .project-number {
            font-size: 4rem;
            font-weight: 700;
            color: rgba(255, 255, 255, 0.1);
            position: absolute;
            bottom: 20px;
            right: 20px;
        }

        .project-content {
            position: relative;
            z-index: 1;
        }

        .project-title {
            font-size: 1.5rem;
            margin-bottom: 15px;
        }

        .project-description {
            color: rgba(255, 255, 255, 0.7);
            margin-bottom: 20px;
            line-height: 1.6;
        }

        .project-tags {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
        }

        .project-tag {
            padding: 5px 15px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            font-size: 0.9rem;
        }

        /* 스킬 섹션 */
        .skills {
            padding: 100px 10vw;
            position: relative;
        }

        .skills-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 40px;
        }

        .skill-category {
            background: var(--glass);
            border-radius: 20px;
            padding: 40px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            opacity: 0;
            transform: translateY(50px);
        }

        .skill-icon {
            font-size: 2rem;
            margin-bottom: 20px;
            background: linear-gradient(45deg, var(--accent-1), var(--accent-2));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .skill-title {
            font-size: 1.5rem;
            margin-bottom: 20px;
        }

        .skill-list {
            display: flex;
            flex-direction: column;
            gap: 15px;
        }

        .skill-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: rgba(255, 255, 255, 0.7);
        }

        .skill-progress {
            width: 100px;
            height: 4px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 2px;
            overflow: hidden;
        }

        .skill-progress-bar {
            height: 100%;
            background: linear-gradient(to right, var(--accent-1), var(--accent-2));
            transform-origin: left;
            transform: scaleX(0);
        }

        /* 연락처 섹션 */
        .contact {
            min-height: 100vh;
            padding: 100px 10vw;
            display: flex;
            align-items: center;
        }

        .contact-container {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 60px;
        }

        .contact-info {
            opacity: 0;
        }

        .contact-links {
            display: flex;
            flex-direction: column;
            gap: 30px;
            margin-top: 40px;
        }

        .contact-link {
            display: flex;
            align-items: center;
            gap: 20px;
            color: rgba(255, 255, 255, 0.7);
            text-decoration: none;
            transition: color 0.3s ease;
        }

        .contact-link:hover {
            color: var(--text-primary);
        }

        .contact-form {
            background: var(--glass);
            padding: 60px;
            border-radius: 20px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            opacity: 0;
            transform: translateX(50px);
        }

        .form-group {
            margin-bottom: 30px;
        }

        .form-label {
            display: block;
            margin-bottom: 10px;
            color: rgba(255, 255, 255, 0.7);
        }

        .form-input,
        .form-textarea {
            width: 100%;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 10px;
            padding: 15px;
            color: var(--text-primary);
            font-size: 1rem;
        }

        .form-textarea {
            height: 150px;
            resize: none;
        }

        /* 반응형 스타일 */
        @media (max-width: 768px) {
            .nav-links {
/*                 display: none; */
                    flex-direction: row; /* 세로 → 가로 유지 */
                    gap: 20px;
                    justify-content: center;
            }

            .contact-container {
                grid-template-columns: 1fr;
            }

            .contact-form {
                padding: 40px;
            }
        }

        /* 로딩 애니메이션 */
        .loader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--bg-primary);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
        }

        .loader-content {
            text-align: center;
        }

        .loader-text {
            font-size: 1.5rem;
            margin-top: 20px;
            opacity: 0;
        }

        /* 스크롤바 스타일 */
        ::-webkit-scrollbar {
            width: 10px;
        }

        ::-webkit-scrollbar-track {
            background: var(--bg-primary);
        }

        ::-webkit-scrollbar-thumb {
            background: linear-gradient(var(--accent-1), var(--accent-2));
            border-radius: 5px;
        }
        .section-subtitle {
           word-break: keep-all; 
           line-height: 1.6;
        }
      .intro-text h2 {
       color: #5eead4;
       font-size: 1.2rem;
       margin-bottom: 10px;
     }
     .intro-text h1 {
       font-size: 3rem;
       color: #e2e8f0;
       margin: 0 0 10px;
     }
     .intro-text p {
       color: #94a3b8;
       line-height: 1.6;
     }
             #home {
       display: flex;
       justify-content: center;
       align-items: center;
       min-height: 100vh;
       gap: 50px;
     }
     #home img {
       width: 220px;
       border-radius: 12px;
       border: 3px solid #5eead4;
     }
        .contact-link {
    display: flex;
    align-items: center;
    gap: 20px;
    color: rgba(255, 255, 255, 0.7); /* 이 부분이 글자 색을 지정해줘 */
    text-decoration: none;
    transition: color 0.3s ease;
}

.contact-link:hover {
    color: var(--text-primary); /* hover 시 흰색 */
}
#starCanvas {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  pointer-events: none;
  width: 100vw;
  height: 100vh;
}
    </style>
</head>

<body>
    <!-- 커스텀 커서 -->
    <div class="cursor"></div>
    <div class="cursor-follower"></div>

    <!-- 로딩 화면 -->
    <div class="loader">
        <div class="loader-content">
            <div class="loader-text">Welcome to JeongHeon portfolio</div>
        </div>
    </div>

    <!-- 3D 배경 캔버스 -->
    <!-- <canvas id="background-canvas"></canvas> -->
    <canvas id="starCanvas"></canvas>

    <!-- 네비게이션 -->
    <nav class="nav">
      <div class="nav-section left">
        <div class="logo">JH Portfolio</div>
      </div>
      <div class="nav-section center">
        <div class="nav-links">
          <a href="#home" class="nav-link">Home</a>
          <a href="#projects" class="nav-link">Projects</a>
          <a href="#skills" class="nav-link">Skills</a>
          <a href="#contact" class="nav-link">Contact</a>
        </div>
      </div>
      <div class="nav-section right"></div> <!-- 비워두면 중앙정렬됨 -->
    </nav>


    <!-- 히어로 섹션 -->
<section class="hero" id="home">
  <div style="display: flex; flex-direction: row; align-items: center; justify-content: center; gap: 80px; flex-wrap: wrap;">
    <!-- 왼쪽: 프로필 사진 -->
    <div>
      <img src="신정헌 증명사진.jpg" alt="신정헌 프로필 사진" style="width: 260px; border-radius: 16px; border: 4px solid #5eead4; box-shadow: 0 0 20px rgba(94, 234, 212, 0.4);" />
 
 
    </div>

    <!-- 오른쪽: 소개 글 -->
    <div style="max-width: 580px; text-align: left; line-height: 1.9;">
      <div class="intro-text">
        <h2 style="font-size: 1.4rem; color: #7dd3fc; margin-bottom: 0.5rem;">
          안녕하세요, 제 이름은
        </h2>
        <h1 style="font-size: 3.2rem; color: #e2e8f0; font-weight: 700; margin-bottom: 1rem;">
          신정헌입니다.
        </h1>
        <p style="font-size: 1.1rem; color: #cbd5e1;">
          도전을 즐기는 개발자입니다.<br />
          새로운 기술을 배우는 것을 즐기며,<br />
          협업을 통해 더 나은 서비스를 만드는 데 큰 보람을 느낍니다.
        </p>
        <div class="cta-container" style="margin-top: 2.5rem; display: flex; gap: 16px;">
          <a href="#projects" class="cta-button cta-primary">View Projects</a>
          <a href="#contact" class="cta-button cta-secondary">Contact Me</a>
        </div>
      </div>
    </div>
  </div>
</section>




    <!-- 프로젝트 섹션 -->
    <section class="projects" id="projects">
        <div class="section-header">
            <h2 class="section-title">My Projects</h2>
            <p class="section-subtitle">실제 문제를 해결하고, 사용자를 생각하며 만든 프로젝트를 소개합니다.</p>
        </div>
        <div class="projects-grid">
            <div class="project-card"  onclick="window.open('Nexacro Logi Project.pdf', '_blank')">
                <div class="project-content">
                    <h3 class="project-title">물류 통합 관리 시스템 (Nexacro)</h3>
                    <p class="project-description">3인팀 프로젝트</p>
                    <div class="project-tags">
                        <span class="project-tag">SpringBoot</span>
                        <span class="project-tag">Nexacro</span>
                        <span class="project-tag">Jpa</span>
                        <span class="project-tag">Mybatis</span>
                        <span class="project-tag">Oracle DB</span>
                        <span class="project-tag">Bitbucket</span>
                        <span class="project-tag">Sourcetree</span>
                    </div>
                </div>
                <div class="project-number">01</div>
            </div>
            <div class="project-card">
                <div class="project-content" onclick="window.open('React Logi Project.pdf', '_blank')">
                    <h3 class="project-title">물류 통합 관리 시스템 (React)</h3>
                    <p class="project-description">3인팀 프로젝트</p>
                    <div class="project-tags">
                        <span class="project-tag">React + next + TypeScript </span>
                        <span class="project-tag">Redux-Saga</span>
                        <span class="project-tag">SpringBoot</span>
                        <span class="project-tag">Jpa</span>
                        <span class="project-tag">Mybatis</span>
                        <span class="project-tag">Oracle DB</span>
                        <span class="project-tag">Sourcetree</span>
                    </div>
                </div>
                <div class="project-number">02</div>
            </div>
            <div class="project-card">
                <div class="project-content" onclick="window.open('쇼핑몰 프로젝트.pdf', '_blank')">
                    <h3 class="project-title">쇼핑몰 프로젝트</h3>
                    <p class="project-description">개인 프로젝트</p>
                    <div class="project-tags">
                        <span class="project-tag">HTML/CSS</span>
                        <span class="project-tag">Java(Jsp, Servlets)</span>
                        <span class="project-tag">Oracle DB</span>
                        <span class="project-tag">JavaScript</span>
                        <span class="project-tag">RestAPI</span>
                    </div>
                </div>
                <div class="project-number">03</div>
            </div>
            <div class="project-card">
                <div class="project-content" onclick="window.open('인공지능 기반 스마트 홈 트레이닝 시스템(AI는 못말려).pdf', '_blank')">
                    <h3 class="project-title">Ai는 못말려</h3>
                    <p class="project-description">5인팀 프로젝트</p>
                    <div class="project-tags">
                        <span class="project-tag">AdroidStudio</span>
                        <span class="project-tag">Kotlin</span>
                        <span class="project-tag">TensorFlow</span>
                        <span class="project-tag">Java</span>
                        <span class="project-tag">Oracle DB</span>
                    </div>
                </div>
                <div class="project-number">04</div>
            </div>            
            <div class="project-card">
                <div class="project-content">
                    <h3 class="project-title">🚧 기획 중인 프로젝트</h3>
                    <p class="project-description">현재 아이디어를 구체화하고 있으며,<br>곧 개발을 시작할 예정입니다.</p>
                    
                    <div class="project-tags">
                        
                    </div>
                </div>
                <div class="project-number">05</div>
            </div>
        </div>
    </section>

    <!-- 스킬 섹션 -->
    <section class="skills" id="skills">
        <div class="section-header">
            <h2 class="section-title">🛠️ Skills & Expertise</h2>
            <p class="section-subtitle">작은 프로젝트부터 팀 협업까지, 다양한 경험을 통해 기술을 쌓아왔습니다.</p>
        </div>
        <div class="skills-container">
            <div class="skill-category">
                <div class="skill-icon">🎨</div>
                <h3 class="skill-title">Front-End</h3>
                <div class="skill-list">
                    <div class="skill-item">
                        <span>JavaScript</span>
                        <div class="skill-progress">
                            <div class="skill-progress-bar" style="transform: scaleX(0.85);"></div>
                        </div>
                    </div>
                    <div class="skill-item">
                        <span>React</span>
                        <div class="skill-progress">
                            <div class="skill-progress-bar" style="transform: scaleX(0.75);"></div>
                        </div>
                    </div>
                    <div class="skill-item">
                        <span>Nexacro</span>
                        <div class="skill-progress">
                            <div class="skill-progress-bar" style="transform: scaleX(0.70);"></div>
                        </div>
                    </div>
                    <div class="skill-item">
                        <span>Html/Css</span>
                        <div class="skill-progress">
                            <div class="skill-progress-bar" style="transform: scaleX(0.65);"></div>
                        </div>
                    </div>
                   
                </div>
            </div>
            <div class="skill-category">
                <div class="skill-icon">💻</div>
                <h3 class="skill-title">Back-End</h3>
                <div class="skill-list">
                    <div class="skill-item">
                        <span>Java</span>
                        <div class="skill-progress">
                            <div class="skill-progress-bar" style="transform: scaleX(0.65);"></div>
                        </div>
                    </div>
                    <div class="skill-item">
                        <span>Jsp</span>
                        <div class="skill-progress">
                            <div class="skill-progress-bar" style="transform: scaleX(0.60);"></div>
                        </div>
                    </div>
                    <div class="skill-item">
                        <span>Spring Boot</span>
                        <div class="skill-progress">
                            <div class="skill-progress-bar" style="transform: scaleX(0.8);"></div>
                        </div>
                    </div>
                    <div class="skill-item">
                        <span>MyBatis</span>
                        <div class="skill-progress">
                            <div class="skill-progress-bar" style="transform: scaleX(0.77);"></div>
                        </div>
                    </div>
                    <div class="skill-item">
                        <span>JPA</span>
                        <div class="skill-progress">
                            <div class="skill-progress-bar" style="transform: scaleX(0.78);"></div>
                        </div>
                    </div>
                    <div class="skill-item">
                        <span>Oracle DB</span>
                        <div class="skill-progress">
                            <div class="skill-progress-bar" style="transform: scaleX(0.7);"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="skill-category">
                <div class="skill-icon">🎮</div>
                <h3 class="skill-title">Communication</h3>
                <div class="skill-list">
                    <div class="skill-item">
                        <span>Sourcetree</span>
                        <div class="skill-progress">
                            <div class="skill-progress-bar" style="transform: scaleX(0.85);"></div>
                        </div>
                    </div>
                    <div class="skill-item">
                        <span>Bitbucket</span>
                        <div class="skill-progress">
                            <div class="skill-progress-bar" style="transform: scaleX(0.7);"></div>
                        </div>
                    </div>
                    <div class="skill-item">
                        <span>GitHub</span>
                        <div class="skill-progress">
                            <div class="skill-progress-bar" style="transform: scaleX(0.6);"></div>
                        </div>
                    </div>                    
                    
                </div>
            </div>
        </div>
    </section>

    <!-- 연락처 섹션 -->
    <section class="contact" id="contact">
        <div class="contact-container">
            <div class="contact-info">
                <h2 class="section-title">Let's Connect</h2>
                <p class="section-subtitle">함께 성장할 수 있는 기회를 기다리고 있습니다. <br/> 언제든 편하게 연락해주세요!</p>
                <div class="contact-links">
<!--                     <a href="mailto:hello@example.com" class="contact-link"> -->
                        <span>📧</span>
                        <span>wjdgjs1230100@naver.com</span>
<!--                     </a> -->
<!--                     <a href="tel:+1234567890" class="contact-link"> -->
                        <span>📱</span>
                        <span>+82 10-4424-8742</span>
<!--                     </a> -->
                        <a href="https://github.com/JeongHeon2" class="contact-link" target="_blank">
                          <span>📫</span>
                          <span>github.com/JeongHeon2</span>
                        </a>

                </div>
            </div>
            <form class="contact-form" id="contactForm">
                <div class="form-group">
                    <label class="form-label">Name</label>
                    <input type="text" name="name" class="form-input" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Email</label>
                    <input type="email" name="email" class="form-input" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Message</label>
                    <textarea name="message" class="form-textarea" required></textarea>
                </div>
                <button type="submit" class="cta-button cta-primary">Send Message</button>
                <div class="form-message"></div>
            </form>

            <!-- 메시지 목록 섹션 -->
            <div class="messages-section">
                <h3 class="messages-title">Recent Messages</h3>
                <div class="messages-list">
                    <!-- 메시지들이 여기에 추가됩니다 -->
                </div>
            </div>

            <style>
                .messages-section {
                    margin-top: 40px;
                    padding-top: 40px;
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                }

                .messages-title {
                    font-size: 1.5rem;
                    margin-bottom: 20px;
                    color: var(--accent-1);
                }

                .messages-list {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                }

                .message-item {
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 10px;
                    padding: 15px;
                    animation: slideIn 0.5s ease forwards;
                    opacity: 0;
                    transform: translateY(20px);
                }

                @keyframes slideIn {
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .message-info {
                    font-size: 0.9rem;
                    color: var(--accent-1);
                    margin-bottom: 5px;
                }

                .message-text {
                    color: rgba(255, 255, 255, 0.7);
                    font-size: 0.95rem;
                }
            </style>

            <script>
                const messagesList = document.querySelector('.messages-list');

                function addMessageToList(name, content) {
                    const messageElement = document.createElement('div');
                    messageElement.className = 'message-item';
                    messageElement.innerHTML = `
                        <div class="message-info">${name}님이 메시지를 남겼습니다.</div>
                        <div class="message-text">${content}</div>
                    `;
                    messagesList.insertBefore(messageElement, messagesList.firstChild);
                }
                   
                    // EmailJS 초기화 (Public Key로)
    emailjs.init("Ziusa7tgqTPgis4Lk"); // ← 여기에 본인 Public Key

document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const formMessage = document.querySelector('.form-message');

    emailjs.sendForm('service_k9yoy7u', 'template_va2ho6n', this)
        .then(() => {
            formMessage.textContent = '메일이 성공적으로 전송되었습니다!';
            formMessage.style.color = '#00ff00';
            this.reset();
        }, (error) => {
            formMessage.textContent = '전송 실패: ' + error.text;
            formMessage.style.color = '#ff0000';
        });

        setTimeout(() => {
  formMessage.textContent = '';
}, 5000);
});

            </script>
        </div>
    </section>

    <script>
        // GSAP 및 ScrollTrigger 초기화
        gsap.registerPlugin(ScrollTrigger);

        // 로딩 애니메이션
        window.addEventListener('load', () => {
            gsap.to('.loader-text', {
                opacity: 1,
                duration: 1,
                delay: 0.5
            });

            gsap.to('.loader', {
                opacity: 0,
                duration: 1,
                delay: 2,
                onComplete: () => {
                    document.querySelector('.loader').style.display = 'none';
                    initAnimation();
                }
            });
        });

        // 메인 애니메이션 초기화
        function initAnimation() {
            // 히어로 섹션 애니메이션
            gsap.to('.hero-title span', {
                opacity: 1,
                y: 0,
                duration: 1,
                stagger: 0.2
            });

            gsap.to('.hero-description', {
                opacity: 1,
                duration: 1,
                delay: 0.5
            });

            gsap.to('.cta-container', {
                opacity: 1,
                duration: 1,
                delay: 0.7
            });

            // 프로젝트 카드 애니메이션
            gsap.to('.section-header', {
                scrollTrigger: {
                    trigger: '.section-header',
                    start: 'top 80%'
                },
                opacity: 1,
                duration: 1
            });

            gsap.to('.project-card', {
                scrollTrigger: {
                    trigger: '.projects-grid',
                    start: 'top 80%'
                },
                opacity: 1,
                y: 0,
                duration: 1,
                stagger: 0.2
            });

            // 스킬 카테고리 애니메이션
            gsap.to('.skill-category', {
                scrollTrigger: {
                    trigger: '.skills-container',
                    start: 'top 80%'
                },
                opacity: 1,
                y: 0,
                duration: 1,
                stagger: 0.2
            });

            // 스킬 프로그레스 바 애니메이션
            document.querySelectorAll('.skill-progress-bar').forEach(bar => {
                gsap.to(bar, {
                    scrollTrigger: {
                        trigger: bar,
                        start: 'top 80%'
                    },
                    scaleX: bar.style.transform.replace('scaleX(', '').replace(')', ''),
                    duration: 1.5,
                    ease: 'power4.out'
                });
            });

            // 컨택트 섹션 애니메이션
            gsap.to('.contact-info', {
                scrollTrigger: {
                    trigger: '.contact',
                    start: 'top 80%'
                },
                opacity: 1,
                duration: 1
            });

            gsap.to('.contact-form', {
                scrollTrigger: {
                    trigger: '.contact',
                    start: 'top 80%'
                },
                opacity: 1,
                x: 0,
                duration: 1
            });
        }

        // 커스텀 커서
        const cursor = document.querySelector('.cursor');
        const cursorFollower = document.querySelector('.cursor-follower');

        document.addEventListener('mousemove', e => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1
            });

            gsap.to(cursorFollower, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.3
            });
        });

        // 3D 배경
        // const scene = new THREE.Scene();
        // const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        // const renderer = new THREE.WebGLRenderer({
        //     canvas: document.querySelector('#background-canvas'),
        //     alpha: true
        // });

        // renderer.setSize(window.innerWidth, window.innerHeight);
        // renderer.setPixelRatio(window.devicePixelRatio);

        // // 파티클 시스템 생성
        // const particlesGeometry = new THREE.BufferGeometry();
        // const particlesCount = 5000;
        // const posArray = new Float32Array(particlesCount * 3);

        // for (let i = 0; i < particlesCount * 3; i++) {
        //     posArray[i] = (Math.random() - 0.5) * 5;
        // }

        // particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

        // const particlesMaterial = new THREE.PointsMaterial({
        //     size: 0.005,
        //     color: 0xFF006E
        // });

        // const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        // scene.add(particlesMesh);

        // camera.position.z = 3;

        // // 애니메이션 루프
        // function animate() {
        //     requestAnimationFrame(animate);
        //     particlesMesh.rotation.x += 0.0001;
        //     particlesMesh.rotation.y += 0.0001;
        //     renderer.render(scene, camera);
        // }

        // animate();
        const canvas = document.getElementById("starCanvas");
const ctx = canvas.getContext("2d");

let stars = [];
const numStars = 500;
let w, h;
const speed = 3;

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

class Star {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = (Math.random() - 0.5) * w;
    this.y = (Math.random() - 0.5) * h;
    this.z = Math.random() * w;
  }

  update(delta) {
    this.z -= speed * delta * 20; // ← 더 느리게 하고 싶으면 20을 줄이기
    if (this.z < 1) this.reset();
  }

  draw() {
    const sx = this.x / this.z * w + w / 2;
    const sy = this.y / this.z * h + h / 2;
    const r = (1 - this.z / w) * 2.5;

    if (sx < 0 || sx > w || sy < 0 || sy > h) {
      this.reset();
      return;
    }

    ctx.beginPath();
    ctx.arc(sx, sy, r, 0, Math.PI * 2);
    const hue = Math.random() * 360;
    ctx.fillStyle = `hsla(${hue}, 100%, 70%, 0.8)`;
    ctx.fill();
  }
}

function createStars() {
  stars = [];
  for (let i = 0; i < numStars; i++) {
    stars.push(new Star());
  }
}

let lastTime = performance.now();

function animate() {
  const now = performance.now();
  const delta = (now - lastTime) / 1000;
  lastTime = now;

  ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
  ctx.fillRect(0, 0, w, h);

  for (const star of stars) {
    star.update(delta);
    star.draw();
  }

  requestAnimationFrame(animate);
}

createStars();
animate();

        // 반응형 처리
        window.addEventListener('resize', () => {
            // 카메라 업데이트
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            // 렌더러 크기 업데이트
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        // 네비게이션 스크롤 효과
        window.addEventListener('scroll', () => {
            const nav = document.querySelector('.nav');
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });

        // 부드러운 스크롤
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
    </script>
</body>

</html>
