import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import {
    StatusBar,
    Animated,
    Text,
    Image,
    View,
    StyleSheet,
    Dimensions,
    Pressable,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
const { width, height } = Dimensions.get("screen");

// https://www.flaticon.com/packs/retro-wave
// inspiration: https://dribbble.com/shots/11164698-Onboarding-screens-animation
// https://twitter.com/mironcatalin/status/1321180191935373312

// const bgs = ["#A5BBFF", "#DDBEFE", "#FF63ED", "#B98EFF"];
const bgs = ["#d5e371", "#99c0d1", "#bd89c4", "#f58787"];

const DATA = [
    {
        key: "3571747",
        title: "Wellness Coaching",
        description:
            "Chat with your WellCoach and get instant practical wellness content and personalized plans made just for you.",
        image: require("../../../assets/images/giraffe.png"),
        bgColor: "#eaf2b3",
    },

    {
        key: "3571680",
        title: "Welldify Library",
        description: "Explore our library of wellness content.",
        image: require("../../../assets/images/deer.png"),
        bgColor: "#d3ebf5",
    },
    {
        key: "3571603",
        title: "Wellness Journey",
        description:
            "Customize your unique wellness journey, take the first step now!",
        image: require("../../../assets/images/lion.png"),
        bgColor: "#f7d2fc",
    },
    {
        key: "3571572",
        title: "Empowering Challenges",
        description:
            "Explore hundreds of mental and physical activities to unlock your full potential with WellMissions",

        image: require("../../../assets/images/wellcoach.png"),
        bgColor: "#f5c1c1",
    },
];

const Indicator = ({ scrollX }) => {
    return (
        <View
            style={{ position: "absolute", bottom: 100, flexDirection: "row" }}
        >
            {DATA.map((_, i) => {
                const inputRange = [
                    (i - 1) * width,
                    i * width,
                    (i + 1) * width,
                ];
                const scale = scrollX.interpolate({
                    inputRange,
                    outputRange: [0.8, 1.4, 0.8],
                    extrapolate: "clamp",
                });
                const opacity = scrollX.interpolate({
                    inputRange,
                    outputRange: [0.6, 0.9, 0.6],
                    extrapolate: "clamp",
                });
                return (
                    <Animated.View
                        key={`indicator-${i}`}
                        style={{
                            height: 10,
                            width: 10,
                            borderRadius: 5,
                            backgroundColor: "#fff",
                            opacity,
                            margin: 10,
                            transform: [
                                {
                                    scale,
                                },
                            ],
                        }}
                    ></Animated.View>
                );
            })}
        </View>
    );
};

const Backdrop = ({ scrollX }) => {
    const backgroundColor = scrollX.interpolate({
        inputRange: bgs.map((_, i) => i * width),
        outputRange: bgs.map((bg) => bg),
    });
    return (
        <Animated.View
            style={[StyleSheet.absoluteFillObject, { backgroundColor }]}
        />
    );
};

const Square = ({ scrollX }) => {
    const YOLO = Animated.modulo(
        Animated.divide(
            Animated.modulo(scrollX, width),
            new Animated.Value(width)
        ),
        1
    );
    const rotate = YOLO.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: ["35deg", "0deg", "35deg"],
    });
    const translateX = YOLO.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0, -height, 0],
    });
    return (
        <Animated.View
            style={{
                width: width * 2,
                height: width * 2,
                backgroundColor: "#fff",
                borderRadius: 86,
                position: "absolute",
                top: -height * 0.6,
                left: -height * 0.3,
                transform: [
                    {
                        rotate,
                    },
                    {
                        translateX,
                    },
                ],
            }}
        />
    );
};

const Actions = ({ onSignInPressed, onSignUpPressed }) => {
    return (
        <View
            style={{
                position: "absolute",
                bottom: 160,
                flexDirection: "row",
                justifyContent: "center",
                color: "gray",
                gap: 20,
                width: "100%",
            }}
        >
            <Pressable style={styles.button} onPress={onSignInPressed}>
                <Text>Sign In</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={onSignUpPressed}>
                <Text>Sign Up</Text>
            </Pressable>
            {/* <Pressable>Log In</Pressable> */}
        </View>
    );
};

export default function App() {
    const navigation = useNavigation();
    const scrollX = React.useRef(new Animated.Value(0)).current;

    const onSignInPressed = () => {
        navigation.navigate("SignIn");
    };

    const onSignUpPressed = () => {
        navigation.navigate("SignUp");
    };

    return (
        <View style={styles.container}>
            <StatusBar hidden />
            <Backdrop scrollX={scrollX} />
            <Square scrollX={scrollX} />
            <Animated.FlatList
                data={DATA}
                keyExtractor={(item) => item.key}
                horizontal
                scrollEventThrottle={32}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false }
                )}
                contentContainerStyle={{ paddingBottom: 100 }}
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                renderItem={({ item }) => (
                    <View
                        style={{
                            width,
                            alignItems: "center",
                            padding: 20,
                        }}
                    >
                        <View
                            style={{
                                flex: 0.7,
                                justifyContent: "center",
                            }}
                        >
                            <View
                                style={{
                                    backgroundColor: item.bgColor,
                                    padding: 28,
                                    paddingHorizontal: 28,
                                    paddingBottom: 0,
                                    borderRadius: "100%",
                                    width: width / 2,
                                    height: width / 2,
                                    overflow: "hidden",
                                }}
                            >
                                <Image
                                    // source={{ uri: item.image }}
                                    source={item.image}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        resizeMode: "contain",
                                        // backgroundColor: "#b3f5d4",
                                        borderRadius: 20,
                                        borderColor: "pink",
                                    }}
                                />
                            </View>
                        </View>
                        <View style={{ flex: 0.3 }}>
                            <Text
                                style={{
                                    color: "#fff",
                                    fontWeight: 800,
                                    fontSize: 32,
                                    marginBottom: 10,
                                }}
                            >
                                {item.title}
                            </Text>
                            <Text
                                style={{
                                    color: "#fff",
                                    fontWeight: 400,
                                    fontSize: 16,
                                }}
                            >
                                {item.description}
                            </Text>
                        </View>
                    </View>
                )}
            />
            <Actions
                onSignInPressed={onSignInPressed}
                onSignUpPressed={onSignUpPressed}
            />
            <Indicator scrollX={scrollX} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    button: {
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 8,
    },
});
