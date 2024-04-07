import type { Meta, StoryObj } from '@storybook/react';
import { ListItem } from '@atoms';
import { UList } from '../UList';

const meta: Meta<typeof UList> = {
  component: UList,
};

export default meta;
type Story = StoryObj<typeof UList>;

export const Default: Story = {
  render: () => (
    <UList>
      <ListItem>List & List Item</ListItem>
    </UList>
  ),
};
