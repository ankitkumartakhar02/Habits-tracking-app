
import React, { useState, useEffect } from 'react';
import { User } from './types';
import { authService } from './services/authService';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(authService.getCurrentUser());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate checking auth status on initial load
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
    setIsLoading(false);
  }, []);
  
  const handleLogin = () => {
    const loggedInUser = authService.loginWithGoogle();
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
  };

  if (isLoading) {
    return <div className="bg-gray-50 min-h-screen"></div>; // Or a proper loading spinner
  }

  return (
    <>
      <div className="fixed inset-0 -z-10 h-full w-full bg-gray-50">
        <div 
          className="absolute inset-0 h-full w-full bg-[radial-gradient(circle_500px_at_50%_200px,var(--color-gradient-from),transparent),radial-gradient(circle_500px_at_10%_80%,var(--color-gradient-via),transparent),radial-gradient(circle_500px_at_90%_90%,var(--color-gradient-to),transparent)] opacity-10"
          style={{
            backgroundSize: '200% 200%',
            animation: 'mesh-gradient 20s ease-in-out infinite',
          }}
        ></div>
      </div>
      
      <div className="relative min-h-screen">
        {user ? <DashboardScreen user={user} onLogout={handleLogout} /> : <LoginScreen onLogin={handleLogin} />}
      </div>
    </>
  );
};

export default App;
