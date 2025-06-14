import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { redirect } from "next/navigation";

const jwtSecretKey = process.env.JWT_SECRET_KEY;
const jwtEncodedKey = new TextEncoder().encode(jwtSecretKey);

const loginExpSeconds = Number(process.env.LOGIN_EXPIRATION_SECONDS) || 86400;
const loginExpStr = process.env.LOGIN_EXPIRATION_STRING || "1d";
const loginCookieName = process.env.LOGIN_COOKIE_NAME || "loginSession";

export async function hashPassword(password: string) {
  const hash = await bcrypt.hash(password, 10);
  const base64 = Buffer.from(hash).toString("base64");
  return base64;
}

export async function verifyPassword(password: string, base64hash: string) {
  const hash = Buffer.from(base64hash, "base64").toString("utf-8");
  const isValid = await bcrypt.compare(password, hash);
  return isValid;
}

export async function createLoginSession(username: string) {
  const expiresAt = new Date(Date.now() + loginExpSeconds * 1000);
  const loginSession = await signJwt({ username, expiresAt });

  const cookieStore = await cookies();

  cookieStore.set(loginCookieName, loginSession, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    expires: expiresAt,
  });
}

export async function deleteLoginSession() {
  const cookieStore = await cookies();
  // Por precaução, caso o cookie.delete não funcione
  // Vamos seter o valor do cookie para '' e acertar a data de expiração
  cookieStore.set(loginCookieName, "", { expires: new Date(0) });
  cookieStore.delete(loginCookieName);
}

type JwtPayload = {
  username: string;
  expiresAt: Date;
};

export async function signJwt(jwtPayload: JwtPayload) {
  return new SignJWT(jwtPayload)
    .setProtectedHeader({
      alg: "HS256",
      typ: "JWT",
    })
    .setIssuedAt()
    .setExpirationTime(loginExpStr)
    .sign(jwtEncodedKey);
}

export async function verifyJwt(jwt: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(jwt, jwtEncodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log('Invalid Token', error)
    return false
  }
}


export async function getLoginSession() {
    const cookieStore = await cookies()
    const jwt = cookieStore.get(loginCookieName)?.value

    if(!jwt) return false;

    return verifyJwt(jwt);
}

export async function verifyLoginSession() {
    const jwtPayload = await getLoginSession()
    
    if(!jwtPayload) return false

    return jwtPayload?.username === process.env.LOGIN_USER
}

export async function requireLoginSessionOrRedirect() {
    const isAuthenticated = await verifyLoginSession()

    if(!isAuthenticated) {
        redirect('/admin/login')
    }
}

// **********Crie sua senha aqui:**********
// Retire os comentários a partir da linha  *106* (após a execução, não esqueça de retornar os comentários) 
// Altere a string no parâmetro da função HashPassword para a senha que você quer utilizar.
// Execute esse arquivo e copie o Hash que será gerado ao final da execução
// **DICA: caso não tenha uma extensão instalada para rodar o arquivo, você pode usar o comando "npx tsx CAMINHO_DO_ARQUIVO" para executa-lo**
// (async () => {
//   const myHash = await hashPassword('Digite sua senha aqui')
//   console.log(myHash)
// })()