import {
  DARK_TEXT,
  GREY_TEXT,
  LIST_CELL_BG_COLOR,
  RED,
  SHADOW_COLOR,
} from "../utils/theme";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { Component } from "react";

import PTag from "./PTag";
import moment from "moment";

class PListCell extends Component {
  onPress() {
    console.log(new Error("onPress not overriden"));
    this.props.navigation.navigate('ContributionDetail');
  }

  formatDate(date) {
    // TODO: Today, Yesterday, 01/04/12 -- date types
    return moment(date).fromNow();
  }

  renderDetailsForType() {
    if (this.props.type === "contribution") {
      return (
        <View style={styles.details}>
          <Text style={styles.title}>{this.props.title}</Text>
          <View style={styles.tagContainer}>

            <PTag>{"Supplies"}</PTag>

          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.details}>
          <Text style={styles.title}>{this.props.title}</Text>
          <Text style={styles.subtitle}>
            San Jose, CA • {this.formatDate(Date.now())}
          </Text>
          <Text style={styles.amountSpent}>$33.75 Spent</Text>
        </View>
      );
    }
  }

  renderContributionForType() {
    return (
      <Text
        style={[
          styles.amountContributed,
          {
            color: this.props.type === "transaction" ? RED : DARK_TEXT,
          },
        ]}
      >
        {this.props.type === "transaction" ? "-" : "+"}${this.props.price}
      </Text>
    );
  }

  render() {
    return (
      <TouchableOpacity onPress={this.onPress.bind(this)}>
        <View style={styles.container}>
          <Image resizeMode="contain" source={this.props.image} style={styles.icon} />
          {this.renderDetailsForType()}
          <View style={styles.moreDetails}>
            {this.renderContributionForType()}
            <Image source={require("../assets/images/grey-chevron.png")} />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: LIST_CELL_BG_COLOR,
    borderRadius: 16,
    paddingLeft: 14,
    paddingRight: 14,
    paddingTop: 14,
    paddingBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.2,
    shadowRadius: 30,
    marginBottom: 14,
  },
  details: {
    flexDirection: "column",
    justifyContent: "center",
  },
  icon: {
    height: 53,
    width: 53,
    // backgroundColor: GREY_TEXT,
    // borderRadius: 13,
    marginRight: 14,
  },
  moreDetails: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    alignSelf: "flex-start",
    flex: 1,
  },
  title: {
    color: DARK_TEXT,
    fontFamily: "CircularStd-Black",
    fontSize: 17,
    marginBottom: 5
  },
  subtitle: {
    color: GREY_TEXT,
    fontFamily: "CircularStd-Bold",
    fontSize: 9,
  },
  amountSpent: {
    color: DARK_TEXT,
    fontFamily: "CircularStd-Black",
    fontSize: 10,
  },
  amountContributed: {
    color: RED,
    fontFamily: "CircularStd-Black",
    fontSize: 17,
    marginRight: 5,
  },
  image: {
    width: 10,
    height: 10
  }
});

export default PListCell;
