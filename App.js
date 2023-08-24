import React, { useState, useEffect, useCallback } from "react";
import { StatusBar } from 'expo-status-bar';
import {
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  StatusBar as NativeStatusBar,
  StyleSheet
} from 'react-native';
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, eventsSort, formatDate, typeFormatter } from './util';
import Activity from './components/Activity';
import Comment from './components/Comment';
import { CustomText } from "./components/UI/CustomText";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    "bold": require("./assets/fonts/bold.otf"),
    "regular": require("./assets/fonts/regular.otf"),
    "medium": require("./assets/fonts/medium.otf"),
    "light": require("./assets/fonts/light.otf"),
  });

  const sortedEvents = eventsSort();
  const [completed, setCompleted] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const handleSelect = (clickedItemIndex) => {
    sortedEvents.forEach((event, index) => {
      event.selected = false;
      if (clickedItemIndex >= index) {
        event.selected = !event.selected;
        setCompleted(!completed);
      }
    });
  };

  const handleAppend = () => {
    sortedEvents.map((event, index) => {
      event.appendEvent = false;
      if (
        index > 0 &&
        sortedEvents[index].author === sortedEvents[index - 1].author &&
        sortedEvents[index].type === sortedEvents[index - 1].type
      ) event.appendEvent = true;
    });
  };

  useEffect(() => {
    handleAppend();
  }, [completed]);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.mainContainer} onLayout={onLayoutRootView}>
      <StatusBar style="auto" />
      <View style={styles.container}>
        <FlatList
          data={sortedEvents}
          renderItem={(event) => {
            if (event.index > 5 && !showMore) return null;
            if (event.item.type === "activity") {
              return (
                <Activity
                  author={event.item.author}
                  initials={event.item.author.charAt(0)}
                  type={typeFormatter(event.item.activity.type)}
                  status={event.item.activity.status}
                  selected={event.item.selected}
                  handleSelection={() => handleSelect(event.index)}
                  days={formatDate(event.item.createdAt)}
                  appendEvent={event.item.appendEvent}
                />
              );
            }
            if (event.item.type === "comment") {
              return (
                <Comment
                  author={event.item.author}
                  initials={event.item.author.charAt(0)}
                  title={event.item.message.title}
                  description={event.item.message.description}
                  selected={event.item.selected}
                  handleSelection={() => handleSelect(event.index)}
                  days={formatDate(event.item.createdAt)}
                  receiver={event.item.message.receiver}
                  appendEvent={event.item.appendEvent}
                />
              );
            }
          }}
          ListFooterComponent={() => (
            <TouchableOpacity
              style={styles.showMore}
              onPress={() => setShowMore(!showMore)}
            >
              <MaterialCommunityIcons name="folder-open" color={colors.purple} size={20} />
              <CustomText style={styles.showMoreText}>
                {showMore ? "Show Less" : `Show ${sortedEvents.length - 6} more events`}
              </CustomText>
            </TouchableOpacity>
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: NativeStatusBar.currentHeight,
    paddingHorizontal: 15
  },
  container: {
    borderWidth: 0.2,
    borderRadius: 5,
    borderColor: colors.text,
    width: "100%",
    paddingHorizontal: 10,
  },
  showMore: {
    margin: 20,
    padding: 10,
    marginLeft: 0,
    paddingLeft: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  showMoreText: {
    color: colors.purple,
    marginLeft: 10,
    fontSize: 14,
    fontWeight: "medium",
  },
});
