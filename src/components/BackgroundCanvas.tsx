import React, { useEffect, useRef } from 'react';

interface BackgroundCanvasProps {
  effect?: 'stars' | 'aurora' | 'grid' | 'none';
}

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  glowColor: string;
  alpha: number;
  baseAlpha: number;
  twinkleSpeed: number;
  vx: number;
  vy: number;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  alpha: number;
  width: number;
  active: boolean;
}

export const BackgroundCanvas: React.FC<BackgroundCanvasProps> = ({ effect = 'stars' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (effect === 'none') return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;
    let isMouseActive = false;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
      isMouseActive = true;
    };

    const handleMouseLeave = () => {
      isMouseActive = false;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Color palette for high-visibility glowing particles
    const palette = [
      { color: '#ffffff', glow: 'rgba(255, 255, 255, 0.6)' },
      { color: '#a5b4fc', glow: 'rgba(165, 180, 252, 0.7)' },
      { color: '#5865F2', glow: 'rgba(88, 101, 242, 0.8)' },
      { color: '#38bdf8', glow: 'rgba(56, 189, 248, 0.8)' },
      { color: '#c084fc', glow: 'rgba(192, 132, 252, 0.7)' },
    ];

    // -------------------------------------------------------------
    // Effect 1: BOLD VIBRANT STARS & CONSTELLATION
    // -------------------------------------------------------------
    const particleCount = Math.min(160, Math.max(90, Math.floor((width * height) / 8000)));
    const particles: Particle[] = Array.from({ length: particleCount }, () => {
      const p = palette[Math.floor(Math.random() * palette.length)];
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.8 + 1.2, // Clearly visible 1.2px - 4px
        color: p.color,
        glowColor: p.glow,
        baseAlpha: Math.random() * 0.4 + 0.5, // 0.5 to 0.9 opacity!
        alpha: Math.random() * 0.4 + 0.5,
        twinkleSpeed: Math.random() * 0.03 + 0.015,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
      };
    });

    let shootingStars: ShootingStar[] = [];
    let shootCountdown = 80;

    const spawnShootingStar = () => {
      shootingStars.push({
        x: Math.random() * (width * 0.9),
        y: Math.random() * (height * 0.35),
        length: Math.random() * 120 + 90,
        speed: Math.random() * 16 + 14,
        angle: Math.PI / 4 + (Math.random() * 0.2 - 0.1),
        alpha: 1.0,
        width: Math.random() * 1.5 + 2.0,
        active: true,
      });
      shootCountdown = Math.floor(Math.random() * 180 + 90); // every 1.5 to 4.5 seconds
    };

    // -------------------------------------------------------------
    // Animation Loop
    // -------------------------------------------------------------
    let tick = 0;
    let gridOffset = 0;

    const render = () => {
      tick++;

      // Smooth mouse damping
      mouseX += (targetMouseX - mouseX) * 0.08;
      mouseY += (targetMouseY - mouseY) * 0.08;

      ctx.clearRect(0, 0, width, height);

      // =========================================================
      // MODE 1: STARS & GLOWING CONSTELLATION NETWORK
      // =========================================================
      if (effect === 'stars') {
        // Draw and update particles
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];

          p.x += p.vx;
          p.y += p.vy;

          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;
          if (p.y < -10) p.y = height + 10;
          if (p.y > height + 10) p.y = -10;

          // Twinkle effect
          p.alpha = p.baseAlpha + Math.sin(tick * p.twinkleSpeed) * 0.3;
          const currentAlpha = Math.max(0.2, Math.min(1.0, p.alpha));

          // Draw Glowing Halo around bigger particles
          if (p.size > 2.2) {
            const glowGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3.5);
            glowGrad.addColorStop(0, p.glowColor);
            glowGrad.addColorStop(1, 'transparent');
            ctx.fillStyle = glowGrad;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * 3.5, 0, Math.PI * 2);
            ctx.fill();
          }

          // Draw Particle core
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = currentAlpha;
          ctx.fill();
          ctx.globalAlpha = 1.0;

          // Interactive Mouse Threads
          if (isMouseActive) {
            const dx = p.x - mouseX;
            const dy = p.y - mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 180) {
              const mouseLinkAlpha = (1 - dist / 180) * 0.65; // High visibility 0.65!
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(mouseX, mouseY);
              ctx.strokeStyle = `rgba(88, 101, 242, ${mouseLinkAlpha})`;
              ctx.lineWidth = 1.4;
              ctx.stroke();
            }
          }

          // Constellation lines between nearby particles
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const distSq = (p.x - p2.x) ** 2 + (p.y - p2.y) ** 2;
            if (distSq < 11000) {
              const dist = Math.sqrt(distSq);
              const lineAlpha = (1 - dist / 105) * 0.35; // 35% visible line!
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(130, 160, 240, ${lineAlpha})`;
              ctx.lineWidth = 0.9;
              ctx.stroke();
            }
          }
        }

        // Shooting Stars
        shootCountdown--;
        if (shootCountdown <= 0) {
          spawnShootingStar();
        }

        for (let i = shootingStars.length - 1; i >= 0; i--) {
          const s = shootingStars[i];
          if (!s.active) continue;

          const tailX = s.x - Math.cos(s.angle) * s.length;
          const tailY = s.y - Math.sin(s.angle) * s.length;

          const grad = ctx.createLinearGradient(s.x, s.y, tailX, tailY);
          grad.addColorStop(0, `rgba(255, 255, 255, ${s.alpha})`);
          grad.addColorStop(0.25, `rgba(88, 101, 242, ${s.alpha * 0.8})`);
          grad.addColorStop(0.6, `rgba(56, 189, 248, ${s.alpha * 0.4})`);
          grad.addColorStop(1, 'transparent');

          ctx.beginPath();
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(tailX, tailY);
          ctx.strokeStyle = grad;
          ctx.lineWidth = s.width;
          ctx.lineCap = 'round';
          ctx.stroke();

          // Star head bright spark
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.width * 1.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha})`;
          ctx.fill();

          s.x += Math.cos(s.angle) * s.speed;
          s.y += Math.sin(s.angle) * s.speed;
          s.alpha -= 0.015;

          if (s.alpha <= 0 || s.x > width + 150 || s.y > height + 150) {
            shootingStars.splice(i, 1);
          }
        }
      }

      // =========================================================
      // MODE 2: VIBRANT COSMIC AURORA WAVES
      // =========================================================
      else if (effect === 'aurora') {
        const t = tick * 0.006;

        // Orb 1: Discord Blurple / Indigo Wave
        const x1 = width * 0.35 + Math.sin(t) * 160;
        const y1 = height * 0.25 + Math.cos(t * 0.8) * 120;
        const r1 = Math.min(width, height) * 0.55;
        const g1 = ctx.createRadialGradient(x1, y1, 20, x1, y1, r1);
        g1.addColorStop(0, 'rgba(88, 101, 242, 0.25)');
        g1.addColorStop(0.5, 'rgba(67, 56, 202, 0.12)');
        g1.addColorStop(1, 'transparent');
        ctx.fillStyle = g1;
        ctx.fillRect(0, 0, width, height);

        // Orb 2: Electric Cyan Wave
        const x2 = width * 0.75 + Math.cos(t * 0.7) * 140;
        const y2 = height * 0.5 + Math.sin(t * 0.9) * 130;
        const r2 = Math.min(width, height) * 0.5;
        const g2 = ctx.createRadialGradient(x2, y2, 20, x2, y2, r2);
        g2.addColorStop(0, 'rgba(56, 189, 248, 0.22)');
        g2.addColorStop(0.5, 'rgba(14, 116, 144, 0.09)');
        g2.addColorStop(1, 'transparent');
        ctx.fillStyle = g2;
        ctx.fillRect(0, 0, width, height);

        // Orb 3: Radiant Purple Glow
        const x3 = width * 0.45 + Math.sin(t * 0.6) * 120;
        const y3 = height * 0.8 + Math.cos(t * 0.5) * 100;
        const r3 = Math.min(width, height) * 0.6;
        const g3 = ctx.createRadialGradient(x3, y3, 20, x3, y3, r3);
        g3.addColorStop(0, 'rgba(168, 85, 247, 0.2)');
        g3.addColorStop(0.6, 'rgba(126, 34, 206, 0.08)');
        g3.addColorStop(1, 'transparent');
        ctx.fillStyle = g3;
        ctx.fillRect(0, 0, width, height);
      }

      // =========================================================
      // MODE 3: 3D CYBERNETIC PERSPECTIVE GRID
      // =========================================================
      else if (effect === 'grid') {
        gridOffset = (gridOffset + 0.8) % 40;

        const horizon = height * 0.35;
        const fov = 320;

        // Glowing Horizon Line
        const horizonGrad = ctx.createLinearGradient(0, horizon - 3, 0, horizon + 3);
        horizonGrad.addColorStop(0, 'rgba(88, 101, 242, 0)');
        horizonGrad.addColorStop(0.5, 'rgba(56, 189, 248, 0.6)');
        horizonGrad.addColorStop(1, 'rgba(88, 101, 242, 0)');
        ctx.fillStyle = horizonGrad;
        ctx.fillRect(0, horizon - 2, width, 4);

        // Perspective Horizontal Lines
        for (let z = 10; z < 800; z += 35) {
          const screenY = horizon + (fov / (z + gridOffset)) * 140;
          if (screenY > height) break;

          const lineAlpha = Math.min(0.45, (screenY - horizon) / (height - horizon) * 0.5);
          ctx.beginPath();
          ctx.moveTo(0, screenY);
          ctx.lineTo(width, screenY);
          ctx.strokeStyle = `rgba(88, 101, 242, ${lineAlpha})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }

        // Perspective Vertical Vanishing Lines
        const centerX = width / 2;
        const vanishY = horizon;

        for (let x = -width; x < width * 2; x += 60) {
          ctx.beginPath();
          ctx.moveTo(centerX, vanishY);
          ctx.lineTo(x, height);
          ctx.strokeStyle = 'rgba(56, 189, 248, 0.18)';
          ctx.lineWidth = 1.0;
          ctx.stroke();
        }

        // Mouse Spotlight
        if (isMouseActive) {
          const spot = ctx.createRadialGradient(mouseX, mouseY, 10, mouseX, mouseY, 320);
          spot.addColorStop(0, 'rgba(88, 101, 242, 0.2)');
          spot.addColorStop(0.6, 'rgba(56, 189, 248, 0.06)');
          spot.addColorStop(1, 'transparent');
          ctx.fillStyle = spot;
          ctx.fillRect(0, 0, width, height);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [effect]);

  if (effect === 'none') return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        width: '100vw',
        height: '100vh',
      }}
      aria-hidden="true"
    />
  );
};
