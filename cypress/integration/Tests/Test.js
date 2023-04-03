import CornerstonePage from "../Pages/CornerstoneDemo/CornerstonePage";
const cornerstonePage = new CornerstonePage();
describe("Tests for the complete buying process for the product.", () => {
  it("Verify that user can search for Product('Able Brewing System') and find it successfully. ", () => {
    cornerstonePage.searchForProduct();
  });
  it("Verify that user can add product to card successfully. ", () => {
    cornerstonePage.addProductTocart();
  });
  it("Verify that user can add email as guest successfully. ", () => {
    cornerstonePage.addEmail();
  });

  it("Verify that user can shipping details successfully. ", () => {
    cornerstonePage.addShipping();
  });
  it("Verify that user can add payments deatils successfully. ", () => {
    cornerstonePage.addPayment();
  });

  it.skip("Verify that user recive Order Confirmation message. ", () => {
    cornerstonePage.checkOrderConfirmation();
  });

  after("", () => {
    cy.clearCookies();
  });
});
