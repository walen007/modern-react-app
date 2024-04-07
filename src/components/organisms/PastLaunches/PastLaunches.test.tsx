import { render } from '@test/test-utils';
import { pastLaunchesMixed } from '@test/past-launches-mixed';
import PastLaunches from '.';

describe('<PastLaunches />', () => {
  it('-- should render <PastLaunches /> component', () => {
    const id = 'pastLaunches001';
    const { getByRole, getByText } = render(<PastLaunches data-testid={id} pastLaunches={pastLaunchesMixed} />);

    getByText('Past launches');

    const ul = getByRole('list');
    expect(ul.childElementCount).toBe(3);
    expect(ul.childNodes[0]).toHaveTextContent('Crew-5ID: 62dd70d5202306255024d139');
    expect(ul.childNodes[1]).toHaveTextContent('FalconSatID: 5eb87cd9ffd86e000604b32a');
    expect(ul.childNodes[2]).toHaveTextContent('Starlink-11 (v1.0)ID: 5ef6a1e90059c33cee4a828a');
  });
});
