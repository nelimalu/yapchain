import { useContext } from 'react';
import { NearContext } from '@/context';

export default function Logout() {
    const { signedAccountId, wallet } = useContext(NearContext);

    const handleLogout = () => {
        if (wallet) {
            wallet.signOut();
        }
    };

    return (
        <button onClick={handleLogout}>
            {signedAccountId ? `Logout ${signedAccountId}` : 'Loading...'}
        </button>
    );
}
