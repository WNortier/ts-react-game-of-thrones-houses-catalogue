import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HousesDetail from "../../../components/houses/HousesDetail";

jest.mock("react-router", () => ({
  ...(jest.requireActual("react-router") as object),
  useLocation: jest.fn().mockImplementation(() => {
    return { state: { url: "https://google.com" } };
  }),
}));
describe("HousesDetail Page Test Suite", () => {
  const setup = () =>
    render(
      <MemoryRouter>
        <HousesDetail />
      </MemoryRouter>,
    );

  beforeEach(() => {
    setup();
  });

  it("The heading should be in the document", async () => {
    const heading = await screen.findByRole("houses-detail");
    expect(heading).toBeInTheDocument();
  });
});
