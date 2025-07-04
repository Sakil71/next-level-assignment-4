export const Footer = () => {
  return (
    <footer className="bg-gray-100 py-4 mt-10 border-t text-sm text-gray-600 text-center">
      <p>© {new Date().getFullYear()} - Library Management System. All rights reserved.</p>
      <p>
        Developed by{" "}
        <a
        target="_blank"
          href="https://github.com/Sakil71"
          className="text-blue-600 hover:underline"
        >
          Shakil Ahamed
        </a>
      </p>
    </footer>
  );
};
