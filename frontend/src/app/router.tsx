/**
 * @router AppRouter
 * @summary Main application routing configuration
 * @description Defines all application routes with lazy loading
 */

import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainLayout } from '@/pages/layouts/MainLayout';
import { LoadingSpinner } from '@/core/components/LoadingSpinner';

const HomePage = lazy(() => import('@/pages/Home'));
const ChecklistsPage = lazy(() => import('@/pages/Checklists'));
const ChecklistNewPage = lazy(() => import('@/pages/ChecklistNew'));
const ChecklistEditPage = lazy(() => import('@/pages/ChecklistEdit'));
const ChecklistDetailPage = lazy(() => import('@/pages/ChecklistDetail'));
const NotFoundPage = lazy(() => import('@/pages/NotFound'));

export const AppRouter = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="checklists" element={<ChecklistsPage />} />
          <Route path="checklists/new" element={<ChecklistNewPage />} />
          <Route path="checklists/:id" element={<ChecklistDetailPage />} />
          <Route path="checklists/:id/edit" element={<ChecklistEditPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
