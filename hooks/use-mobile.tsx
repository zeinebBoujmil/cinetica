import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  // Initialise `isMobile` directement avec `window.innerWidth` si l'exécution est côté client
  const [isMobile, setIsMobile] = React.useState<boolean>(
    typeof window !== "undefined" && window.innerWidth < MOBILE_BREAKPOINT
  );

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    // Fonction pour mettre à jour `isMobile` à chaque changement de media query
    const onChange = () => {
      setIsMobile(mql.matches); // Utilise directement `mql.matches`
    };

    // Définir l'état initial
    onChange();

    // Ajout d'un écouteur pour les changements
    mql.addEventListener("change", onChange);

    // Nettoyage lors du démontage
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isMobile; // Retourne directement `isMobile`
}
