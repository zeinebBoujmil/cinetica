import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";

export const useLogin = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [welcomeMessage, setWelcomeMessage] = useState("");

  const router = useRouter();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    const result = await signIn("credentials", {
      username: userName,
      password,
      redirect: false, // Désactiver la redirection automatique
    });

    if (result?.error) {
      setErrMsg(result.error);
      setTimeout(() => setErrMsg(""), 3000);
    } else {
      setWelcomeMessage(`Welcome, ${userName}!`);
      setTimeout(() => setWelcomeMessage(""), 3000);
      localStorage.setItem("currentUser", userName);
      router.push("/dashboard/discover");
    }
  };

  const goToSignUp = () => {
    router.push("/signup");
  };

  return {
    userName,
    password,
    errMsg,
    welcomeMessage,
    setUserName,
    setPassword,
    handleLogin,
    goToSignUp,
  };
};
