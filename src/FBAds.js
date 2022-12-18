import { Button, Platform, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import * as FacebookAds from "expo-ads-facebook";

export default function FBAds({ navigation }) {
  //   FacebookAds.AdSettings.addTestDevice(
  //     FacebookAds.AdSettings.currentDeviceHash
  //   );
  const [isLoaded, setisLoaded] = useState(false);

  FacebookAds.AdSettings.requestPermissionsAsync().then((permissions) => {
    let canTrack = permissions === "granted";
    FacebookAds.AdSettings.setAdvertiserTrackingEnabled(canTrack);
    setisLoaded(true);
  });

  const bannerId = getPlacementId(true);
  const interstitialId = getPlacementId(false);
  let placementId;
  function getPlacementId(bannerAd) {
    if (bannerAd) {
      placementId =
        Platform.OS === "ios" ? "" : "3281028308830280_3281029915496786";
    } else {
      placementId =
        Platform.OS === "ios" ? "" : "3281028308830280_3281030255496752";
    }
    if (__DEV__) {
      return `IMG_16_9_APP_INSTALL#${placementId}`;
    }
    return placementId;
  }
  const showInterstitial = () => {
    FacebookAds.InterstitialAdManager.showAd(interstitialId)
      .then((didClick) => console.log(didClick))
      .catch((error) => console.log(error));
  };

  function getBanner() {
    if (isLoaded) {
      return (
        <FacebookAds.BannerAd
          placementId="large"
          onPress={() => {
            console.log("Banner Ad");
          }}
          onError={(error) => {
            console.log("Banner Error: ", error.message);
          }}
        />
      );
    }
  }
  return (
    <View style={styles.container}>
      <Text>FBAds</Text>
      <Button title="Show interstitial AD" onPress={showInterstitial} />
      <Button title="Show Banner AD" onPress={getBanner} />
      <View>{getBanner}</View>
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
