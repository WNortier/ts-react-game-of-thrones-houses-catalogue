import { render, screen } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom';
import Splash from '../../pages/Splash';
describe("Splash Screen Test", () => {

    const setup = () => render(<MemoryRouter>
        <Splash />
    </MemoryRouter>)

    beforeEach(() => {
        setup()
    })

    it("The welcome message should be in the document", () => {
        const heading = screen.getByText(/Welcome to Game Of Thrones Houses Catalogue/i);
        const splashComponent = screen.getByRole("splash");
        expect(splashComponent).toBeInTheDocument();
        expect(heading).toBeInTheDocument();
    });
});
