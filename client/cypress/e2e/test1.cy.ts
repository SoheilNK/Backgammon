/// <reference types="cypress" />

describe('check game selection', () => {

   beforeEach(() => {
     // cy.visit("https://sosepbackgammon.ca-central-1.elasticbeanstalk.com/");
     cy.visit("http://localhost:5173/");
     //find a link which contains the text "Start the Game"
     cy.get("a").contains("Start the Game").click();
   });
  
  it('Shows the start button', () => {
    //it should navigate to the /users route
    cy.url().should("include", "/users");
    //it should have text "Welcome to SoSep Backgammon"
    cy.get("h1").contains("Welcome to SoSep Backgammon");
  })
 
   it('Should have div #offline visible when the Off Line button is highlighted', () => {
    //find button with text "Off Line", should have class "bg-green-900"
     cy.get("button").contains("Off Line")
       .then(($button) => {
         if (!$button.hasClass("bg-green-900")
          ) {
            cy.get("button").contains("Off Line").click();
          }
       });
     //button should have class "bg-green-900"
     cy.get("button").contains("Off Line").should("have.class", "bg-green-900");
     //should have div with id "offline" visible
     cy.get("#offline").should("be.visible");
   });
   
      
    it("Should have div #online visible when the On Line button is highlighted", () => {
      //Click button with text "On Line", should have class "bg-green-900"
      cy.get("button")
        .contains("On Line")
        .then(($button) => {
         if (!$button.hasClass("bg-green-900")
          ) {
            cy.get("button").contains("On Line").click();
          }
       })
        .should("have.class", "bg-green-900");
      //should have div with id "online" visible
      cy.get("#online").should("be.visible");
      //login button should be visible
      cy.get("#signin").should("be.visible");
    });
})