import { vi } from 'vitest';
import { render, screen, fireEvent } from '@test/test-utils';
import { Button } from '.';

describe('<Button />', () => {
  it('-- should render <button /> tag', () => {
    const id = 'btn001';

    render(
      <Button data-testid={id} isFetching={false}>
        Search
      </Button>
    );

    const button = screen.getByTestId(id);
    expect(button.tagName).toBe('BUTTON');
    expect(button).toHaveTextContent('Search');
  });

  it('-- should validate attributes', () => {
    const id = 'btn001';

    render(
      <Button data-testid={id} isFetching={true}>
        Loading...
      </Button>
    );

    const button = screen.getByTestId(id);
    expect(button).toHaveTextContent('Loading...');
    expect(button.getAttribute('aria-busy')).toBe('true');
  });

  it('-- should pass click event', () => {
    const id = 'btn001';
    const handleClick = vi.fn();
    const { getByTestId } = render(<Button data-testid={id} onClick={handleClick} />);

    const button = getByTestId(id);

    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalled();
  });
});
