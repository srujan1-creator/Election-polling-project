import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Mail, ChevronRight, UserPlus } from 'lucide-react';
import './LoginOverlay.css'; // Let's put styles there

export function LoginOverlay() {
  const { isAuthenticated, login } = useAuth();
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLoginView) {
        // Login Request
        const params = new URLSearchParams();
        params.append('username', email); // OAuth2 expects username
        params.append('password', password);

        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: params
        });

        if (!res.ok) throw new Error('Invalid credentials');
        const data = await res.json();
        login(data.access_token);
      } else {
        // Signup Request
        const res = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        
        if (!res.ok) {
            const errData = await res.json();
            throw new Error(errData.detail || 'Failed to sign up');
        }
        
        // Auto-login logic could be here, or just inform success
        alert('Signup successful! Please log in.');
        setIsLoginView(true);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div 
        className="auth-overlay pointer-events-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
        transition={{ duration: 0.8 }}
      >
        <div className="auth-box glass-panel">
          <div className="auth-header">
             <h2>{isLoginView ? 'Welcome Back' : 'Join the Demo'}</h2>
             <p>{isLoginView ? 'Authenticate to access the 3D Election Guide.' : 'Register to unlock the full 3D experience.'}</p>
          </div>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="input-group">
                <Mail size={18} className="input-icon" />
                <input 
                  type="email" 
                  placeholder="Enter email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
            </div>
            
            <div className="input-group">
                <Lock size={18} className="input-icon" />
                <input 
                  type="password" 
                  placeholder="Enter password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
            </div>

            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? 'Processing...' : (isLoginView ? 'Unlock Experience' : 'Create Account')}
              {!loading && (isLoginView ? <ChevronRight size={18} /> : <UserPlus size={18} />)}
            </button>
          </form>

          <div className="auth-toggle">
            <p>
               {isLoginView ? 'Don\'t have an account?' : 'Already have an account?'}
               <button onClick={() => { setIsLoginView(!isLoginView); setError(''); }}>
                 {isLoginView ? 'Sign Up' : 'Log In'}
               </button>
            </p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
