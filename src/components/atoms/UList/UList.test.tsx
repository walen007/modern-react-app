import { render } from '@test/test-utils';
import { UList } from '.';
import { ListItem } from '@atoms';

describe('<UList />', () => {
  it('-- should render <ul /> element', () => {
    const id = 'li001';
    const { getByTestId } = render(
      <UList data-testid={id}>
        <ListItem>ListItem 001</ListItem>
      </UList>
    );
    const ul = getByTestId(id);
    expect(ul.tagName).toBe('UL');
    expect(ul).toHaveTextContent('ListItem 001');
  });
});
