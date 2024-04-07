import { render } from '@test/test-utils';
import { ListItem } from '.';

describe('<ListItem />', () => {
  it('-- should render <li /> element', () => {
    const id = 'li001';
    const { getByTestId } = render(<ListItem data-testid={id}>Item 001</ListItem>);
    const li = getByTestId(id);
    expect(li.tagName).toBe('LI');
    expect(li).toHaveTextContent('Item 001');
  });
});
