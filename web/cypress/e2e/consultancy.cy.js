describe("Formulário de Consultoria", () => {
  it("Deve solicitar consultoria individual", () => {
    cy.start();
    cy.login("papito@webdojo.com", "katana123");

    cy.goTo("Formulários", "Consultoria");

    cy.get("#name").type("Fernando Papito");
    cy.get("#email").type("papito@teste.com.br");
    cy.get("input[placeholder='(00) 00000-0000']")
      .type("11 99999-1000")
      .should("have.value", "(11) 99999-1000");

    cy.get("#consultancyType").select("Individual");

    cy.contains("label", "Pessoa Física")
      .find("input")
      .check()
      .should("be.checked");
    cy.contains("label", "Pessoa Jurídica")
      .find("input")
      .should("be.not.checked");

    cy.contains("label", "CPF")
      .parent()
      .find("input")
      .type("65602530070")
      .should("have.value", "656.025.300-70");

    const discoveryChannels = [
      "Instagram",
      "LinkedIn",
      "Udemy",
      "YouTube",
      "Indicação de Amigo",
    ];

    discoveryChannels.forEach((channel) => {
      cy.contains("label", channel).find("input").check().should("be.checked");
    });

    cy.get("input[type='file']").selectFile("cypress/fixtures/lorem-ipsum.pdf", { force: true });

    cy.get("#details").type("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac lacus euismod, lacinia ex quis, aliquam nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tempor, lectus quis tempor viverra, erat odio congue ipsum, vel tincidunt massa quam porttitor urna. Praesent sagittis vulputate mi, vitae lacinia ipsum fringilla vel. Nullam faucibus velit velit, id ultrices eros blandit non. Cras malesuada eros fringilla, tristique magna quis, molestie felis. Duis nec sapien nibh. Phasellus ac nibh eu nisi consectetur gravida. Aliquam sit amet ultrices lorem, at volutpat elit. Aenean a lorem augue. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.");


    const techs = [
      "Cypress",
      "Selenium",
      "Playwright",
      "WebDriverIO",
      "Robot Framework",
    ]

    techs.forEach((tech) => {
      cy.get("#technologies").type(tech).type("{enter}");
      cy.contains("label", "Tecnologias").parent().contains("span", tech).should("be.visible");
    });

    cy.contains("label", "termos de uso").find("input").check();

    cy.get("button[type='submit']").click();

    cy.contains(
      "Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido."
    ).should("be.visible");
  });
});
