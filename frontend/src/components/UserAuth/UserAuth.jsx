import { useState } from 'react';
import PropTypes from 'prop-types';
import { useSignup } from '../../hooks/useSignUp';
import { useLogin } from '../../hooks/useLogin'
// import { useLogin } from '..//../hooks/useLogin'

function UserAuth({ onClose, initialMode }) {
  const [mode, setMode] = useState(initialMode); // "login" or "signup"
  const {signup, error, isLoading} = useSignup()
  const {login, errorLog, isLoadingLog} = useLogin()


  
  // Login form states
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  // Signup form states
  const [signupUsername, setSignupUsername] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [email, setEmail] = useState('');
  const [permission, setPermission] = useState('');
  const [license, setLicense] = useState('');
  const [birthdate, setBirthdate] = useState('');

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    await login(username, password)
    console.log("Login", { username, password, rememberMe });
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    await signup(email, signupPassword, signupUsername, permission, license, birthdate)
    console.log("Signup", {email, signupPassword, signupUsername, permission, license, birthdate });
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 p-5 rounded-lg max-w-lg w-full mx-4">
        <div className="flex justify-between items-center mb-5">
          <button onClick={() => setMode("login")} className={`px-4 py-2 rounded-md ${mode === "login" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}>Login</button>
          <button onClick={() => setMode("signup")} className={`px-4 py-2 rounded-md ${mode === "signup" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}>SignUp</button>
          <button onClick={onClose} className="text-gray-600 dark:text-gray-400 text-2xl">&times;</button>
        </div>
        
        {mode === "login" ? (
          <form onSubmit={handleLoginSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900">Remember me</label>
              </div>
              <a href="#forgot-password" className="text-sm text-blue-600 hover:text-blue-500">Forgot password?</a>
            </div>
            <button type="submit" disabled={isLoadingLog} className="w-full px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none">Login</button>
            {errorLog && <div className="block text-sm font-medium text-gray-700">{errorLog}</div>}
          </form>
        ) : (
          <form onSubmit={handleSignupSubmit}>
             <div className="mb-4">
              <label htmlFor="signupUsername" className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                id="signupUsername"
                value={signupUsername}
                onChange={(e) => setSignupUsername(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="permission" className="block text-sm font-medium text-gray-700">Permission</label>
              <input
                type="text"
                id="permission"
                value={permission}
                onChange={(e) => setPermission(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="signupPassword" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="signupPassword"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="license" className="block text-sm font-medium text-gray-700">License</label>
              <input
                type="text"
                id="license"
                value={license}
                onChange={(e) => setLicense(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="birthdate" className="block text-sm font-medium text-gray-700">Birthdate</label>
              <input
                type="date"
                id="birthdate"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button type="submit" disabled={isLoading} className="w-full px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none">SignUp</button>
            {error && <div className="block text-sm font-medium text-gray-700">{error}</div>}
          </form>
        )}
      </div>
    </div>
  );
}

UserAuth.propTypes = {
  onClose: PropTypes.func.isRequired, // onClose should be a function and is required
  initialMode: PropTypes.string.isRequired, // initialMode should be a string and is required
};

export default UserAuth;
