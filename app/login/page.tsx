'use client';
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react"; // Utilisation de NextAuth pour l'authentification
import "/app/globals.css"; // Si nécessaire

export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  
  const { data: session, status } = useSession(); // Gestion de la session avec NextAuth
  const router = useRouter();
  console.log(session);

  // Redirection vers la page d'accueil si l'utilisateur est déjà connecté
  useEffect(() => {
    if (status === 'authenticated') {
      router.push("/dashboard/discover");
    }
  }, [status]);

  // Fonction de gestion du login
  const handleLogIn = async (event: React.FormEvent) => {
    event.preventDefault();
    
    // Connexion via NextAuth
    const result = await signIn("credentials", {
      username: userName,
      password: password,
    });

    // Vérification du résultat de la connexion
    if (result?.error) {
      setErrMsg(result.error); // Affichage de l'erreur de connexion
      setTimeout(() => setErrMsg(""), 3000); // Masquage du message d'erreur après 3 secondes
    } else {
      localStorage.setItem('currentUser', userName); // Sauvegarde du nom d'utilisateur dans localStorage
      router.push("/dashboard/discover"); // Redirection vers la page d'accueil une fois connecté
    }
  };

  // Fonction pour rediriger vers la page d'inscription
  const goToSignUp = () => {
    router.push("/signup");
  };

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
        <form onSubmit={handleLogIn}>
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

      {/* Affichage du message d'erreur ou de bienvenue */}
      {errMsg && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-3xl font-bold mb-4">{errMsg}</h2>
            <p>Nom d utilisateur ou mot de passe incorrect</p>
          </div>
        </div>
      )}
    </div>
  );
}
