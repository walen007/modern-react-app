import { render } from '@test/test-utils';
import { Heading } from '.';

describe('<Heading />', () => {
  it('-- should render default element type (<h2>)', () => {
    const id = 'heading001';
    const { getByTestId } = render(<Heading data-testid={id}>Past launches</Heading>);
    const h2 = getByTestId(id);
    expect(h2).toHaveTextContent('Past launches');
    expect(h2.tagName).toBe('H2');
  });

  it('-- should render <h4> element type', () => {
    const id = 'heading001';

    const { getByTestId } = render(
      <Heading data-testid={id} HeadingTag="h4">
        Render h4 tag
      </Heading>
    );

    const h4 = getByTestId(id);
    expect(h4).toHaveTextContent('Render h4 tag');
    expect(h4.tagName).toBe('H4');
  });
});
