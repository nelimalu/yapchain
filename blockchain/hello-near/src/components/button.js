//button.js
import Link from 'next/link';
import { useEffect, useState, useContext } from 'react';

import { NearContext } from '@/context';

export default function Button() {
    const { signedAccountId, wallet } = useContext(NearContext);
    const [action, setAction] = useState(() => { });
    const [label, setLabel] = useState('Loading...');

    useEffect(() => {
      if (!wallet) return;

      if (signedAccountId) {
        setAction(() => wallet.signOut);
        setLabel(`Logout ${signedAccountId}`);
      } else {
        setAction(() => wallet.signIn);
        setLabel('Login');
      }
    }, [signedAccountId, wallet]);
    return (
        <div className='navbar-nav pt-1'>
          <button className="btn btn-secondary" onClick={action} > {label} </button>
        </div>
    )
}