'use server';
export const getUserData = async () => {
  const user = await fetch('https://firestore.googleapis.com/v1/projects/valy-512f3/databases/(default)/documents/Users/4chaXgzV1ygM9HPbDR0r7dwy4US2/Account/Profile')

  const u = await user.json();

  return u;
}