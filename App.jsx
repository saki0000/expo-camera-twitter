import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

const App = () => {
  const [trend, setTrend] = useState();
  const [searchData, setSearchData] = useState();
  const [query, setQuery] = useState("");
  const getTrends = async () => {
    await axios
      .get("http://10.0.2.2:3001/trends")
      .then((res) => {
        console.log(res.data);
        setTrend(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const searchTweet = async () => {
    await axios
      .get(`http://10.0.2.2:3001/search?query=${query}`)
      .then((res) => {
        setSearchData(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    // getTrends();
  }, []);
  return (
    <View style={styles.container}>
      <Text>Firebase Authentication Exampe</Text>
      <TextInput style={styles.input} value={query} onChangeText={setQuery} />
      <Button title="search" onPress={searchTweet} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
export default App;
