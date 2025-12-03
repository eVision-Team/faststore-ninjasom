import React, { useRef, useState } from "react";

const CustomImageGalleryViewer = (props: any) => {
  const [isZooming, setIsZooming] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const zoomScale = 2;

  const handleMouseMove = (e: React.MouseEvent) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setPosition({ x, y });
  };

  const clonedChild = React.cloneElement(props.children, {
    style: {
      ...props.children.props.style,
      width: "100%",
      height: "auto",
      display: "block",
    },
  });

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        overflow: "hidden",
        cursor: "zoom-in",
      }}
      onMouseEnter={() => setIsZooming(true)}
      onMouseLeave={() => setIsZooming(false)}
      onMouseMove={handleMouseMove}
    >
      {clonedChild}

      {isZooming && (
        <img
          src={props.children.props.src}
          alt={props.children.props.alt}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: `${zoomScale * 100}%`,
            height: "auto",
            pointerEvents: "none",
            transform: `
              translate(
                ${-(position.x * (zoomScale - 1))}px,
                ${-(position.y * (zoomScale - 1))}px
              )
            `,
          }}
        />
      )}
    </div>
  );
};

export default CustomImageGalleryViewer;
