export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-10 py-4 text-center border-t text-sm text-gray-600">
      © {year} Library Management. All rights reserved.
    </footer>
  );
};