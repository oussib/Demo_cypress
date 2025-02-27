/// <reference types="cypress" />


//require("cypress-downloadfile/lib/downloadFileCommand")


/**
 * Retrieves an element and asserts its text content.
 * @param {string} element - Selector of the element to retrieve.
 * @param {string} text - Expected text content of the element.
 */
Cypress.Commands.add("getElementAndAssertText", (element, text)=> {
 cy.get(element).should("be.visible").and("contain.text", text )
})




/**
 * Fills the login form with provided user credentials.
 * @param {Object} userCredentials - Object containing email and password.
 */

Cypress.Commands.add("fillSignupForm", (userCredentials) => {
    cy.contains("New User Signup!").should("be.visible")

    cy.get("[data-qa=signup-name]").type(userCredentials.name)
    cy.get("[data-qa=signup-email]").type(userCredentials.email)
    cy.get("[data-qa=signup-button]").click()
})

/**
 * Fills the account information form with provided data.
 * @param {Object} userCredentials - Object containing account information.
 */


Cypress.Commands.add("fillAcountInformation", (userCredentials) => {
    cy.contains("Enter Account Information").should("be.visible")

    cy.get("#id_gender1").click()
    cy.get("[data-qa=password]").type(userCredentials.password)

    cy.get("[data-qa=days]").select(userCredentials.days)
    cy.get("[data-qa=months]").select(userCredentials.months)
    cy.get("[data-qa=years]").select(userCredentials.years)

    cy.get("#newsletter").click()
    cy.get("#optin").click()

    cy.get("[data-qa=first_name]").type(userCredentials.firstName)
    cy.get("[data-qa=last_name]").type(userCredentials.lastName)

    cy.get("[data-qa=company]").type(userCredentials.company)
    cy.get("[data-qa=address]").type(userCredentials.address)

    cy.get("[data-qa=country]").select(userCredentials.country)
    cy.get("[data-qa=state]").type(userCredentials.state)
    cy.get("[data-qa=city]").type(userCredentials.city)
    cy.get("[data-qa=zipcode]").type(userCredentials.zipcode)

    cy.get("[data-qa=mobile_number]").type(userCredentials.mobile)


    cy.get("[data-qa=create-account]").click()

})


/**
 * Signs up a user with provided user credentials.
 * @param {Object} userCredentials - Object containing user credentials.
 */


Cypress.Commands.add("signupUser", (userCredentials) => {
   cy.contains("Signup / Login").click()
   cy.fillSignupForm(userCredentials)
   cy.fillAcountInformation(userCredentials)

   cy.contains("Account Created!").should("be.visible")

   cy.get("[data-qa=continue-button]").click()

})


Cypress.Commands.add("FillLoginForm", (userCredentials) => {
   cy.get('[data-qa="login-email"]').type(userCredentials.email)
   cy.get('[data-qa="login-password"]').type(userCredentials.password)
   cy.get('[data-qa="login-button"]').click()
})


Cypress.Commands.add("FillContactusForm", (userCredentials) => {
    cy.get('[data-qa="name"]').type(userCredentials.name)
    cy.get('[data-qa="email"]').type(userCredentials.email)
    cy.get('[data-qa="subject"]').type("ceci est un test")
    cy.get('[data-qa="message"]').type("ceci est un message 09022025")
    cy.get('input[type=file]').selectFile("cypress/fixtures/testFichierPdf.pdf")
    cy.get('[data-qa="submit-button"]').click()

    cy.get('.status')
      .should('be.visible')
      .and('contain', 'Success! Your details have been submitted successfully.');

    cy.get('.btn.btn-success').click()

    cy.url().should("eq","https://automationexercise.com/")
})



/**
 * Adds a product to the cart.
 * @param {number} productNumber - Index of the product to add.
 */

Cypress.Commands.add("addProductToCard", (productNumber) => {
  cy.get(".product-image-wrapper")
    .eq(productNumber - 1)
    .trigger("mouseover")
    .within(()=> {
        cy.get(".add-to-cart").first().click()
    })
})


Cypress.Commands.add("fillupPaymentInfo", (userCredentials) => {
    cy.get('[data-qa="name-on-card"]').type(userCredentials.nameOnCard)
    cy.get('[data-qa="card-number"]').type(userCredentials.ccNumber)
    cy.get('[data-qa="cvc"]').type(userCredentials.CVC)
    cy.get('[data-qa="expiry-month"]').type(userCredentials.expirationMonth)
    cy.get('[data-qa="expiry-year"]').type(userCredentials.expirationYear)

    cy.get('[data-qa="pay-button"]').click()

})






/**
 * Registers a user by making an API request.
 * @param {Object} userCredentials - Object containing user credentials.
 * @returns {Object} - Object containing response from the API.
 */

Cypress.Commands.add("registerUserWithAPI", (userCredentials) => {
    return cy.request({
        method: "POST",
        url: "https://automationexercise.com/api/createAccount",
        failOnStatusCode: false,
        form: true,
        body: {
            name: userCredentials.name,
            email: userCredentials.email,
            password: userCredentials.password,

            birth_date: userCredentials.days,
            birth_month: userCredentials.months,
            birth_year: userCredentials.years,

            firstname: userCredentials.firstName,
            lastname: userCredentials.lastName,

            company: userCredentials.company,
            address1: userCredentials.address,

            country: userCredentials.country,
            state: userCredentials.state,
            city: userCredentials.city,
            zipcode: userCredentials.zipcode,

            mobile_number: userCredentials.mobile,
        },
    })
})




/**
 * Deletes a user account by making an API request.
 * @param {Object} userCredentials - Object containing user credentials.
 * @returns {Object} - Object containing response from the API.
 */

Cypress.Commands.add("deleteUserWithAPI", (userCredentials) => {
    const { email, password } = userCredentials
    return cy.request({
        method: "DELETE",
        url: `https://automationexercise.com/api/deleteAccount`,
        failOnStatusCode: false,
        form: true,
        body: {
            email,
            password,
        },
    })
})
