import { render, screen, cleanup } from '@testing-library/react';
import Card from './Card';

describe('Card component', () => {
    afterEach(cleanup);

    test('it renders children', () => {
        render(
            <Card>
                <h1>Hello World!</h1>
            </Card>
        );

        expect(screen.getByText('Hello World!')).toBeInTheDocument();
    });

    test('class names are applied', () => {
        render(<Card className="test-class" />);

        expect(screen.getByRole('region')).toHaveClass('card');
        expect(screen.getByRole('region')).toHaveClass('test-class');
    });
});