Cypress.Commands.add('deleteUsers', () => {
  cy.exec('python delete_users.py', { failOnNonZeroExit: false }).then((result) => {
    console.log(result.stdout); 
    if (result.stderr) {
      console.error(result.stderr);
    }
  });
});

Cypress.Commands.add('criarUser', () => {
  cy.visit('http://127.0.0.1:8000/login/');
  cy.wait(1000);
  cy.contains('a', 'CADASTRE-SE').click();
  cy.get('#username').type('Teste Cypress'); 
  cy.get('#email').type('testeCypress@gmail.com'); 
  cy.get('#password1').type('123456'); 
  cy.get('#password2').type('123456'); 
  cy.get('button').click();
});

Cypress.Commands.add('logar', () => {
  cy.visit('http://127.0.0.1:8000/login/');  
  cy.get('#username').type('Teste Cypress'); 
  cy.get('#password').type('123456');  
  cy.get('button').click();  
});

Cypress.Commands.add('pesquisar', (jogo) => {
  cy.visit('http://127.0.0.1:8000/');
  cy.get('.search-bar1').type(jogo);
  cy.get('.search-button').click();
  cy.wait(2000);
});

Cypress.Commands.add('telaRatings', () => {
  cy.visit('http://127.0.0.1:8000/');       
  cy.get('.ratings').click();                  
  cy.get('#games-container > :nth-child(2)').click();                  
  cy.wait(2000);
});

Cypress.Commands.add('telaRaking', () => {
  cy.visit('http://127.0.0.1:8000/');
  cy.get('.maisJogados').click();
  cy.get('.games-grid > :nth-child(1)').click();
  cy.wait(2000)
});

Cypress.Commands.add('telaMaisJogados', () => {
  cy.visit('http://127.0.0.1:8000/');
  cy.get('.maisJogadosHist').click();
  cy.get('.games-grid > :nth-child(1)').click();
  cy.wait(2000);
});

Cypress.Commands.add('lancamentos', () => {
  cy.visit('http://127.0.0.1:8000/');
  cy.wait(1000);
  cy.get('.lancamentos').click();
  cy.get('.games-grid > :nth-child(1)').should('be.visible').click();
});

describe('Poder visualizar detalhes do jogo', () => {
  
  before(() => {
    cy.deleteUsers();
    cy.criarUser();
    cy.logar(); 
  });
  
  it('Visualizar Jogo pesquisando', () => {
    cy.pesquisar("Dark Souls III");
  })

  it('visualizar jogo pela tela de ratings', () => {
    cy.logar();
    cy.telaRatings();
  });

  it('visualizar jogo pela tela de raking', () => {
    cy.logar();
    cy.telaRaking();
  });

  it('visualizar jogo pela tela de mais jogados', () => {
    cy.logar();
    cy.telaMaisJogados();
  });

  it('visualizar jogo pela tela de mais lançamentos', () => {
    cy.logar();
    cy.lancamentos();
  });

})