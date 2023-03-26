import { render, screen, fireEvent } from '@testing-library/react';
import Backdrop from './Backdrop';

describe('Backdrop', () => {
    test('onClick is called when clicked', () => {
        const onClick = jest.fn();
        render(<Backdrop onClick={onClick} />);

        const backdrop = screen.getByRole('button');
        fireEvent.click(backdrop);

        expect(onClick).toHaveBeenCalled();
    });
});