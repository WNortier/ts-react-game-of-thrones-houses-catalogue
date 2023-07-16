import { render, screen } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom';
import Books from '../../pages/Books';

describe("Books Page Test Suite", () => {

    const setup = () => render(<MemoryRouter>
        <Books />
    </MemoryRouter>)

    beforeEach(() => {
        setup()
    })

    it("The heading should be in the documen", () => {
        const heading = screen.getByText(/Books/i);
        expect(heading).toBeInTheDocument();
    });
});
