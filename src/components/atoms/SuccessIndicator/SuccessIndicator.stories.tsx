import type { Meta, StoryObj } from '@storybook/react';
import { SuccessIndicator } from '.';

const meta: Meta<typeof SuccessIndicator> = {
  component: SuccessIndicator,
};

export default meta;
type Story = StoryObj<typeof SuccessIndicator>;

export const Successful: Story = {
  render: () => <SuccessIndicator isSuccess={true} />,
};

export const Failed: Story = {
  render: () => <SuccessIndicator isSuccess={false} />,
};
