import { render, screen } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom';
import Houses from '../../pages/Houses';

describe("Characters Page Test Suite", () => {

    const setup = () => render(<MemoryRouter>
        <Houses />
    </MemoryRouter>)

    beforeEach(() => {
        setup()
    })

    it("The heading should be in the documen", () => {
        const heading = screen.getByText(/Houses/i);
        expect(heading).toBeInTheDocument();
    });
});
