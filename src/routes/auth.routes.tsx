import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Signin } from "@screens/Signin";
import { Signup } from "@screens/Signup";

const { Navigator, Screen } = createNativeStackNavigator();

export function AuthRoutes() {
  return (
    <Navigator>
      <Screen name="signIn" component={Signin} />
      <Screen name="signUp" component={Signup} />
    </Navigator>
  );
}
