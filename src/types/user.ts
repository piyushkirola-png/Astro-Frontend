export type UserGender = 'MALE' | 'FEMALE';

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  role: 'ADMIN' | 'USER';

  gender: UserGender | null;
  phone: string | null;

  dateOfBirth: string | null;
  timeOfBirth: string | null;

  placeOfBirth: string | null;
  currentAddress: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  pincode: string | null;

  avatarUrl: string | null;
  zodiacSign: string | null;
  isActive: boolean;
  createdAt: string;
}

export interface UpdateProfileRequest {
  name?: string;
  email?: string;
  phone?: string;
  gender?: UserGender | '';
  dateOfBirth?: string;
  timeOfBirth?: string;
  placeOfBirth?: string;
  currentAddress?: string;
  city?: string;
  state?: string;
  country?: string;
  pincode?: string;
}

export interface PlaceSuggestion {
  displayName: string;
  lat: string;
  lon: string;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  postcode?: string | null;
}