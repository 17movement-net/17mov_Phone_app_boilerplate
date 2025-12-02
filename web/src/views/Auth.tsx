import { useLanguage } from "@/hooks/useLanguage";
import { useNavigateWithApps } from "@/hooks/useNavigateWithApps";
import { useState } from "react";

const AuthLogin = () => {
    const { getLang } = useLanguage();
    const navigate = useNavigateWithApps();
    
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const handleLoginButton = async () => {
        if (!username || !password) {
            setError(getLang('Auth:Messages.FillAllFields'));
            return;
        }

        const response = await handleLogin(username, password);

        if (response.success) {
            navigate('/');
        } else {
            setError(response.message || getLang('Auth:Errors.Error'));
        }
    }

    return (
        <div className='px-4 pt-10 size-full flex flex-col gap-6 justify-end'>
            <h2 className='text-black dark:text-white text-2xl font-bold text-center'>{getLang('Auth:Pages.Login.Title')}</h2>
            <div className='flex flex-col gap-4'>
                <div className='flex flex-col gap-2'>
                    <div className='flex flex-col gap-1'>
                        <label className='text-sm font-medium text-black dark:text-white'>{getLang('Auth:Pages.Login.Form.Username')}</label>
                        <input
                            type='text'
                            className='h-10 text-sm px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#121318] text-black dark:text-white transition duration-300 focus:!border-blue-700 focus:ring-4 focus:ring-blue-700/15 focus:outline-none'
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                                if (error) setError(null);
                            }}
                        />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label className='text-sm font-medium text-black dark:text-white'>{getLang('Auth:Pages.Login.Form.Password')}</label>
                        <input
                            type='password'
                            className='h-10 text-sm px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#121318] text-black dark:text-white transition duration-300 focus:!border-blue-700 focus:ring-4 focus:ring-blue-700/15 focus:outline-none'
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                if (error) setError(null);
                            }}
                        />
                    </div>
                </div>
                <div className='flex flex-col gap-2'>
                    {(error && error?.trim() !== '') && (
                        <p className='text-xs text-center text-red-500'>{getLang(error)}</p>
                    )}
                    <button
                        type='button'
                        className='w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 disabled:opacity-30'
                        disabled={!username || !password}
                        onClick={handleLoginButton}
                    >
                        {getLang('Auth:Pages.Login.Form.Button')}
                    </button>
                    <p className='text-sm text-center text-gray-500 dark:text-gray-400'>
                        {getLang('Auth:Pages.Login.Form.NoAccount')}{' '}
                        <button 
                            type='button' 
                            className='text-blue-600 hover:underline'
                            onClick={() => navigate('/auth/register')}
                        >
                            {getLang('Auth:Pages.Login.Form.NoAccount.Register')}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

const AuthRegister = () => {
    const { getLang } = useLanguage();
    const navigate = useNavigateWithApps();
    
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [repeatPassword, setRepeatPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const handleRegisterButton = async () => {
        if (!username || !password || !repeatPassword) {
            setError(getLang('Auth:Messages.FillAllFields'));
            return;
        }

        if (password !== repeatPassword) {
            setError(getLang('Auth:Messages.InvalidUsernameOrPassword'));
            return;
        }
        const response = await handleRegister(username, password, null);

        if (response.success) {
            navigate('/');
        } else {
            setError(response.message || getLang('Auth:Errors.Error'));
        }
    }

    return (
        <div className='px-4 pt-10 size-full flex flex-col gap-6 justify-end'>
            <h2 className='text-black dark:text-white text-2xl font-bold text-center'>{getLang('Auth:Pages.Register.Title')}</h2>
            <div className='flex flex-col gap-4'>
                <div className='flex flex-col gap-2'>
                    <div className='flex flex-col gap-1'>
                        <label className='text-sm font-medium text-black dark:text-white'>{getLang("Auth:Pages.Register.Form.Username")}</label>
                        <input
                            type='text'
                            className='h-10 text-sm px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#121318] text-black dark:text-white transition duration-300 focus:!border-blue-700 focus:ring-4 focus:ring-blue-700/15 focus:outline-none'
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                                if (error) setError(null);
                            }}
                        />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label className='text-sm font-medium text-black dark:text-white'>{getLang("Auth:Pages.Register.Form.Password")}</label>
                        <input
                            type='password'
                            className='h-10 text-sm px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#121318] text-black dark:text-white transition duration-300 focus:!border-blue-700 focus:ring-4 focus:ring-blue-700/15 focus:outline-none'
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                if (error) setError(null);
                            }}
                        />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label className='text-sm font-medium text-black dark:text-white'>{getLang("Auth:Pages.Register.Form.RepeatPassword")}</label>
                        <input
                            type='password'
                            className='h-10 text-sm px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#121318] text-black dark:text-white transition duration-300 focus:!border-blue-700 focus:ring-4 focus:ring-blue-700/15 focus:outline-none'
                            value={repeatPassword}
                            onChange={(e) => {
                                setRepeatPassword(e.target.value);
                                if (error) setError(null);
                            }}
                        />
                    </div>
                </div>
                <div className='flex flex-col gap-2'>
                    {(error && error?.trim() !== '') && (
                        <p className='text-xs text-center text-red-500'>{getLang(error)}{error}</p>
                    )}
                    <button
                        type='button'
                        className='w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 disabled:opacity-30'
                        disabled={!username || !password || !repeatPassword}
                        onClick={handleRegisterButton}
                    >
                        {getLang("Auth:Pages.Register.Form.Button")}
                    </button>
                    <p className='text-sm text-center text-gray-500 dark:text-gray-400'>
                        {getLang("Auth:Pages.Register.Form.HasAccount")}{' '}
                        <button 
                            type='button' 
                            className='text-blue-600 hover:underline'
                            onClick={() => navigate('/auth')}
                        >
                            {getLang("Auth:Pages.Register.Form.HasAccount.Login")}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export { AuthLogin, AuthRegister };
