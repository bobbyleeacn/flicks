import React, { Component } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  Button,
} from "react-native";
// import TEST_DATA from "./now_playing.json";
import MovieItem from "./MovieItem.js";
import DetailsScreen from "./DetailsScreen.js";
import TopRatedScreen from "./TopRatedScreen.js";
import { createStackNavigator, createBottomTabNavigator } from "react-navigation";
import { SearchBar } from 'react-native-elements';


class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Flixie Mobile - Now Playing"
  };

  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      loading: true,
      refreshing: false,
      page: 1,
      searchText: '',
      gridView: false,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData(page = 1) {
    let url =
      "https://api.themoviedb.org/3/movie/now_playing?api_key=5a884e8cc149705048e256ab1d7bd555";
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
    this.setState({page: 1});
  }

  // For infinite scrolling
  async loadMore() {
    this.setState({refreshing: true});
    const newPage = this.state.page + 1;
    await this.fetchData(newPage);
    this.setState({ page: newPage });
  }
  

  render() {
    
    return (
      <View style={styles.container}>
      <SearchBar lightTheme round clearIcon placeholder='Search ... ' containerStyle={{width: 300}} onChangeText={(text)=>this.handleSearch(text)}/>
      <Button title='toggle view' onPress={()=> this.setState({gridView: !this.state.gridView})} color={'grey'} />
        <FlatList
          data={this.state.movies}
          keyExtractor={movie => movie.id.toString()}
          key = {( this.state.gridView ) ? 'TWO COLUMN' : 'ONE COLUMN' }
          numColumns = { this.state.gridView ? 3 : 1 }
          renderItem={({ item }) => (
            <MovieItem {...item} navigation={this.props.navigation} gridView={this.state.gridView}/>
          )}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
          onEndReachedThreshold={0.05}
          onEndReached={()=>this.loadMore()}
          
          ListFooterComponent={() => (
            <View>
              <ActivityIndicator size="large" />
            </View>
          )}

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

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen
  },
  {
    initialRouteName: "Home"
  }
);

const TopRatedStack = createStackNavigator({
  TopRated: TopRatedScreen,
  Details: DetailsScreen,
});

const TabStack = createBottomTabNavigator(
  {
    NowPlaying: RootStack, 
    TopRated: TopRatedStack,
    
  },
);

export default class App extends React.Component {
  render() {
    return <TabStack />;
  }
}
