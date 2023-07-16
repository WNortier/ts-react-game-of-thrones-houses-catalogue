
import { act, fireEvent, render, screen } from "@testing-library/react"
import { MemoryRouter } from 'react-router-dom';
import LoginForm from '../../pages/Login';


describe('Login component tests', () => {

    // const loginPropsMock = {
    //     isLoggedIn: true,
    //     videoComplete: true,
    //     setInit: jest.fn(),
    //     setIsLoggedIn: jest.fn(),
    //     setVideoComplete: jest.fn()
    // }

    let container: HTMLElement;
    function setup() {
        render(<MemoryRouter>
            <LoginForm
                isLoggedIn={true}
                videoComplete={true}
                setInit={jest.fn()}
                setIsLoggedIn={jest.fn()}
                setVideoComplete={jest.fn()}
            // loginService={loginServiceMock}
            // setToken={setTokenMock}
            />
        </MemoryRouter>
        )
    }
    beforeEach(() => {
        setup();
    })
    test.todo('should render correctly the login component')
    test.todo('should render correctly when logging in incorrectly')
    test.todo('should render correctly when logging in correctly')

    it('should render correctly the login component', () => {
        const mainElement = screen.getByRole('login');
        expect(mainElement).toBeInTheDocument();
        // expect(screen.queryByTestId('resultLabel')).not.toBeInTheDocument();
    })
    xit('should render correctly when logging in incorrectly', () => {
        const inputs = screen.getAllByTestId('input');
        expect(inputs).toHaveLength(3);
        expect(inputs[0].getAttribute('value')).toBe('');
        expect(inputs[1].getAttribute('value')).toBe('');
        expect(inputs[2].getAttribute('value')).toBe('Login');
    })
    xit('should render correctly when logging in correctly', () => {
        const inputs = container.querySelectorAll('input');
        expect(inputs).toHaveLength(3);
        expect(inputs[0].value).toBe('');
        expect(inputs[1].value).toBe('');
        expect(inputs[2].value).toBe('Login');
    })

    xit('Click login button with incomplete credentials - show required message', () => {
        const inputs = screen.getAllByTestId('input');
        const loginButton = inputs[2];

        fireEvent.click(loginButton);

        const resultLabel = screen.getByTestId('resultLabel');
        expect(resultLabel.textContent).toBe('UserName and password required!');
    })
})
