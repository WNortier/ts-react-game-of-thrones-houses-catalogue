describe("Root entry point test", () => {
  it("The application entry point should be defined", () => {
    const applicationRoot = document.getElementById('root')
    expect(applicationRoot).toBeDefined()
  });
});
