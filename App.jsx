import React from "react";
import { StyleSheet, View } from "react-native";
import MyCamera from "./components/Camera";

const App = () => {
  return (
    <View style={styles.container}>
      <MyCamera />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
  input: {
    width: 200,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
export default App;
