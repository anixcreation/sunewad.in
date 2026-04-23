declare module '*/supabase' {
  const supabase: any;
  export default supabase;
}

declare module '*/googleAuth' {
  export function signInWithGoogle(appName?: string): void;
  export function handleGoogleRedirect(): Promise<void>;
}