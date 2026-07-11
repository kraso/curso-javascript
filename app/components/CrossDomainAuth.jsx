import { useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function CrossDomainAuth() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hash = window.location.hash.slice(1);
    if (!hash) return;

    const params = new URLSearchParams(hash);
    const access_token = params.get('access_token');
    const refresh_token = params.get('refresh_token');

    if (access_token && refresh_token) {
      supabase.auth.setSession({ access_token, refresh_token }).then(({ data, error }) => {
        if (!error && data.session) {
          window.dispatchEvent(new CustomEvent('supabase:session-set', { detail: data.session }));
        }
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      });
    }
  }, []);

  return null;
}
