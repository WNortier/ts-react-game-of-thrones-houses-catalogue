import { render, screen } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom';
import Houses from '../../pages/Houses';

describe("Characters Page Test Suite", () => {

    const setup = () => render(<MemoryRouter>
        <Houses />
    </MemoryRouter>)

    const getHouses = jest.fn().mockResolvedValueOnce([{
        url: "https://anapioficeandfire.com/api/houses/2",
        name: "House Allrion of Godsgrace",
        region: "Dorne",
        coatOfArms: "Gyronny Gules and Sable, a hand couped Or",
        words: "No Foe May Pass",
        titles: [
            ""
        ],
        seats: [
            "Godsgrace"
        ],
        currentLord: "https://anapioficeandfire.com/api/characters/298",
        heir: "https://anapioficeandfire.com/api/characters/1922",
        overlord: "https://anapioficeandfire.com/api/houses/285",
        founded: "",
        founder: "",
        diedOut: "",
        ancestralWeapons: [
            ""
        ],
        cadetBranches: [],
        swornMembers: [
            "https://anapioficeandfire.com/api/characters/298",
            "https://anapioficeandfire.com/api/characters/1129",
            "https://anapioficeandfire.com/api/characters/1301",
            "https://anapioficeandfire.com/api/characters/1922"
        ]
    }])

    beforeEach(() => {
        setup()
    })

    it("The Houses page should fetch the house data correctly", async () => {
        const heading = screen.getByText(/Houses/i);
        expect(heading).toBeInTheDocument();
        setTimeout(async () => {
            const houseAllyrion = await screen.findByText(/House Allyrion of Godsgrace/i);
            expect(getHouses).toHaveBeenCalled()
            expect(getHouses.length).toBe(1)
            expect(houseAllyrion).toBeInTheDocument();
        }, 1000)
    });
});
