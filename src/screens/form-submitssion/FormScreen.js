import React, { useState, useEffect } from "react";
import { View, Alert } from "react-native";
import { Input, Text, Button } from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function FormScreen() {
  const [name, setName] = useState("");
  const [isWrongName, setIsWrongName] = useState(false);
  const [email, setEmail] = useState("");
  const [isWrongEmail, setIsWrongEmail] = useState(false);
  const [birthday, setBirthday] = useState(new Date());
  const [isActiveButton, setIsActiveButton] = useState(false);
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const lettersOnlyRegex = /^[a-zA-Z]+$/;

  useEffect(() => {
    if (name && emailRegex.test(email)) {
      return setIsActiveButton(true);
    }
    return setIsActiveButton(false);
  }, [name, email]);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setBirthday(currentDate);
  };

  const handlePress = () => {
    Alert.alert(
      "My Information",
      `Name: ${name}\nEmail: ${email}\nBirthday: ${birthday.toLocaleDateString(
        "en-gb",
        {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }
      )}`,
      [{ text: "Close" }]
    );
  };

  const styles = {
    text: {
      fontSize: 20,
      padding: 10,
    },
    input: {
      paddingLeft: 20,
      fontSize: 18,
      color: "#333",
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 20,
      height: 50,
    },
    button: {
      marginTop: 20,
      padding: 10,
      borderRadius: 10,
      marginBottom: 60,
    },
    container: {
      flex: 1,
    },
    row: {
      flexDirection: "row",
    },
    left: {
      flex: 1,
      textAlign: "left",
    },
    right: {
      flex: 1,
      textAlign: "right",
    },
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
      }}
    >
      <Text style={styles.text}>Name</Text>
      <Input
        value={name}
        onChangeText={(text) => {
          if (text.match(lettersOnlyRegex) || text.length === 0) {
            setIsWrongName(false);
            return setName(text);
          }
          return setIsWrongName(true);
        }}
        errorMessage={!isWrongName ? null : "Your name is wrong format!"}
        maxLength={50}
        style={styles.input}
      />

      <Text style={styles.text}>Email</Text>
      <Input
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
        onSubmitEditing={() =>
          emailRegex.test(email)
            ? setIsWrongEmail(false)
            : setIsWrongEmail(true)
        }
        errorMessage={!isWrongEmail ? null : "Your email is wrong format!"}
      />

      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.text}>Birthday</Text>
          <View style={styles.left}>
            <DateTimePicker
              style={{ width: 200, height: 200, flex: 1, textAlign: "left" }}
              display="default"
              testID="dateTimePicker"
              value={birthday}
              mode="date"
              is24Hour={false}
              onChange={onChange}
              maximumDate={new Date()}
            />
          </View>
        </View>
      </View>

      <Button
        onPress={() => {
          handlePress();
        }}
        title="Submit"
        disabled={!isActiveButton}
        style={{ alignItems: "center", justifyContent: "center" }}
        buttonStyle={styles.button}
      />
    </View>
  );
}
