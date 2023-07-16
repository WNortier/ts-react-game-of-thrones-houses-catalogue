import { render, screen } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom';
import AppBreadcrumb from '../../components/Breadcrumb';
describe("Splash Screen Test", () => {

    const setup = () => render(<MemoryRouter>
        <AppBreadcrumb house='House Algood' />
    </MemoryRouter>)

    beforeEach(() => {
        setup()
    })

    it("The welcome message should be in the document", () => {
        const navbarHeading = screen.getByText(/House Algood/i);
        // const headingByRole = screen.getByRole("splash");
        expect(navbarHeading).toBeInTheDocument();
    });

});
