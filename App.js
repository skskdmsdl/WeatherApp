import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
<<<<<<< HEAD
import { red } from 'colorette';
=======
>>>>>>> fd1623e6ba6ef63dde07bfa9d26bad3ff70d8473

export default function App() {
  return (
    <View style={styles.container}>
<<<<<<< HEAD
      <Text style={styles.text}>Hello</Text>
=======
      <Text>Hello</Text>
>>>>>>> fd1623e6ba6ef63dde07bfa9d26bad3ff70d8473
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
<<<<<<< HEAD
  text: {
    fontSize: 24,
    color: "red",
  }
=======
>>>>>>> fd1623e6ba6ef63dde07bfa9d26bad3ff70d8473
});
