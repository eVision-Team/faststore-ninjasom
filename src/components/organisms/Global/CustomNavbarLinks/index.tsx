import React, { useEffect, useState } from "react";
import styles from "../../../../sass/customNavbarLinks/styles.module.scss";
import menuIcon from "./icons/compre-por-departamento-icon.png";
import Image from "next/image";
import { Link } from "@faststore/ui";
import MobileNavbarLinks from "./mobile/MobileNavbarLinks";
import menus from "./menus";
import useIsMobile from "../../../hooks/useIsMobile";
import { useRouter } from "next/router";

const CLEAN_QUERY_KEYS = ["fuzzy", "operator", "facets", "sort", "page"];

const CustomNavbarLinks = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const sanitizeUrl = () => {
      const url = new URL(window.location.href);
      const isSearchPage = url.pathname === "/s";
      const hasCategoryParam = Array.from(url.searchParams.keys()).some((key) =>
        key.startsWith("category-")
      );
      const hasCleanableParam =
        hasCategoryParam ||
        CLEAN_QUERY_KEYS.some((key) => url.searchParams.has(key));

      if (isSearchPage) {
        const q = url.searchParams.get("q");
        const cleanPath = q ? `/s?q=${encodeURIComponent(q)}` : "/s";
        if (window.location.pathname + window.location.search !== cleanPath) {
          router.replace(cleanPath, undefined, {
            shallow: true,
            scroll: false,
          });
        }
        return;
      }

      if (router.pathname === "/[...slug]" && hasCleanableParam) {
        const cleanPath = url.pathname;
        if (window.location.pathname + window.location.search !== cleanPath) {
          router.replace(cleanPath, undefined, {
            shallow: true,
            scroll: false,
          });
        }
      }
    };

    sanitizeUrl();

    const interval = window.setInterval(sanitizeUrl, 300);
    const timeout = window.setTimeout(() => {
      window.clearInterval(interval);
    }, 3000);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(timeout);
    };
  }, [router.asPath, router.isReady, router.pathname]);

  if (isMobile) {
    return <MobileNavbarLinks />;
  }

  return (
    <div className={styles.customNavbarLinks}>
      {menus.map((menu, index) => {
        const SubmenuComponent = menu.component;
        const menuClass = menu.styleKey ? styles[menu.styleKey] : "";

        return (
          <div
            key={index}
            className={`${styles.menuItem} ${menuClass}`}
            onMouseEnter={() => setActiveMenu(menu.label)}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <Link className={styles.menuLabelWrapper} href={menu.link}>
              {menu.label == "Compre por departamento" && (
                <Image src={menuIcon} alt="Compre por departamento" />
              )}
              <span>{menu.label}</span>
            </Link>

            {SubmenuComponent && activeMenu === menu.label && (
              <div>
                <SubmenuComponent />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CustomNavbarLinks;
