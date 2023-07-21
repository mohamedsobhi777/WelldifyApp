// Hooks
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useForm, Control } from "react-hook-form";

// Components
import CustomInput from "../../components/CustomInput/CustomInput";
import SocialSignInButtons from "../../components/SocialSignInButtons/SocialSignInButtons";
import CustomButton from "../../components/CustomButton/CustomButton";
import { View, Text, StyleSheet, Image, ScrollView, Alert } from "react-native";

// Assets
import Logo from "../../../assets/images/giraffe.png";
import { Auth } from "aws-amplify";

const EMAIL_REGEX =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const SignUpScreen = () => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    // Form Data
    const { control, handleSubmit, watch } = useForm();
    const pwd = watch("password");

    const onRegisterPressed = async (data) => {
        if (loading) return;
        setLoading(true);
        // navigation.navigate("ConfirmEmail");
        const { username, password, email, name } = data;
        try {
            const response = await Auth.signUp({
                username,
                password,
                attributes: { email, name, preferred_username: username },
            });
            navigation.navigate("ConfirmEmail", { username });
        } catch (e) {
            Alert.alert(e.message);
        } finally {
            setLoading(false);
        }
        // console.log(data);
    };

    const onForgotPasswordPressed = () => {
        navigation.navigate("ForgotPassword");
    };

    const onSignInPressed = () => {
        navigation.navigate("SignIn");
    };

    const onTermsOfUsePressed = () => {};
    const onPrivacyPolicyPressed = () => {};

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
                backgroundColor: "#87f5a9",
            }}
            contentContainerStyle={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "start",
                paddingTop: "5%",
            }}
        >
            <View style={styles.root}>
                <Text style={styles.title}>Create an account</Text>
                <CustomInput
                    name="name"
                    placeholder="Name"
                    control={control}
                    rules={{
                        required: "Name is required",
                        minLength: {
                            value: 3,
                            message:
                                "Name should be at least 3 characters long",
                        },
                        maxLength: {
                            value: 24,
                            message: "Name can't be longer than 24 characters.",
                        },
                    }}
                />
                <CustomInput
                    name="username"
                    placeholder="Username"
                    control={control}
                    rules={{
                        required: "Username is required",
                        minLength: {
                            value: 3,
                            message:
                                "Username should be at least 3 characters long",
                        },
                        maxLength: {
                            value: 24,
                            message:
                                "Username can't be longer than 24 characters.",
                        },
                    }}
                />

                <CustomInput
                    name="email"
                    placeholder="Email"
                    control={control}
                    rules={{
                        pattern: {
                            value: EMAIL_REGEX,
                            message: "Email is invalid",
                        },
                    }}
                />
                <CustomInput
                    name="password"
                    placeholder="Password"
                    control={control}
                    secureTextEntry={true}
                    rules={{
                        required: "Password is required",
                        minLength: {
                            value: 8,
                            message:
                                "Password should be at least 8 characters long",
                        },
                    }}
                />
                <CustomInput
                    name="password-repeat"
                    placeholder="Repeat Password"
                    control={control}
                    secureTextEntry={true}
                    rules={{
                        validate: (value) => {
                            return value === pwd || "Passwords do not match";
                        },
                    }}
                />

                <CustomButton
                    text={loading ? "Loading..." : "Register"}
                    onPress={handleSubmit(onRegisterPressed)}
                />

                <Text style={styles.text}>
                    By registering, you confirm that you accept our{" "}
                    <Text style={styles.link} onPress={onTermsOfUsePressed}>
                        Terms of Use
                    </Text>{" "}
                    and{" "}
                    <Text style={styles.link} onPress={onPrivacyPolicyPressed}>
                        Privacy Policy
                    </Text>
                </Text>

                <SocialSignInButtons />

                <CustomButton
                    text="Have an account? Sign In"
                    onPress={onSignInPressed}
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
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
        fontWeight: 800,
        margin: 10,
    },
    text: {
        color: "gray",
        marginVertical: 10,
    },
    link: {
        color: "#fdb075",
    },
});
export default SignUpScreen;
