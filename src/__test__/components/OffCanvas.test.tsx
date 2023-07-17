import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import OffCanvasSettings from "../../components/OffCanvas";

describe("OffCanvas Sidebar Test", () => {
  const setup = () =>
    render(
      <MemoryRouter>
        <OffCanvasSettings
          showOffCanvasSettings={true}
          setShowOffCanvasSettings={() => null}
        />
      </MemoryRouter>,
    );

  beforeEach(() => {
    setup();
  });

  it("The welcome message should be in the document", () => {
    const offCanvasHeading = screen.getByText(/Settings/i);
    // const headingByRole = screen.getByRole("splash");
    expect(offCanvasHeading).toBeInTheDocument();
  });
});
