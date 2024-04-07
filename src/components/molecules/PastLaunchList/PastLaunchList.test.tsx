import { render } from '@test/test-utils';
import { pastLaunchesMixed } from '@test/past-launches-mixed';
import { PastLaunchList } from '.';

describe('<PastLaunchList />', () => {
  it('-- should render <PastLaunchList /> component', () => {
    const id = 'pastLaunches001';
    const { getByTestId } = render(<PastLaunchList data-testid={id} pastLaunches={pastLaunchesMixed} />);
    const launchList = getByTestId(id);
    expect(launchList.childElementCount).toBe(3);
    expect(launchList.childNodes[0]).toHaveTextContent('Crew-5ID: 62dd70d5202306255024d139');
    expect(launchList.childNodes[1]).toHaveTextContent('FalconSatID: 5eb87cd9ffd86e000604b32a');
    expect(launchList.childNodes[2]).toHaveTextContent('Starlink-11 (v1.0)ID: 5ef6a1e90059c33cee4a828a');
  });
});
