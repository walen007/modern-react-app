import type { Meta, StoryObj } from '@storybook/react';
import { PastLaunchList } from '.';
import { pastLaunchesMixed } from '@test/past-launches-mixed';

const meta: Meta<typeof PastLaunchList> = {
  component: PastLaunchList,
};

export default meta;
type Story = StoryObj<typeof PastLaunchList>;

export const Default: Story = {
  render: () => <PastLaunchList pastLaunches={pastLaunchesMixed} />,
};
