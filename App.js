import { SafeAreaView, StyleSheet } from "react-native";

import Navigation from "./src/navigation";
import Splash from "./src/screens/SplashScreen";

// AWS
import { Amplify, Auth } from "aws-amplify";
import config from "./src/aws-exports";
Amplify.configure(config);

const App = () => {
    Auth.signOut();
    return (
        <SafeAreaView style={styles.root}>
            <Navigation />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    root: { flex: 1, backgroundColor: "#f9fbfa" },
});

export default App;
