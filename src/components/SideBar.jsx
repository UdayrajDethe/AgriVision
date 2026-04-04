import React, { useState } from 'react'
import './SideBar.css'
import agrivision from '../assets/agriVision.png'

export default function SideBar() {

    const [active, setActive] = useState('Dashboard')

    const items = [
        { label: 'Dashboard', icon: '🏠' },
        { label: 'Upload', icon: '📤' },
        { label: 'Analysis', icon: '🔬' },
        { label: 'Settings', icon: '⚙️' }
    ]

    return (
        <>
            <div className='sidebar text-center'>
                    <div className="sidebar-header">
                        <img src={agrivision} alt="AgriVision Logo" width="32px" />
                        <h2>AgriVision</h2>
                    </div>
                    <div className="sidebar-items">
                       {
                        items.map((item) => (
                            <a 
                                key={item.label}
                                href="#"
                                className={active === item.label ? 'active' : ''}
                                onClick={(e) =>{e.preventDefault(); setActive(item.label);}}
                            >   
                                <span className="icon">{item.icon}</span>
                                {item.label}
                            </a>
                       ))}
                    </div>
                    <div className="sidebar-footer">
                        <a href="#">🚪 Logout</a>
                    </div>
            </div>
        </>
    )

    
  };
