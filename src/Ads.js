const Stack = createStackNavigator();
import { Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";

import { createStackNavigator } from "@react-navigation/stack";

export default function Ads({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{ title: "Home" }} />
      <Stack.Screen
        name="BannerAdScreen"
        component={BannerAdScreen}
        options={{ title: "Banner Ad" }}
      />
      <Stack.Screen
        name="InterstitialAdScreen"
        component={InterstitialAdScreen}
        options={{ title: "Interstitial Ad" }}
      />
      <Stack.Screen
        name="RewardedAdScreen"
        component={RewardedAdScreen}
        options={{ title: "Rewarded Ad" }}
      />
    </Stack.Navigator>
  );
}
function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("BannerAdScreen")}
      >
        <Text>Banner Ad</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("InterstitialAdScreen")}
      >
        <Text>Intertisial Ad</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("RewardedAdScreen")}
      >
        <Text>Rewarded Ad</Text>
      </TouchableOpacity>
    </View>
  );
}
import {
  BannerAd,
  BannerAdSize,
  TestIds,
  InterstitialAd,
  AdEventType,
  RewardedAd,
  RewardedAdEventType,
} from "react-native-google-mobile-ads";
import { TouchableOpacity } from "react-native-gesture-handler";
const adUnitId = __DEV__
  ? TestIds.BANNER
  : "ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy";

function BannerAdScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Hello banner ad</Text>
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
    </View>
  );
}
const interstitialAdUnitId = __DEV__
  ? TestIds.INTERSTITIAL
  : "ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy";

const interstitial = InterstitialAd.createForAdRequest(interstitialAdUnitId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ["fashion", "clothing"],
});

function InterstitialAdScreen({ navigation }) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const unsubscribe = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        console.log("Add event show ad");
        setLoaded(true);
        interstitial.show();
      }
    );

    // Start loading the interstitial straight away
    console.log("Loading interstitial");
    interstitial.load();

    // Unsubscribe from events on unmount
    return () => {
      console.log("Unmount ad event");
      unsubscribe;
    };
  }, []);
  //   if (!loaded) {
  //     return null;
  //   }

  return (
    <View style={styles.container}>
      <Text>Hello interstitial ad</Text>
      <Button
        title="Load Interstitial"
        onPress={() => {
          interstitial.load();
        }}
      />
      <Button
        title="Show Interstitial"
        onPress={() => {
          try {
            interstitial.show();
          } catch (error) {
            console.log(
              "Errpr Interstitial because you are showing it without loading, ",
              error.message
            );
          }
        }}
      />
    </View>
  );
}

const rewardedAdUnitId = __DEV__
  ? TestIds.REWARDED
  : "ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy";

const rewarded = RewardedAd.createForAdRequest(rewardedAdUnitId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ["fashion", "clothing"],
});
function RewardedAdScreen({ navigation }) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    console.log("Loading Rewareded Ad");
    const unsubscribeLoaded = rewarded.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        console.log("loaded Add event rewareded ad");
        rewarded.show();
        setLoaded(true);
      }
    );
    const unsubscribeEarned = rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      (reward) => {
        console.log("User earned reward of ", reward);
      }
    );

    // Start loading the rewarded ad straight away
    console.log("Loading rewareded");
    rewarded.load();

    // Unsubscribe from events on unmount
    return () => {
      console.log("Unmount rewareded ad event");
      unsubscribeLoaded();
      unsubscribeEarned();
    };
  }, []);
  //   if (!loaded) {
  //     return null;
  //   }

  return (
    <View style={styles.container}>
      <Text>Hello Rewarded ad</Text>
      <Button
        title="Load Rewarded"
        onPress={() => {
          rewarded.load();
        }}
      />

      <Button
        title="Show rewarded"
        onPress={() => {
          try {
            rewarded.show();
          } catch (error) {
            console.log(
              "Error rewareded because you are showing it without loading, ",
              error.message
            );
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    margin: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "lightblue",
    borderRadius: 10,
  },
});
