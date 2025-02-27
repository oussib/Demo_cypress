const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
    "reporter": "mochawesome",
    "reporterOptions": {
      "reportDir": "results",       // Dossier où seront stockés les résultats
      "overwrite": false,           // Ne pas écraser les rapports précédents
      "html": false,                // Ne pas générer de fichier HTML
      "json": true                  // Générer un fichier JSON (que tu peux convertir en XML)
    }
});
