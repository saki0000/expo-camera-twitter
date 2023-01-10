import { Avatar, Divider, Flex } from "native-base";
import { StyleSheet, Text, View } from "react-native";

const Tweet = ({ data }: any) => {
  console.log(data);
  return (
    <View style={styles.tweet} key={data.id}>
      <Flex direction="row">
        <Avatar size="sm" source={{ uri: data.user.profile_image_url }} />
        <Text style={styles.name}>{data.user.name}</Text>
        {/* <Text style={styles.screenName}>{data.user.screen_name}</Text> */}
      </Flex>
      <Text style={styles.text}>{data.text}</Text>
      <Divider style={styles.divider} />
    </View>
  );
};
const styles = StyleSheet.create({
  tweet: {
    flex: 1,
    margin: 10,
    // backgroundColor:
    color: "white",
  },
  text: {
    color: "#e7e9ea",
    fontWeight: "600",
    marginHorizontal: 40,
  },
  name: {
    flex: 1,
    color: "#e7e9ea",
    fontWeight: "600",
    margin: 8,
  },
  screenName: {
    flex: 1,
    color: "#686d71",
    fontWeight: "600",
    margin: 8,
  },
  divider: {
    marginTop: 20,
  },
});
export default Tweet;
