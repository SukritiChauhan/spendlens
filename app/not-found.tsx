export default function NotFound() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center px-6">
        <h1 className="text-6xl font-bold text-emerald-600 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Page not found</h2>
        <p className="text-gray-500 mb-8">The audit you are looking for does not exist.</p>
        <a href="/" className="bg-emerald-600 text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-emerald-700 transition">
          Go to SpendLens
        </a>
      </div>
    </main>
  )
}
