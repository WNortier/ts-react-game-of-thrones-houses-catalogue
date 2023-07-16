import { render, screen } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom';
import CharacterDetail from '../../../components/characters/CharacterDetail';

jest.mock('react-router', () => ({
    ...jest.requireActual("react-router") as {},
    useLocation: jest.fn().mockImplementation(() => {
        return { state: { url: "https://google.com" } };
    })
}));
describe("CharacterDetail Page Test Suite", () => {
    const setup = () => render(<MemoryRouter>
        <CharacterDetail />
    </MemoryRouter>)


    beforeEach(() => {
        setup()
    })

    it("The heading should be in the document", async () => {

        const heading = await screen.findByRole('character-detail');
        expect(heading).toBeInTheDocument();
    });
});
