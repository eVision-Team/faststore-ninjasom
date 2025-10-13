import React from "react";
import { Link } from "@faststore/ui";
import styles from "../../../../sass/homeDepartments/styles.module.scss";

type Props = {
  image: string;
  link: string;
  name: string;
};

const HomeDepartments = ({ departments }: { departments: Props[] }) => {
  return (
    <section className={styles.homeDepartments}>
      <h2 className="section-title">Departamentos mais vistos</h2>
      <div className={styles.homeDepartmentsList}>
        {departments.map((department, index) => (
          <Link
            href={department.link}
            key={index}
            className={styles.homeDepartmentsItem}
          >
            <img src={department.image} alt={department.name} />
            <p>{department.name}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default HomeDepartments;
