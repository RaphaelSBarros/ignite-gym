import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";

import { Signin } from "@screens/Signin";
import { Signup } from "@screens/Signup";

const { Navigator, Screen } = createNativeStackNavigator();

type AuthRoutes = {
  signIn: undefined;
  signUp: undefined;
};

export type AuthNavigatorRoutesProps = NativeStackNavigationProp<AuthRoutes>;

export function AuthRoutes() {
  return (
    <Navigator>
      <Screen name="signIn" component={Signin} />
      <Screen name="signUp" component={Signup} />
    </Navigator>
  );
}
