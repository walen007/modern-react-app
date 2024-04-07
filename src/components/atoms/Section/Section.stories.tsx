import type { Meta, StoryObj } from '@storybook/react';
import { Section } from '.';

const meta: Meta<typeof Section> = {
  component: Section,
};

export default meta;
type Story = StoryObj<typeof Section>;

export const Default: Story = {
  render: () => <Section>Section component</Section>,
};
