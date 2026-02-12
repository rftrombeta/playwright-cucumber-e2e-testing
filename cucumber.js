/**
 * Cucumber configuration
 */
module.exports = {
  default: {
    require: [
      'support/**/*.ts',                     // ← Hooks e contexto
      'features/step_definitions/**/*.ts'    // ← Steps
    ],
    requireModule: ['ts-node/register'],
    format: [
      'progress',
      'html:cucumber-report.html',
      'json:cucumber-report.json'
    ],
    formatOptions: { snippetInterface: 'async-await' },
    publishQuiet: true
  }
};
