import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ConnectBank() {

  const connectBank = () => {
    // This will launch Plaid later
    // router.replace("/home");
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Choose an account to link</Text>

      <TouchableOpacity style={styles.bankButton} onPress={connectBank}>
        <Text>Chase</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.bankButton} onPress={connectBank}>
        <Text>Bank of America</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.bankButton} onPress={connectBank}>
        <Text>Capital One</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: "#F4F4F4"
  },

  title: {
    fontSize: 22,
    marginBottom: 20
  },

  bankButton: {
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 10
  }
});