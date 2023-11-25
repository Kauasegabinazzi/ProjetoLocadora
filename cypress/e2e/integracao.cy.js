describe('Teste de Reserva', () => {
  it('Faz Uma Reserva', () => {
    cy.visit('http://localhost:4200');
    cy.contains('Home'); // Verificar se existe um elemento com o texto 'Home'
    cy.url().should('eq', 'http://localhost:4200/'); // Verificar se a URL é a página inicial

    // Clica no botão de menu para abrir a barra de navegação lateral
    cy.get('mat-toolbar-row').contains('menu').click().wait(500);

    // Clica no link "Reservas" na barra lateral
    cy.get('mat-list-item').contains('Reservar').click();

    // Clica no botão de menu para fechar a barra de navegação lateral
    cy.get('mat-toolbar-row').contains('menu').click().wait(500);

    cy.get('#clientSelect').click(); // Clicar para abrir o menu suspenso

    // Localize e clique na opção desejada (por exemplo, 'Felipe')
    cy.get('mat-option').wait(500).contains('Felipe').click();

    cy.get('#vehicleModel').click(); // Clicar para abrir o menu suspenso

    // Localize e clique na opção desejada (por exemplo, 'Chevrolet Cobalt')
    cy.get('mat-option').wait(500).contains('Chevrolet Cobalt').click();

    // Clica no botão "Reservar"
    cy.get('button').contains('Reservar').click();

    // Recarrega a tela
    cy.wait(500).reload();

    // Verifica se a reserva foi feita corretamente
    cy.get('div').contains('Veículo: Chevrolet Cobalt - Cliente: Felipe');
  });
});
