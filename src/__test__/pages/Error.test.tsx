import { render, screen } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom';
import ErrorPage from '../../pages/ErrorPage';

describe("Splash Screen Test", () => {

    const setup = () => render(<MemoryRouter>
        <ErrorPage />
    </MemoryRouter>)

    beforeEach(() => {
        setup()
    })

    it("The welcome message should be in the document", () => {
        const heading = screen.getByText(/Error 404/i);
        expect(heading).toBeInTheDocument();
    });
});
