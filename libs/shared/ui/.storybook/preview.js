// libs/shared/ui/.storybook/preview.js
import './tailwind-imports.css';

import {INITIAL_VIEWPORTS} from '@storybook/addon-viewport';

export const parameters = {
  actions: {argTypesRegex: '^on[A-Z].*'},
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  }
}
