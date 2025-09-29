import React from "react";
import departments from "./departments";
import styles from "../../../../sass/customNavbarLinks/styles.module.scss";
import { Link } from "@faststore/ui";

const NavbarDepartments = () => {
  return (
    <div className={styles.submenuContainer}>
      <div className={styles.submenu}>
        {departments.map((department, index) => (
          <div className={styles.navbarDepartment} key={index}>
            <h4>{department.name}</h4>
            <ul>
              {department.items.map((item, itemIndex) => (
                <li key={itemIndex}>
                  <Link href={item.link} className={styles.navbarDepartmentItem}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavbarDepartments;
