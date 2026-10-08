export function Spinner() {
  return (
    <div className="flex justify-center items-center my-12">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );
}

export function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 my-8 rounded shadow-sm max-w-2xl mx-auto">
      <p className="font-bold">Hoppla!</p>
      <p>{message}</p>
    </div>
  );
}
