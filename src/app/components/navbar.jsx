export default function Navbar() {
    return (
      <nav className="bg-blue-600 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <a href="/admin/dashboard" className="text-white text-xl font-bold">
            Internship Portal
          </a>
          <div className="space-x-4">
            <a href="/admin/dashboard" className="text-white hover:text-gray-200">
              Dashboard
            </a>
            <a href="/login" className="text-white hover:text-gray-200">
              Logout
            </a>
          </div>
        </div>
      </nav>
    );
  }