import { render, screen } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom';

import NavigationBar from '../../../components/navigation/NavigationBar';
describe("Splash Screen Test", () => {

    const initMock = 'true'

    const setup = () => render(<MemoryRouter>
        <NavigationBar init={initMock}
            showOffCanvasSettings={false}
            isLoggedIn={true}
            setLoading={jest.fn()}
            setIsLoggedIn={jest.fn()}
            setShowOffCanvasSettings={jest.fn()} />
    </MemoryRouter>)

    beforeEach(() => {
        setup()
    })

    it("The welcome message should be in the document", () => {
        const navbarHeading = screen.getByText(/Game Of Thrones Houses Catalogue/i);
        // const headingByRole = screen.getByRole("splash");
        expect(navbarHeading).toBeInTheDocument();
    });

});
