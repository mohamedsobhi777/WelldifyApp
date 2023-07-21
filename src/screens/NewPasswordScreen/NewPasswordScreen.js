// Hooks
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useForm } from "react-hook-form";

// Components
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";

// AWS
import { Auth } from "aws-amplify";

const NewPasswordScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { control, handleSubmit } = useForm({
        defaultValues: {
            username: route?.params?.username,
        },
    });

    const onSubmitPressed = async (data) => {
        try {
            await Auth.forgotPasswordSubmit(
                data.username,
                data.code,
                data.password
            );
            navigation.navigate("SignIn");
        } catch (e) {
            Alert.alert("Oops", e.message);
        }
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
                <CustomInput
                    name="code"
                    control={control}
                    placeholder="Code"
                    rules={{ required: "Code is required" }}
                />
                <CustomInput
                    name="password"
                    placeholder="Enter your new password"
                    control={control}
                    rules={{
                        required: "Password is required",
                        minLength: {
                            value: 8,
                            message:
                                "Password should be at least 8 characters long",
                        },
                    }}
                    secureTextEntry
                />
                <CustomButton
                    text="Submit"
                    onPress={handleSubmit(onSubmitPressed)}
                />
                <CustomButton
                    text="Back to Sign in"
                    onPress={onSubmitPressed}
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
export default NewPasswordScreen;
