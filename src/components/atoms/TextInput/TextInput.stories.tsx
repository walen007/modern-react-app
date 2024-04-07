import type { Meta, StoryObj } from '@storybook/react';
import { TextInput } from '.';

const meta: Meta<typeof TextInput> = {
  component: TextInput,
};

export default meta;
type Story = StoryObj<typeof TextInput>;

export const Default: Story = {
  render: () => <TextInput />,
};
