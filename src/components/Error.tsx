interface ErrorProps {
  message?: string;
}

export const Error = ({ message = "Something went wrong!" }: ErrorProps) => {
  return (
    <div className="flex items-center justify-center h-40">
      <p className="text-red-600 text-lg font-semibold">{message}</p>
    </div>
  );
};
