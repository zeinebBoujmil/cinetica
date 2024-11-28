"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function signup() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [notification, setNotification] = useState({ message: "", type: "" }); // Gère les notifications
  const router = useRouter();

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();

    // Vérifier que les mots de passe correspondent
    if (password !== confirmPassword) {
      showNotification("Les mots de passe ne correspondent pas.", "error");
      return;
    }

    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: userName, password }),
    });

    const data = await response.json();

    if (data.success) {
      showNotification("Inscription réussie ! Redirection en cours...", "success");
      setTimeout(() => {
        router.push("/login"); // Redirige vers la page de connexion
      }, 2000);
    } else {
      showNotification(data.message, "error"); // Affiche une erreur si l'utilisateur existe déjà
    }
  };

  const showNotification = (message: string, type: string) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: "", type: "" }); // Efface la notification après 3 secondes
    }, 3000);
  };

  const Notification = () =>
    notification.message && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div
          className={`bg-gray-800 text-white p-6 rounded-lg shadow-lg text-center ${
            notification.type === "success" ? "border-green-500" : "border-red-500"
          }`}
        >
          <h2 className="text-3xl font-bold mb-4">{notification.message}</h2>
          {notification.type === "success" ? (
            <p>Redirection vers votre page d accueil...</p>
          ) : (
            <p>Veuillez vérifier vos informations.</p>
          )}
        </div>
      </div>
    );

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

      {/* Notification */}
      <Notification />

      {/* Formulaire d'inscription */}
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

        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
        <form onSubmit={handleSignUp}>
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
          <div className="mb-4">
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
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-gray-700 font-semibold mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#0A2540] text-white py-2 rounded-lg font-semibold hover:bg-[#081C33] transition duration-200"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
