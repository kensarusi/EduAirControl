import Navbar from '../Navbar/Navbar'
import './DashboardLayout.css'

function DashboardLayout({ children }) {
  return (
    <div className="dashboard-layout">
      <Navbar />
      <main className="dashboard-content">
        {children}
      </main>
    </div>
  )
}

export default DashboardLayout
