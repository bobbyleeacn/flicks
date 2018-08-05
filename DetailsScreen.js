import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  WebView,
  Button
} from "react-native";
import { Tile, Rating } from "react-native-elements";
import Modal from "react-native-modal";

export default class DetailsScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("title")
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      movieKey: ""
    };
  }

  componentDidMount() {
    this.getMovieKey();
  }

  toggleModal() {
    this.setState({ isVisible: !this.state.isVisible });
  }

  getMovieKey() {
    let url = `https://api.themoviedb.org/3/movie/${
      this.props.navigation.state.params.id
    }/videos?api_key=5a884e8cc149705048e256ab1d7bd555`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({
          movieKey: data.results[0].key
        });
      });
  }

  render() {
    const img = {
      uri: `https://image.tmdb.org/t/p/w342${
        this.props.navigation.state.params.poster_path
      }`
    };
    const starValue = this.props.navigation.state.params.vote_average / 2;

    return (
      <Tile
        height={700}
        imageSrc={img}
        icon={{ name: "play-circle", type: "font-awesome" }}
        title={this.props.navigation.state.params.title}
        onPress={() => this.toggleModal()}
        contentContainerStyle={{ height: 250 }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "column"
          }}
        >
          <Modal
            isVisible={this.state.isVisible}
            onBackdropPress={() => this.setState({ isVisible: false })}
            onSwipe={() => this.setState({ isVisible: false })}
            swipeDirection="right"
          >
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                paddingBottom: 160
              }}
            >
              <View style={{ height: 430, width: 320 }}>
                <WebView
                  javaScriptEnabled={true}
                  source={{
                    uri: `https://www.youtube.com/embed/${
                      this.state.movieKey
                    }?rel=0&autoplay=1&showinfo=0&controls=0`
                  }}
                />
              </View>
              <Button
                title={"Close X -->"}
                onPress={() => this.toggleModal()}
                color={"white"}
              />
            </View>
          </Modal>
          <Rating imageSize={15} readonly startingValue={starValue} />
          <Text>{this.props.navigation.state.params.release_date}</Text>
          <Text>{this.props.navigation.state.params.overview}</Text>
        </View>
      </Tile>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    padding: 5
  },

  images: {
    height: 300,
    width: 200
  }
});
