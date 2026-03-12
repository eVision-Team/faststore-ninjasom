/**
 * NINJA SOM - Injetor de Header e Footer Universal
 * Finalidade: Manter a consistência visual em /account e /login
 */
(function () {
  const ninjaStoreInjetor = {
    html: {
      header: `
          <div class="header-new">
            <div class="header-content">
              <a href="https://www.ninjasom.com.br" title="Ninja Som">
                <img src="https://www.ninjasom.com.br/logo.svg" alt="Ninja Som" width="176" height="38" />
              </a>
              <div class="header-right">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
                <span>COMPRA 100% SEGURA</span>
              </div>
            </div>
          </div>`,
      footer: `
          <div class="footer-new">
            <div class="footer-content">
              <div class="footer-col">
                <span class="footer-label">Institucional</span>
                <ul>
                  <li><a href="/sobre-a-ninja-som">Sobre a Ninja Som</a></li>
                  <li><a href="/nossas-lojas">Nossas Lojas</a></li>
                  <li><a href="/trabalhe-conosco">Trabalhe Conosco</a></li>
                </ul>
              </div>
              <div class="footer-col">
                <span class="footer-label">Atendimento</span>
                <ul>
                  <li><a href="/central-de-atendimento">Central de Atendimento</a></li>
                  <li><a href="/trocas-e-devolucoes">Trocas e Devoluções</a></li>
                  <li><a href="/politica-de-privacidade">Política de Privacidade</a></li>
                </ul>
              </div>
              <div class="footer-col">
                <span class="footer-label">Formas de Pagamento</span>
                <div class="footer-payments">
                  <img src="https://vtex.vtexassets.com/assets/vtex.payment-flags-1.x/assets/bandeira_mastercard.png" alt="Mastercard" />
                  <img src="https://vtex.vtexassets.com/assets/vtex.payment-flags-1.x/assets/bandeira_visa.png" alt="Visa" />
                  <img src="https://vtex.vtexassets.com/assets/vtex.payment-flags-1.x/assets/bandeira_pix.png" alt="Pix" />
                </div>
              </div>
            </div>
          </div>`,
    },

    init: function () {
      const _this = this;

      const injectOnce = () => {
        // Injeta no topo (Header) se não existir
        if ($(".header-new").length === 0) {
          $("body").prepend(_this.html.header);
        }
        // Injeta no rodapé (Footer) se não existir
        if ($(".footer-new").length === 0) {
          $("body").append(_this.html.footer);
        }
      };

      // Executa no Load
      $(document).ready(injectOnce);

      // Mutation Observer: Essencial para My Account (SPA)
      // Garante que se a VTEX re-renderizar a página, nosso header volta
      const observer = new MutationObserver(injectOnce);
      observer.observe(document.body, { childList: true, subtree: false });
    },
  };

  // Inicializa o injetor
  ninjaStoreInjetor.init();
})();
