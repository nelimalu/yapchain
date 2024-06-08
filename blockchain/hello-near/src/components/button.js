//button.js
import Link from 'next/link';
import { useEffect, useState, useContext } from 'react';

import { NearContext } from '@/context';
import { useRouter } from 'next/router';

export default function Button() {
    const { signedAccountId, wallet } = useContext(NearContext);
    const [action, setAction] = useState(() => { });
    const [label, setLabel] = useState('Loading...');
    const router = useRouter()
    useEffect(() => {
      if (!wallet) return;
        
      if (signedAccountId) {
        router.push("/yapper")
        
        setAction(() => wallet.signOut);
        setLabel(`Logout ${signedAccountId}`);
      } else {
        setAction(() => wallet.signIn);
        setLabel('Login');
      }
    }, [signedAccountId, wallet]);
    return (
        <div className='navbar-nav pt-1'>
          <button className="btn pixel-corners btn-secondary" onClick={action} > {label} </button>
        </div>
    )
}