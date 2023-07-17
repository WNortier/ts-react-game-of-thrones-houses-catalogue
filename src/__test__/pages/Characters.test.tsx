import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Characters from "../../pages/Characters";
import { GOTService } from "../../api/api";

describe("Characters Screen Test", () => {
  let data: {
    name: string;
    gender: string;
    aliases: string[];
    culture: string;
    url: string;
    born: string;
    died: string;
    titles: string[];
    father: string;
    mother: string;
    spouse: string;
    allegiances: string[];
    books: string[];
    povBooks: string[];
    tvSeries: string[];
    playedBy: string[];
  }[];

  const setup = () =>
    render(
      <MemoryRouter>
        <Characters setLoading={jest.fn()} />
      </MemoryRouter>,
    );

  beforeEach(async () => {
    const apiService = GOTService();
    data = await apiService.getCharacters();
    setup();
  });

  test("The heading should be in the document", () => {
    const heading = screen.getByText(/Characters/i);
    expect(heading).toBeInTheDocument();
  });
  test("Fetching the correct length of character data", async () => {
    expect(data.length).toBe(10);
  });
  test("Verifying that the correct data has been received", async () => {
    const firstEntry = data[0];
    expect(firstEntry.url).toBeDefined();
    expect(firstEntry.url).toBe(
      "https://anapioficeandfire.com/api/characters/1",
    );
    expect(firstEntry.name).toBeDefined();
    expect(firstEntry.gender).toBe("Female");
    expect(firstEntry.culture).toBe("Braavosi");
    expect(firstEntry.books).toHaveLength(1);
    expect(firstEntry.aliases).toHaveLength(1);
    expect(firstEntry).toEqual({
      url: "https://anapioficeandfire.com/api/characters/1",
      name: "",
      gender: "Female",
      culture: "Braavosi",
      born: "",
      died: "",
      titles: [""],
      aliases: ["The Daughter of the Dusk"],
      father: "",
      mother: "",
      spouse: "",
      allegiances: [],
      books: ["https://anapioficeandfire.com/api/books/5"],
      povBooks: [],
      tvSeries: [""],
      playedBy: [""],
    });
  });
});
