import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

// Screens
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen/SignUpScreen";
import ConfirmEmailScreen from "../screens/ConfirmEmailScreen/ConfirmEmailScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen/ForgotPasswordScreen";
import NewPasswordScreen from "../screens/NewPasswordScreen/NewPasswordScreen";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import SplashScreen from "../screens/SplashScreen/SplashScreen";

// AWS
import { Auth, Hub } from "aws-amplify";
import { ActivityIndicator, View } from "react-native";
import TempScreen from "../screens/TempScreen/TempScreen";

const Stack = createNativeStackNavigator();

const Navigation = () => {
    const [user, setUser] = useState(undefined);

    const checkUser = async () => {
        try {
            const authUser = await Auth.currentAuthenticatedUser({
                bypassCache: true,
            });
            setUser(authUser);
        } catch (e) {
            setUser(null);
        }
    };

    useEffect(() => {
        checkUser();
    }, []);

    useEffect(() => {
        const listener = (data) => {
            if (
                data.payload.event === "signIn" ||
                data.payload.event === "signOut"
            ) {
                checkUser();
            }
        };
        const authListener = Hub.listen("auth", listener);

        return () => authListener();
    }, []);

    if (user === undefined) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <ActivityIndicator />
            </View>
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home" component={TempScreen} />

                {user ? (
                    <Stack.Screen name="Home" component={TempScreen} />
                ) : (
                    <>
                        <Stack.Screen name="Splash" component={SplashScreen} />
                        <Stack.Screen name="SignIn" component={SignInScreen} />
                        <Stack.Screen name="SignUp" component={SignUpScreen} />
                        <Stack.Screen
                            name="ConfirmEmail"
                            component={ConfirmEmailScreen}
                        />
                        <Stack.Screen
                            name="ForgotPassword"
                            component={ForgotPasswordScreen}
                        />
                        <Stack.Screen
                            name="NewPassword"
                            component={NewPasswordScreen}
                        />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;
