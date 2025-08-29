import React, { useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import catalogo from "../catalogo.json";

export default function CatalogoScreen() {
  return (
    <ScrollView style={styles.scrollContainer}>
      <Text style={styles.title}>🎬Mulheres em Cena</Text>

      <View style={styles.listContainer}>
        {catalogo.map((item) => (
          <InteractiveCard key={item.id.toString()} item={item} />
        ))}
      </View>
    </ScrollView>
  );
}

// Novo componente para cada card
function InteractiveCard({ item }: { item: any }) {
  const [isHovered, setIsHovered] = useState(false);

  const cardStyle = [
    styles.card,
    {
      transform: [{ scale: isHovered ? 1.05 : 1 }],
      boxShadow: isHovered ? '0 8px 16px rgba(0,0,0,0.5)' : 'none',
    },
  ];

  return (
    <View
      style={cardStyle}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      <Image
        source={{ uri: item.imagem }}
        style={styles.cardImage}
        resizeMode="cover"
      />
      <Text style={styles.cardTitle}>{item.titulo}</Text>
      <Text style={styles.cardGenre}>{item.genero}</Text>

      <View style={styles.detailsRow}>
        <Text style={styles.cardTime}>{item.duracao}</Text>
        <Text style={styles.cardYear}>{item.ano}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: "#280606ff",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 50,
    fontFamily: "CinzelBold",
    color: "#f5f5f5",
    textAlign: "center",
    marginBottom: 30,
    letterSpacing: 3,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  listContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "#120101ff",
    borderRadius: 12,
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#333",
    shadowColor: "#000",
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 4,
    alignItems: "center",
    width: "48%",
  },
  cardImage: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 22,
    fontFamily: "CinzelBold",
    color: "#e6e6e6",
    marginBottom: 6,
    textAlign: "center",
    fontWeight: "bold",
  },
  cardGenre: {
    fontSize: 18,
    fontFamily: "CinzelRegular",
    color: "#a3a3a3",
    marginBottom: 4,
    fontStyle: "italic",
    textAlign: "center",
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 4,
  },
  cardYear: {
    fontSize: 16,
    fontFamily: "CinzelRegular",
    color: "#888282ff",
  },
  cardTime: {
    fontSize: 16,
    fontFamily: "CinzelRegular",
    color: "#888282ff",
    marginRight: 15,
  },
});