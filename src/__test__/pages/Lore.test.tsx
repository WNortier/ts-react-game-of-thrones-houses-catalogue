import { render, screen } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom';
import Lore from '../../pages/Lore';

describe("Splash Screen Test", () => {

    const setup = () => render(<MemoryRouter>
        <Lore />
    </MemoryRouter>)

    beforeEach(() => {
        setup()
    })

    it("The welcome message should be in the document", () => {
        const heading = screen.getByText(/Lore/i);
        expect(heading).toBeInTheDocument();
    });
});
