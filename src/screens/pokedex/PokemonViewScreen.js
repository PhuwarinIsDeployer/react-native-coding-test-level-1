import React, { useState, useEffect } from "react";
import { View, Text, Image, Button } from "react-native";
import axios from "axios";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

function PokemonViewScreen() {
  const [pokemonDetail, setPokemonDetail] = useState(null);
  const route = useRoute();
  const navigation = useNavigation();
  const url = route.params.url;

  useEffect(() => {
    async function fetchDetails() {
      const response = await axios.get(url);
      setPokemonDetail(response.data);
    }

    fetchDetails();
  }, []);

  if (!pokemonDetail) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      <Button title="Back" type="outline" onPress={() => navigation.goBack()} />
      <Text>{pokemonDetail.name}</Text>
      <Image
        style={{ width: 300, height: 300 }}
        source={{ uri: pokemonDetail.sprites.front_default }}
      />
      <View>
        {pokemonDetail.stats.map((stat) => (
          <View key={stat.stat.name}>
            <Text>
              {stat.stat.name}: {stat.base_stat}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

export default PokemonViewScreen;
