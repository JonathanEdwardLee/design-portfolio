import { useEffect, useRef, useState } from "react";
import { ReactNode } from "react";

export function LazyLoadSection({ children }: { children: ReactNode }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observedElement = ref.current; // Capture the current value of ref

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "100px" }
    );

    if (observedElement) {
      observer.observe(observedElement);
    }

    return () => {
      if (observedElement) {
        observer.unobserve(observedElement);
      }
    };
  }, []);

  return (
    <div ref={ref}>
      {isVisible ? children : <div style={{ height: "100px" }}>Loading...</div>}
    </div>
  );
}
