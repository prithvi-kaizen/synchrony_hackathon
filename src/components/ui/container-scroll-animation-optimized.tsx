'use client';
import React, { useRef, useMemo } from 'react';
import { useScroll, useTransform, motion, MotionValue } from 'framer-motion';

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end start"]
  });

  // Memoize transforms to prevent recalculation
  const rotate = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [8, 4, 1, 0], {
    clamp: true
  });
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.96, 0.98, 0.99, 1], {
    clamp: true
  });
  const translateY = useTransform(scrollYProgress, [0, 0.5, 1], [40, 0, -20], {
    clamp: true
  });

  return (
    <div
      className="relative flex min-h-[50vh] items-center justify-center p-2 md:p-4"
      ref={containerRef}
      style={{ position: 'relative' }}
    >
      <div className="relative w-full py-2">
        <Header translate={translateY} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translateY} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

const Header = React.memo(({ translate, titleComponent }: {
  translate: MotionValue<number>;
  titleComponent: string | React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="mx-auto max-w-5xl text-center"
    >
      {titleComponent}
    </motion.div>
  );
});

Header.displayName = 'Header';

const Card = React.memo(({
  rotate,
  scale,
  translate,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
}) => {
  // Use CSS custom properties for the box shadow to avoid repaints
  const boxShadowStyle = useMemo(() => ({
    '--shadow-1': '0 0 0 1px rgba(0, 0, 0, 0.02)',
    '--shadow-2': '0 9px 20px rgba(0, 0, 0, 0.08)',
    '--shadow-3': '0 37px 37px rgba(0, 0, 0, 0.04)',
    boxShadow: 'var(--shadow-1), var(--shadow-2), var(--shadow-3)',
  } as React.CSSProperties), []);

  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        translateY: translate,
        aspectRatio: '16/9',
        ...boxShadowStyle,

      }}
      className="mx-auto mt-2 w-full max-w-xl rounded-[30px] border-4 border-[#6C6C6C] bg-[#222222] shadow-brand-red md:max-w-2xl will-change-transform"
    >
      <div className="h-full w-full overflow-hidden rounded-[28px] bg-black">
        {children}
      </div>
    </motion.div>
  );
});

Card.displayName = 'Card';