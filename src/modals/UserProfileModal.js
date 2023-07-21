import { View, Text, Modal, SafeAreaView, Pressable } from "react-native";
import React from "react";

const UserProfileModal = ({ setUserProfileModalVisible }) => {
    return (
        <View
            animationType="slide"
            transparent={true}
            visible={true}
            onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
            }}
            style={{ height: "100%" }}
        >
            <Text>This is a modal</Text>
            <Pressable
                style={{ backgroundColor: "blue", padding: 40 }}
                onPress={() => setUserProfileModalVisible(false)}
            >
                <Text>Close</Text>
            </Pressable>
        </View>
    );
};

export default UserProfileModal;
