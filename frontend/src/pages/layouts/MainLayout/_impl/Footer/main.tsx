/**
 * @component Footer
 * @summary Application footer component
 * @domain core
 * @type layout-component
 * @category layout
 */

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center text-gray-600 text-sm">
          <p>&copy; {currentYear} Triplist. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};
