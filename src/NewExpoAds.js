// import { setTestDeviceIDAsync } from "expo-ads-admob";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

// import {
//   AdMobBanner,
//   // AdMobInterstitial,
//   // PublisherBanner,
//   // AdMobRewarded,
//   // setTestDeviceIDAsync,
// } from "expo-ads-admob";
// import { AdMobBanner } from "expo-ads-admob";

// Set global test device ID
const device = async () => {
  setTestDeviceIDAsync("EMULATOR")
    .then((result) => {
      console.log("Set test device id: ", result);
    })
    .catch((error) => {
      console.log("Set test device id error: ", error);
    });
};

export default function NewExpoAds({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>NewExpoAds</Text>
      <Text>Banner Here</Text>

      {/* <AdMobBanner
        bannerSize="fullBanner"
        adUnitID="ca-app-pub-3940256099942544/6300978111" // Test ID, Replace with your-admob-unit-id
        servePersonalizedAds // true or false
        onDidFailToReceiveAdWithError={this.bannerError}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
