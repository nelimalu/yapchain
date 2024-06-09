import { useState, useContext, useEffect } from 'react';
import { NearContext } from '@/context';
import { useRouter } from 'next/router';

export default function Logout() {
    const { signedAccountId, wallet } = useContext(NearContext);
    const [counter, setCounter] = useState(5);
    const router = useRouter();
    
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const countdown = async (count) => {
        if (count > 0) {
            await sleep(1000);
            setCounter(count - 1);
            countdown(count - 1);
        } else {
            router.push('/'); // Redirect to home or another page after countdown
        }
    };

    const handleLogout = async () => {
        if (wallet) {
            wallet.signOut();
            await countdown(counter);
        }
    };

    return (
        <div style={{ height: "100vh" }} className="w-full flex justify-center items-center">
            <button onClick={handleLogout} className='btn pixel' style={{ padding: "24px 38px" }}>
                {signedAccountId 
                    ? `Logout of your account: ${signedAccountId}` 
                    : `Successfully Logged Out, redirecting you in ${counter} seconds`}
            </button>
        </div>
    );
}
