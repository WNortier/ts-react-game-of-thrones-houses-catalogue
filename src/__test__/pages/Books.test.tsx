import { render, screen, act } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom';
import Books from '../../pages/Books';
import { GOTService } from '../../api/api';
// import * as getBooksMockImplementation from '../../api/api'
// jest.mock("../../api/api")

describe("Books Screen Test", () => {

    const setup = () => render(<MemoryRouter>
        <Books />
    </MemoryRouter>)

    // let apiService: { getBooks: () => void } | null = null
    beforeEach(async () => {
        jest.clearAllMocks();
        // apiService = new GOTService()
        setup()
    })



    test("The heading should be in the document", () => {
        const heading = screen.getByText(/Books/i);
        expect(heading).toBeInTheDocument();
    });

    test("The book data should be fetched successfully", async () => {
        const data = await GOTService().getBooks()
        const firstEntry = data[0]
        expect(data.length).toBe(10)
        // jest.spyOn(GOTService(), 'getBooks').mockResolvedValue(() => { name: 'warwick' });
        // expect(getBooksMockImplementation).toHaveBeenCalledWith("1", "10")
        expect(firstEntry.url).toBeDefined();
        expect(firstEntry.name).toBeDefined();
        expect(firstEntry.isbn).toBeDefined();
        expect(firstEntry.authors).toBeDefined();
        expect(firstEntry.numberOfPages).toBeDefined();
        expect(firstEntry.publisher).toBeDefined();
        expect(firstEntry.country).toBeDefined();
        expect(firstEntry.mediaType).toBeDefined();
        expect(firstEntry.released).toBeDefined();
        expect(firstEntry.characters).toBeDefined();
        expect(firstEntry.povCharacters).toBeDefined();
    })

});
