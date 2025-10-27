/**
 * @page HomePage
 * @summary Home page component
 * @domain core
 * @type page-component
 * @category public
 */

import { Button } from '@/core/components/Button';

export const HomePage = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-gray-900">Bem-vindo ao Triplist</h1>
        <p className="text-xl text-gray-600">
          Sistema de checklist para viagens - Organize suas viagens com facilidade
        </p>
        <div className="flex justify-center gap-4 mt-8">
          <Button variant="primary" size="lg">
            Começar Agora
          </Button>
          <Button variant="secondary" size="lg">
            Saiba Mais
          </Button>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Checklists Personalizados</h2>
          <p className="text-gray-600">
            Crie listas personalizadas de itens para diferentes tipos de viagens: praia, negócios,
            internacional e muito mais.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Marcação de Itens</h2>
          <p className="text-gray-600">
            Marque os itens já separados ou empacotados para sua viagem e acompanhe seu progresso em
            tempo real.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
