/// <reference types="cypress" />
import { pastLaunchesMixed } from '../../src/test/past-launches-mixed';

describe('SpaceX Launch Project', () => {
  it('-- should render search box on page', () => {
    cy.visit('http://localhost:5173/');
    cy.get('[data-testid="search-text"]').should('exist').should('have.attr', 'placeholder', 'Enter Launch ID');
    cy.get('[data-testid="submit-button"]').should('exist').should('have.text', 'Search');
  });

  it('-- should render past launches on page', () => {
    cy.visit('http://localhost:5173/');
    cy.get('h2').should('exist').should('have.text', 'Past launches');
    cy.get('[data-testid="past-launch-list"] > li').should($lis => {
      expect($lis).to.have.length(3);
      expect($lis.eq(0)).to.contain('ID: 62dd70d5202306255024d139');
      expect($lis.eq(1)).to.contain('ID: 63161339ffc78f3b8567070c');
      expect($lis.eq(2)).to.contain('ID: 63161329ffc78f3b8567070b');
    });
  });

  it('-- should render error states', () => {
    const randomString = 'dadadsasdad';
    cy.visit('http://localhost:5173/');

    cy.get('[data-testid="search-text"]').type('{enter}');
    cy.get('[data-testid="error-message"]').should('have.text', 'Please enter a valid Launch ID');

    cy.get('[data-testid="search-text"]').type(randomString).type('{enter}');
    cy.get('[data-testid="error-message"]').should('have.text', 'The Launch ID provided was not found.');

    cy.get('[data-testid="search-text"]').type(randomString);
    cy.get('[data-testid="submit-button"]').click();

    cy.get('[data-testid="error-message"]').should('have.text', 'The Launch ID provided was not found.');
  });

  it('-- should render successful SpaceX launch', () => {
    cy.visit('http://localhost:5173/');

    cy.get('[data-testid="search-text"]').type(pastLaunchesMixed[0].id);
    cy.get('[data-testid="submit-button"]').click();

    cy.get('[data-testid="search-result"]').children().should('have.length', 1);

    cy.get('[data-testid="search-result"] > div')
      .first()
      .should('contain', 'Crew-5')
      .should('contain', 'ID: 62dd70d5202306255024d139');

    cy.get('[data-testid="success-indicator"]').should(
      'have.attr',
      'aria-description',
      'Success Indicator: The SpaceX Crew-5 was a successful launch'
    );
  });

  it('-- should render failed SpaceX launch', () => {
    cy.visit('http://localhost:5173/');

    cy.get('[data-testid="search-text"]').type(pastLaunchesMixed[1].id);
    cy.get('[data-testid="submit-button"]').click();

    cy.get('[data-testid="search-result"] > div').children().should('have.length', 2);

    cy.get('[data-testid="search-result"] > div')
      .first()
      .should('contain', 'FalconSat')
      .should('contain', 'ID: 5eb87cd9ffd86e000604b32a');

    cy.get('[data-testid="success-indicator"]').should(
      'have.attr',
      'aria-description',
      'Success Indicator: The SpaceX FalconSat was not a successful launch'
    );
  });
});
