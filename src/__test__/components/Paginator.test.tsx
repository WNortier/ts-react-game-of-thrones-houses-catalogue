import { render, screen } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom';
import Paginator from '../../components/Paginator';

describe("Splash Screen Test", () => {

    const setup = () => render(<MemoryRouter>
        <Paginator
            searched={false}
            resetData={() => true}
            setLoading={() => true}
            setData={jest.fn()}
            data={[]}
            records={1000}
            setUserData={jest.fn()}
            getHouses={jest.fn()}
            getChars={jest.fn()}
            getBooks={jest.fn()}
        />
    </MemoryRouter>)

    beforeEach(() => {
        setup()
    })

    it("The welcome message should be in the document", () => {
        const navbarHeading = screen.getByText(/Page/i);
        // const headingByRole = screen.getByRole("splash");
        expect(navbarHeading).toBeInTheDocument();
    });

});
