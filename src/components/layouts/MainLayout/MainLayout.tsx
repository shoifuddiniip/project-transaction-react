import React, { useState, ReactNode } from 'react';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import styles from './mainlayout.module.css';

interface AppLayoutProps {
  children: ReactNode;
}

const MainLayout:React.FC<AppLayoutProps> = ({children}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className={styles.root}>
      <div className={[styles.sidebar, isSidebarOpen ? styles.open : ''].join(" ")}>
        <Sidebar isOpen={isSidebarOpen} />
      </div>
      <div className={[styles.maincontent, isSidebarOpen ? styles.shifted : ''].join(" ")}>
        <Navbar 
          isSidebarOpen={isSidebarOpen}
          onToogleSlidebar={toggleSidebar}
        />
        <div
          style={{
            padding: 20,
          }}
        >
          {/* Your main content */}
          {children}
        </div>
      </div>
      </div>
    </>
  );
}

export default MainLayout;
