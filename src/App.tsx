import React, { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { GlobalSearchModal } from './components/layout/GlobalSearchModal';
import { NavigationSection } from './types';

// Pages
import { HomePage } from './pages/HomePage';
import { QnaPage } from './pages/QnaPage';
import { MaterialsDictPage } from './pages/MaterialsDictPage';
import { LightsDictPage } from './pages/LightsDictPage';
import { CamerasDictPage } from './pages/CamerasDictPage';
import { ControllersDictPage } from './pages/ControllersDictPage';
import { LibraryGalleryPage } from './pages/LibraryGalleryPage';
import { ComponentDetailPage } from './pages/ComponentDetailPage';
import { ArchitecturePage } from './pages/ArchitecturePage';
import { LiveSandboxPage } from './pages/LiveSandboxPage';

export function App() {
  const [activeSection, setActiveSection] = useState<NavigationSection>('home');
  const [selectedComponentId, setSelectedComponentId] = useState<string>('holographic-card');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  const handleNavigate = (section: NavigationSection, itemId?: string) => {
    setActiveSection(section);
    if (section === 'component-detail' && itemId) {
      setSelectedComponentId(itemId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectComponent = (componentId: string) => {
    setSelectedComponentId(componentId);
    setActiveSection('component-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderActivePage = () => {
    switch (activeSection) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'qna':
        return <QnaPage />;
      case 'materials':
        return <MaterialsDictPage />;
      case 'lights':
        return <LightsDictPage />;
      case 'cameras':
        return <CamerasDictPage />;
      case 'controllers':
        return <ControllersDictPage />;
      case 'library':
        return (
          <LibraryGalleryPage
            onSelectComponent={handleSelectComponent}
            onNavigate={handleNavigate}
          />
        );
      case 'component-detail':
        return (
          <ComponentDetailPage
            componentId={selectedComponentId}
            onNavigate={handleNavigate}
          />
        );
      case 'architecture':
        return <ArchitecturePage />;
      case 'sandbox':
        return <LiveSandboxPage />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#07090e' }}>
      {/* Top Fixed Header */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main App Body with Sidebar and Content */}
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar
          activeSection={activeSection}
          onNavigate={handleNavigate}
        />

        {/* Content Viewport Container */}
        <main style={{
          flex: 1,
          padding: '24px 36px',
          maxWidth: '1440px',
          margin: '0 auto',
          width: '100%',
          overflowX: 'hidden',
        }}>
          {renderActivePage()}
        </main>
      </div>

      {/* Global Search Dialog */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleNavigate}
      />
    </div>
  );
}

export default App;
