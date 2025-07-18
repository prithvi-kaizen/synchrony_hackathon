'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface VerticalLine {
  x: number;
  opacity: number;
  pulsePhase: number;
}

interface MovingDot {
  id: number;
  lineIndex: number;
  y: number;
  speed: number;
  size: number;
  pulsePhase: number;
  glow: number;
}

interface NetworkNode {
  id: number;
  x: number;
  y: number;
  radius: number;
  pulsePhase: number;
  connections: number[];
  type: 'input' | 'process' | 'output' | 'decision';
  label: string;
}

interface Connection {
  source: number;
  target: number;
  strength: number;
  dataFlow: number; // 0-1 representing data flowing through connection
}

const NodeNetworkBackground = React.memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const verticalLinesRef = useRef<VerticalLine[]>([]);
  const movingDotsRef = useRef<MovingDot[]>([]);
  const networkNodesRef = useRef<NetworkNode[]>([]);
  const connectionsRef = useRef<Connection[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });

  // Initialize vertical lines, moving dots, and network nodes
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Create vertical lines
    const lineCount = Math.floor(window.innerWidth / 120); // One line every 120px
    const lines: VerticalLine[] = [];

    for (let i = 0; i < lineCount; i++) {
      lines.push({
        x: (window.innerWidth / lineCount) * i + window.innerWidth / lineCount / 2,
        opacity: Math.random() * 0.3 + 0.1,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }
    verticalLinesRef.current = lines;

    // Create moving dots on lines
    const dotCount = Math.floor(lineCount * 1.5); // 1-2 dots per line on average
    const dots: MovingDot[] = [];

    for (let i = 0; i < dotCount; i++) {
      const lineIndex = Math.floor(Math.random() * lineCount);
      dots.push({
        id: i,
        lineIndex,
        y: Math.random() * window.innerHeight,
        speed: Math.random() * 0.5 + 0.2,
        size: Math.random() * 2 + 1,
        pulsePhase: Math.random() * Math.PI * 2,
        glow: Math.random() * 0.5 + 0.3,
      });
    }
    movingDotsRef.current = dots;

    // Create network nodes (workflow representation)
    const networkNodes: NetworkNode[] = [
      // Input nodes
      {
        id: 0,
        x: window.innerWidth * 0.15,
        y: window.innerHeight * 0.6,
        radius: 8,
        pulsePhase: 0,
        connections: [1],
        type: 'input',
        label: 'Trigger',
      },
      {
        id: 1,
        x: window.innerWidth * 0.35,
        y: window.innerHeight * 0.55,
        radius: 10,
        pulsePhase: Math.PI * 0.3,
        connections: [2, 3],
        type: 'process',
        label: 'Process',
      },

      // Processing nodes
      {
        id: 2,
        x: window.innerWidth * 0.55,
        y: window.innerHeight * 0.5,
        radius: 9,
        pulsePhase: Math.PI * 0.6,
        connections: [4],
        type: 'decision',
        label: 'AI Logic',
      },
      {
        id: 3,
        x: window.innerWidth * 0.55,
        y: window.innerHeight * 0.65,
        radius: 8,
        pulsePhase: Math.PI * 0.9,
        connections: [4],
        type: 'process',
        label: 'Transform',
      },

      // Output nodes
      {
        id: 4,
        x: window.innerWidth * 0.75,
        y: window.innerHeight * 0.58,
        radius: 9,
        pulsePhase: Math.PI * 1.2,
        connections: [5],
        type: 'process',
        label: 'Orchestrate',
      },
      {
        id: 5,
        x: window.innerWidth * 0.85,
        y: window.innerHeight * 0.62,
        radius: 7,
        pulsePhase: Math.PI * 1.5,
        connections: [],
        type: 'output',
        label: 'Execute',
      },
    ];

    // Additional scattered nodes for complexity
    const additionalNodeCount = 3;
    for (let i = 6; i < 6 + additionalNodeCount; i++) {
      networkNodes.push({
        id: i,
        x: Math.random() * window.innerWidth * 0.6 + window.innerWidth * 0.2,
        y: Math.random() * window.innerHeight * 0.3 + window.innerHeight * 0.5,
        radius: Math.random() * 4 + 4,
        pulsePhase: Math.random() * Math.PI * 2,
        connections: [],
        type: Math.random() > 0.5 ? 'process' : 'decision',
        label: '',
      });
    }

    networkNodesRef.current = networkNodes;

    // Create connections between network nodes
    const connections: Connection[] = [];

    // Predefined workflow connections
    const workflowConnections = [
      { source: 0, target: 1, strength: 1, dataFlow: 0 },
      { source: 1, target: 2, strength: 0.9, dataFlow: 0 },
      { source: 1, target: 3, strength: 0.8, dataFlow: 0 },
      { source: 2, target: 4, strength: 0.9, dataFlow: 0 },
      { source: 3, target: 4, strength: 0.8, dataFlow: 0 },
      { source: 4, target: 5, strength: 1, dataFlow: 0 },
    ];

    connections.push(...workflowConnections);

    // Add some random connections between additional nodes
    for (let i = 6; i < networkNodes.length; i++) {
      if (Math.random() > 0.7) {
        const targetId = Math.floor(Math.random() * 6); // Connect to main workflow
        connections.push({
          source: i,
          target: targetId,
          strength: Math.random() * 0.4 + 0.2,
          dataFlow: 0,
        });
      }
    }

    connectionsRef.current = connections;

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    let time = 0;
    let lastFrameTime = 0;
    const targetFPS = 30;
    const frameInterval = 1000 / targetFPS;

    const animate = (currentTime: number) => {
      // Throttle to 30fps
      if (currentTime - lastFrameTime < frameInterval) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }
      lastFrameTime = currentTime;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw vertical lines
      verticalLinesRef.current.forEach((line) => {
        const pulse = Math.sin(time * 0.001 + line.pulsePhase) * 0.3 + 0.7;
        const opacity = line.opacity * pulse;

        ctx.beginPath();
        ctx.moveTo(line.x, 0);
        ctx.lineTo(line.x, canvas.height);
        ctx.strokeStyle = `rgba(156, 163, 175, ${opacity * 0.4})`; // Subtle gray lines
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Update and draw moving dots on lines
      movingDotsRef.current.forEach((dot) => {
        // Move dot along the line
        dot.y += dot.speed;

        // Reset dot to top when it reaches bottom
        if (dot.y > canvas.height + 20) {
          dot.y = -20;
        }

        // Get line position
        const line = verticalLinesRef.current[dot.lineIndex];
        if (!line) return;

        // Pulsing effect
        const pulse = Math.sin(time * 0.003 + dot.pulsePhase) * 0.5 + 0.5;
        const glowSize = dot.size + pulse * 2;

        // Draw glow
        const gradient = ctx.createRadialGradient(line.x, dot.y, 0, line.x, dot.y, glowSize * 3);
        gradient.addColorStop(0, `rgba(224, 57, 47, ${dot.glow * 0.8})`);
        gradient.addColorStop(0.5, `rgba(224, 57, 47, ${dot.glow * 0.3})`);
        gradient.addColorStop(1, 'rgba(224, 57, 47, 0)');

        ctx.beginPath();
        ctx.arc(line.x, dot.y, glowSize * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw dot core
        ctx.beginPath();
        ctx.arc(line.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(224, 57, 47, ${0.9 + pulse * 0.1})`;
        ctx.fill();
      });

      // Update data flow in connections
      connectionsRef.current.forEach((connection) => {
        connection.dataFlow += 0.008;
        if (connection.dataFlow > 1) connection.dataFlow = 0;
      });

      // Draw network connections with data flow
      connectionsRef.current.forEach((connection) => {
        const source = networkNodesRef.current[connection.source];
        const target = networkNodesRef.current[connection.target];

        if (!source || !target) return;

        // Draw connection line
        ctx.beginPath();
        ctx.moveTo(source.x, source.y);
        ctx.lineTo(target.x, target.y);

        const opacity = connection.strength * 0.4;
        ctx.strokeStyle = `rgba(218, 50, 41, ${opacity})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw data flow particle
        const flowX = source.x + (target.x - source.x) * connection.dataFlow;
        const flowY = source.y + (target.y - source.y) * connection.dataFlow;

        ctx.beginPath();
        ctx.arc(flowX, flowY, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 2})`;
        ctx.fill();

        // Glow for data particle
        const flowGradient = ctx.createRadialGradient(flowX, flowY, 0, flowX, flowY, 8);
        flowGradient.addColorStop(0, `rgba(224, 57, 47, ${opacity})`);
        flowGradient.addColorStop(1, 'rgba(224, 57, 47, 0)');

        ctx.beginPath();
        ctx.arc(flowX, flowY, 8, 0, Math.PI * 2);
        ctx.fillStyle = flowGradient;
        ctx.fill();
      });

      // Draw network nodes
      networkNodesRef.current.forEach((node) => {
        // Pulsing effect
        const pulse = Math.sin(time * 0.003 + node.pulsePhase) * 0.3 + 0.7;
        const glowRadius = node.radius + pulse * 4;

        // Node type colors
        let nodeColor = 'rgba(218, 50, 41, 1)'; // Default process color
        let glowColor = 'rgba(218, 50, 41, 0.6)';

        switch (node.type) {
          case 'input':
            nodeColor = 'rgba(34, 197, 94, 1)'; // Green for inputs
            glowColor = 'rgba(34, 197, 94, 0.6)';
            break;
          case 'decision':
            nodeColor = 'rgba(59, 130, 246, 1)'; // Blue for decisions
            glowColor = 'rgba(59, 130, 246, 0.6)';
            break;
          case 'output':
            nodeColor = 'rgba(168, 85, 247, 1)'; // Purple for outputs
            glowColor = 'rgba(168, 85, 247, 0.6)';
            break;
        }

        // Draw node glow
        const gradient = ctx.createRadialGradient(
          node.x,
          node.y,
          0,
          node.x,
          node.y,
          glowRadius * 1.5
        );
        gradient.addColorStop(0, glowColor);
        gradient.addColorStop(0.5, glowColor.replace('0.6', '0.2'));
        gradient.addColorStop(1, glowColor.replace('0.6', '0'));

        ctx.beginPath();
        ctx.arc(node.x, node.y, glowRadius * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw node core
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = nodeColor;
        ctx.fill();

        // Inner highlight
        ctx.beginPath();
        ctx.arc(
          node.x - node.radius * 0.3,
          node.y - node.radius * 0.3,
          node.radius * 0.4,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = `rgba(255, 255, 255, ${0.4 + pulse * 0.2})`;
        ctx.fill();

        // Draw node labels for main workflow
        if (node.label && node.id < 6) {
          ctx.font = '10px Inter, sans-serif';
          ctx.fillStyle = 'rgba(107, 114, 128, 0.8)';
          ctx.textAlign = 'center';
          ctx.fillText(node.label, node.x, node.y + node.radius + 15);
        }
      });

      // Add mouse interaction effect
      const mouseDistance = 120;
      networkNodesRef.current.forEach((node) => {
        const dx = mouseRef.current.x - node.x;
        const dy = mouseRef.current.y - node.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouseDistance) {
          const intensity = (mouseDistance - distance) / mouseDistance;

          // Enhanced glow on hover
          const hoverGradient = ctx.createRadialGradient(
            node.x,
            node.y,
            0,
            node.x,
            node.y,
            node.radius * 3
          );
          hoverGradient.addColorStop(0, `rgba(224, 57, 47, ${intensity * 0.3})`);
          hoverGradient.addColorStop(1, 'rgba(224, 57, 47, 0)');

          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius * 3, 0, Math.PI * 2);
          ctx.fillStyle = hoverGradient;
          ctx.fill();
        }
      });

      time++;
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate(0);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [dimensions]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="absolute inset-0 z-0 overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        style={{
          filter: 'blur(0.5px)',
          opacity: 0.8,
        }}
      />
      <div className="absolute inset-0 bg-white/50 dark:bg-[#060606]/55" />
    </motion.div>
  );
});

NodeNetworkBackground.displayName = 'NodeNetworkBackground';

export default NodeNetworkBackground;
