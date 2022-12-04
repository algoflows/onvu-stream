import React from 'react';
import { RouterProvider } from '@tanstack/react-router';
// import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { router } from './router/index';
import { RootLayout } from './components/layouts/root-layout';

export function App() {
  return (
    <RouterProvider router={router}>
      {/* <TanStackRouterDevtools /> */}
      <RootLayout />
    </RouterProvider>
  );
}

export default App;
