exports.setEnv = () => {
  Cypress.config(
    "baseUrl",
    `https://cornerstone-light-demo.mybigcommerce.com/`
  );
};
