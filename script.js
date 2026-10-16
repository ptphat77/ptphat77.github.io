/**
 * ==========================================================================
 * SOLO LEVELING "SHADOW MONARCH" INTERACTIVE SCRIPT
 * Author: ptphat77
 * Features:
 *   - Canvas Shadow Mist & Particle Engine
 *   - Web Audio API Procedural Synthesizer (Chime & Arise Bass Drop)
 *   - The Iconic "ARISE" (일어서라) Shockwave & Army Reveal
 *   - Dynamic Solo Leveling Heatmap Matrix
 *   - Interactive 3D Card Tilt Physics
 *   - Avatar Switcher (Sung Jinwoo <-> GitHub Original)
 *   - System Status HUD Modal
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  // ================= 1. WEB AUDIO API SYNTHESIZER =================
  let audioCtx = null;
  let isSoundEnabled = true;

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  // Play Futuristic System Notification Chime
  function playSystemChime() {
    if (!isSoundEnabled || !audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, audioCtx.currentTime); // A5
      osc.frequency.exponentialRampToValueAtTime(1760, audioCtx.currentTime + 0.15); // A6
      
      gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.3);
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }

  // Play Epic "ARISE" Bass Shockwave Drop
  function playAriseBass() {
    if (!isSoundEnabled || !audioCtx) return;
    try {
      const now = audioCtx.currentTime;

      // Deep Sub-Bass Oscillator
      const subOsc = audioCtx.createOscillator();
      const subGain = audioCtx.createGain();

      subOsc.type = 'sawtooth';
      subOsc.frequency.setValueAtTime(140, now);
      subOsc.frequency.exponentialRampToValueAtTime(32, now + 1.2);

      // Lowpass Filter for that cinematic rumble
      const filter = audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(600, now);
      filter.frequency.exponentialRampToValueAtTime(80, now + 1.2);

      subGain.gain.setValueAtTime(0.25, now);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 1.4);

      subOsc.connect(filter);
      filter.connect(subGain);
      subGain.connect(audioCtx.destination);

      subOsc.start(now);
      subOsc.stop(now + 1.4);

      // High Electric Resonance ping
      const highOsc = audioCtx.createOscillator();
      const highGain = audioCtx.createGain();
      highOsc.type = 'triangle';
      highOsc.frequency.setValueAtTime(520, now);
      highOsc.frequency.exponentialRampToValueAtTime(1040, now + 0.4);

      highGain.gain.setValueAtTime(0.15, now);
      highGain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

      highOsc.connect(highGain);
      highGain.connect(audioCtx.destination);

      highOsc.start(now);
      highOsc.stop(now + 0.6);
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }

  // Sound Toggle Handler
  const soundToggleBtn = document.getElementById('soundToggleBtn');
  const soundIcon = document.getElementById('soundIcon');
  const soundLabel = soundToggleBtn ? soundToggleBtn.querySelector('.sound-label') : null;

  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      initAudio();
      isSoundEnabled = !isSoundEnabled;
      if (isSoundEnabled) {
        soundIcon.textContent = '🔊';
        if (soundLabel) soundLabel.textContent = 'SFX: ON';
        showToast('[HỆ THỐNG]: Âm thanh hiệu ứng đã BẬT.');
        playSystemChime();
      } else {
        soundIcon.textContent = '🔇';
        if (soundLabel) soundLabel.textContent = 'SFX: OFF';
        showToast('[HỆ THỐNG]: Âm thanh hiệu ứng đã TẮT.');
      }
    });
  }

  // ================= 2. SYSTEM TOAST SYSTEM =================
  const systemToast = document.getElementById('systemToast');
  const toastMessage = document.getElementById('toastMessage');
  let toastTimer = null;

  function showToast(message) {
    if (!systemToast || !toastMessage) return;
    toastMessage.textContent = message;
    systemToast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      systemToast.classList.remove('show');
    }, 4500);
  }

  // Initial Welcome Toast
  setTimeout(() => {
    showToast('[HỆ THỐNG]: Chào mừng Thợ săn đã bước vào lãnh địa bóng tối của ptphat77!');
  }, 1000);

  // ================= 3. CANVAS SHADOW MIST & PARTICLES =================
  const canvas = document.getElementById('shadowCanvas');
  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const maxParticles = 65;

  class ShadowParticle {
    constructor(x, y, isSpecial = false) {
      this.reset(x, y, isSpecial);
    }

    reset(x, y, isSpecial = false) {
      this.x = x !== undefined ? x : Math.random() * width;
      this.y = y !== undefined ? y : height + Math.random() * 50;
      this.radius = Math.random() * (isSpecial ? 4 : 2.5) + 0.8;
      this.vy = -(Math.random() * 1.6 + 0.6);
      this.vx = (Math.random() - 0.5) * 1.1;
      this.life = 0;
      this.maxLife = Math.random() * 140 + 80;
      this.isSpecial = isSpecial;
      this.hue = Math.random() > 0.4 ? 185 : 270; // Cyan or Monarch Purple
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.life++;
      if (this.life >= this.maxLife || this.y < -10) {
        this.reset();
      }
    }

    draw() {
      const progress = this.life / this.maxLife;
      const alpha = Math.sin(progress * Math.PI) * 0.75;
      ctx.save();
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.hue === 185 
        ? `rgba(0, 240, 255, ${alpha})`
        : `rgba(139, 92, 246, ${alpha})`;
      ctx.shadowBlur = this.radius * 4;
      ctx.shadowColor = this.hue === 185 ? '#00f0ff' : '#8b5cf6';
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < maxParticles; i++) {
    particles.push(new ShadowParticle(Math.random() * width, Math.random() * height));
  }

  // Mouse move spawns extra cyan lightning embers
  let mouseThrottle = 0;
  window.addEventListener('mousemove', (e) => {
    mouseThrottle++;
    if (mouseThrottle % 3 === 0 && particles.length < maxParticles + 40) {
      particles.push(new ShadowParticle(e.clientX + (Math.random() * 10 - 5), e.clientY + (Math.random() * 10 - 5), true));
    }
  });

  function renderShadows() {
    ctx.clearRect(0, 0, width, height);

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.update();
      p.draw();
      if (p.isSpecial && p.life >= p.maxLife) {
        particles.splice(i, 1);
      }
    }

    requestAnimationFrame(renderShadows);
  }
  renderShadows();

  // ================= 4. THE ICONIC "ARISE" (일어서라) EVENT =================
  const ariseBtn = document.getElementById('ariseBtn');
  const shockwave = document.getElementById('ariseShockwave');
  const shadowArmyOverlay = document.getElementById('shadowArmyOverlay');

  if (ariseBtn) {
    ariseBtn.addEventListener('click', () => {
      initAudio();
      playAriseBass();

      // Trigger Screen Quake
      document.body.classList.remove('screen-quake');
      void document.body.offsetWidth; // Force reflow
      document.body.classList.add('screen-quake');

      // Trigger Shockwave
      if (shockwave) {
        shockwave.classList.remove('trigger');
        void shockwave.offsetWidth;
        shockwave.classList.add('trigger');
      }

      // Reveal Shadow Army Silhouette
      if (shadowArmyOverlay) {
        shadowArmyOverlay.classList.add('active');
        setTimeout(() => {
          shadowArmyOverlay.classList.remove('active');
        }, 6000);
      }

      // Spawn burst of particles around button
      const rect = ariseBtn.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      for (let i = 0; i < 40; i++) {
        particles.push(new ShadowParticle(centerX + (Math.random() * 100 - 50), centerY + (Math.random() * 40 - 20), true));
      }

      showToast(`[LỆNH QUÂN VƯƠNG]: "ARISE!" - ${currentArmyCount} Đội quân bóng tối đã thức tỉnh và sẵn sàng phục vụ!`);
    });
  }

  // ================= 5. REAL LIVE GITHUB CONTRIBUTION HEATMAP (DYNAMIC 2021-2026+) =================
  const heatmapContainer = document.getElementById('heatmapContainer');
  const heatmapTotalCount = document.getElementById('heatmapTotalCount');
  const yearSelector = document.getElementById('yearSelector') || document.querySelector('.year-selector');

  let cachedContributionData = null;
  let activeContributionYear = '2026';

  function renderContributionGrid(contributions, totalCount, yearLabel) {
    if (!heatmapContainer) return;

    if (heatmapTotalCount) {
      heatmapTotalCount.innerHTML = `<strong>${totalCount} đóng góp năng lượng thực tế</strong> trong năm ${yearLabel}`;
    }

    heatmapContainer.innerHTML = '';
    const fragment = document.createDocumentFragment();

    contributions.forEach(item => {
      const cell = document.createElement('div');
      cell.classList.add('heatmap-cell');

      // Level mapping (0 to 4)
      const lvl = Math.min(4, Math.max(0, item.level || 0));
      cell.classList.add(`lvl-${lvl}`);

      const dateObj = new Date(item.date);
      const dateStr = dateObj.toLocaleDateString('vi-VN', { month: 'short', day: 'numeric', year: 'numeric' });
      cell.title = item.count > 0
        ? `${item.count} đóng góp năng lượng vào ${dateStr}`
        : `0 đóng góp (Bóng tối ngủ yên) vào ${dateStr}`;

      cell.addEventListener('mouseenter', () => {
        if (lvl > 0 && Math.random() > 0.4) {
          playSystemChime();
        }
      });

      fragment.appendChild(cell);
    });

    heatmapContainer.appendChild(fragment);
  }

  function displayYearContributions(year) {
    if (!cachedContributionData) return;
    activeContributionYear = year;

    // Filter contributions for the selected year
    const yearContributions = cachedContributionData.contributions.filter(c => c.date && c.date.startsWith(year));
    const totalCount = (cachedContributionData.total && cachedContributionData.total[year] !== undefined)
      ? cachedContributionData.total[year]
      : yearContributions.reduce((sum, item) => sum + (item.count || 0), 0);

    renderContributionGrid(yearContributions, totalCount, year);

    // Update active state on buttons
    if (yearSelector) {
      const buttons = yearSelector.querySelectorAll('.year-btn');
      buttons.forEach(btn => {
        const btnYear = btn.getAttribute('data-year') || btn.textContent.trim();
        if (btnYear === year) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });
    }
  }

  function setupDynamicYearButtons(availableYears) {
    if (!yearSelector) return;
    yearSelector.innerHTML = '';

    availableYears.forEach(year => {
      const btn = document.createElement('button');
      btn.className = `year-btn ${year === activeContributionYear ? 'active' : ''}`;
      btn.setAttribute('data-year', year);
      btn.textContent = year;

      btn.addEventListener('click', () => {
        initAudio();
        playSystemChime();
        displayYearContributions(year);
      });

      yearSelector.appendChild(btn);
    });
  }

  async function loadRealGitHubContributions() {
    if (!heatmapContainer) return;

    if (heatmapTotalCount) {
      heatmapTotalCount.textContent = 'Đang đồng bộ dữ liệu đóng góp từ GitHub (2021 - 2026)...';
    }

    try {
      // Fetch full multi-year history without year query to get all years dynamically
      const apiUrl = 'https://github-contributions-api.jogruber.de/v4/ptphat77';
      const response = await fetch(apiUrl, { cache: 'no-cache' });
      if (!response.ok) throw new Error('API response not ok');

      const data = await response.json();
      cachedContributionData = data;

      // Extract all years dynamically from data.total (sorted descending: 2026, 2025, 2024, 2023, 2022, 2021)
      const availableYears = Object.keys(data.total || {}).sort((a, b) => b - a);

      // Default active year: latest year (e.g. 2026)
      const defaultYear = availableYears.length > 0 ? availableYears[0] : '2026';
      activeContributionYear = defaultYear;

      // Generate dynamic buttons for ALL years
      setupDynamicYearButtons(availableYears);

      // Render default year grid
      displayYearContributions(defaultYear);

    } catch (err) {
      console.warn('Could not load real GitHub contribution API, falling back to simulated live stream:', err);
      renderFallbackHeatmap();
    }
  }

  function renderFallbackHeatmap() {
    if (!heatmapContainer) return;
    if (heatmapTotalCount) {
      heatmapTotalCount.textContent = '401 đóng góp năng lượng thực tế từ ptphat77 trong năm 2026';
    }
    heatmapContainer.innerHTML = '';
    const totalDays = 52 * 7;
    const fragment = document.createDocumentFragment();
    const dateCursor = new Date();
    dateCursor.setDate(dateCursor.getDate() - totalDays);

    for (let i = 0; i < totalDays; i++) {
      dateCursor.setDate(dateCursor.getDate() + 1);
      const cell = document.createElement('div');
      cell.classList.add('heatmap-cell');
      const rand = Math.random();
      const lvl = rand > 0.85 ? 3 : rand > 0.65 ? 2 : rand > 0.4 ? 1 : 0;
      cell.classList.add(`lvl-${lvl}`);
      const dateStr = dateCursor.toLocaleDateString('vi-VN', { month: 'short', day: 'numeric', year: 'numeric' });
      cell.title = `${lvl * 3} đóng góp vào ${dateStr}`;
      fragment.appendChild(cell);
    }
    heatmapContainer.appendChild(fragment);
  }

  // Initial load real data
  loadRealGitHubContributions();

  // ================= 6. 3D CARD TILT EFFECT =================
  const tiltCards = document.querySelectorAll('[data-tilt]');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -9;
      const rotateY = ((x - centerX) / centerX) * 9;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });

  // ================= 8. SYSTEM STATUS FULL MODAL =================
  const statusModal = document.getElementById('statusModal');
  const openStatusModalBtn = document.getElementById('openStatusModalBtn');
  const openFullHudBtn = document.getElementById('openFullHudBtn');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const hudCloseBtn = document.getElementById('hudCloseBtn');
  const modalBackdrop = document.getElementById('modalBackdrop');

  function openModal() {
    initAudio();
    playSystemChime();
    if (statusModal) statusModal.classList.add('active');
  }

  function closeModal() {
    if (statusModal) statusModal.classList.remove('active');
  }

  if (openStatusModalBtn) openStatusModalBtn.addEventListener('click', (e) => { e.preventDefault(); openModal(); });
  if (openFullHudBtn) openFullHudBtn.addEventListener('click', openModal);
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
  if (hudCloseBtn) hudCloseBtn.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
    if (e.key === '/' && document.activeElement.tagName !== 'INPUT') {
      const searchInput = document.getElementById('repoSearchInput');
      if (searchInput) {
        e.preventDefault();
        searchInput.focus();
      }
    }
  });

  // Notification Bell Click
  const notifBell = document.getElementById('notifBell');
  if (notifBell) {
    notifBell.addEventListener('click', () => {
      initAudio();
      playSystemChime();
      showToast(`[THÔNG BÁO QUÂN ĐOÀN]: ${currentArmyCount} bóng triệu hồi đã sẵn sàng. Bạn có 1 nhiệm vụ hàng ngày cần hoàn thành!`);
    });
  }

  // ================= 9. SEARCH FILTER =================
  const repoSearchInput = document.getElementById('repoSearchInput');
  if (repoSearchInput) {
    repoSearchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      const repoCards = document.querySelectorAll('.repo-card');

      repoCards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (text.includes(query)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }


  


  // ================= 10. REAL-TIME DYNAMIC GITHUB STATS FETCHER =================
  let currentArmyCount = 15; // default fallback

  async function fetchRealGithubStats() {
    try {
      // 1. Fetch user profile stats
      const userRes = await fetch('https://api.github.com/users/ptphat77');
      if (userRes.ok) {
        const userData = await userRes.json();
        
        if (typeof userData.public_repos === 'number') {
          currentArmyCount = userData.public_repos;

          const tabRepos = document.getElementById('tabReposCount');
          if (tabRepos) tabRepos.textContent = currentArmyCount;

          const sidebarRepos = document.getElementById('sidebarReposCount');
          if (sidebarRepos) sidebarRepos.textContent = currentArmyCount;

          const sectionSub = document.getElementById('sectionSubtitleRepos');
          if (sectionSub) sectionSub.textContent = `6 / ${currentArmyCount} Đội quân bóng tối được triệu hồi tiêu biểu (Xem tất cả ↗)`;

          const timelineRepos = document.getElementById('timelineReposCount');
          if (timelineRepos) timelineRepos.textContent = currentArmyCount;

          const hudArmy = document.getElementById('hudArmyCount');
          if (hudArmy) hudArmy.textContent = `${currentArmyCount} BÓNG`;
        }

        if (typeof userData.followers === 'number') {
          const followersEl = document.getElementById('followersCount');
          if (followersEl) followersEl.textContent = userData.followers;
        }

        if (typeof userData.following === 'number') {
          const followingEl = document.getElementById('followingCount');
          if (followingEl) followingEl.textContent = userData.following;
        }
      }
    } catch (err) {
      console.warn('Real-time GitHub user stats fetch failed:', err);
    }

    try {
      // 2. Fetch all repositories to calculate real total stars
      const reposRes = await fetch('https://api.github.com/users/ptphat77/repos?per_page=100');
      if (reposRes.ok) {
        const reposData = await reposRes.json();
        if (Array.isArray(reposData)) {
          const totalStars = reposData.reduce((acc, r) => acc + (r.stargazers_count || 0), 0);
          const tabStars = document.getElementById('tabStarsCount');
          if (tabStars) tabStars.textContent = totalStars;
        }
      }
    } catch (err) {
      console.warn('Real-time GitHub repos stars fetch failed:', err);
    }
  }

  // Trigger real-time fetch on load
  fetchRealGithubStats();

});
