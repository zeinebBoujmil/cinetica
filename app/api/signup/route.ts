import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { users, addUser } from '@/app/Repository/users';

export async function POST(request: Request) {
  const { username, password } = await request.json();

  try {
    // Vérifie si l'utilisateur existe déjà
    const userExists = users.some((user) => user.username === username);
    if (userExists) {
      return NextResponse.json({
        success: false,
        message: "L'utilisateur existe déjà.",
      });
    }

    // Hache le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Ajoute l'utilisateur
    const response = addUser(username, hashedPassword);

    return NextResponse.json(response);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({
        success: false,
        message: error.message,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Une erreur inconnue est survenue.",
      });
    }
  }
}
