import { ScrollView, StyleSheet, View } from "react-native";
import Tweet from "./Tweet";

const Tweets = ({ route }: any) => {
  const { data } = route.params;
  console.log(data);
  return (
    <View style={styles.container}>
      <ScrollView>
        {data.map((value: any) => (
          <Tweet data={value} />
        ))}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
});
export default Tweets;
