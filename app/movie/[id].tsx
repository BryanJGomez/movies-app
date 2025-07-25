import MovieCast from "@/presentation/components/movie/MovieCast";
import MovieDescription from "@/presentation/components/movie/MovieDescription";
import MovieHeader from "@/presentation/components/movie/MovieHeader";
import { useMovie } from "@/presentation/hooks/useMovie";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const MovieScreen = () => {
  const { id } = useLocalSearchParams();

  const { movieQuery, castQuery } = useMovie(+id);

  if (movieQuery.isLoading || !movieQuery.data) {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View className="flex flex-1 justify-center items-center">
          <Text className="mb-4">Espere por favor</Text>
          <ActivityIndicator color="purple" size={30} />
        </View>
      </GestureHandlerRootView>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView>
        <MovieHeader
          originalTitle={movieQuery.data.originalTitle}
          poster={movieQuery.data.poster}
          title={movieQuery.data.title}
        />

        <MovieDescription movie={movieQuery.data} />

        {/* Movie Cast */}
        <MovieCast cast={castQuery.data ?? []} />
      </ScrollView>
    </GestureHandlerRootView>
  );
};

export default MovieScreen;
