import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Users from "../../pages/Users";
import { GOTService } from '../../api/api';

describe("Users Page Test Suite", () => {
  let data: {
    name: string;
    email: string;
    pass: string;
  }[];
  const setup = () =>
    render(
      <MemoryRouter>
        <Users />
      </MemoryRouter>,
    );

  beforeEach(async () => {
    const apiService = GOTService();
    data = await apiService.getUsers() as {
      name: string;
      email: string;
      pass: string;
    }[];
    setup();
  });

  it("The heading should be in the documen", () => {
    const heading = screen.getByText(/Users/i);
    expect(heading).toBeInTheDocument();
  });

  test("Fetching the correct length of user data", async () => {
    expect(data.length).toBe(1);
  });

  test("Verifying that the correct data has been received", async () => {
    const firstEntry = data[0];
    expect(firstEntry.name).toBeDefined();
    expect(firstEntry.email).toBeDefined();
    expect(firstEntry.pass).toBeDefined();
    expect(firstEntry.name).toBe('visitor');
    expect(firstEntry.email).toBe('visitor');
  });
});
