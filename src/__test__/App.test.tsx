import { render, screen } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom';
import Splash from '../pages/Splash';
import { generateUsers } from "../data/users"
describe("App Test", () => {
  test.todo('Write a test for the App component')

  // const setup = () => render(<MemoryRouter>
  //   <Splash />
  // </MemoryRouter>)

  const users = generateUsers();

  beforeEach(() => {
    // setup()
  })

  it("The app should have the predetermined users set by the administrator", () => {
    const applicationUsers = users.map((u) => ['Warwick', 'Jaco', 'Johan', 'Martin'].includes(u.name))
    const userEmails = users.map((u) => u.email)
    expect(applicationUsers).toHaveLength(4);
    expect(applicationUsers).not.toContain(false)
    userEmails.forEach((e) => expect(e).toBeDefined)
  });
});
