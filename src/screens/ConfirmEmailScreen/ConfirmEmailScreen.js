// Hooks
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useForm } from "react-hook-form";

// Components
import { View, Text, StyleSheet, Image, ScrollView, Alert } from "react-native";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";

// Assets
import Logo from "../../../assets/images/giraffe.png";

// AWS
import { Auth } from "aws-amplify";

const ConfirmEmailScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { control, handleSubmit, watch } = useForm({
        defaultValues: {
            username: route?.params?.username,
        },
    });

    const username = watch("username");

    const onConfirmPressed = async (data) => {
        try {
            await Auth.confirmSignUp(data.username, data.code);
            navigation.navigate("SignIn");
        } catch (e) {
            Alert.alert("Oops", e.message);
        }
        // console.warn(data);
    };

    const onResendPressed = async () => {
        try {
            await Auth.resendSignUp(username);
            Alert("Success", "Code was resent to your email");
            // console.alert(response);
        } catch (e) {}
    };
    const onSignInPressed = () => {
        navigation.navigate("SignIn");
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Text style={styles.title}>Confirm your email</Text>
                <CustomInput
                    name="username"
                    placeholder="Enter your username code"
                    control={control}
                    rules={{ required: "Username is required" }}
                />
                <CustomInput
                    name="code"
                    placeholder="Enter your confirmation code"
                    control={control}
                    rules={{ required: "Confirmation code is required" }}
                />
                <CustomButton
                    text="Send"
                    onPress={handleSubmit(onConfirmPressed)}
                />
                <CustomButton
                    text="Resend Code"
                    onPress={onResendPressed}
                    type="SECONDARY"
                />
                <CustomButton
                    text="Back to Sign in"
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
    title: { fontSize: 24, fontWeight: "bold", color: "#051c60", margin: 10 },
    text: {
        color: "gray",
        marginVertical: 10,
    },
    link: {
        color: "#fdb075",
    },
});
export default ConfirmEmailScreen;
