/**
 * @component MainLayout
 * @summary Main application layout
 * @domain core
 * @type layout-component
 * @category layout
 */

import { Outlet } from 'react-router-dom';
import { Header } from './_impl/Header';
import { Footer } from './_impl/Footer';

export const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
