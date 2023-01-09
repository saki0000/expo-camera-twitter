import axios from "axios";
import React, { useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
const URL1 = "http://10.0.2.2:3001";
const URL2 = "http://localhost:3001";
const URL3 = "http://192.168.0.2:3001";
const SearchTweet = ({ text }: { text: string }) => {
  const [query, setQuery] = useState(text || "");
  const [searchData, setSearchData] = useState();
  const searchTweet = async () => {
    await axios
      .get(`${URL3}/search?query=${query}`)
      .then((res: any) => {
        setSearchData(res);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <View>
      <TextInput style={styles.input} value={query} onChangeText={setQuery} />
      <Button title="search" onPress={searchTweet} />
    </View>
  );
};
const styles = StyleSheet.create({
  input: {
    width: 200,
    height: 60,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
export default SearchTweet;
