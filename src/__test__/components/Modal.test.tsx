import { render, screen } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom';
import AppModal from '../../components/Modal';
describe("Splash Screen Test", () => {

    const setup = () => render(<MemoryRouter>
        <AppModal data={{ name: 'Walder' }} modalImg={''} modalShow={true} setModalShow={() => true} show={true} />
    </MemoryRouter>)

    beforeEach(() => {
        setup()
    })

    it("The welcome message should be in the document", () => {
        const navbarHeading = screen.getByText(/Walder/i);
        // const headingByRole = screen.getByRole("splash");
        expect(navbarHeading).toBeInTheDocument();
    });

});
