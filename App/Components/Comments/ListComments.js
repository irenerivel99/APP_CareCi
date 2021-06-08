import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Avatar, Divider } from "react-native-elements";
import { map } from "lodash";
import { firebaseApp } from "../../Utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";
import GeneralText from "../GeneralText";
const db = firebase.firestore(firebaseApp);

export default function ListComments(props) {
    const { navigation, idPost } = props;
    const [comments, setComments] = useState(null);

    useEffect(() => {
        db.collection("comments")
            .where("idPost", "==", idPost)
            .get()
            .then((response) => {
                const resultComments = [];
                response.forEach(doc => {
                    const data = doc.data();
                    data.id = doc.id;
                    resultComments.push(data);
                });
                setComments(resultComments);
            })
    }, []);


    return (
        <View>
            <Button
                title="Escribe una opinión"
                icon={{
                    type: "material-community",
                    name: "square-edit-outline",
                    //color:"#"
                }}
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btnStyle}
                titleStyle={styles.btnTitleStyle}
                onPress={() => {
                    navigation.navigate("postComment", {
                        idPost: idPost
                    })
                }}
            />

            {<>
                {map(comments, (comment, index) => (
                    <Comment key={index} comment={comment} />
                ))}
                {< Divider style={styles.dividerStyle} />}
            </>
            }
        </View>
    )
}

function Comment(props) {
    const { key, comment, createAt, avatarUser } = props.comment;

    return (

        <View style={styles.viewReview}>
            <View style={styles.viewImageAvatar}>
                <Avatar
                    size="large"
                    rounded
                    containerStyle={styles.imageAvatarUser}
                    source={avatarUser ? { uri: avatarUser }
                        : require("../../../assets/noImg/avatar_default.png")}
                />
            </View>
            <View style={styles.viewInfo}>
                <GeneralText text={comment} color={"black"} size={15} />
                <GeneralText text={createAt} color={"black"} size={15} style={styles.date} viewStyle={styles.viewDate} />

            </View>


        </View>
    );
}

const styles = StyleSheet.create({
    btnContainer: {
        marginTop: 40,
        marginBottom: 50,
        alignItems: "center",

    },
    btnStyle: {
        width: "55%",
        height: 60,
        backgroundColor: "#FED0CE",
        borderRadius: 10,
    },
    btnTitleStyle: {
        fontSize: 20,
        color: "#fff",
    },
    viewReview: {
        flexDirection: "row",
        padding: 10,
        paddingBottom: 20,
        borderBottomColor: '#c1c1c1',
        borderBottomWidth: 1,
        width: "95%",
        alignSelf: "center"

    },
    viewImageAvatar: {
        marginRight: 15
    },
    imageAvatarUser: {
        width: 50,
        height: 50,
    },
    viewInfo: {
        flex: 1,
        alignItems: "flex-start"
    },
    dividerStyle: {
        backgroundColor: '#E37B58',
        marginBottom: 5,
        width: "90%",
        alignSelf: "center"
    },
    date: {
        marginTop: 5,
        color: "grey",
        fontSize: 12,
        fontFamily: "Quicksand-Medium",
    },
    viewDate: {
        flex: 1,
        position: "absolute",
        right: 20,
        bottom: 2
    },
})
