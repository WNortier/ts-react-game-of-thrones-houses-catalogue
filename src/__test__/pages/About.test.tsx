import { render, screen } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom';
import About from '../../pages/About';

describe("Splash Screen Test", () => {

    const setup = () => render(<MemoryRouter>
        <About />
    </MemoryRouter>)

    beforeEach(() => {
        setup()
    })

    it("The welcome message should be in the document", () => {
        const heading = screen.getByText(/About/i);
        expect(heading).toBeInTheDocument();
    });
});
