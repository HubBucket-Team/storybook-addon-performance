import { startAllButtonId, copySelectId, sampleSelectId, pinButtonId } from './../../src/selectors';
import { panelId } from '../../src/selectors';
import { wait } from '../custom/guards';

beforeEach(() => {
  cy.visit('/?path=/story/examples--select');
  // wait for iframe to be on the page
  cy.get('#storybook-preview-iframe');

  cy.get('body').then(($body) => {
    // Show the addon panel if it is currently not visible
    if (!$body.find(`#${panelId}:visible`).length) {
      return cy.get('body').type('A');
    }
  });

  // start all button should now be visible
  cy.get(`#${panelId}`).as('panel').should('be.visible');

  // Create some nice aliases
  cy.get(`#${startAllButtonId}`).as('startAllButton');
  cy.get(`#${copySelectId}`).as('copySelect');
  cy.get(`#${sampleSelectId}`).as('sampleSelect');
  cy.get(`#${pinButtonId}`).as('pinButton');

  wait.topbarEnabled();
});
