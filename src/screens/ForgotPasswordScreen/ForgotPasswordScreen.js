// Hooks
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";

// Components
import { View, Text, StyleSheet, Image, ScrollView, Alert } from "react-native";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";

// AWS
import { Auth } from "aws-amplify";

const ForgotPasswordScreen = () => {
    const navigation = useNavigation();
    const { handleSubmit, control } = useForm();

    const onSendPressed = async (data) => {
        try {
            await Auth.forgotPassword(data.username);
            navigation.navigate("NewPassword", { username: data.username });
        } catch (e) {
            Alert.alert("Oops", e.message);
        }
    };
    const onSignInPressed = () => {
        navigation.navigate("SignIn");
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Text style={styles.title}>Reset your password</Text>
                <CustomInput
                    name="username"
                    control={control}
                    placeholder="Username"
                    rules={{ required: "Username is required" }}
                />

                <CustomButton
                    text="Send Code"
                    onPress={handleSubmit(onSendPressed)}
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
export default ForgotPasswordScreen;
