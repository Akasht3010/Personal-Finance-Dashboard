import { useAuth } from '../../contexts/AuthContext';

export default function Dashboard(){
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white px-6 py-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <span className="text-3xl">💰</span>
            Personal Finance Dashboard
          </h1>
          <h1>
            <span className="text-3xl">👤</span>
            Hello {user?.username || 'User'}
          </h1>
          <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105" onClick={logout}>
            Logout
          </button>
        </div>
      </nav>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Balance Card */}
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-700">Total Balance</h2>
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                <span className="text-indigo-600 text-lg">💳</span>
              </div>
            </div>
            <p className="text-4xl font-bold text-indigo-600 mb-2">$12,450</p>
            <p className="text-sm text-green-500 font-medium">+2.4% from last month</p>
          </div>

          {/* Income Card */}
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-700">Monthly Income</h2>
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-lg">📈</span>
              </div>
            </div>
            <p className="text-4xl font-bold text-green-500 mb-2">$4,200</p>
            <p className="text-sm text-green-500 font-medium">+8.1% from last month</p>
          </div>

          {/* Expenses Card */}
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-700">Monthly Expenses</h2>
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-red-600 text-lg">📉</span>
              </div>
            </div>
            <p className="text-4xl font-bold text-red-500 mb-2">$1,890</p>
            <p className="text-sm text-red-500 font-medium">+5.3% from last month</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
          {/* Recent Transactions */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-slate-800">Recent Transactions</h2>
                <button className="text-indigo-600 hover:text-indigo-700 font-medium text-sm">View All</button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors duration-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <span className="text-orange-600">🛒</span>
                    </div>
                    <div>
                      <p className="font-medium text-slate-800">Grocery Shopping</p>
                      <p className="text-sm text-slate-500">Today, 2:30 PM</p>
                    </div>
                  </div>
                  <span className="text-lg font-semibold text-red-500">-$120</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors duration-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600">💼</span>
                    </div>
                    <div>
                      <p className="font-medium text-slate-800">Salary Deposit</p>
                      <p className="text-sm text-slate-500">Yesterday, 9:00 AM</p>
                    </div>
                  </div>
                  <span className="text-lg font-semibold text-green-500">+$3,500</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors duration-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-red-600">📺</span>
                    </div>
                    <div>
                      <p className="font-medium text-slate-800">Netflix Subscription</p>
                      <p className="text-sm text-slate-500">2 days ago</p>
                    </div>
                  </div>
                  <span className="text-lg font-semibold text-red-500">-$15</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors duration-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600">⛽</span>
                    </div>
                    <div>
                      <p className="font-medium text-slate-800">Gas Station</p>
                      <p className="text-sm text-slate-500">3 days ago</p>
                    </div>
                  </div>
                  <span className="text-lg font-semibold text-red-500">-$45</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200">
            <div className="p-6 border-b border-slate-200">
              <h2 className="text-xl font-semibold text-slate-800">Quick Actions</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <button className="flex flex-col items-center justify-center p-6 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 hover:scale-105">
                  <span className="text-2xl mb-2">➕</span>
                  <span className="font-medium text-center">Add Income</span>
                </button>
                <button className="flex flex-col items-center justify-center p-6 rounded-xl bg-gradient-to-br from-red-500 to-pink-600 text-white hover:from-red-600 hover:to-pink-700 transition-all duration-200 hover:scale-105">
                  <span className="text-2xl mb-2">➖</span>
                  <span className="font-medium text-center">Add Expense</span>
                </button>
                <button className="flex flex-col items-center justify-center p-6 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 transition-all duration-200 hover:scale-105">
                  <span className="text-2xl mb-2">📊</span>
                  <span className="font-medium text-center">View Reports</span>
                </button>
                <button className="flex flex-col items-center justify-center p-6 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 text-white hover:from-orange-600 hover:to-amber-700 transition-all duration-200 hover:scale-105">
                  <span className="text-2xl mb-2">🎯</span>
                  <span className="font-medium text-center">Set Budget</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Spending Overview */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-xl font-semibold text-slate-800">Spending Overview</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🍕</span>
                </div>
                <p className="font-medium text-slate-800 mb-1">Food</p>
                <p className="text-2xl font-bold text-blue-600 mb-1">$450</p>
                <p className="text-sm text-slate-500">24% of budget</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🏠</span>
                </div>
                <p className="font-medium text-slate-800 mb-1">Housing</p>
                <p className="text-2xl font-bold text-purple-600 mb-1">$1,200</p>
                <p className="text-sm text-slate-500">64% of budget</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🚗</span>
                </div>
                <p className="font-medium text-slate-800 mb-1">Transport</p>
                <p className="text-2xl font-bold text-green-600 mb-1">$180</p>
                <p className="text-sm text-slate-500">9% of budget</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🎬</span>
                </div>
                <p className="font-medium text-slate-800 mb-1">Entertainment</p>
                <p className="text-2xl font-bold text-pink-600 mb-1">$60</p>
                <p className="text-sm text-slate-500">3% of budget</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
