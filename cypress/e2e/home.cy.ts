describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('deve carregar a página inicial corretamente', () => {
    cy.get('header').should('contain', 'Antoniel Mariano');
    cy.get('h2').should('contain', 'Mapa rastreador');
  });

  it('deve filtrar veículos por tipo', () => {
    cy.get('input[type="radio"]').first().should('be.checked');
    cy.get('input[type="radio"]').last().click();
    cy.get('input[type="radio"]').last().should('be.checked');
  });

  it('deve buscar veículos por placa', () => {
    const searchTerm = 'ABC123';
    cy.get('input[placeholder="Buscar por placa ou frota"]')
      .type(searchTerm);
    cy.get('button').contains('Buscar').click();
  });

  it('deve exibir a tabela de veículos', () => {
    cy.get('table').should('exist');
    cy.get('th').should('have.length', 5);
  });

  it('deve exibir cards em telas pequenas', () => {
    cy.viewport('iphone-6');
    cy.get('table').should('not.exist');
    cy.get('.grid').should('exist');
  });

  it('deve exibir o mapa', () => {
    cy.get('.map-container').should('exist');
  });

  it('deve mostrar loading ao buscar veículos', () => {
    cy.get('button').contains('Buscar').click();
    cy.get('.loading-spinner').should('exist');
  });
}); 