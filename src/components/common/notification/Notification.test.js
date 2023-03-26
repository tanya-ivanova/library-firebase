import { render, screen, cleanup } from "@testing-library/react";
import Notification from "./Notification";

const message = 'message';

describe('Notification component', () => {
    afterEach(cleanup);

    test('renders the message given via the props', () => {
        render(<Notification message={message} />);         
                
        const messageElement = screen.getByText('message', { exact: true });
        expect(messageElement).toBeInTheDocument();
    });
});