import { mount } from "@cypress/vue";
import Sider from "../components/Sider.vue";

/* eslint-disable */
describe("Sider", () => {
  it("renders section title", () => {
    mount(Sider);

    cy.get(".filters__title")
      .find("h2")
      .should("have.text", "Filters");
  });

  it("renders unit buttons", () => {
    mount(Sider);

    cy.get(".container__filters")
      .find("button.miles-btn")
      .should("have.text", "Miles");

    cy.get(".container__filters")
      .find("button.km-btn")
      .should("have.text", "Km");
  });
});
/* eslint-enable */
