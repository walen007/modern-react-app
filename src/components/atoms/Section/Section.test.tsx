import { render } from '@test/test-utils';
import { Section } from '.';

describe('<Section />', () => {
  it('-- should render <section /> element', () => {
    const id = 'section001';
    const { getByTestId } = render(<Section data-testid={id}>section children</Section>);
    const section = getByTestId(id);
    expect(section.tagName).toBe('SECTION');
    expect(section).toHaveTextContent('section children');
  });
});
