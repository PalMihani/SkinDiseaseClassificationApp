import { Image, StyleSheet, View, FlatList, Text, TouchableOpacity } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from 'expo-router';
import { Camera as CameraIcon } from 'lucide-react-native';

const cardData = [
  {
    id: '1',
    image: require('@/assets/images/eczema.png'),
    title: 'Eczema',
    description: 'A condition causing inflamed, itchy, cracked, and rough skin.'
  },
  {
    id: '2',
    image: require('@/assets/images/melanoma.png'),
    title: 'Melanoma',
    description: 'A serious form of skin cancer that develops in the pigment-producing cells.'
  },
  {
    id: '3',
    image: require('@/assets/images/atopic_dermatitis.png'),
    title: 'Atopic Dermatitis',
    description: 'A chronic skin condition characterized by dry, itchy, and inflamed skin.'
  },
  {
    id: '4',
    image: require('@/assets/images/basal_cell_carcinoma.png'),
    title: 'Basal Cell Carcinoma',
    description: 'A common skin cancer that arises from the basal cells in the epidermis.'
  },
  {
    id: '5',
    image: require('@/assets/images/melanocytic_nevi.png'),
    title: 'Melanocytic Nevi',
    description: 'Commonly known as moles, these are benign proliferations of melanocytes.'
  },
  {
    id: '6',
    image: require('@/assets/images/benign_keratosis.png'),
    title: 'Benign Keratosis',
    description: 'Non-cancerous skin growths that may appear as rough, scaly patches.'
  },
  {
    id: '7',
    image: require('@/assets/images/psoriasis.png'),
    title: 'Psoriasis',
    description: 'An autoimmune condition that causes rapid skin cell turnover, leading to scaling and inflammation.'
  },
  {
    id: '8',
    image: require('@/assets/images/seborrheic_keratoses.png'),
    title: 'Seborrheic Keratoses',
    description: 'Common, benign skin growths that appear as brown or black waxy plaques.'
  },
  {
    id: '9',
    image: require('@/assets/images/tinea.png'),
    title: 'Tinea (Fungal)',
    description: 'A group of contagious fungal infections affecting the skin, hair, or nails.'
  },
  {
    id: '10',
    image: require('@/assets/images/warts.png'),
    title: 'Warts',
    description: 'Small, grainy skin growths caused by the human papillomavirus (HPV).'
  },
];


function CardItem({ item }) {
  return (
    <View style={styles.cardContainer}>
      <Image source={item.image} style={styles.cardImage} />
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardDescription} numberOfLines={2}>
        {item.description}
      </Text>
    </View>
  );
}

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
        headerImage={
          <Image
            source={require('@/assets/images/partial-react-logo.png')}
            style={styles.reactLogo}
          />
        }>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Welcome!</ThemedText>
          <HelloWave />
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">To Skin Disease Prediction</ThemedText>
          <ThemedText>
            Just take a photo, and we'll do the rest for you.
          </ThemedText>
        </ThemedView>
        <View style={styles.horizontalScrollContainer}>
          <FlatList
            data={cardData}
            renderItem={({ item }) => <CardItem item={item} />}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScrollContent}
          />
        </View>
      </ParallaxScrollView>

      {/* Circular Camera Button at Bottom */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => router.push('/Camera')} style={styles.cameraButton}>
          <CameraIcon size={40} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50, // Adjusts button position at the bottom
    left: '50%',
    transform: [{ translateX: -40 }], // Centers the button horizontally
  },
  cameraButton: {
    width: 80,
    height: 80,
    borderRadius: 40, // Perfect Circle
    backgroundColor: 'white', // White background
    marginVertical: -15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  horizontalScrollContainer: {
    marginTop: 0, // Remove top margin
    marginBottom: 0, // Remove bottom margin
  },
  horizontalScrollContent: {
    paddingHorizontal: 10,
  },
  cardContainer: {
    width: 250, // Increased from 200 to make cards larger
    marginRight: 15,
    backgroundColor: 'black',
    borderRadius: 10,
    padding: 15, // Slightly increased padding
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardImage: {
    width: '100%',
    height: 180, // Increased from 150 to match larger card
    borderRadius: 8,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18, // Slightly larger font
    fontWeight: 'bold',
    marginBottom: 5,
    color: "white"
  },
  cardDescription: {
    fontSize: 16, // Slightly larger font
    color: 'white',
  },
});