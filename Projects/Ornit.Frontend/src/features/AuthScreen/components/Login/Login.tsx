import { View, Text, Pressable, TextInput } from "react-native";
import { styles } from "./loginStyles";
import { Colors } from "@/src/shared/constants/Colors";
import { useState } from "react";
import { useAuthProvider } from "@/src/shared/providers/AuthProvider";
import { login } from "@/src/features/api/AuthApi";
import { Auth0LoginResponse, AuthRequest } from "@/contenttypes";

interface ILogin {
  toggleView: () => void;
}

export default function Login(props: ILogin) {
  const { setTokens } = useAuthProvider();

  const handleLogin = async () => {
    const request: AuthRequest = {
      email,
      password,
    };

    var response: Auth0LoginResponse = await login(request);
    setTokens(response);

    setEmail("");
    setPassword("");
  };

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>
      <TextInput
        placeholder="Username"
        placeholderTextColor={Colors.Gray}
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor={Colors.Gray}
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />
      <Pressable onPress={handleLogin}>
        <Text style={styles.login}>Login</Text>
      </Pressable>
      <Pressable onPress={props.toggleView}>
        <Text style={styles.registerLink}>register new user</Text>
      </Pressable>
    </View>
  );
}
