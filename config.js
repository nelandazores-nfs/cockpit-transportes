/* Configuração pública da app (não contém segredos).
   CLIENT_ID: ID de cliente OAuth do tipo "Aplicação Web" criado na Google Cloud,
   com a origem JavaScript autorizada https://nelandazores-nfs.github.io */
window.COCKPIT_CONFIG = {
  CLIENT_ID: "381028772913-a0nfujhahl929n2rptreoomf6i3bff5a.apps.googleusercontent.com",
  APP_NAME: "Cockpit Transportes",
  /* Intermediário (Google Apps Script) que consulta o VIES da Comissão Europeia pelo NIF */
  NIF_API: "https://script.google.com/macros/s/AKfycbylw14BaRfORP0o-O0d1iplEn7xuxf34_bnWL-HgQwfMl0h5EYlnXn-_IHoze0u0f1dNA/exec",
  VERSAO: "2.1.0"
};
