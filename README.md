# E2X-AutomationTask

# Overview
I selected Cypress, especially because it supports not only UI tests but also API checks.I tried to do as much dynamic testing as I could, using faker and moment libraries to make tests not dependent on specific data.
Also, I think that the Page Object Model pattern is the best pattern in my case, so I separate between elements ,functions and Tosat messages .

https://user-images.githubusercontent.com/78497060/229527689-a75041d6-ee0f-4e9b-84fd-f2c68a005b24.mp4


## Setup

```
Install Node & npm .
```
```
Install Visual Studio Code .
```
```
Install Cypress.
```
```
Install Faker Check [here](https://www.npmjs.com/package/@faker-js/faker).
```
```
Install cypress xpath Check [here](https://www.npmjs.com/package/@cypress/xpath).
```
```
Install Moment [here](https://www.npmjs.com/package/moment).
```
```
Install all dependencies using npm install 
```

## Structure:
![image](https://user-images.githubusercontent.com/78497060/229496713-3cf288fb-a4a6-4284-b538-7d7e0783fcf2.png)
### `Pages`

###### contains elements , page functions and tosat messages classes .

### `Tests`
###### contains tests for buying new product.

## how to deal with cookies 
To deal with cookies issues i added in `Index` and after each test case we clear all cookies.
```
afterEach(() => {
    //Code to Handle the Sesssions in cypress.
    //Keep the Session alive when you jump to another test
    let str = [];
    cy.getCookies().then((cook) => {
        cy.log(cook);
        for (let l = 0; l < cook.length; l++) {
            if (cook.length > 0 && l == 0) {
                str[l] = cook[l].name;
                Cypress.Cookies.preserveOnce(str[l]);
            } else if (cook.length > 1 && l > 1) {
                str[l] = cook[l].name;
                Cypress.Cookies.preserveOnce(str[l]);
            }
        }
    })
})
```

## Notes :
###### `Faker and Moment libaries  used for creation random test data.`
###### `Cypress-Xpath used for adding strong selectors.`
###### `I found issue that confirmation messages after checkout not displaying in some times so i skiped this test cases in test file.`




<div id="badges">
  <a href="https://www.linkedin.com/in/sara-nagy-elzahry/">
    <img src="https://img.shields.io/badge/LinkedIn-blue?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn Badge"/>
  </a>
</div>
<div id="header" align="center">
  <img src="https://media.giphy.com/media/M9gbBd9nbDrOTu1Mqx/giphy.gif" width="100"/>
</div>
