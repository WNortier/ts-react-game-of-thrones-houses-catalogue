import { generateUsers } from "../../data/users";
describe("Application users test", () => {
  const users = generateUsers();

  it("The app should have the predetermined users set by the administrator", () => {
    const applicationUsers = users.map((u) =>
      ["visitor"].includes(u.name),
    );
    const userEmails = users.map((u) => u.email);
    expect(applicationUsers).toHaveLength(1);
    expect(applicationUsers).not.toContain(false);
    userEmails.forEach((e) => expect(e).toBeDefined);
  });
});
