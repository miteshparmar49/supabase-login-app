// pages/dashboard.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabaseClient';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      const currentSession = data?.session;

      if (!currentSession) {
        router.push('/login');
      } else {
        setSession(currentSession);
      }

      setLoading(false);
    };

    getSession();
  }, [router]);

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Welcome to the Dashboard</h1>
      <p>User Email: {session?.user?.email}</p>

      <button
        onClick={async () => {
          await supabase.auth.signOut();
          router.push('/login');
        }}
        style={{ marginTop: '1rem' }}
      >
        Logout
      </button>
    </div>
  );
}


