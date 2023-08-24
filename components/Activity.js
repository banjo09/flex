import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../util";
import { CustomText } from "./UI/CustomText";

const Activity = ({
  initials,
  author,
  type,
  status,
  selected,
  handleSelection,
  days,
  appendEvent,
}) => {
  return (
    <>
      {appendEvent ? null : <View style={styles.divider} />}
      <View style={styles.content}>
        <View style={appendEvent ? styles.innerCardAppend : styles.innerCard}>
          {appendEvent ? (
            <View style={styles.emptyView} />
          ) : (
            <>
              <TouchableOpacity
                style={{
                  ...styles.checkCircle,
                  borderColor: selected ? colors.red : colors.black,
                  backgroundColor: selected ? colors.red : colors.white
                }}
                onPress={handleSelection}
              >
                {selected ? (
                  <Ionicons
                    name="md-checkmark"
                    size={14}
                    color={colors.white}
                    style={{ marginTop: -1.5 }}
                  />
                ) : null}
              </TouchableOpacity>
              <View style={styles.labelCircle}>
                <CustomText style={styles.labelText}>{initials}</CustomText>
              </View>
            </>
          )}
          <View style={styles.textContainer}>
            <CustomText style={styles.eventDescription}>
              <CustomText style={styles.eventText}>{author} </CustomText>
              has {type} to
              <View style={styles.dotContainer}>
                <View style={styles.dot} />
              </View>
              <CustomText style={styles.eventStatusText}>{status}{" "} </CustomText>
              <CustomText style={styles.days}>{" "}{days}</CustomText>
            </CustomText>
          </View>
        </View>
      </View>
    </>
  );
};

export default Activity;

const styles = StyleSheet.create({
  content: {
    margin: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  innerCard: {
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'center'
  },
  textContainer: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: "row",
  },
  emptyView: {
    width: 48,
  },
  innerCardAppend: {
    marginTop: -10,
    flexDirection: "row",
    alignItems: "center",
  },
  checkCircle: {
    width: 15,
    height: 15,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  labelCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.purple,
    marginHorizontal: 5,
  },
  divider: {
    width: "94%",
    borderWidth: 0.3,
    borderColor: colors.text,
    alignSelf: "center",
    opacity: 0.1,
  },
  labelText: {
    fontSize: 12,
    fontWeight: "500",
    color: colors.white,
    marginTop: -1
  },
  eventDescription: {
    fontSize: 10,
    lineHeight: 13,
    color: colors.text
  },
  eventText: {
    fontSize: 12,
    fontWeight: "medium",
    color: colors.black
  },
  eventStatusText: {
    fontSize: 12,
    fontWeight: "medium",
    marginLeft: 15,
    marginRight: 20,
    paddingRight: 20,
    color: colors.black
  },
  dotContainer: {
    width: 10,
    height: 10,
    paddingLeft: 2,
    paddingTop: 4

  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.red,
  },
  days: {
    marginLeft: 20,
    paddingLeft: 20,
    fontSize: 8,
  },
});
