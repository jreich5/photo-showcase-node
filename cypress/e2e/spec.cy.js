describe("Photo Showcase", () => {
  it("should load", () => {
    cy.visit("https://jreich5.github.io/photo-showcase/");
    cy.get("h1").should("have.text", "Photo Showcase");
  });
  it("should be populated with the first album of photos", () => {
    cy.visit("https://jreich5.github.io/photo-showcase/");
    cy.get("h2").should("have.text", "Album 1 Photos");
  });
  it("should have a form to enter an album id", () => {
    cy.visit("https://jreich5.github.io/photo-showcase/");
    cy.get('input[placeholder="Enter album id"]').should("exist");
  });
  it("should allow the user to change the album", () => {
    cy.visit("https://jreich5.github.io/photo-showcase/");
    cy.get('input[placeholder="Enter album id"]')
      .click()
      .wait(500)
      .type(3)
      .should("have.value", "3");
    cy.get("h2").should("have.text", "Album 3 Photos");
  });
  it("should not allow the user to change the album to a negative number", () => {
    cy.visit("https://jreich5.github.io/photo-showcase/");
    cy.get('input[placeholder="Enter album id"]')
      .click()
      .wait(500)
      .type(-1)
      .should("have.value", "1");
    cy.get("h2").should("have.text", "Album 1 Photos");
  });
  it("should not allow the user to type a letter", () => {
    cy.visit("https://jreich5.github.io/photo-showcase/");
    cy.get('input[placeholder="Enter album id"]')
      .click()
      .wait(500)
      .type("abcedfghijklmnopqrstuvwxyz")
      .should("have.value", "");
    cy.get("h2").should("have.text", "Album 1 Photos");
  });
  it("should default to album 1 when the user deletes the album number", () => {
    cy.visit("https://jreich5.github.io/photo-showcase/");
    cy.get('input[placeholder="Enter album id"]')
      .click()
      .wait(500)
      .type(22)
      .should("have.value", "22")
      .clear()
      .should("have.value", "");
    cy.get("h2").should("have.text", "Album 1 Photos");
  });
  it("should not allow the user to enter an album number that exceeds the range", () => {
    cy.visit("https://jreich5.github.io/photo-showcase/");
    cy.get('input[placeholder="Enter album id"]')
      .click()
      .wait(500)
      .type(110)
      .should("have.value", "11");
    cy.get("h2").should("have.text", "Album 11 Photos");
  });
});
