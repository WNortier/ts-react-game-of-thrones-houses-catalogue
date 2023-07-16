import { render, screen } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom';
import Characters from '../../pages/Characters';

describe("Characters Page Test Suite", () => {

    const setup = () => render(<MemoryRouter>
        <Characters setLoading={jest.fn()} />
    </MemoryRouter>)

    beforeEach(() => {
        setup()
    })

    it("The heading should be in the documen", () => {
        const heading = screen.getByText(/Characters/i);
        expect(heading).toBeInTheDocument();
    });
});
