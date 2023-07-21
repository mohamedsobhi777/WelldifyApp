// Hooks
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";

// Components
import SocialSignInButtons from "../../components/SocialSignInButtons/SocialSignInButtons";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import {
    View,
    StyleSheet,
    Image,
    useWindowDimensions,
    ScrollView,
    TextInput,
    Alert,
} from "react-native";

// Assets
import Logo from "../../../assets/images/giraffe.png";

// AWS
import { Auth } from "aws-amplify";

const SignInScreen = () => {
    const { height } = useWindowDimensions();
    const navigation = useNavigation();
    const [loading, setLoading] = useState();
    const { control, handleSubmit } = useForm();

    const onSignInPressed = async (data) => {
        if (loading) return;
        setLoading(true);
        try {
            const response = await Auth.signIn(data.username, data.password);
            console.log(response);
        } catch (e) {
            Alert.alert("Oops!", e.message);
        } finally {
            setLoading(false);
        }
        // navigation.navigate("Home");
    };
    const onForgotPasswordPressed = () => {
        navigation.navigate("ForgotPassword");
    };
    const onSignUpPressed = () => {
        navigation.navigate("SignUp");
    };

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ backgroundColor: "#87f5a9" }}
        >
            <View style={styles.root}>
                <Image
                    source={Logo}
                    style={[styles.logo, { height: height * 0.3 }]}
                    resizeMode="contain"
                />

                <CustomInput
                    name="username"
                    placeholder="Username"
                    control={control}
                    rules={{ required: "Username is required" }}
                />
                <CustomInput
                    name="password"
                    placeholder="Password"
                    control={control}
                    secureTextEntry={true}
                    rules={{ required: "Password is required" }}
                />
                <CustomButton
                    text={loading ? "Loading..." : "Sign In"}
                    onPress={handleSubmit(onSignInPressed)}
                />
                <CustomButton
                    text="Forgot Password?"
                    onPress={onForgotPasswordPressed}
                    type="TERTIARY"
                />
                <SocialSignInButtons />
                <CustomButton
                    text="Don't have an account? Create one"
                    onPress={onSignUpPressed}
                    type="TERTIARY"
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    root: {
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    logo: { width: "70%", maxWidth: 300, maxHeight: 200, marginBottom: 20 },
});
export default SignInScreen;
