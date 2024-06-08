import 'react'
import '../assets/login.css'

export default function Login() {
    return (
        <>
            <div className='login min-w-12 min-h-16 px-8 py-24 flex flex-col'>
                <h1>YapChain</h1>
                <input name='username' placeholder='username'/>
            </div>
        </>
    )
}