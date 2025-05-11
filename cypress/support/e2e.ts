import '@testing-library/cypress/add-commands';

// Comandos personalizados do Cypress
Cypress.Commands.add('getByTestId', (testId: string) => {
  return cy.get(`[data-testid="${testId}"]`);
});

Cypress.Commands.add('getByRole', (role: string, options?: any) => {
  return cy.get(`[role="${role}"]`, options);
});

Cypress.Commands.add('getByLabel', (label: string) => {
  return cy.get(`[aria-label="${label}"]`);
});

// Tipos para os comandos personalizados
declare global {
  namespace Cypress {
    interface Chainable {
      getByTestId(testId: string): Chainable<JQuery<HTMLElement>>;
      getByRole(role: string, options?: any): Chainable<JQuery<HTMLElement>>;
      getByLabel(label: string): Chainable<JQuery<HTMLElement>>;
    }
  }
} 