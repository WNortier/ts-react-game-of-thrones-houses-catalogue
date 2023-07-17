import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AppModal from "../../components/Modal";
describe("Modal Test", () => {
  const setup = () =>
    render(
      <MemoryRouter>
        <AppModal
          data={{ name: "Walder" }}
          modalImg={"https://thronesapi.com/assets/images/walder.jpg"}
          modalShow={true}
          setModalShow={() => true}
          show={true}
        />
      </MemoryRouter>,
    );

  beforeEach(() => {
    setup();
  });

  it("The modal should display the correct character", () => {
    const navbarHeading = screen.getByText(/Walder/i);
    expect(navbarHeading).toBeInTheDocument();
  });
});
