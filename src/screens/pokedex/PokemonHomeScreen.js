import React, { useEffect, useState } from "react";
import { View, Text, Image, Input } from "react-native";
import { Button } from "react-native-elements";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native";

export default function PokemonHomeScreen() {
  const navigation = useNavigation();
  const [pokemons, setPokemons] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [pokemonDetail, setPokemonDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  const a = [1, 2, 3];
  const styles = {
    card: {
      margin: 10,
      padding: 10,
      backgroundColor: "#fff",
      borderRadius: 5,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 5,
      shadowOffset: { width: 0, height: 0 },
    },
    image: {
      width: "100%",
      height: 200,
      borderRadius: 5,
    },
    title: {
      fontSize: 18,
      marginTop: 10,
    },
  };

  useEffect(() => {
    fetchingPokedex();
  }, [currentPage]);

  const fetchingPokedex = async () => {
    const pokedexRes = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?offset=${
        currentPage === 1 ? 0 : currentPage * 10
      }&limit=10`
    );
    if (pokedexRes?.data?.results) {
      setLastPage(Math.floor(pokedexRes.data.count / 10) ?? 0);
      setPokemons(pokedexRes.data.results);
      setIsLoading(false);
    }
  };

  return (
    <ScrollView>
      {pokemons?.map((item) => (
        <View style={styles.card}>
          <Text
            style={{
              fontSize: 30,
              textAlign: "center",
              fontWeight: "bold",
              color: "blue",
            }}
          >
            {item.name}
          </Text>
          <Image
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSdRKOBteZ27eUR1APw8FistZBxTIv7xIDC8o6Iq-KaYBMif2z1ciouLd49zS3_u3A47k&usqp=CAU",
            }}
            style={styles.image}
          />
          <Button
            title="View"
            onPress={() => {
              navigation.navigate("ViewPokemon", {
                url: item.url,
              });
            }}
          />
        </View>
      ))}
      <View
        style={{
          marginBottom: 40,
          alignItems: "flex-end",
          flexDirection: "row",
          justifyContent: "center",
          paddingRight: 5,
        }}
      >
        <Button
          title={"<<"}
          disabled={currentPage === 1}
          onPress={() => setCurrentPage(currentPage - 1)}
          style={{ backgroundColor: "#4287f5", width: 40 }}
        ></Button>

        <Text style={{ marginLeft: 10, marginRight: 10 }}>{currentPage}</Text>
        <Button
          title=">>"
          onPress={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === lastPage}
          style={{ backgroundColor: "#4287f5", width: 40 }}
        ></Button>
      </View>
    </ScrollView>
  );
}
