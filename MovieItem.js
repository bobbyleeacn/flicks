import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image
} from "react-native";

export default class MovieItem extends Component {
  render() {
    const img = {
      uri: `https://image.tmdb.org/t/p/w342${this.props.poster_path}`
    };
    // Conditional rendering for standard and gallery view
    if (!this.props.gridView) {
      return (
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Details", this.props)}
        >
          <View style={styles.container}>
            <Image source={img} style={styles.images} />
            <View style={styles.text}>
              <Text style={{ fontWeight: "bold" }}>{this.props.title}</Text>
              <Text>
                {"\n"}
                {this.props.overview}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Details", this.props)}
        >
          <View style={styles.container}>
            <Image source={img} style={styles.images} />
          </View>
        </TouchableOpacity>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    padding: 5,
    borderRadius: 4,
    borderWidth: 0.4,
    borderColor: "#d6d7da"
  },

  images: {
    height: 120,
    width: 70
  },
  text: {
    width: 250,
    height: 120,
    padding: 5
  }
});
