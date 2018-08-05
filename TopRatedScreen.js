import React, { Component } from "react";
import {
  StyleSheet,
  View,
  FlatList,
} from "react-native";
import MovieItem from "./MovieItem.js";
import { SearchBar } from 'react-native-elements';


export default class TopRatedScreen extends React.Component {
  static navigationOptions = {
    title: "Flixie Mobile - Top Rated"
  };

  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      loading: true,
      refreshing: false,
      page: 1,
      searchText: '',
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData(page = 1) {
    let url =
      "https://api.themoviedb.org/3/movie/top_rated?api_key=5a884e8cc149705048e256ab1d7bd555";
    fetch(`${url}&page=${page}`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          movies: data.results,
          loading: false,
          refreshing: false,
        });
      });
  }

  handleSearch(searchString) {
    if (searchString === '') {
      this.fetchData();
    } else {
    let query = searchString.replace(/\s/g, "+")
    let url =
      "https://api.themoviedb.org/3/search/movie?api_key=5a884e8cc149705048e256ab1d7bd555&query=";
    fetch(`${url}${query}`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          movies: data.results,
          loading: false,
          refreshing: false,
        });
      });
    }
  }

  handleRefresh = ()=> {
    this.setState({refreshing: true});
    this.fetchData(1);
  }
  

  render() {
    return (
      <View style={styles.container}>
      <SearchBar lightTheme round clearIcon placeholder='Search ... ' containerStyle={{width: 300}} onChangeText={(text)=>this.handleSearch(text)}/>
        <FlatList
          data={this.state.movies}
          keyExtractor={movie => movie.id.toString()}
          renderItem={({ item }) => (
            <MovieItem {...item} navigation={this.props.navigation} />
          )}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ededed",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20
  }
});