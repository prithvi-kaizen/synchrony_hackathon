'use client';

import React, { useEffect, useRef, useState } from 'react';

interface SubtleNode {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  pulsePhase: number;
}

interface SubtleLine {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  opacity: number;
}

const SubtleNodeBackground = React.memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const nodesRef = useRef<SubtleNode[]>([]);
  const linesRef = useRef<SubtleLine[]>([]);
  const [isDark, setIsDark] = useState(false);

  // Monitor dark mode changes
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    
    checkDarkMode();
    
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      ctx.scale(dpr, dpr);
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';

      // Initialize nodes and lines
      initializeElements(rect.width, rect.height);
    };

    const initializeElements = (width: number, height: number) => {
      // Create subtle grid of nodes
      nodesRef.current = [];
      linesRef.current = [];
      
      const nodeSpacing = 120;
      const nodesX = Math.ceil(width / nodeSpacing) + 1;
      const nodesY = Math.ceil(height / nodeSpacing) + 1;
      
      // Create nodes
      for (let i = 0; i < nodesX; i++) {
        for (let j = 0; j < nodesY; j++) {
          nodesRef.current.push({
            x: i * nodeSpacing + (Math.random() - 0.5) * 20,
            y: j * nodeSpacing + (Math.random() - 0.5) * 20,
            radius: Math.random() * 2 + 1,
            opacity: Math.random() * 0.1 + 0.05,
            pulsePhase: Math.random() * Math.PI * 2
          });
        }
      }
      
      // Create subtle connecting lines
      const numLines = Math.min(20, Math.floor(width / 100));
      for (let i = 0; i < numLines; i++) {
        linesRef.current.push({
          x1: Math.random() * width,
          y1: Math.random() * height,
          x2: Math.random() * width,
          y2: Math.random() * height,
          opacity: Math.random() * 0.03 + 0.01
        });
      }
    };

    const animate = (timestamp: number) => {
      if (!ctx || !canvas) return;
      
      const rect = canvas.getBoundingClientRect();
      
      // Clear canvas
      ctx.clearRect(0, 0, rect.width, rect.height);
      
      // Draw subtle lines with dark mode support
      const lineColor = isDark ? '156, 163, 175' : '156, 163, 175';
      linesRef.current.forEach(line => {
        ctx.beginPath();
        ctx.moveTo(line.x1, line.y1);
        ctx.lineTo(line.x2, line.y2);
        ctx.strokeStyle = `rgba(${lineColor}, ${line.opacity * (isDark ? 0.8 : 1)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      });
      
      // Draw nodes with subtle pulse
      const time = timestamp * 0.001;
      nodesRef.current.forEach(node => {
        const pulse = Math.sin(time + node.pulsePhase) * 0.3 + 0.7;
        const alpha = node.opacity * pulse;
        
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(218, 50, 41, ${alpha})`;
        ctx.fill();
        
        // Subtle glow
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(224, 57, 47, ${alpha * 0.2})`;
        ctx.fill();
      });
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isDark]);

  const backgroundStyle = isDark 
    ? 'rgb(6, 6, 6)'
    : 'rgb(255, 255, 255)';

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="h-full w-full"
        style={{
          background: backgroundStyle
        }}
      />
    </div>
  );
});

SubtleNodeBackground.displayName = 'SubtleNodeBackground';

export { SubtleNodeBackground };