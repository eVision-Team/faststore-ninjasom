import React from "react";
import { Link } from "@faststore/ui";
import styles from "../../../../sass/homeDepartments/styles.module.scss";
import useIsMobile from "../../../hooks/useIsMobile";
import { Carousel } from "@faststore/ui";

type Props = {
  image: string;
  link: string;
  name: string;
};

const HomeDepartments = ({ departments }: { departments: Props[] }) => {
  const isMobile = useIsMobile();

  return (
    <section className={styles.homeDepartments}>
      <h2 className="section-title">Departamentos mais vistos</h2>
      <div className={styles.homeDepartmentsList}>
        {isMobile ? (
          <Carousel
            itemsPerPage={1}
            variant="slide"
            transition={{ duration: 400, property: "transform" }}
          >
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
          </Carousel>
        ) : (
          <div>
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
        )}
      </div>
    </section>
  );
};

export default HomeDepartments;
