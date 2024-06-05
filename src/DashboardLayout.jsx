import React from 'react'
import TopBar from './components/TopBar'
import { SideBar } from './components'
import { Outlet } from 'react-router-dom'
function DashboardLayout() {
  return (
    <>
      {/* <TopBar /> */}
    <div className="min-h-screen flex flex-col lg:flex-row text-white">
      <SideBar />
      <div className="z-5 min-h-screen  bg-slate-700 text-white flex items-center justify-center w-full">
        <Outlet />
      </div>
    </div>
    </>
  )
}

export default DashboardLayout