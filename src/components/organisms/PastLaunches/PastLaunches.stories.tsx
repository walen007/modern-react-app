import type { Meta, StoryObj } from '@storybook/react';
import { pastLaunchesMixed } from '@test/past-launches-mixed';
import PastLaunches from '.';

const meta: Meta<typeof PastLaunches> = {
  component: PastLaunches,
};

export default meta;
type Story = StoryObj<typeof PastLaunches>;

export const Default: Story = {
  render: () => <PastLaunches pastLaunches={pastLaunchesMixed} />,
};
