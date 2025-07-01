import React from "react";

export default function BeeziaVioletDashboard() {
  return (
    <div className="flex min-h-screen bg-white font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r px-6 py-8">
        <h1 className="text-2xl font-extrabold text-black mb-10">Beezia</h1>
        <nav className="flex flex-col gap-4">
          <a href="#" className="flex items-center text-purple-600 font-semibold">
            <span className="w-3 h-3 mr-2 rounded-full bg-purple-600"></span>
            Dashboard
          </a>
          <a href="#" className="text-gray-600 hover:text-purple-600">Notems</a>
          <a href="#" className="text-gray-600 hover:text-purple-600">Plok</a>
          <a href="#" className="text-gray-600 hover:text-purple-600">Okasier</a>
          <a href="#" className="text-gray-600 hover:text-purple-600">Hehar</a>
          <a href="#" className="text-gray-600 hover:text-purple-600">Brouch</a>
          <a href="#" className="text-gray-600 hover:text-purple-600">Arms</a>
        </nav>
      </aside>

      {/* Main Section */}
      <main className="flex-1 p-6">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Dashboard</h2>
          <button className="flex items-center bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
            🤖 Dashbord
          </button>
        </div>

        {/* Top Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-10">
          {/* Bee Mascot */}
          <div className="bg-purple-500 rounded-xl p-4 flex items-center justify-center">
            <img src="/bee-mascot-violet.png" alt="Bee Mascot" className="h-48 object-contain" />
          </div>

          {/* Stats Cards */}
          <div className="xl:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-xl shadow">
              <p className="text-sm text-gray-500">Prinmoer</p>
              <p className="text-2xl font-bold">$256K</p>
              <p className="text-sm text-gray-400">Sehrongot</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow">
              <p className="text-sm text-gray-500">And Mows</p>
              <p className="text-2xl font-bold">$459K</p>
              <button className="mt-2 text-xs bg-purple-100 text-purple-600 px-3 py-1 rounded">Scale</button>
            </div>
            <div className="bg-white p-6 rounded-xl shadow col-span-2">
              <p className="text-sm text-gray-500">Rooktont</p>
              <p className="text-2xl font-bold">$549K</p>
              <img src="/graph-line-purple.png" alt="Line Graph" className="mt-4 w-full" />
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">New ciur competitite</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">New comsider</p>
              <img src="/bar-chart-violet.png" alt="Bar Chart" className="mt-2 w-full" />
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-600 mb-2">Sochetiorid</p>
              <div className="text-3xl font-bold text-purple-700">8994</div>
              <p className="text-sm text-gray-400">Sharengot</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <img src="/bar-chart-2-violet.png" alt="Chart 2" className="w-full" />
              <button className="mt-2 w-full bg-purple-600 text-white py-1 rounded text-sm">Dashboord</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}