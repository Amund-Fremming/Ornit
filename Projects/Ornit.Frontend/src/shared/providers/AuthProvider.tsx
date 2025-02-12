import AuthScreen from "@/src/features/AuthScreen/AuthScreen";
import { ReactNode, createContext, useContext, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { refreshToken } from "@/src/features/api/AuthApi";
import { Auth0LoginResponse } from "@/contenttypes";

interface IAuthContext {
  getAccessToken: () => Promise<string>;
  setTokens: (response: Auth0LoginResponse) => Promise<void>;
  logout: () => Promise<void>;
}

const defaultContextValue: IAuthContext = {
  getAccessToken: async () => "",
  setTokens: async (response: Auth0LoginResponse) => {},
  logout: async () => {},
};

const AuthContext = createContext<IAuthContext>(defaultContextValue);

export const useAuthProvider = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const ACCESS_TOKEN_KEY = "6e444484-ffe5-4935-a20e-3ee1595288ad";
  const REFRESH_TOKEN_KEY = "f748df11-52f5-4543-b676-4ae40c209efb";
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [refreshTokenInterval, setRefreshTokenInterval] =
    useState<number>(86000);

  const value = {
    getAccessToken,
    setTokens,
    logout,
  };

  setTimeout(async () => {
    try {
      console.log("Refreshing token....");
      var token = await getRefreshToken();
      var newToken = await refreshToken(token);
      console.log("Got new token!: " + newToken);

      setRefreshToken(newToken);
    } catch (error) {
      console.error("SetTimeout in AuthProvider: " + error);
    }
  }, 5000); // change this back to refreshTokenInterval

  async function setTokens(response: Auth0LoginResponse): Promise<void> {
    try {
      if (!response) {
        return;
      }

      setLoggedIn(true);
      setRefreshTokenInterval(response.expiresIn);

      await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, response.accessToken, {
        keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
      });

      await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, response.refreshToken, {
        keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
      });
      setLoggedIn(true);
    } catch (error) {
      console.error("Error saving token:", error);
    }
  }

  async function getAccessToken(): Promise<string> {
    try {
      var result = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
      if (result === null) {
        return "Error";
      }

      return result;
    } catch (error) {
      console.error("Error getting token:", error);
      return "Error";
    }
  }

  async function setRefreshToken(token: string): Promise<void> {
    try {
      if (!token || token === "") {
        return;
      }

      await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, token, {
        keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
      });
      setLoggedIn(true);
    } catch (error) {
      console.error("Error saving token:", error);
    }
  }

  async function getRefreshToken(): Promise<string> {
    try {
      var result = await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
      if (result === null) {
        return "Error";
      }

      return result;
    } catch (error) {
      console.error("Error getting token:", error);
      return "Error";
    }
  }

  async function logout(): Promise<void> {
    try {
      setLoggedIn(false);
      await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
      await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
    } catch (error) {
      console.error("Error deleting token:", error);
    }
  }

  return (
    <AuthContext.Provider value={value}>
      {loggedIn && children}
      {!loggedIn && <AuthScreen />}
    </AuthContext.Provider>
  );
};
