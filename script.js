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

      showToast('[LỆNH QUÂN VƯƠNG]: "ARISE!" - 14 Đội quân bóng tối đã thức tỉnh và sẵn sàng phục vụ!');
    });
  }

  // ================= 5. REAL LIVE GITHUB CONTRIBUTION HEATMAP =================
  const heatmapContainer = document.getElementById('heatmapContainer');
  const heatmapTotalCount = document.getElementById('heatmapTotalCount');
  const yearButtons = document.querySelectorAll('.year-btn');

  async function loadRealGitHubContributions(year = 'last') {
    if (!heatmapContainer) return;

    if (heatmapTotalCount) {
      heatmapTotalCount.textContent = 'Đang đồng bộ dữ liệu thực tế từ GitHub...';
    }

    try {
      const apiUrl = `https://github-contributions-api.jogruber.de/v4/ptphat77?y=${year}`;
      const response = await fetch(apiUrl, { cache: 'no-cache' });
      if (!response.ok) throw new Error('API response not ok');

      const data = await response.json();
      const contributions = data.contributions || [];

      // Calculate total
      let totalCount = 0;
      if (year === 'last' && data.total && data.total.lastYear !== undefined) {
        totalCount = data.total.lastYear;
      } else if (data.total && data.total[year] !== undefined) {
        totalCount = data.total[year];
      } else {
        totalCount = contributions.reduce((sum, item) => sum + (item.count || 0), 0);
      }

      if (heatmapTotalCount) {
        const timeLabel = year === 'last' ? 'năm qua' : `năm ${year}`;
        heatmapTotalCount.innerHTML = `<strong>${totalCount} đóng góp năng lượng thực tế</strong> trong ${timeLabel}`;
      }

      // Clear previous cells
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

    } catch (err) {
      console.warn('Could not load real GitHub contribution API, falling back to simulated live stream:', err);
      renderFallbackHeatmap();
    }
  }

  function renderFallbackHeatmap() {
    if (!heatmapContainer) return;
    if (heatmapTotalCount) {
      heatmapTotalCount.textContent = '383 đóng góp năng lượng thực tế từ ptphat77';
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

  // Handle Year button switching
  yearButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      initAudio();
      playSystemChime();
      yearButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const selectedYear = btn.textContent.trim();
      loadRealGitHubContributions(selectedYear === '2026' ? 'last' : selectedYear);
    });
  });

  // Initial load real data
  loadRealGitHubContributions('last');

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

  // ================= 7. AVATAR SWITCHER =================
  const avatarImg = document.getElementById('avatarImg');
  const hudAvatarImg = document.getElementById('hudAvatarImg');
  const toggleAvatarBtn = document.getElementById('toggleAvatarBtn');
  let isRealAvatar = true;

  if (toggleAvatarBtn && avatarImg) {
    toggleAvatarBtn.addEventListener('click', () => {
      initAudio();
      playSystemChime();
      isRealAvatar = !isRealAvatar;

      if (isRealAvatar) {
        avatarImg.src = './assets/phat-avatar.jpg';
        if (hudAvatarImg) hudAvatarImg.src = './assets/phat-avatar.jpg';
        showToast('[HỆ THỐNG]: Đã hiển thị Avatar chính chủ của Phạm Thành Phát!');
      } else {
        avatarImg.src = './assets/sung_jinwoo_avatar.jpg';
        if (hudAvatarImg) hudAvatarImg.src = './assets/sung_jinwoo_avatar.jpg';
        showToast('[HỆ THỐNG]: Đã thức tỉnh hình thái Quân Vương Bóng Tối Sung Jinwoo!');
      }
    });
  }

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
      showToast('[THÔNG BÁO QUÂN ĐOÀN]: 14 bóng triệu hồi đã sẵn sàng. Bạn có 1 nhiệm vụ hàng ngày cần hoàn thành!');
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


  // ================= 10. SUNG JINWOO EYE LIGHTNING AURA ENGINE =================
  const trailCanvas = document.getElementById('trailCanvas');
  if (trailCanvas) {
    const tCtx = trailCanvas.getContext('2d');
    const tWidth = (trailCanvas.width = 440);
    const tHeight = (trailCanvas.height = 440);

    // Origin point on the upper-right rim of the circular avatar
    const originX = 292;
    const originY = 122;

    const trailSparks = [];
    let frameCount = 0;

    class TrailSpark {
      constructor(x, y, vx, vy) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.life = 0;
        this.maxLife = Math.random() * 25 + 15;
        this.size = Math.random() * 2.5 + 1;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vx += (Math.random() - 0.5) * 0.4;
        this.vy -= 0.1; // Float upward
        this.life++;
      }
      draw(ctx) {
        const progress = this.life / this.maxLife;
        const alpha = 1 - progress;
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 240, 255, ${alpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#00f0ff';
        ctx.fill();
        ctx.restore();
      }
    }

    // Generate jagged lightning path
    function drawJaggedBolt(ctx, x1, y1, x2, y2, displace, width, color) {
      if (displace < 2.5) {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.stroke();
        return;
      }
      const midX = (x1 + x2) / 2 + (Math.random() - 0.5) * displace;
      const midY = (y1 + y2) / 2 + (Math.random() - 0.5) * displace;
      drawJaggedBolt(ctx, x1, y1, midX, midY, displace / 2, width, color);
      drawJaggedBolt(ctx, midX, midY, x2, y2, displace / 2, width, color);
    }

    function renderEyeLightning() {
      tCtx.clearRect(0, 0, tWidth, tHeight);
      frameCount++;

      const time = frameCount * 0.045;

      // Primary bezier curve control points for the undulating lightning streak
      // Streams upward and to the right/top-right, curling backwards like Sung Jinwoo's aura
      const endX = originX + 75 + Math.sin(time * 0.8) * 14;
      const endY = originY - 110 + Math.cos(time * 1.1) * 12;

      const cp1x = originX + 25 + Math.cos(time * 1.3) * 18;
      const cp1y = originY - 50 + Math.sin(time * 1.5) * 16;

      const cp2x = originX + 55 + Math.sin(time * 1.2) * 20;
      const cp2y = originY - 85 + Math.cos(time * 0.9) * 16;

      // 1. Draw glowing outer energy aura ribbon
      tCtx.save();
      tCtx.beginPath();
      tCtx.moveTo(originX, originY);
      tCtx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, endX, endY);
      tCtx.strokeStyle = 'rgba(0, 240, 255, 0.25)';
      tCtx.lineWidth = 18;
      tCtx.lineCap = 'round';
      tCtx.shadowBlur = 24;
      tCtx.shadowColor = '#00f0ff';
      tCtx.stroke();

      // 2. Inner intense plasma core
      tCtx.beginPath();
      tCtx.moveTo(originX, originY);
      tCtx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, endX, endY);
      tCtx.strokeStyle = 'rgba(0, 240, 255, 0.85)';
      tCtx.lineWidth = 6;
      tCtx.shadowBlur = 12;
      tCtx.shadowColor = '#00f0ff';
      tCtx.stroke();

      // 3. Ultra-bright white core center
      tCtx.beginPath();
      tCtx.moveTo(originX, originY);
      tCtx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, endX, endY);
      tCtx.strokeStyle = '#ffffff';
      tCtx.lineWidth = 2.2;
      tCtx.stroke();
      tCtx.restore();

      // 4. Secondary energy tendril (curving slightly higher/lower)
      const tendrilEndX = originX + 90 + Math.cos(time * 1.4) * 18;
      const tendrilEndY = originY - 85 + Math.sin(time * 1.2) * 15;
      tCtx.save();
      tCtx.beginPath();
      tCtx.moveTo(originX, originY);
      tCtx.quadraticCurveTo(cp1x + 15, cp1y - 10, tendrilEndX, tendrilEndY);
      tCtx.strokeStyle = 'rgba(139, 92, 246, 0.65)';
      tCtx.lineWidth = 3.5;
      tCtx.shadowBlur = 10;
      tCtx.shadowColor = '#8b5cf6';
      tCtx.stroke();
      tCtx.restore();

      // 5. Crackling electric lightning forks (Tia sét nhánh)
      tCtx.save();
      tCtx.shadowBlur = 10;
      tCtx.shadowColor = '#00f0ff';
      if (Math.random() > 0.15) {
        const midPointT = 0.5 + (Math.random() - 0.5) * 0.3;
        // Point along bezier
        const bx = Math.pow(1 - midPointT, 3) * originX + 3 * Math.pow(1 - midPointT, 2) * midPointT * cp1x + 3 * (1 - midPointT) * Math.pow(midPointT, 2) * cp2x + Math.pow(midPointT, 3) * endX;
        const by = Math.pow(1 - midPointT, 3) * originY + 3 * Math.pow(1 - midPointT, 2) * midPointT * cp1y + 3 * (1 - midPointT) * Math.pow(midPointT, 2) * cp2y + Math.pow(midPointT, 3) * endY;
        
        const forkEndX = bx + (Math.random() * 40 - 15);
        const forkEndY = by - (Math.random() * 35 + 10);
        drawJaggedBolt(tCtx, bx, by, forkEndX, forkEndY, 14, 1.4, '#ffffff');
      }
      tCtx.restore();

      // 6. Spawn and update electric sparks along trail
      if (Math.random() > 0.35 && trailSparks.length < 35) {
        const sparkT = Math.random();
        const sx = Math.pow(1 - sparkT, 3) * originX + 3 * Math.pow(1 - sparkT, 2) * sparkT * cp1x + 3 * (1 - sparkT) * Math.pow(sparkT, 2) * cp2x + Math.pow(sparkT, 3) * endX;
        const sy = Math.pow(1 - sparkT, 3) * originY + 3 * Math.pow(1 - sparkT, 2) * sparkT * cp1y + 3 * (1 - sparkT) * Math.pow(sparkT, 2) * cp2y + Math.pow(sparkT, 3) * endY;
        const vx = (Math.random() - 0.2) * 1.8 + 0.4;
        const vy = -(Math.random() * 2.2 + 0.8);
        trailSparks.push(new TrailSpark(sx, sy, vx, vy));
      }

      for (let i = trailSparks.length - 1; i >= 0; i--) {
        const s = trailSparks[i];
        s.update();
        s.draw(tCtx);
        if (s.life >= s.maxLife) {
          trailSparks.splice(i, 1);
        }
      }

      requestAnimationFrame(renderEyeLightning);
    }

    renderEyeLightning();
  }

});
