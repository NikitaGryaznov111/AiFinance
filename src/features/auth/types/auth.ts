export type TUser = {
  id: string;
  email: string | null;
  displayName: string | null;
};

export type TSignInInput = { email: string; password: string };

export type TSignUpInput = {
  displayName: string;
  email: string;
  password: string;
};
