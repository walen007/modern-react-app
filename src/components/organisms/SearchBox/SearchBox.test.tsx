import { render, fireEvent } from '@test/test-utils';
import SearchBox from '.';

describe('<SearchResult />', () => {
  it('-- should render successful SpaceX launch', () => {
    const id = 'search001';
    const getLaunch = vi.fn();
    const { getByTestId } = render(<SearchBox data-testid={id} isFetching={false} getLaunch={getLaunch} />);

    const input = getByTestId('search-text');
    const button = getByTestId('submit-button');

    expect(input).toHaveClass('_txtSearch_0b168a');
    expect(button).toHaveClass('_btnSearch_723963');

    fireEvent.keyDown(input, { key: 'Enter', keyCode: 13 });
    expect(getLaunch).toHaveBeenCalled();

    fireEvent.change(input, {
      target: { value: '62dd70d5202306255024d139' },
    });

    fireEvent.click(button);
    expect(getLaunch).toHaveBeenCalledTimes(2);
  });
});
