import { render } from '@test/test-utils';
import { pastLaunchesMixed } from '@test/past-launches-mixed';
import SearchResult from '.';

describe('<SearchResult />', () => {
  beforeEach(() => {
    const mockedDate = new Date('2024-02-10T12:00:00Z');

    vi.useFakeTimers();
    vi.setSystemTime(mockedDate);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('-- should render successful SpaceX launch', () => {
    const id = 'card001';
    const { getByTestId } = render(<SearchResult data-testid={id} launch={pastLaunchesMixed[0]} />);
    const launchCard = getByTestId(id);
    expect(launchCard).toHaveTextContent('Crew-5Elapsed time since launch529:00:00ID: 62dd70d5202306255024d139');

    const indicator = getByTestId('success-indicator');
    expect(indicator.getAttribute('aria-description')).toBe(
      'Success Indicator: The SpaceX Crew-5 was a successful launch'
    );
  });

  it('-- should render failed SpaceX launch', () => {
    const id = 'card002';
    const { getByTestId } = render(<SearchResult data-testid={id} launch={pastLaunchesMixed[1]} />);
    const launchCard = getByTestId(id);
    expect(launchCard).toHaveTextContent('FalconSatElapsed time since launch6775:30:00ID: 5eb87cd9ffd86e000604b32a');

    const indicator = getByTestId('success-indicator');
    expect(indicator.getAttribute('aria-description')).toBe(
      'Success Indicator: The SpaceX FalconSat was not a successful launch'
    );
  });
});
