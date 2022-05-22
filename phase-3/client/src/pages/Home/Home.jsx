import React from 'react'
import Dashboard from '../../Components/DashBoard/Dashboard';
import ResponsiveAppBar from '../../Components/Navbar/Navbar';
import { userInfo } from '../../utils/auth'
const Home = () => {
  console.log(userInfo());
  return (
    <div>
      {/* <ResponsiveAppBar /> */}
      <div>
        <Dashboard />
      </div>
    </div>
  )
}

export default Home