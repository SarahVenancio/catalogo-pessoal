import React, { useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView, useWindowDimensions, SafeAreaView } from "react-native";
import catalogo from "../catalogo.json";

export default function CatalogoScreen() {
  const { width } = useWindowDimensions();

  // 1. Lógica para definir o número de colunas (mantida do seu código)
  const getNumColumns = () => {
    if (width >= 900) {
      return 4; // Telas grandes (tablets)
    }
    if (width >= 600) {
      return 2; // Telas médias (celular na horizontal)
    }
    return 1; // Telas pequenas (celular na vertical)
  };
  
  const numColumns = getNumColumns();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#280606ff' }}>
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.title}>🎬Mulheres em Cena</Text>
        <View style={styles.listContainer}>
          {catalogo.map((item) => (
            // 2. Passando 'numColumns' como propriedade para cada card
            <InteractiveCard key={item.id.toString()} item={item} numColumns={numColumns} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// 3. Recebendo a prop 'numColumns' no componente do card
function InteractiveCard({ item, numColumns }: { item: any, numColumns: number }) {
  const [isHovered, setIsHovered] = useState(false);

  // 4. Lógica para determinar a 'width' do card com base na prop
  //    Isso substitui o 'width: "48%"' fixo por uma lógica dinâmica.
  let cardWidthStyle = {};
  if (numColumns === 1) {
    cardWidthStyle = { width: '98%' }; // Quase 100% para uma única coluna
  } else if (numColumns === 2) {
    cardWidthStyle = { width: '48%' }; // Seu estilo original para 2 colunas
  } else if (numColumns === 4) {
    cardWidthStyle = { width: '23%' }; // Estilo para 4 colunas
  }

  const cardStyle = [
    styles.card,
    cardWidthStyle, // 5. Aplicando o estilo de largura dinâmico
    {
      transform: [{ scale: isHovered ? 1.05 : 1 }],
      // A propriedade 'boxShadow' não existe no React Native.
      // O sombreamento é feito com 'elevation' e as props 'shadow...'.
      elevation: isHovered ? 12 : 4,
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

// Seus estilos originais, sem nenhuma alteração nos tamanhos de fonte ou imagem
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
    // A 'width' foi removida daqui para ser aplicada dinamicamente
  },
  cardImage: {
    width: "100%",
    height: 180, // Mantido conforme seu pedido
    borderRadius: 12,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 22, // Mantido conforme seu pedido
    fontFamily: "CinzelBold",
    color: "#e6e6e6",
    marginBottom: 6,
    textAlign: "center",
    fontWeight: "bold",
  },
  cardGenre: {
    fontSize: 18, // Mantido conforme seu pedido
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
    fontSize: 16, // Mantido conforme seu pedido
    fontFamily: "CinzelRegular",
    color: "#888282ff",
  },
  cardTime: {
    fontSize: 16, // Mantido conforme seu pedido
    fontFamily: "CinzelRegular",
    color: "#888282ff",
    marginRight: 15,
  },
});