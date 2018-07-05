// https://docs.cypress.io/api/introduction/api.html

describe('My First Test', () => {
  it('Visits the app root url', () => {
    cy.visit('/')
    cy.contains('body', 'Inject thunder').should('exist')
  })
})

describe('Entering Edit mode', () => {
  it('Visits the app root url', () => {
    cy.visit('/')
    cy.get('body').type('{alt}{esc}')
    cy.contains('body', 'edit mode').should('exist')
    //cy.screenshot()
  })
})

describe('Exit Edit mode', () => {
  it('Visits the app root url', () => {
    cy.visit('/')
    cy.contains('body', 'Inject thunder')

    cy.get('body').type('{alt}{esc}')
    cy.get('body').type('{alt}{esc}')
    cy.contains('body', 'edit mode').should('not.exist')
  })
})

describe('Editing content-text', () => {
  it('Visits the app root url', () => {
    cy.visit('/')
    cy.get('#test-content-text').contains('Inject').click()
    //cy.contains('body', 'suspendisse').text('{select-all}')
    cy.screenshot()
  })
})
