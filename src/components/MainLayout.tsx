import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface MainLayoutProps {
  children: ReactNode;
  currentPage: string;
  onPageChange: (page: string) => void;
  onLogout: () => void;
}

export function MainLayout({ children, currentPage, onPageChange, onLogout }: MainLayoutProps) {
  return (
    <div className="flex h-screen bg-slate-800">
      {/* Sidebar - Hidden on mobile, visible on desktop */}
      <div className="hidden lg:block">
        <Sidebar 
          currentPage={currentPage} 
          onPageChange={onPageChange}
          onLogout={onLogout}
        />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header currentPage={currentPage} title="" />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Navigation - Bottom bar for mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50">
        <div className="bg-slate-900 border-t border-slate-700 px-4 py-2">
          <div className="flex justify-around items-center">
            <button 
              onClick={() => onPageChange('dashboard')}
              className={`p-3 rounded-lg transition-colors ${
                currentPage === 'dashboard' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </button>
            <button 
              onClick={() => onPageChange('workout')}
              className={`p-3 rounded-lg transition-colors ${
                currentPage === 'workout' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
            </button>
            <button 
              onClick={() => onPageChange('feed')}
              className={`p-3 rounded-lg transition-colors ${
                currentPage === 'feed' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
              </svg>
            </button>
            <button 
              onClick={() => onPageChange('chat')}
              className={`p-3 rounded-lg transition-colors ${
                currentPage === 'chat' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
              </svg>
            </button>
            <button 
              onClick={() => onPageChange('profile')}
              className={`p-3 rounded-lg transition-colors ${
                currentPage === 'profile' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}