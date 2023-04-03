import { faker } from "@faker-js/faker";
import moment from "moment";
var messages = require("./Messages");
var elements = require("./elements");
var firstName;
var productName;
export default class CornerstonePage {
  /*Step1 Searching for product*/
  searchForProduct() {
    /*Assume that Product should be Able Brewing System */
    productName = "Able Brewing System";
    cy.get(elements.searchButton).click();
    cy.get(elements.searchField).type("Able Brewing System");
    cy.xpath(elements.Product.replace("product", productName)).click();
  }
  /*Step2 Adding product to cart */

  addProductTocart() {
    //verify that request is sent from backend side
    cy.intercept("POST", `${Cypress.config("baseUrl")}/remote/v1/cart/add`).as(
      "Cart"
    );
    cy.get(elements.addCartButton).click();
    cy.wait("@Cart").then((intercept) => {
      expect(intercept.response.statusCode).to.be.equal(200);
    });
    cy.get(elements.checkoutButton).click();
  }
  /*Step3 Adding user email as guest */

  addEmail() {
    //Using faker to generate user emails
    let Email = faker.internet.email();
    //verify that request is sent from backend side
    cy.intercept(
      "POST",
      `${Cypress.config(
        "baseUrl"
      )}/api/storefront/checkouts/**/billing-address?include=cart.lineItems.physicalItems.options%2Ccart.lineItems.digitalItems.options%2Ccustomer%2Cpromotions.banners`
    ).as("Email");

    cy.get(elements.emailField).type(Email);
    cy.get(elements.checkButton).click();
    cy.get(elements.guestButton).click();
    cy.wait("@Email").then((intercept) => {
      expect(intercept.response.statusCode).to.be.equal(200);
      expect(intercept.response.body.cart.email).to.be.equal(Email);
    });
    //verify that email displayed on UI
    cy.get(elements.emailtext).then(($el) => {
      expect($el.text()).include(Email);
    });
  }
  /*Step4 Adding Shipping details */
  addShipping() {
    // use faker to generate below data
    firstName = faker.name.firstName();
    let lastName = faker.name.lastName();
    let adress = faker.address.secondaryAddress();
    let city = faker.address.cityName();
    let postalCode = faker.address.zipCode();
    let phoneNumber = faker.phone.phoneNumber();
    //wait for page loading
    cy.wait(1000).then(() => {
      cy.get(elements.firstName).type(firstName);
      cy.get(elements.lastName).type(lastName);
      cy.get(elements.adress).type(adress);
      cy.get(elements.city).type(city);
      cy.get(elements.postalCode).type(postalCode);
      cy.get(elements.phoneNumber).type(phoneNumber);
    });
    //verify that request is sent from backend side

    cy.intercept(
      "PUT",
      `${Cypress.config(
        "baseUrl"
      )}/api/storefront/checkouts/**/billing-address/**?include=cart.lineItems.physicalItems.options%2Ccart.lineItems.digitalItems.options%2Ccustomer%2Cpromotions.banners`
    ).as("Shipping");
    cy.wait(6000).then(() => {
      cy.xpath(elements.continueButton).click({ force: true });
    });
    // verify that data is sent correctly through api
    cy.wait("@Shipping").then((intercept) => {
      expect(intercept.response.statusCode).to.be.equal(200);
      expect(intercept.response.body.billingAddress.firstName).to.be.equal(
        firstName
      );
      expect(intercept.response.body.billingAddress.lastName).to.be.equal(
        lastName
      );
      expect(intercept.response.body.billingAddress.city).to.be.equal(city);
      expect(intercept.response.body.billingAddress.postalCode).to.be.equal(
        postalCode
      );
      expect(intercept.response.body.billingAddress.phone).to.be.equal(
        phoneNumber
      );
    });
    //verify that first name displayed on UI
    cy.get(elements.firstnametext).then(($el) => {
      expect($el.text()).include(firstName);
    });
    //verify that last name displayed on UI

    cy.get(elements.lastnametext).then(($el) => {
      expect($el.text()).include(lastName);
    });
    //verify that phone displayed on UI

    cy.get(elements.phonetext).then(($el) => {
      expect($el.text()).include(phoneNumber);
    });
    //verify that address displayed on UI

    cy.get(elements.addresstext).then(($el) => {
      expect($el.text()).include(adress);
    });
  }
  /*Step5 Adding payment details */

  addPayment() {
    //use moment to genrate dates
    let expiryDate = moment().format("MM/YY");
    //wait for page loading
    cy.wait(4000).then(() => {
      cy.get(elements.nameCard).type(firstName);
      cy.get(elements.cardNumber).type(`${Cypress.config(`card`).number}`);
      cy.get(elements.ccvNumber).type(Math.floor(Math.random() * 999 + 1000));
      cy.get(elements.expiryDate).type(expiryDate);
    });
    //verify that request is sent from backend side

    cy.intercept(
      "POST",
      `${Cypress.config("baseUrl")}/internalapi/v1/checkout/order`
    ).as("Payment");

    cy.xpath(elements.placeorderButton).click({ force: true });
    cy.wait("@Payment").then((intercept) => {
      expect(intercept.response.statusCode).to.be.equal(201);
    });
  }
  /*Step6 verify that conFirmation message display to user */
  // this message not displayed all times so i think it's bug and i skipped this test case
  checkOrderConfirmation() {
    // verfiy that user name is displyed
    cy.xpath(elements.ConfirmationTitle).then(($el) => {
      expect($el.text()).to.be.equal(
        messages.Confirmation_Title.concat(firstName, "!")
      );
    });
    //verify that confirmation message is displyed
    cy.get(elements.ConfirmationMessage).then(($el) => {
      expect($el.text()).to.be.equal(messages.Confirmation_message);
    });
    //verify that product name is displayed correctly
    cy.get(elements.productName).then(($el) => {
      expect($el.text()).include(productName);
    });
  }
}
