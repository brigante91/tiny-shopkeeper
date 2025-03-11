
import React from 'react';
import { cn } from "@/lib/utils";

type MotionProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  animation?: 
    | 'fade-in'
    | 'slide-up'
    | 'scale-in'
    | 'slide-in-right'
    | 'float';
  once?: boolean;
};

export const Motion = ({
  children,
  className,
  delay = 0,
  duration = 0.3,
  animation = 'fade-in',
  once = true,
}: MotionProps) => {
  const [isVisible, setIsVisible] = React.useState(!once);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (once) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        },
        {
          threshold: 0.1,
        }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      };
    }
  }, [once]);

  return (
    <div
      ref={ref}
      className={cn(
        className,
        once && !isVisible ? 'opacity-0' : `animate-${animation}`,
      )}
      style={{
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        animationFillMode: 'forwards',
      }}
    >
      {children}
    </div>
  );
};

export const FadeIn = (props: Omit<MotionProps, 'animation'>) => (
  <Motion {...props} animation="fade-in" />
);

export const SlideUp = (props: Omit<MotionProps, 'animation'>) => (
  <Motion {...props} animation="slide-up" />
);

export const ScaleIn = (props: Omit<MotionProps, 'animation'>) => (
  <Motion {...props} animation="scale-in" />
);

export const SlideInRight = (props: Omit<MotionProps, 'animation'>) => (
  <Motion {...props} animation="slide-in-right" />
);

export const Float = (props: Omit<MotionProps, 'animation'>) => (
  <Motion {...props} animation="float" once={false} />
);
