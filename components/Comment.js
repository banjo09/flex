import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../util";
import { CustomText } from "./UI/CustomText";

const Comment = ({
  title,
  days,
  initials,
  author,
  handleSelection,
  description,
  selected,
  receiver,
  appendEvent,
}) => {
  return (
    <>
      {appendEvent ? null : <View style={styles.divider} />}
      <View style={styles.content}>
        <View style={appendEvent ? null : styles.innerCard}>
          {appendEvent ? null : (
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
              <CustomText style={styles.eventText}>{author}</CustomText>
            </>
          )}
        </View>
        <View style={styles.container}>
          <View style={styles.commentTitleView}>
            <CustomText style={styles.title}>{title}</CustomText>
          </View>
          <View style={styles.descriptionContainer}>
            <View style={styles.commentDetails}>
              <Ionicons name="person-circle" size={15} color={colors.grey} />
              <CustomText style={styles.recieverText}>{receiver}</CustomText>
              <CustomText style={styles.days}>{days}</CustomText>
            </View>
            <View style={styles.descriptionContainer}>
              <CustomText style={styles.description}>{description}</CustomText>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default Comment;

const styles = StyleSheet.create({
  content: {
    paddingTop: 8,
    marginBottom: 10
  },
  innerCard: {
    margin: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 14
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
  labelText: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.white,
    marginTop: -2.5
  },
  eventText: {
    fontSize: 12,
    fontWeight: "600",
  },
  days: {
    textAlign: "left",
    fontSize: 10,
    marginLeft: 10,
    color: colors.text,
  },
  commentDetails: {
    flexDirection: "row",
    marginTop: 7,
    alignItems: "center",
    width: "100%",
  },
  divider: {
    width: "94%",
    borderColor: colors.text,
    borderWidth: 0.3,
    alignSelf: "center",
    opacity: 0.1,
  },
  recieverText: {
    marginLeft: 10,
    fontSize: 12,
  },
  container: {
    borderWidth: 0.1,
    borderRadius: 2,
    borderColor: colors.text,
    width: "86%",
    alignSelf: "center",
    padding: 10,
    marginBottom: 5,
    marginTop: 5
  },
  description: {
    marginTop: 5,
    fontSize: 12,
    color: colors.text,
  },
  descriptionContainer: {
    flex: 1
  },
  commentTitleView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
