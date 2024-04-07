import { vi } from 'vitest';
import { render, fireEvent } from '@test/test-utils';
import { TextInput } from '.';

describe('<TextInput />', () => {
  it('-- should render input[text] element', () => {
    const id = 'txt001';
    const { getByTestId } = render(<TextInput data-testid={id} />);
    const input = getByTestId(id);
    expect(input.tagName).toBe('INPUT');
  });

  it('-- should handle text input change', () => {
    const id = 'txt001';
    const handleChange = vi.fn();

    const { getByTestId } = render(<TextInput onChange={handleChange} data-testid={id} />);
    const input = getByTestId(id);

    fireEvent.change(input, {
      target: { value: 'launch id' },
    });

    expect(handleChange).toHaveBeenCalled();
  });
});
