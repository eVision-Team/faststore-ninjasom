import React from "react";
import { Link } from "@faststore/ui";
import { Icon } from "@faststore/ui";

import styles from "../../../../sass/customBreadcrumb/styles.module.scss";

interface BreadcrumbItem {
  item: string;
  name: string;
  position: number;
}

interface BreadcrumbProps {
  breadcrumbList: BreadcrumbItem[];
  icon?: string;
}

const CustomBreadcrumb = ({ breadcrumbList, icon }: BreadcrumbProps) => {
  if (!breadcrumbList || breadcrumbList.length === 0) return null;

  const lastIndex = breadcrumbList.length - 1;

  return (
    <nav aria-label="breadcrumb" className={styles.breadcrumbContainer}>
      <ul className={styles.breadcrumbList}>
        {icon && (
          <li className={styles.breadcrumbIcon}>
            <Link href="/">
              <Icon name={icon} />
            </Link>

            <span className={styles.breadcrumbSeparator}> | </span>
          </li>
        )}

        {breadcrumbList.map((crumb, index) => (
          <li key={crumb.position} className={styles.breadcrumbItem}>
            {index !== lastIndex ? (
              <Link href={crumb.item}>{crumb.name}</Link>
            ) : (
              <span className={styles.breadcrumbCurrent}>{crumb.name}</span>
            )}

            {index !== lastIndex && (
              <span className={styles.breadcrumbSeparator}> | </span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default CustomBreadcrumb;
