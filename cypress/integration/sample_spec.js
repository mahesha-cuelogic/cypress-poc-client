
describe('My first test', () => {
    it('running test correctly??', () => {
        expect(true).to.equal(true)
    })
})

describe('Getting into notes App', function() {
    it('Visits the Notes app', function() {
      cy.visit('http://localhost:3000/')
      cy.contains('React Notes App')
    })
    it('create a note', () => {
        cy.get('[data-testid="todo-input-title"]').type('test node title')
        cy.get('[data-testid="todo-input-text"]').type('test node text')
        cy.get('[data-testid="add"]').click()
    })
    it('update created note', () => {
        cy.get('[data-testid="edit-item"]').last().click()
        cy.get('[data-testid="todo-title-editing"]').type('updated test node title')
        cy.get('[data-testid="todo-text-editing"]').type('updated test node text')
        cy.get('[data-testid="save-item"]').last().click()
    })
    it('delete created note', () => {
        cy.get('[data-testid="delete-item"]').last().click()
    })
   
  })