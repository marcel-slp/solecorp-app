import { Box } from '@chakra-ui/react';
import { ReactNode, useState, useRef, useEffect } from 'react';

type Props = {
  children: ReactNode;
  fallback?: ReactNode;
  minHeight?: number | string;
  rootMargin?: string;
};

export default function LazyRender({
  children,
  fallback = <Box height="200px" />,
  minHeight = 180,
  rootMargin = "300px 0px",
}: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} style={{ minHeight: typeof minHeight === 'number' ? `${minHeight}px` : minHeight }}>
      {isVisible ? children : fallback}
    </div>
  );
}