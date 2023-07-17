import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Users from "../../pages/Users";

describe("Users Page Test Suite", () => {
  const setup = () =>
    render(
      <MemoryRouter>
        <Users />
      </MemoryRouter>,
    );

  beforeEach(() => {
    setup();
  });

  it("The heading should be in the documen", () => {
    const heading = screen.getByText(/Users/i);
    expect(heading).toBeInTheDocument();
  });
});
