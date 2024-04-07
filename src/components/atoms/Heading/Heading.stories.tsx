import type { Meta, StoryObj } from '@storybook/react';
import { Heading } from '.';

const meta: Meta<typeof Heading> = {
  component: Heading,
};

export default meta;
type Story = StoryObj<typeof Heading>;

export const Default: Story = {
  render: () => <Heading>Default H2 heading</Heading>,
};

export const H1: Story = {
  render: () => <Heading HeadingTag="h1">H1 heading</Heading>,
};
