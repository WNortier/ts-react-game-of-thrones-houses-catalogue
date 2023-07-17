import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { GOTService } from "../../api/api";
import Houses from "../../pages/Houses";

describe("Characters Screen Test", () => {
  let data: {
    name: string;
    region: string;
    coatOfArms: string;
    words: string;
    titles: string[];
    seats: string[];
    currentLord: string;
    heir: string;
    overlord: string;
    founded: string;
    founder: string;
    diedOut: string[];
    ancestralWeapons: string[];
    cadetBranches: string[];
    swornMembers: string[];
    url: string;
  }[];

  const setup = () =>
    render(
      <MemoryRouter>
        <Houses />
      </MemoryRouter>,
    );

  beforeEach(async () => {
    const apiService = GOTService();
    data = await apiService.getHouses();
    setup();
  });

  test("The heading should be in the document", () => {
    const heading = screen.getByText(/Houses/i);
    expect(heading).toBeInTheDocument();
  });
  test("Fetching the correct length of houses data", async () => {
    expect(data.length).toBe(10);
  });
  test("Verifying that the correct data has been received", async () => {
    const firstEntry = data[0];
    expect(firstEntry.name).toBeDefined();
    expect(firstEntry.name).toBe("House Algood");
    expect(firstEntry.region).toBeDefined();
    expect(firstEntry.region).toBe("The Westerlands");
    expect(firstEntry).toEqual({
      name: "House Algood",
      url: "https://anapioficeandfire.com/api/houses/1",
      region: "The Westerlands",
      coatOfArms:
        "A golden wreath, on a blue field with a gold border(Azure, a garland of laurel within a bordure or)",
      words: "",
      titles: [""],
      seats: [""],
      currentLord: "",
      heir: "",
      overlord: "https://anapioficeandfire.com/api/houses/229",
      founded: "",
      founder: "",
      diedOut: "",
      ancestralWeapons: [""],
      cadetBranches: [],
      swornMembers: [],
    });
  });
});
