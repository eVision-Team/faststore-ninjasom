import React, { useEffect, useMemo, useRef, useState } from "react";
//@ts-ignore
import { useLazyQuery_unstable as useQuery } from "@faststore/core/experimental";
import { usePDP } from "@faststore/core";
import { GET_PRODUCT_REF_ID } from "./graphql/queries";

import styles from "../../../../sass/customImageGallery/styles.module.scss";

const CustomImageGallery = (props: any) => {
  const [getProductRefId, { data }] = useQuery(GET_PRODUCT_REF_ID, {});
  const context = usePDP();

  const images = props.images ?? [];
  const selectedImageIdx = props.selectedImageIdx;
  const setSelectedImageIdx = props.setSelectedImageIdx;

  // Detectar mobile
  const isMobile = typeof window !== "undefined" ? window.innerWidth <= 1023 : false;

  // =============================
  // BUSCAR VÍDEOS
  // =============================
  useEffect(() => {
    if (!context?.data?.product?.id) return;
    getProductRefId({ productId: context.data.product.id });
  }, []);

  const apiVideos = useMemo(() => {
    const list = (data as any)?.getProductRefId?.Videos;
    if (!Array.isArray(list)) return [];

    return list.map((url: string) => ({
      url,
      isVideo: true,
      isYouTube:
        url.includes("youtube") ||
        url.includes("youtu.be") ||
        url.includes("shorts"),
    }));
  }, [data]);

  const galleryItems = [
    ...images.map((img: any) => ({
      url: img.url,
      alt: img.alternateName,
      isVideo: false,
    })),
    ...apiVideos,
  ];

  const selectedItem = galleryItems[selectedImageIdx];

  // =============================
  // VIEWER + ZOOM
  // =============================
  const containerRef = useRef<HTMLDivElement>(null);
  const [isZooming, setIsZooming] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const zoomScale = 2;

  // Função única para atualizar a posição do zoom
  const updateZoomPosition = (clientX: number, clientY: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    setPosition({
      x: clientX - rect.left,
      y: clientY - rect.top,
    });
  };

  // Desktop mousemove
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!selectedItem || selectedItem.isVideo || isMobile) return;
    updateZoomPosition(e.clientX, e.clientY);
  };

  // =============================
  // TOUCH (MOBILE)
  // =============================
  const handleTouchStart = (e: React.TouchEvent) => {
    if (selectedItem?.isVideo) return;
    setIsZooming(true);

    const touch = e.touches[0];
    updateZoomPosition(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isZooming || selectedItem?.isVideo) return;

    const touch = e.touches[0];
    updateZoomPosition(touch.clientX, touch.clientY);
  };

  const handleTouchEnd = () => {
    setIsZooming(false);
  };

  // =============================
  // BLOQUEAR SCROLL NO MOBILE DURANTE O ZOOM
  // =============================
  useEffect(() => {
    if (isZooming && isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isZooming, isMobile]);

  // =============================
  // NAVEGAÇÃO ESQUERDA / DIREITA
  // =============================
  const goPrev = () => {
    setSelectedImageIdx((prev: number) =>
      prev === 0 ? galleryItems.length - 1 : prev - 1
    );
  };

  const goNext = () => {
    setSelectedImageIdx((prev: number) =>
      prev === galleryItems.length - 1 ? 0 : prev + 1
    );
  };

  // =============================
  // VIEWER
  // =============================
  const renderViewer = () => {
    if (!selectedItem) return null;

    if (selectedItem.isVideo && !selectedItem.isYouTube) {
      return <video src={selectedItem.url} controls className={styles.video} />;
    }

    if (selectedItem.isVideo && selectedItem.isYouTube) {
      const embedUrl = selectedItem.url
        .replace("watch?v=", "embed/")
        .replace("shorts/", "embed/");

      return (
        <iframe
          src={embedUrl}
          className={styles.youtube}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      );
    }

    return (
      <>
        <img
          src={selectedItem.url}
          alt={selectedItem.alt}
          className={styles.mainImage}
        />

        {!isMobile && isZooming && (
          <img
            src={selectedItem.url}
            alt={selectedItem.alt}
            className={styles.zoomImage}
            style={{
              width: `${zoomScale * 100}%`,
              transform: `translate(
                ${-(position.x * (zoomScale - 1))}px,
                ${-(position.y * (zoomScale - 1))}px
              )`,
            }}
          />
        )}

        {/** ZOOM MOBILE */}
        {isMobile && isZooming && (
          <img
            src={selectedItem.url}
            alt={selectedItem.alt}
            className={styles.zoomImage}
            style={{
              width: `${zoomScale * 100}%`,
              transform: `translate(
                ${-(position.x * (zoomScale - 1))}px,
                ${-(position.y * (zoomScale - 1))}px
              )`,
            }}
          />
        )}
      </>
    );
  };

  return (
    <div className={styles.galleryWrapper}>
      {/* THUMBNAILS */}
      <div className={styles.thumbnailList}>
        {galleryItems.map((item, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedImageIdx(idx)}
            className={`${styles.thumbButton} ${
              idx === selectedImageIdx ? styles.thumbActive : ""
            }`}
          >
            {item.isVideo ? (
              <div className={styles.videoThumb}>▶</div>
            ) : (
              <img src={item.url} alt={item.alt ?? ""} className={styles.thumb} />
            )}
          </button>
        ))}
      </div>

      {/* VIEWER COM SETAS */}
      <div
        ref={containerRef}
        className={`${styles.viewer} ${
          selectedItem?.isVideo ? styles.noZoom : ""
        }`}
        onMouseEnter={() => !selectedItem?.isVideo && !isMobile && setIsZooming(true)}
        onMouseLeave={() => !selectedItem?.isVideo && !isMobile && setIsZooming(false)}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <button className={styles.arrowLeft} onClick={goPrev}>❮</button>

        {renderViewer()}

        <button className={styles.arrowRight} onClick={goNext}>❯</button>
      </div>
    </div>
  );
};

export default CustomImageGallery;
