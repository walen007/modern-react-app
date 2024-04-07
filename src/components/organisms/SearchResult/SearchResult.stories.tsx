import type { Meta, StoryObj } from '@storybook/react';
import { pastLaunchesMixed } from '@test/past-launches-mixed';
import SearchResult from '.';

const meta: Meta<typeof SearchResult> = {
  component: SearchResult,
};

export default meta;
type Story = StoryObj<typeof SearchResult>;

export const SuccessfulLaunch: Story = {
  render: () => <SearchResult launch={pastLaunchesMixed[0]} />,
};

export const FailedLaunch: Story = {
  render: () => <SearchResult launch={pastLaunchesMixed[1]} />,
};
