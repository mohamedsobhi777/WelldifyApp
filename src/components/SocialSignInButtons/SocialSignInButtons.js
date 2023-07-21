import { View, Text } from "react-native";
import React from "react";
import CustomButton from "../CustomButton/CustomButton";

const SocialSignInButtons = () => {
    const onSignInFacebook = () => {};

    const onSignInGoogle = () => {};

    const onSignInApple = () => {};

    return (
        <>
            {/* <CustomButton
                text="Sign In With Facebook"
                onPress={onSignInFacebook}
                type="TERTIARY"
                bgColor="#e7eaf4"
                fgColor="#4765a9"
            /> */}
            <CustomButton
                text="Sign In With Google"
                onPress={onSignInGoogle}
                type="TERTIARY"
                bgColor="#fae9ea"
                fgColor="#dd4d44"
            />
            <CustomButton
                text="Sign In With Apple"
                onPress={onSignInApple}
                type="TERTIARY"
                bgColor="#e3e3e3"
                fgColor="#363636"
            />
        </>
    );
};

export default SocialSignInButtons;
