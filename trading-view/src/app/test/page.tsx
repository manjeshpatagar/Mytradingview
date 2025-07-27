export default function TestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">
          Tailwind Test
        </h1>
        
        <div className="space-y-4">
          <div className="p-4 bg-blue-500 text-white rounded-lg">
            Blue background with white text
          </div>
          
          <div className="p-4 bg-green-500 text-white rounded-lg">
            Green background with white text
          </div>
          
          <div className="p-4 bg-red-500 text-white rounded-lg">
            Red background with white text
          </div>
          
          <div className="p-4 bg-yellow-500 text-black rounded-lg">
            Yellow background with black text
          </div>
          
          <div className="p-4 bg-purple-500 text-white rounded-lg">
            Purple background with white text
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">
            If you can see colored boxes above, Tailwind is working!
          </p>
          <a 
            href="/" 
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
} 