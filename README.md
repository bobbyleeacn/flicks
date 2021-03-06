# Project 2 - *Flixie Mobile*

**Flixie Mobile** is a movies app using the [The Movie Database API](http://docs.themoviedb.apiary.io/#).

Time spent: **10+** hours spent in total

## User Stories

- User can view a list of movies currently playing in theaters. 
- User can view movie details by tapping on a cell.
- User sees loading state while waiting for the API.
- User can pull to refresh the movie list.

## Additional Features
- Tab bar for **Now Playing** and **Top Rated** movies.
- Toggle View to switch between list view and grid view.
- Movie Search enabled
- Cell selections highlighted with touchableOpacity.
- Infinite Scrolling to fetch additional movies
- View youtube trailer in details screen
- Movie rating displayed with star icon

## Future updates
- User sees an error message when there is a network error.
- Customize the navigation bar.
- Page navigation
- Improve application aesthetics


## Video Walkthrough

Here's a walkthrough of implemented user stories: 

<img src='https://github.com/bobbyleeacn/flicks/blob/master/img/flixie_mobile.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

GIF created with [LiceCap](http://www.cockos.com/licecap/).

## Notes / Known Issues

1) Flatlist onEndReached prop triggers twice on iOS because of the 'bounce' effect. https://github.com/facebook/react-native/issues/14015  Fix is work in progress.

2) App Class and HomeScreen class need to be separated into different files. 

3) 'HomeScreen' should be broken up into 'MovieList' component which will be reusable for both NowPlayingScreen and TopRatedScreen. The fetchData() method needs to be updated with an additional parameter to access different API endpoints to accomodate 'Now Playing' vs 'Top Rated' fetches. 
