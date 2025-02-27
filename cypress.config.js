const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    reporter: "mochawesome",
    reporterOptions: {
      reportDir: "cypress/reports/html",       // Dossier où seront stockés les résultats
      overwrite: false,           // Ne pas écraser les rapports précédents
      html: true,                // générer de fichier HTML                               
      json: true,
      charts: true                   // Générer un fichier JSON
    }
  }
});
