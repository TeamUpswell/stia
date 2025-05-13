import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="w-full max-w-md space-y-8 p-6 bg-white rounded-lg shadow-md">
        <div>
          <h1 className="text-3xl font-bold text-center">Welcome to Stia</h1>
          <p className="text-center mt-2">Property management made simple</p>
        </div>
        <div className="mt-8 space-y-4">
          <Link href="/login" 
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
            Log In
          </Link>
          <Link href="/register" 
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}