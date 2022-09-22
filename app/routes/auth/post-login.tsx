import { useEffect } from 'react';

export default function PostLogin() {
  useEffect(() => {
    if (window) {
      setTimeout(() => {
        window.close();
      }, 2000);
    }
  }, []);

  return <div>Redirecting you back to application...</div>;
}
