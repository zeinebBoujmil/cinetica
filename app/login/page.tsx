'use client';
import { useLogin } from "./useCase/useLogin";
import "/app/globals.css";

export default function Login() {
  const {
    userName,
    password,
    errMsg,
    welcomeMessage,
    setUserName,
    setPassword,
    handleLogin,
    goToSignUp,
  } = useLogin();

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-800">
      {/* Image de fond */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/arrierePlan.jpg"
          alt="Background"
          className="filter blur-[1px] w-full h-full object-cover"
        />
      </div>

      {/* Formulaire de connexion */}
      <div className="relative z-10 bg-white bg-opacity-90 p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
        <div className="flex justify-center mb-6">
          <img
            src="/images/clapperboard.png"
            alt="Logo"
            width={50}
            height={50}
            className="object-contain"
          />
        </div>

        <h2 className="text-2xl font-bold text-center mb-6">Log In</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-semibold mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#0A2540] text-white py-2 rounded-lg font-semibold hover:bg-[#081C33] transition duration-200"
          >
            Log In
          </button>
        </form>

        <button
          onClick={goToSignUp}
          className="mt-4 w-full bg-white text-[#0A2540] py-2 rounded-lg font-semibold hover:bg-[#0A2540] hover:text-white transition duration-200"
        >
          Sign Up
        </button>
      </div>

      {errMsg && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-3xl font-bold mb-4">{errMsg}</h2>
            <p>Nom d'utilisateur ou mot de passe incorrect.</p>
          </div>
        </div>
      )}
      {welcomeMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-3xl font-bold mb-4">{welcomeMessage}</h2>
            <p>Redirection vers votre page d'accueil Cinetica...</p>
          </div>
        </div>
      )}
    </div>
  );
}
