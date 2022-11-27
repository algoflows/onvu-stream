import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SharedUi } from './shared-ui';

const Story: ComponentMeta<typeof SharedUi> = {
  component: SharedUi,
  title: 'SharedUi',
};
export default Story;

const Template: ComponentStory<typeof SharedUi> = (args) => (
  <SharedUi {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
