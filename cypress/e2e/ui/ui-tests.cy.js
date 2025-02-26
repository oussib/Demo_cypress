/// <reference types="cypress" />
   

const userCredentials = require("../../fixtures/user-credentials.json")
   const accountDataValuesToCheck = [
    userCredentials.firstName,
    userCredentials.lastName,
    userCredentials.company,
    userCredentials.address,
    userCredentials.country,
    userCredentials.state,
    userCredentials.city,
    userCredentials.zipcode,
    userCredentials.mobile,
   ]

describe("Automation Exercices", () =>{
    context("1.", () => {
        beforeEach(() => {  
        cy.deleteUserWithAPI(userCredentials)
        cy.visit("https://automationexercise.com/")          
        cy.get("body").should("be.visible")
        })

        it("Test Case 1: Register user", () => {
           cy.signupUser(userCredentials)
           cy.contains(`Logged in as ${userCredentials.name}`)
           cy.contains("Delete Account").click()
           cy.contains('[data-qa="account-deleted"]', "Account Deleted!");
        cy.get('[data-qa="continue-button"]').click()
        })
      })
    context("2.", () => {
      beforeEach(() => {
         cy.deleteUserWithAPI(userCredentials)
         cy.registerUserWithAPI(userCredentials)
         cy.visit("https://automationexercise.com/")
         cy.get("body").should("be.visible")

      })
      it("test Case 2 : Login with correct email and password", () => {
         cy.contains("Signup / Login").click()
         cy.FillLoginForm(userCredentials)

         cy.contains(`Logged in as ${userCredentials.name}`)

         cy.contains("Delete Account").click()

         cy.get('[data-qa="account-deleted"]').should('contains.text',"Account Deleted!")
         
      })
      it("Test Case 3 : Login with inccorect email and password", ()=> {
         cy.contains("Signup / Login").click()
         cy.FillLoginForm({
            email: "koko@exemple.com",
            password: "incorrectPassword",
         })
         cy.contains("Your email or password is incorrect!")
      })
      it("Test Case 4: Login out user", () => {
         cy.contains("Signup / Login").click()
         cy.FillLoginForm(userCredentials)
         cy.contains(`Logged in as ${userCredentials.name}`)
         cy.contains("Logout").click()
         cy.url().should("eq","https://automationexercise.com/login")
      })
      it("Test Case 5: Register user with existing email", () => {
         cy.contains("Signup / Login").click()
         cy.contains("New User Signup!")
         cy.fillSignupForm(userCredentials)
         cy.contains("Email Address already exist!")
      })
      

      it("Test Case 6: contact us form",()=>{
         cy.contains("Contact us").click()
         cy.contains("Get In Touch")
         cy.FillContactusForm(userCredentials)
         
      })

      it("Test Case 7: Verify test Cases page", () =>{
         cy.contains("Test Cases").click()
         cy.get("body").should("be.visible")
         cy.url().should("eq", "https://automationexercise.com/test_cases")
      })

      it("Test Case 8: Verify all products and product details", ()=>{
         cy.contains("Products").click()
         cy.get("body").should("be.visible")
         cy.url().should("eq","https://automationexercise.com/products")

         cy.get(".title").should("contain.text","All Products")

         cy.get(".product-image-wrapper")
           .first()
           .within(()=>{
            cy.contains("View Product").click()
           })
         cy.get(".product-information > h2").should("be.visible")
         cy.get(".product-information > :nth-child(1)").should("be.visible")
         cy.get(".product-information > :nth-child(2)").should("be.visible")
         cy.get(".product-information > :nth-child(3)").should("be.visible")
         cy.get(".product-information > :nth-child(4)").should("be.visible")
         cy.get(":nth-child(5) > span").should("be.visible")
         cy.get(".product-information > :nth-child(6)").should("be.visible")
         cy.get(".product-information > :nth-child(7)").should("be.visible")
         cy.get(".product-information > :nth-child(8)").should("be.visible")
      })

      it("Test Case 9: Search Product", () => {
         cy.contains("Products").click()
         cy.get("body").should("be.visible")
         cy.url().should("eq","https://automationexercise.com/products")

         cy.get("#search_product").type("Men Tshirt")
         cy.get("#submit_search").click()

         cy.get(".title").should("contain.text","Searched Products")
         cy.get(".overlay-content > :nth-child(2)").should("contain.text","Men Tshirt")
      
      })
      
      it("Test Case 10: Vérifiy subscription in home page", () => {
         cy.get("#footer").scrollIntoView()
         cy.get("#footer").within(()=> {
            cy.contains("Subscription")

            cy.get("#susbscribe_email").type(userCredentials.email)
            cy.get("#subscribe").click()


            cy.get("#success-subscribe")
              .should("be.visible")
              .and("contain.text", "You have been successfully subscribed!");
         })
      })
      it("Test Case 11: Subscription in cart page", () => {

         cy.contains("Cart").click()

         cy.get("#footer").scrollIntoView()
         cy.get("#footer").within(()=>{
            cy.contains("Subscription")

         cy.get("#susbscribe_email").type(userCredentials.email)
         cy.get("#subscribe").click()

         cy.get("#success-subscribe")
           .should("be.visible")
           .and("contain.text", "You have been successfully subscribed!")

         })
      })

      it.only("Test Case 12: Add product in cart", ()=>{
         cy.contains("Products").click()

         cy.addProductToCard(1)
         cy.contains("Continue Shopping").click()

         cy.addProductToCard(3)
         cy.contains("View Cart").click()

         cy.getElementAndAssertText("#product-1", "Blue Top")
         cy.getElementAndAssertText("#product-1", "Women > Tops")

         cy.getElementAndAssertText("#product-3", "Sleeveless Dress")
         cy.getElementAndAssertText("#product-3", "Women > Dress")
      })

      it("Case Test 13: Delete product in cart", () => {

      cy.addProductToCard(1)
      cy.contains("Continue Shopping").click()

      cy.addProductToCard(3)
      cy.contains("View Cart").click()


      cy.get('.cart_quantity_delete').should('have.length', 2);
      cy.get(".cart_quantity_delete").first().click()
      cy.get("#product-1").should("not.exist")
      cy.get("#product-3").should("exist")
      cy.get('.cart_quantity_delete').should('have.length', 1);
      })
  })
   
  context("3", ()=> {
   beforeEach(()=> {
      cy.deleteUserWithAPI(userCredentials)

      cy.visit("https://automationexercise.com/")
      cy.get("body").should("be.visible")
   })

   it("Test Case 14: place order register while checkout", () => {
      cy.contains("Products").click()

      
      cy.get(".add-to-cart").first().click()  //mon invention à verifier si elle fonction bien :) 
      cy.contains("Continue Shopping").click()
      cy.addProductToCard(4)
      cy.contains("View Cart").click()

      cy.contains("Proceed To Checkout").click()
      cy.get(".modal-body a").click()

      cy.url().should("eq", "https://automationexercise.com/login")
      cy.contains("New User Signup!").should("be.visible")
      cy.fillSignupForm(userCredentials)
      cy.fillAcountInformation(userCredentials)

      cy.contains("Account Created!").should("be.visible")
      cy.get("[data-qa=continue-button]").click()

      cy.contains("Cart").click()
      cy.contains("Proceed To Checkout").click()


      accountDataValuesToCheck.forEach((value) => {
         cy.get("#address_delivery").should("contain.text", value)

         cy.get("#address_invoice").should("contain.text", value)
     })

   })

   it("Test Case 15: Place Order: register before Checkout", ()=> {
      cy.signupUser(userCredentials)
      cy.contains(`Logged in as ${userCredentials.name}`)
      cy.contains("Products").click()
      cy.addProductToCard(2)
      cy.contains("View Cart").click()
    
      cy.url().should(
         "contain",
         "https://automationexercise.com/view_cart",
     )

     cy.contains("Proceed To Checkout").click()


      accountDataValuesToCheck.forEach((value) => {
         cy.get("#address_delivery").should("contain.text", value )
         cy.get("#address_invoice").should("contain.text", value )
      })

      cy.get(".form-control").type("ceci est mon commentaire 12022025")
      cy.contains("Place Order").click()

      cy.url().should("eq", "https://automationexercise.com/payment")

      cy.fillupPaymentInfo(userCredentials)

      cy.get(".title").should("contain.text", "Order Placed!")

      cy.contains("Congratulations! Your order has been confirmed!")
      cy.contains("Download Invoice")

      cy.contains("Delete Account").click()
      cy.getElementAndAssertText(
         '[data-qa="account-deleted"]',
         "Account Deleted!",
      )
   })
    
  })

  context("4", () => {
   beforeEach(() => {
      cy.deleteUserWithAPI(userCredentials)
      cy.registerUserWithAPI(userCredentials)
      cy.visit("https://automationexercise.com/")
      cy.get("body").should("be.visible")
  })

  it("Test Case 16 : Place Order: login before checkout", () => {
   cy.contains("Signup / Login").click()
   cy.FillLoginForm(userCredentials)
   cy.contains(`Logged in as ${userCredentials.name}`)

   cy.addProductToCard(1)

   cy.contains("Continue Shopping").click()

   cy.contains("Cart").click()

   cy.get("body").should("be.visible")

   cy.url().should(
       "contain",
       "https://automationexercise.com/view_cart",
   )

   cy.contains("Proceed To Checkout").click()

   accountDataValuesToCheck.forEach((value) => {
       cy.get("#address_delivery").should("contain.text", value)

       cy.get("#address_invoice").should("contain.text", value)
   })

   cy.get(".form-control").type("I want to buy this items!")

   cy.contains("Place Order").click()

   cy.fillupPaymentInfo(userCredentials)

   cy.contains("Congratulations! Your order has been confirmed!")

   cy.contains("Delete Account").click()

   cy.getElementAndAssertText(
       '[data-qa="account-deleted"]',
       "Account Deleted!",
   )
   
  })

  it("Test Case 17 : Remove Products From Cart",()=> {
   cy.addProductToCard(1)

   cy.contains("View Cart").click()

   cy.url().should("eq","https://automationexercise.com/view_cart")

   cy.getElementAndAssertText("#product-1", "Blue Top")
   cy.getElementAndAssertText("#product-1", "Women > Tops")
     .within(()=> {
      cy.get(".cart_quantity_delete").click()
   })

   cy.getElementAndAssertText("#empty_cart", "Cart is empty! Click here to buy products")

  })

  it("Test Case 18 : View Category Product", () => {
   cy.getElementAndAssertText(".left-sidebar","Category")

   cy.contains("Women").click()
   cy.contains("Dress").click()

   cy.getElementAndAssertText(".title", "Women - Dress Products")
   cy.getElementAndAssertText(".breadcrumbs", "Women > Dress" )

   cy.contains("Kids").click()
   cy.get("Tops & Shirts").click()

   cy.getElementAndAssertText(".title", "Kids - Tops & Shirts Products")
   cy.getElementAndAssertText(".breadcrumbs", "Kids > Tops & Shirts" )
  })

  it("Test Case 19: View & Cart Brand Products", () => {
   cy.contains("Products").click()

   cy.getElementAndAssertText(".brands_products", "Brands")
   cy.contains("Polo").click()
   cy.getElementAndAssertText(".title", "Brand - Polo Products")
   cy.contains("Biba").click()
   cy.getElementAndAssertText(".title", "Brand - Biba Products")
  })

  it("Test Case 20: Search Products and add all the products and Verify Cart After Login", () => {
    cy.contains("Products").click()

    cy.url().should("eq","https://automationexercise.com/products")
    cy.get("#search_product").type("Tshirt")
    cy.get("#submit_search").click()
    cy.getElementAndAssertText(".title","Searched Products")
    cy.get(".product-image-wrapper").should("have.length", 6)

     //Maintenant, on vas ajouter en boucle ces 6 articles 
     cy.get(".product-image-wrapper").each(($el, $index) => {
      cy.log($el)
      cy.log($index)

      cy.get($el).within(() => {
          cy.get(".add-to-cart").first().click()
      })
      cy.get("#cartModal").should("be.visible")
      cy.contains("Continue Shopping").click()
      })

    cy.contains("Cart").click()
    cy.get(".cart_product").should("have.length", 6)
    cy.getElementAndAssertText("#product-2", "Men Tshirt")
    cy.getElementAndAssertText("#product-30", "Premium Polo T-Shirts")
    cy.getElementAndAssertText("#product-28", "Pure Cotton V-Neck T-Shirt")

    cy.contains("Signup / Login").click()

    cy.FillLoginForm(userCredentials)

    cy.contains(`Logged in as ${userCredentials.name}`)

    cy.contains("Cart").click()
    cy.getElementAndAssertText("#product-2", "Men Tshirt")
    cy.getElementAndAssertText("#product-30", "Premium Polo T-Shirts")
    cy.getElementAndAssertText("#product-28", "Pure Cotton V-Neck T-Shirt")
  })

  it("Test Case 21: Add review on product", () => {
   cy.contains("Products").click()

   cy.url().should("eq", "https://automationexercise.com/products")

   cy.get(".product-image-wrapper")
     .first()
     .within(()=> {
       cy.contains("View Product").first().click()
     })
   
   cy.url().should("eq", "https://automationexercise.com/product_details/1")

   cy.getElementAndAssertText(".shop-details-tab", "Write Your Review")
   cy.get("#name").type(userCredentials.name)
   cy.get("#email").type(userCredentials.email)
   cy.get("#review").type("ceci est mon review 13022025")
   cy.get("#button-review").click()

   cy.getElementAndAssertText(".alert-success", "Thank you for your review.")
   
  })

  it("Test Case 22 : Add product prom recommended items", ()=> {
   cy.get(".recommended_items").scrollIntoView()

   cy.get(".recommended_items")
     .within(() => {
      cy.contains("Add to cart").first().click({ force: true }) //conseil de gemini, forer le click() même si l'element n'est pas visible 
     })
   cy.contains("View Cart").click()

   cy.get("#product-1").should("be.visible")
  })

 })

 context("5", ()=> {
   beforeEach(()=> {
      cy.deleteUserWithAPI(userCredentials)
      cy.visit("https://automationexercise.com/")
      cy.get("body").should("be.visible")
   })
     it("Test Case 23: Verify address details in checkout page", () => {
      cy.signupUser(userCredentials)

      cy.contains(`Logged in as ${userCredentials.name}`)

      cy.addProductToCard(1)

      cy.contains("Cart").click()

      cy.get("body").should("be.visible")

      cy.url().should(
          "contain",
          "https://automationexercise.com/view_cart",
      )

      accountDataValuesToCheck.forEach((value) => {
         cy.get("#address_delivery").should("contain.text", value)
         cy.get("#address_invoice").should("contain.text", value)

      })
                  cy.contains("Delete Account").click()

            cy.getElementAndAssertText(
                '[data-qa="account-deleted"]',
                "Account Deleted!",
            )

   })


 })

})