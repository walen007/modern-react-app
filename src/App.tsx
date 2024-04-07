import { Suspense } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import RootLayout from '@templates/RootLayout';
import { routes } from '@routes';

const App: React.FC = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          {routes.map(({ path, Component }) => (
            <Route
              key={path}
              path={path}
              element={
                <Suspense fallback="TODO: Fallback page loading spinner">
                  <Component />
                </Suspense>
              }
            />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
