import BillDashboard from "./components/BillDashboard";

function App() {
  return (
    <div className="min-h-screen bg-green-100 text-gray-800">
      <header className="bg-indigo-700 text-white py-4 text-center text-xl font-bold">
        Bill Manager
      </header>
      <main className="p-4">
        <BillDashboard />
      </main>
    </div>
  );
}

export default App;
