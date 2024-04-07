import { Outlet } from 'react-router-dom';

const RootLayout = (): JSX.Element => {
  return (
    <>
      <header>{/* TODO: app header */}</header>
      <main className="content">
        <Outlet />
      </main>
      <footer>{/* TODO: app footer */}</footer>
    </>
  );
};

export default RootLayout;
