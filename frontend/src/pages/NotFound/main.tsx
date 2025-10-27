/**
 * @page NotFoundPage
 * @summary 404 Not Found page
 * @domain core
 * @type page-component
 * @category error
 */

import { useNavigate } from 'react-router-dom';
import { Button } from '@/core/components/Button';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Página não encontrada</h2>
      <p className="text-gray-600 mb-8">
        A página que você está procurando não existe ou foi movida.
      </p>
      <Button variant="primary" size="lg" onClick={() => navigate('/')}>
        Voltar para Início
      </Button>
    </div>
  );
};

export default NotFoundPage;
