import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Image, StatusBar, SafeAreaView } from 'react-native';
import { Video } from 'expo-av';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [urlInput, setUrlInput] = useState('');
  const [currentVideo, setCurrentVideo] = useState(null);

  const [movies, setMovies] = useState([
    {
      id: '1',
      title: 'Tây Du Ký 1986',
      rating: '8.8',
      year: '1986',
      poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500',
      streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      description: 'Phim truyền hình kinh điển về chuyến thỉnh kinh của bốn thầy trò Đường Tăng.'
    },
    {
      id: '2',
      title: 'Đại Chiến Titan (Attack on Titan)',
      rating: '9.0',
      year: '2021',
      poster: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=500',
      streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      description: 'Nhân loại đấu tranh sinh tồn chống lại các Titan khổng lồ ăn thịt người.'
    }
  ]);

  const handleAddSource = () => {
    if (!urlInput.trim()) return;
    const newMovie = {
      id: Date.now().toString(),
      title: `Phim Từ Web (${urlInput.replace('https://', '').substring(0, 15)}...)`,
      rating: '8.5',
      year: '2026',
      poster: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500',
      streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      description: `Nguồn trích xuất tự động từ URL: ${urlInput}`
    };
    setMovies([newMovie, ...movies]);
    setUrlInput('');
    setActiveTab('home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#141414" />

      {currentVideo ? (
        <View style={styles.playerContainer}>
          <Video
            source={{ uri: currentVideo.streamUrl }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="contain"
            shouldPlay
            useNativeControls
            style={styles.videoPlayer}
          />
          <TouchableOpacity style={styles.closePlayerBtn} onPress={() => setCurrentVideo(null)}>
            <Text style={styles.closeText}>✕ Đóng Player</Text>
          </TouchableOpacity>
        </View>
      ) : null}

      <View style={styles.header}>
        <Text style={styles.logo}>CINEMA<Text style={styles.logoRed}>STREAM</Text></Text>
        <View style={styles.navBtns}>
          <TouchableOpacity onPress={() => setActiveTab('home')}>
            <Text style={[styles.navText, activeTab === 'home' && styles.navTextActive]}>Trang chủ</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab('add')}>
            <Text style={[styles.navText, activeTab === 'add' && styles.navTextActive]}>+ Thêm Web</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {activeTab === 'home' ? (
          <View>
            <TouchableOpacity style={styles.heroBanner} onPress={() => setCurrentVideo(movies[0])}>
              <Image source={{ uri: movies[0].poster }} style={styles.heroBg} />
              <View style={styles.heroOverlay}>
                <Text style={styles.heroBadge}>Phim Hot Nhất</Text>
                <Text style={styles.heroTitle}>{movies[0].title}</Text>
                <Text style={styles.heroDesc} numberOfLines={2}>{movies[0].description}</Text>
                <View style={styles.playBtn}>
                  <Text style={styles.playBtnText}>▶ Xem Ngay</Text>
                </View>
              </View>
            </TouchableOpacity>

            <Text style={styles.sectionTitle}>Danh Sách Phim Của Ông</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalList}>
              {movies.map((item) => (
                <TouchableOpacity key={item.id} style={styles.movieCard} onPress={() => setCurrentVideo(item)}>
                  <Image source={{ uri: item.poster }} style={styles.cardPoster} />
                  <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
                  <Text style={styles.cardInfo}>⭐ {item.rating} • {item.year}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        ) : (
          <View style={styles.addSourceContainer}>
            <Text style={styles.sectionTitle}>Thêm Web Phim Nguồn</Text>
            <Text style={styles.subText}>Dán URL bất kỳ trang web phim nào vào đây, AI sẽ bóc tách link phim và tự tạo giao diện chuẩn Netflix cho ông.</Text>
            
            <TextInput
              style={styles.input}
              placeholder="https://trangwebphim.com/phim-hay..."
              placeholderTextColor="#777"
              value={urlInput}
              onChangeText={setUrlInput}
            />

            <TouchableOpacity style={styles.submitBtn} onPress={handleAddSource}>
              <Text style={styles.submitBtnText}>Bóc Tách & Thêm Phim</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#141414' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, backgroundColor: '#000' },
  logo: { color: '#FFF', fontSize: 20, fontWeight: 'bold' },
  logoRed: { color: '#E50914' },
  navBtns: { flexDirection: 'row', gap: 16 },
  navText: { color: '#AAA', fontSize: 14, fontWeight: '600' },
  navTextActive: { color: '#FFF', borderBottomWidth: 2, borderBottomColor: '#E50914' },
  content: { flex: 1 },
  heroBanner: { height: 260, margin: 16, borderRadius: 12, overflow: 'hidden', position: 'relative' },
  heroBg: { width: '100%', height: '100%' },
  heroOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.6)', padding: 16, justifyContent: 'flex-end' },
  heroBadge: { color: '#E50914', fontWeight: 'bold', fontSize: 12, marginBottom: 4 },
  heroTitle: { color: '#FFF', fontSize: 22, fontWeight: 'bold', marginBottom: 6 },
  heroDesc: { color: '#CCC', fontSize: 13, marginBottom: 12 },
  playBtn: { backgroundColor: '#E50914', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 6, alignSelf: 'flex-start' },
  playBtnText: { color: '#FFF', fontWeight: 'bold' },
  sectionTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold', marginLeft: 16, marginTop: 16, marginBottom: 12 },
  horizontalList: { paddingLeft: 16 },
  movieCard: { width: 130, marginRight: 12 },
  cardPoster: { width: 130, height: 180, borderRadius: 8, backgroundColor: '#333' },
  cardTitle: { color: '#FFF', fontWeight: '600', marginTop: 6, fontSize: 13 },
  cardInfo: { color: '#888', fontSize: 11, marginTop: 2 },
  addSourceContainer: { padding: 16 },
  subText: { color: '#AAA', fontSize: 13, marginBottom: 16, lineHeight: 18 },
  input: { backgroundColor: '#222', color: '#FFF', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#333', marginBottom: 16 },
  submitBtn: { backgroundColor: '#E50914', padding: 14, borderRadius: 8, alignItems: 'center' },
  submitBtnText: { color: '#FFF', fontWeight: 'bold', fontSize: 15 },
  playerContainer: { width: '100%', height: 240, backgroundColor: '#000' },
  videoPlayer: { width: '100%', height: 200 },
  closePlayerBtn: { backgroundColor: '#222', padding: 8, alignItems: 'center' },
  closeText: { color: '#E50914', fontWeight: 'bold' }
});
