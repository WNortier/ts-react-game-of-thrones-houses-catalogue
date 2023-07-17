import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Books from "../../pages/Books";
import { GOTService } from "../../api/api";

describe("Books Screen Test", () => {
  const setup = async () => {
    render(
      <MemoryRouter>
        <Books />
      </MemoryRouter>,
    );
  };
  let data: {
    name: string;
    isbn: string;
    mediaType: string;
    country: string;
    authors: string[];
    publisher: string;
    numberOfPages: string;
    released: string;
    url: string;
    characters: string[];
    povCharacters: string[];
  }[];

  // let apiService: { getBooks: () => void } | null = null
  beforeEach(async () => {
    jest.clearAllMocks();
    const apiService = GOTService();
    data = await apiService.getBooks();
    setup();
  });

  test("The heading should be in the document", () => {
    const heading = screen.getByText(/Books/i);
    expect(heading).toBeInTheDocument();
  });

  test("Fetching the correct length of book data", async () => {
    expect(data.length).toBe(10);
  });
  test("Verifying that the correct data has been received", async () => {
    const firstEntry = data[0];
    expect(firstEntry.url).toBeDefined();
    expect(firstEntry.name).toBeDefined();
    expect(firstEntry.name).toBe("A Game of Thrones");
    expect(firstEntry.isbn).toBeDefined();
    expect(firstEntry.authors).toBeDefined();
    expect(firstEntry.numberOfPages).toBeDefined();
    expect(firstEntry.publisher).toBeDefined();
    expect(firstEntry.country).toBeDefined();
    expect(firstEntry.mediaType).toBeDefined();
    expect(firstEntry.released).toBeDefined();
    expect(firstEntry.characters).toBeDefined();
    expect(firstEntry.characters).toHaveLength(434);
    expect(firstEntry.povCharacters).toBeDefined();
    expect(firstEntry.povCharacters).toHaveLength(9);
  });
});
