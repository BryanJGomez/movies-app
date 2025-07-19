import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import MainSlideshow from "@/presentation/components/movies/MainSlideshow";
import MoviesHorizontalList from "@/presentation/components/movies/MoviesHorizontalList";
import { useMovies } from "@/presentation/hooks/useMovies";
const HomeScreen = () => {
  const safeArea = useSafeAreaInsets();
  const { nowPlayingQuery, popularQuery, upcomingQuery, topRatedQuery } =
    useMovies();

  if (nowPlayingQuery.isLoading) {
    return (
      <View className="justify-center items-center flex-1">
        <ActivityIndicator color="purple" size={30} />
      </View>
    );
  }

  return (
    <View className="mt-2 pb-10" style={{ paddingTop: safeArea.top }}>
      <Text className="text-3xl font-bold px-4 mb-2">Movies App</Text>
      <MainSlideshow movies={nowPlayingQuery.data ?? []} />

      {/* {/ * popular movies */}
      <MoviesHorizontalList
        title="Populares"
        movies={popularQuery.data ?? []}
        className="mb-5"
      />

      {/* {/ * top rated movies */}
      <MoviesHorizontalList
        title="Mejor valoradas"
        movies={topRatedQuery.data?.pages.flat() ?? []}
        className="mb-5"
        loadNextPage={topRatedQuery.fetchNextPage}
      />

      {/* {/ * upcoming movies */}
      <MoviesHorizontalList
        title="Próximamente"
        movies={upcomingQuery.data ?? []}
        className="mb-5"
      />
    </View>
  );
};

export default HomeScreen;
