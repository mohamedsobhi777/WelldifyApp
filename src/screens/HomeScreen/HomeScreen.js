import React from "react";

// Components
import { View, Text } from "react-native";

// AWS
import { Auth } from "aws-amplify";

const HomeScreen = () => {
    const signOut = () => {
        Auth.signOut();
    };
    return (
        <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 24, alignSelf: "center" }}>
                Hello Welldify!
            </Text>
            <Text
                onPress={signOut}
                style={{
                    width: "100%",
                    textAlign: "center",
                    color: "red",
                    marginTop: "auto",
                    marginVertical: 20,
                    fontSize: 20,
                }}
            >
                Sign Out
            </Text>
        </View>
    );
};

export default HomeScreen;
