// import { useState } from "react";
// import iconNewsletter from "./icons/newsletter.png";
// import styles from "../../../../sass/customFooter/styles.module.scss";
// import { Link } from "@faststore/ui";

// function Newsletter() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [messageSubmit, setMessageSubmit] = useState(false);
//   const [showFormNewsletter, setShowFormNewsletter] = useState(true);

//   const handleFormSubmit = (e: any) => {
//     e.preventDefault();

//     const apiData = { name, email };

//     fetch("https://ninjasomfaststore.vtexcommercestable.com.br/api/dataentities/NL/documents", {
//       method: "POST",
//       headers: {
//         "content-type": "application/json",
//       },

//       body: JSON.stringify(apiData),
//     }).then((res) => {
//       if (res.status === 201) {
//         setShowFormNewsletter(false);
//         setMessageSubmit(true);

//         setTimeout(() => {
//           setMessageSubmit(false);
//           setShowFormNewsletter(true);
//         }, 2000);
//       }
//     });

//     setName("");
//     setEmail("");
//   };

//   return (
//     <section className={styles.formNewsletter}>
//       {messageSubmit && (
//         <p className={styles.messageSucess}>Cadastro enviado com sucesso.</p>
//       )}
//       {showFormNewsletter && (
//         <div className={styles.containerFormNewsletter}>
//           <div className={styles.containerTitleNewsletter}>
//             <h2>
//               <Image src={NewsletterIcon} alt="Newsletter" /> Newsletter
//             </h2>
//             <p>Cadastre-se e receba ofertas exclusivas:</p>
//           </div>
//           <form
//             className={styles.containerBlockForm}
//             onSubmit={(e) => handleFormSubmit(e)}
//           >
//             <input
//               type="text"
//               name="name"
//               value={name}
//               placeholder="Nome"
//               className={styles.inputName}
//               required
//               onChange={(e) => setName(e.target.value)}
//             />
//             <div className={styles.wrapperInput}>
//               <input
//                 type="email"
//                 name="email"
//                 value={email}
//                 placeholder="E-mail"
//                 className={styles.inputNewsletter}
//                 required
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>

//             <p className={styles.privacyText}>
//               Ao assinar nossa newsletter, você concorda com nossa{" "}
//               <Link href="/politica-de-privacidade">
//                 Política de Privacidade
//               </Link>
//             </p>

//             <div className={styles.submitContainer}>
//               <button type="submit" className={styles.btnNewsletterForm}>
//                 Inscreva-se
//               </button>
//             </div>
//           </form>
//         </div>
//       )}
//     </section>
//   );
// }

// export default Newsletter;
import styles from "../../../../sass/customFooter/styles.module.scss";

declare global {
  interface Window {
    RDStationForms: any;
  }
}

import { useEffect } from "react";

const RDStationForm = () => {
  useEffect(() => {
    // Evita carregar o script mais de uma vez
    if (window.RDStationForms) {
      new window.RDStationForms(
        "ofertasenovidades_form_vertical-11a6161cffc4e5f53af5",
        "UA-30611771-1"
      ).createForm();
      return;
    }

    const script = document.createElement("script");
    script.src =
      "https://d335luupugsy2.cloudfront.net/js/rdstation-forms/stable/rdstation-forms.min.js";
    script.async = true;

    script.onload = () => {
      new window.RDStationForms(
        "ofertasenovidades_form_vertical-11a6161cffc4e5f53af5",
        "UA-30611771-1"
      ).createForm();
    };

    document.body.appendChild(script);
  }, []);

  return (
    <div className={styles.newsletterContainer}>
      <h4>
        Novidades e Ofertas Ninja
      </h4>
      <div
        role="main"
        id="ofertasenovidades_form_vertical-11a6161cffc4e5f53af5"
      />
    </div>
  );
};

export default RDStationForm;
