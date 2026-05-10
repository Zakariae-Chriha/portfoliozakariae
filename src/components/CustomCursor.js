import { useEffect, useRef } from "react";

function CustomCursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const pos     = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const rafRef  = useRef(null);

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      dot.style.left = e.clientX + "px";
      dot.style.top  = e.clientY + "px";
    };

    const onEnterLink = () => ring.classList.add("hovered");
    const onLeaveLink = () => ring.classList.remove("hovered");

    const lerp = (a, b, t) => a + (b - a) * t;

    const animate = () => {
      ringPos.current.x = lerp(ringPos.current.x, pos.current.x, 0.1);
      ringPos.current.y = lerp(ringPos.current.y, pos.current.y, 0.1);
      ring.style.left = ringPos.current.x + "px";
      ring.style.top  = ringPos.current.y + "px";
      rafRef.current = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", onMove);

    const targets = document.querySelectorAll("a, button, [data-cursor]");
    targets.forEach((el) => {
      el.addEventListener("mouseenter", onEnterLink);
      el.addEventListener("mouseleave", onLeaveLink);
    });

    animate();

    return () => {
      document.removeEventListener("mousemove", onMove);
      targets.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterLink);
        el.removeEventListener("mouseleave", onLeaveLink);
      });
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}

export default CustomCursor;
