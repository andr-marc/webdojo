describe("Login", () => {
  it("Deve logar com sucesso", () => {
    cy.start();
    cy.login('papito@webdojo.com', 'katana123');

    cy.get('[data-cy="user-name"]')
      .should("be.visible")
      .and("have.text", "Fernando Papito")
      .end();

      cy.get('[data-cy="welcome-message"]')
        .should("be.visible")
        .and("have.text", "Olá QA, esse é o seu Dojo para aprender Automação de Testes.")
        .end();
  });

  it("Não deve logar com senha inválida", () => {
    cy.start();
    cy.login("papito@webdojo.com", "katana321");

    cy.contains("Acesso negado! Tente novamente.").should("be.visible");
  });

  it("Não deve logar com email não cadastrado", () => {
    cy.start();
    cy.login("404@webdojo.com", "katana123");

    cy.contains("Acesso negado! Tente novamente.").should("be.visible");
  });
});
