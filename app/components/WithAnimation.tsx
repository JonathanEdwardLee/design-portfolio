import React, { useEffect, useRef, useState } from "react";

export function withAnimation<T>(WrappedComponent: React.ComponentType<T>) {
  return function AnimatedComponent(props: T) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleScroll = () => {
        if (!ref.current) return;

        const position = ref.current.offsetTop;
        const windowHeight = window.innerHeight;
        const scrollPosition = window.scrollY;
        const scrollTrigger = position - windowHeight + 200;

        if (scrollPosition > scrollTrigger) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      };

      window.addEventListener("scroll", handleScroll);
      handleScroll();

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);

    type Props = React.ComponentProps<typeof WrappedComponent>;

    return (
      <div
        ref={ref}
        className={`transition-all duration-300 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
        }`}
      >
        <WrappedComponent {...(props as Props & JSX.IntrinsicAttributes)} />
      </div>
    );
  };
}
