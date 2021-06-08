//import { Assets } from "@react-navigation/stack";
import React, { useRef } from "react";
import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-easy-toast";
import LoginForm from "../../Components/Account/LoginForm";

export default function Login() {
    const toastRef = useRef();
    return (
        <ScrollView style={styles.viewContainer}>
            <View style={styles.viewHeader}>
                <Image
                    source={require("../../../assets/img/careci_logo.png")}
                    resizeMode="contain"
                    style={styles.logo}
                />
            </View>
            <View style={styles.viewLogin}>
                <Text style={styles.textWelcome}>¡Bienvenido!</Text>
                <LoginForm toastRef={toastRef} />
                <CreateAccount />
            </View>
            <Toast ref={toastRef} position="center" opacity={0.9} />
        </ScrollView>
    );
}

function CreateAccount() {
    const navigation = useNavigation();
    return (
        <Text style={styles.textRegister}>
            ¿Aún no tiene una cuenta?{" "}
            <Text
                style={styles.btnRegister}
                onPress={() => navigation.navigate("register")}
            >
                Registrate
      </Text>
        </Text>
    );
}

const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
        backgroundColor: "#F7B948",
    },
    logo: {
        width: "50%",
        height: 150,
        marginTop: 20,
        alignSelf: "center",
    },
    viewHeader: {
        flex: 1,
        justifyContent: "flex-end",
        paddingHorizontal: 20,
        paddingVertical: 100,
    },
    viewLogin: {
        flex: 3,
        backgroundColor: "#fff",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 70,
    },
    textWelcome: {
        fontWeight: "bold",
        fontSize: 40,
        color: "#192637",
        paddingLeft: 10,
        paddingBottom: 4,
    },
    textRegister: {
        marginTop: 20,
        marginHorizontal: 20,
        textAlign: "center",
    },
    btnRegister: {
        color: "#192637",
        fontWeight: "bold",
    },
});
