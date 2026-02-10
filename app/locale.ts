import { cookies } from 'next/headers';

export async function getUserLocale() {
  const cookieStore = await cookies();
  return cookieStore.get('locale')?.value || 'ro';    
}

