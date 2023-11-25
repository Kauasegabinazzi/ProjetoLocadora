describe('Teste Home', () => {
  it('Deve carregar a página inicial corretamente', () => {
    cy.visit('http://localhost:4200');
    cy.contains('Home'); // Verificar se existe um elemento com o texto 'Home'
    cy.url().should('eq', 'http://localhost:4200/'); // Verificar se a URL é a página inicial
  });
});
/*describe('Teste Veiculos', () => {
  it('Deve verificar a página de veículos', () => {
    cy.visit('http://localhost:4200/veiculos');
    cy.get('mat-card-info').should('have.length.greaterThan', 0); // Verificar se há cartões de veículos renderizados
  });
});*/
describe('Teste Reserva', () => {
  it('Deve realizar uma reserva', () => {
    cy.visit('http://localhost:4200/');
    
    // Clica no botão de menu para abrir a barra de navegação lateral
    cy.get('mat-icon').contains('menu').click({ force: true });

    // Clica no link "Reservas" na barra lateral
    cy.get('mat-list-item').contains('Reservar').click();

    // Espera até que a lista de clientes esteja carregada e então seleciona um cliente
    cy.get('#clientSelect').select('Cliente 1');

    // Espera até que a lista de veículos esteja carregada e então seleciona um veículo
    cy.get('#vehicleModel').select('Veículo 1');

    // Clica no botão "Reservar"
    cy.contains('Reservar').click();

    // Verifica se a reserva foi feita corretamente
    cy.contains('Veículo: Veículo 1 - Cliente: Cliente 1');
  });
});
