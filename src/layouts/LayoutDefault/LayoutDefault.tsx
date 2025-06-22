import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import HelpButton from '../../components/HelpButton'
import { useTours } from '../../hooks/useTours'
import './LayoutDefault.css'

const LayoutDefault: React.FC = () => {
  // Initialize tours - this will auto-start welcome tour for new users
  useTours()

  return (
    <div className='layout-default'>
      <Header />

      {/* Main Content */}
      <main className='main-content'>
        <Outlet />
      </main>

      <Footer />
      <HelpButton />
    </div>
  )
}

export default LayoutDefault
