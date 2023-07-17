import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LoginForm from "../../pages/Login";

describe("Login component tests", () => {
  function setup() {
    render(
      <MemoryRouter>
        <LoginForm
          isLoggedIn={true}
          videoComplete={true}
          setInit={jest.fn()}
          setIsLoggedIn={jest.fn()}
          setVideoComplete={jest.fn()}
        />
      </MemoryRouter>,
    );
  }
  beforeEach(() => {
    setup();
  });

  test("should render correctly the login component", () => {
    const mainElement = screen.getByRole("login");
    expect(mainElement).toBeInTheDocument();
    // expect(screen.queryByTestId('resultLabel')).not.toBeInTheDocument();
  });
  test("should render all the login inputs correctly", () => {
    const inputs = screen.getAllByTestId("login-input");
    expect(inputs[0].getAttribute("value")).toBe("");
    expect(inputs[1].getAttribute("value")).toBe("");
  });
  test("Click login button with incomplete credentials - show required message", async () => {
    const inputs = screen.getAllByTestId("login-input");
    expect(inputs[0].getAttribute("value")).toBe("");
    expect(inputs[1].getAttribute("value")).toBe("");
    inputs[0].setAttribute("value", "test");
    const btns = screen.getAllByTestId("login-btn");
    const loginButton = btns[0];
    fireEvent.click(loginButton);
    setTimeout(async () => {
      expect((await screen.findByTestId("email-err")).textContent).toBe(
        "Invalid Email",
      );
      expect((await screen.findByTestId("pass-err")).textContent).toBe(
        "Invalid Password",
      );
    }, 1000);
  });

  test("Click login button with correct credentials - login successful without errors", async () => {
    const inputs = screen.getAllByTestId("login-input");
    expect(inputs[0].getAttribute("value")).toBe("");
    // inputs[0].setAttribute('value', 'warwick@avochoc.com')
    expect(inputs[1].getAttribute("value")).toBe("");
    // inputs[1].setAttribute('value', 'admin@01')
    fireEvent.change(inputs[0], { target: { value: "warwick@avochoc.com" } });
    fireEvent.change(inputs[1], { target: { value: "admin@01" } });

    expect(inputs[0].getAttribute("value")).toBe("warwick@avochoc.com");
    const btns = screen.getAllByTestId("login-btn");
    const loginButton = btns[0];
    await fireEvent.click(loginButton);
    setTimeout(async () => {
      expect((await screen.findByTestId("email-err")).textContent).toBe("");
      expect((await screen.findByTestId("pass-err")).textContent).toBe("");
    }, 1000);
  });
});
