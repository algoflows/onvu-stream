import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { CardPlayer } from './card-player';

const Story: ComponentMeta<typeof CardPlayer> = {
  component: CardPlayer,
  title: 'CardPlayer',
};
export default Story;

const Template: ComponentStory<typeof CardPlayer> = (args) => (
  <CardPlayer {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
