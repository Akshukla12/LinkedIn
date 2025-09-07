import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { motion } from 'framer-motion';
import { Github, Mail, User, RefreshCw } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function AuthPage() {
  const { session } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // Redirect to home if a session is found
  useEffect(() => {
    if (session) {
      navigate('/', { replace: true });
    }
  }, [session, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    setLoading(false);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) setError(error.message);
    else setMessage('Check your email for the confirmation link!');
    setLoading(false);
  }

  const handleOAuthLogin = async (provider) => {
    setError('');
    const { error } = await supabase.auth.signInWithOAuth({ provider });
    if (error) setError(error.message);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-card border rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-blue-600 dark:to-blue-400 rounded-2xl shadow-lg mb-4">
              <User className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Welcome Back</h1>
            <p className="text-muted-foreground">Sign in to continue</p>
          </div>

          {error && <p className="mb-4 text-center text-sm bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-xl">{error}</p>}
          {message && <p className="mb-4 text-center text-sm bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 px-4 py-3 rounded-xl">{message}</p>}

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-muted-foreground mb-2" htmlFor="email">Email</label>
              <input
                id="email"
                className="w-full px-4 py-3 bg-transparent border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-muted-foreground mb-2" htmlFor="password">Password</label>
              <input
                id="password"
                className="w-full px-4 py-3 bg-transparent border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleLogin}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold py-3 px-4 rounded-xl hover:bg-primary/90 transition-colors duration-200 disabled:opacity-50"
              >
                {loading ? <RefreshCw className="animate-spin w-5 h-5" /> : 'Sign In'}
              </button>
               <button
                onClick={handleSignup}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-secondary text-secondary-foreground font-semibold py-3 px-4 rounded-xl hover:bg-secondary/80 transition-colors duration-200 disabled:opacity-50"
              >
                {loading ? <RefreshCw className="animate-spin w-5 h-5" /> : 'Sign Up'}
              </button>
            </div>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <button
            onClick={() => handleOAuthLogin('github')}
            className="w-full flex items-center justify-center gap-3 border font-medium py-3 px-4 rounded-xl hover:bg-accent transition-colors duration-200"
          >
            <Github className="w-5 h-5" />
            Sign in with GitHub
          </button>
        </div>
      </motion.div>
    </div>
  );
}
