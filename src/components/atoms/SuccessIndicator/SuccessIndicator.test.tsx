import { render } from '@test/test-utils';
import { SuccessIndicator } from '.';

describe('<SuccessIndicator />', () => {
  it('--- should render successful launch indicator', async () => {
    const id = 'indicate001';
    const { getByTestId } = render(<SuccessIndicator isSuccess data-testid={id} />);
    const indicator = getByTestId(id);
    expect(indicator).toHaveClass('_successfulLaunch_cc6553');
  });

  it('--- should render unsuccessful launch indicator', async () => {
    const id = 'indicate002';
    const { getByTestId } = render(<SuccessIndicator isSuccess={false} data-testid={id} />);
    const indicator = getByTestId(id);
    expect(indicator).toHaveClass('_failedLaunch_cc6553');
  });
});
