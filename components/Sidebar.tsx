import { router } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function Sidebar({ visible, onClose }: Props) {
  const slideAnim = useRef(new Animated.Value(-SCREEN_WIDTH)).current;
  const [isMounted, setIsMounted] = React.useState(visible);

  useEffect(() => {
    if (visible) {
      setIsMounted(true);

      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -SCREEN_WIDTH,
        duration: 250,
        useNativeDriver: true,
      }).start(() => {
        setIsMounted(false); // Unmount after animation
      });
    }
  }, [visible]);

  if (!isMounted) return null;

  const handleLogout = async () => {
    try {
        // Will later clear session/token here
        router.replace('/login');
    } 
    catch (e) {
        console.log('Logout error:', e);
    }
  };

  return (
    <TouchableOpacity
      style={styles.overlay}
      onPress={onClose}
      activeOpacity={1}
    >
      {/* Animated Sidebar */}
      <Animated.View
        style={[
          styles.sidebar,
          { transform: [{ translateX: slideAnim }] },
        ]}
      >
        <TouchableOpacity activeOpacity={1} style={{ flex: 1, justifyContent: 'space-between' }}>

        {/* Top section is for nav items */}
        <View>

            {/* Back Button */}
            <TouchableOpacity onPress={onClose}>
            <Image
                source={require('../assets/images/backButton.png')}
                style={styles.backIcon}
            />
            </TouchableOpacity>

            {/* Navigation */}
            <TouchableOpacity onPress={() => router.replace('/home')}>
            <Text style={styles.item}>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push('/profile')}>
            <Text style={styles.item}>Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push('/reports')}>
            <Text style={styles.item}>Reports</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push('/settings')}>
            <Text style={styles.item}>Settings</Text>
            </TouchableOpacity>

        </View>

        {/* Bottom section is for logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        </TouchableOpacity>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({

  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 100,
  },

  sidebar: {
    width: '70%',
    height: '100%',
    backgroundColor: '#5b2a5f',
    paddingTop: 103,
    paddingLeft: 35,
    justifyContent: 'space-between',
    flex: 1,
  },

  backIcon: {
    width: 40,
    height: 40,
    marginBottom: 60,
  },

  item: {
    color: 'white',
    fontSize: 25,
    marginBottom: 50,
    fontWeight: '600',
  },

  logoutButton: {
    marginBottom: 60,
  },

  logoutText: {
    color: 'white',
    fontSize: 25,
    fontWeight: '600',
  },
});