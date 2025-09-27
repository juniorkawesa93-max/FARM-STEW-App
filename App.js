import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
  Animated,
  StatusBar,
} from 'react-native';

export default function App() {
  // Counter state
  const [counter, setCounter] = useState(0);
  
  // Theme state
  const [theme, setTheme] = useState('default');
  
  // Quote state
  const [currentQuote, setCurrentQuote] = useState('Tap below to get inspired!');
  
  // Form state
  const [userName, setUserName] = useState('');
  const [greeting, setGreeting] = useState('');
  
  // Timer state
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const timerRef = useRef(null);
  
  // Toggle box state
  const [isBoxVisible, setIsBoxVisible] = useState(true);
  
  // Animation values
  const bounceAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  // Quotes array
  const quotes = [
    "The only way to do great work is to love what you do. - Steve Jobs",
    "Innovation distinguishes between a leader and a follower. - Steve Jobs",
    "Life is what happens while you're busy making other plans. - John Lennon",
    "The future belongs to those who believe in their dreams. - Eleanor Roosevelt",
    "Focus on the light during darkest moments. - Aristotle",
    "The only impossible journey is the one you never begin. - Tony Robbins",
    "Success is not final, failure is not fatal: courage to continue counts. - Winston Churchill",
    "The way to get started is to quit talking and begin doing. - Walt Disney",
    "Don't let yesterday take up too much of today. - Will Rogers",
    "You learn more from failure than success. - Unknown",
  ];

  // Theme colors
  const themes = {
    default: {
      background: '#667eea',
      cardBackground: '#ffffff',
      textColor: '#333333',
      primaryButton: '#667eea',
      secondaryButton: '#f093fb',
      successButton: '#4facfe',
      warningButton: '#ffecd2',
      dangerButton: '#ff9a9e',
    },
    red: {
      background: '#ff6b6b',
      cardBackground: '#ffffff',
      textColor: '#333333',
      primaryButton: '#ff6b6b',
      secondaryButton: '#ee5a52',
      successButton: '#4facfe',
      warningButton: '#ffecd2',
      dangerButton: '#ff9a9e',
    },
    blue: {
      background: '#4ecdc4',
      cardBackground: '#ffffff',
      textColor: '#333333',
      primaryButton: '#4ecdc4',
      secondaryButton: '#44a08d',
      successButton: '#4facfe',
      warningButton: '#ffecd2',
      dangerButton: '#ff9a9e',
    },
    green: {
      background: '#56ab2f',
      cardBackground: '#ffffff',
      textColor: '#333333',
      primaryButton: '#56ab2f',
      secondaryButton: '#a8e6cf',
      successButton: '#4facfe',
      warningButton: '#ffecd2',
      dangerButton: '#ff9a9e',
    },
    dark: {
      background: '#2c3e50',
      cardBackground: '#3a3a3a',
      textColor: '#ffffff',
      primaryButton: '#34495e',
      secondaryButton: '#2c3e50',
      successButton: '#4facfe',
      warningButton: '#ffecd2',
      dangerButton: '#ff9a9e',
    },
  };

  const currentTheme = themes[theme];

  // Timer effect
  useEffect(() => {
    if (isTimerRunning) {
      timerRef.current = setInterval(() => {
        setTimerSeconds(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isTimerRunning]);

  // Format timer display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Animation functions
  const animateButton = () => {
    Animated.sequence([
      Animated.timing(bounceAnim, {
        toValue: 1.2,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(bounceAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const toggleBoxVisibility = () => {
    if (isBoxVisible) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setIsBoxVisible(false));
    } else {
      setIsBoxVisible(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  // Button component
  const Button = ({ title, onPress, style, textStyle }) => (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );

  // Generate random quote
  const generateQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setCurrentQuote(quotes[randomIndex]);
  };

  // Generate greeting
  const generateGreeting = () => {
    if (userName.trim()) {
      const greetings = [
        `Hello, ${userName}! Welcome to our interactive demo! 👋`,
        `Hi there, ${userName}! Hope you're having a great day! 😊`,
        `Greetings, ${userName}! Thanks for trying out our app! 🎉`,
        `Hey ${userName}! You're awesome for testing this out! ⭐`,
        `Nice to meet you, ${userName}! Enjoy exploring! 🚀`
      ];
      const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
      setGreeting(randomGreeting);
    } else {
      setGreeting('Please enter your name first! 😊');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.background }]}>
      <StatusBar barStyle="light-content" />
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Interactive Button Collection</Text>
          <Text style={styles.headerSubtitle}>Tap any button to see it in action!</Text>
        </View>

        {/* Counter Section */}
        <View style={[styles.card, { backgroundColor: currentTheme.cardBackground }]}>
          <Text style={[styles.cardTitle, { color: currentTheme.textColor }]}>Counter</Text>
          <View style={styles.counterDisplay}>
            <Text style={[styles.counterText, { color: currentTheme.primaryButton }]}>{counter}</Text>
          </View>
          <View style={styles.buttonRow}>
            <Button
              title="+1"
              onPress={() => setCounter(counter + 1)}
              style={{ backgroundColor: currentTheme.primaryButton }}
            />
            <Button
              title="-1"
              onPress={() => setCounter(counter - 1)}
              style={{ backgroundColor: currentTheme.secondaryButton }}
            />
            <Button
              title="Reset"
              onPress={() => setCounter(0)}
              style={{ backgroundColor: currentTheme.warningButton }}
              textStyle={{ color: '#333' }}
            />
          </View>
        </View>

        {/* Theme Switcher */}
        <View style={[styles.card, { backgroundColor: currentTheme.cardBackground }]}>
          <Text style={[styles.cardTitle, { color: currentTheme.textColor }]}>Theme Switcher</Text>
          <View style={[styles.colorPreview, { backgroundColor: currentTheme.primaryButton }]} />
          <View style={styles.buttonRow}>
            <Button
              title="Red"
              onPress={() => setTheme('red')}
              style={{ backgroundColor: '#ff6b6b' }}
            />
            <Button
              title="Blue"
              onPress={() => setTheme('blue')}
              style={{ backgroundColor: '#4ecdc4' }}
            />
          </View>
          <View style={styles.buttonRow}>
            <Button
              title="Green"
              onPress={() => setTheme('green')}
              style={{ backgroundColor: '#56ab2f' }}
            />
            <Button
              title="Dark"
              onPress={() => setTheme('dark')}
              style={{ backgroundColor: '#2c3e50' }}
            />
          </View>
        </View>

        {/* Quote Generator */}
        <View style={[styles.card, { backgroundColor: currentTheme.cardBackground }]}>
          <Text style={[styles.cardTitle, { color: currentTheme.textColor }]}>Random Quote</Text>
          <View style={styles.quoteDisplay}>
            <Text style={[styles.quoteText, { color: currentTheme.textColor }]}>{currentQuote}</Text>
          </View>
          <Button
            title="Generate Quote"
            onPress={generateQuote}
            style={{ backgroundColor: currentTheme.primaryButton }}
          />
        </View>

        {/* Interactive Actions */}
        <View style={[styles.card, { backgroundColor: currentTheme.cardBackground }]}>
          <Text style={[styles.cardTitle, { color: currentTheme.textColor }]}>Interactive Actions</Text>
          <View style={styles.buttonRow}>
            <Button
              title="Show Alert"
              onPress={() => Alert.alert('Hello!', 'This is a functional button demo! 🎉')}
              style={{ backgroundColor: currentTheme.warningButton }}
              textStyle={{ color: '#333' }}
            />
            <Button
              title={isBoxVisible ? "Hide Box" : "Show Box"}
              onPress={toggleBoxVisibility}
              style={{ backgroundColor: currentTheme.successButton }}
            />
          </View>
          <Animated.View style={[styles.animateButton, { transform: [{ scale: bounceAnim }] }]}>
            <Button
              title="Animate"
              onPress={animateButton}
              style={{ backgroundColor: currentTheme.dangerButton }}
              textStyle={{ color: '#333' }}
            />
          </Animated.View>
          {isBoxVisible && (
            <Animated.View style={[styles.toggleBox, { opacity: fadeAnim }]}>
              <Text style={styles.toggleBoxText}>I can be hidden and shown!</Text>
            </Animated.View>
          )}
        </View>

        {/* Form Demo */}
        <View style={[styles.card, { backgroundColor: currentTheme.cardBackground }]}>
          <Text style={[styles.cardTitle, { color: currentTheme.textColor }]}>Form Demo</Text>
          <TextInput
            style={[styles.textInput, { color: currentTheme.textColor, borderColor: currentTheme.primaryButton }]}
            placeholder="Enter your name..."
            placeholderTextColor="#999"
            value={userName}
            onChangeText={setUserName}
          />
          <View style={styles.buttonRow}>
            <Button
              title="Greet Me"
              onPress={generateGreeting}
              style={{ backgroundColor: currentTheme.primaryButton }}
            />
            <Button
              title="Clear"
              onPress={() => {
                setUserName('');
                setGreeting('');
              }}
              style={{ backgroundColor: currentTheme.warningButton }}
              textStyle={{ color: '#333' }}
            />
          </View>
          {greeting ? (
            <View style={styles.greetingOutput}>
              <Text style={[styles.greetingText, { color: currentTheme.textColor }]}>{greeting}</Text>
            </View>
          ) : null}
        </View>

        {/* Timer */}
        <View style={[styles.card, { backgroundColor: currentTheme.cardBackground }]}>
          <Text style={[styles.cardTitle, { color: currentTheme.textColor }]}>Timer</Text>
          <View style={styles.timerDisplay}>
            <Text style={[styles.timerText, { color: currentTheme.textColor }]}>{formatTime(timerSeconds)}</Text>
          </View>
          <View style={styles.buttonRow}>
            <Button
              title={isTimerRunning ? "Running..." : "Start"}
              onPress={() => setIsTimerRunning(!isTimerRunning)}
              style={{ backgroundColor: currentTheme.successButton }}
            />
            <Button
              title="Stop"
              onPress={() => {
                setIsTimerRunning(false);
                setTimerSeconds(0);
              }}
              style={{ backgroundColor: currentTheme.dangerButton }}
              textStyle={{ color: '#333' }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 20,
    paddingTop: 50,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
    textAlign: 'center',
  },
  card: {
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#667eea',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    margin: 5,
    flex: 1,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  counterDisplay: {
    alignItems: 'center',
    marginVertical: 20,
  },
  counterText: {
    fontSize: 48,
    fontWeight: 'bold',
    backgroundColor: '#f8f9ff',
    paddingHorizontal: 30,
    paddingVertical: 20,
    borderRadius: 15,
    minWidth: 120,
    textAlign: 'center',
  },
  colorPreview: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignSelf: 'center',
    marginVertical: 20,
  },
  quoteDisplay: {
    backgroundColor: '#f8f9ff',
    padding: 20,
    borderRadius: 10,
    marginVertical: 20,
    minHeight: 80,
    justifyContent: 'center',
  },
  quoteText: {
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 24,
  },
  textInput: {
    borderWidth: 2,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
  },
  greetingOutput: {
    backgroundColor: '#f0f8ff',
    padding: 15,
    borderRadius: 8,
    marginTop: 15,
    alignItems: 'center',
  },
  greetingText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  timerDisplay: {
    alignItems: 'center',
    marginVertical: 20,
  },
  timerText: {
    fontSize: 36,
    fontWeight: 'bold',
    fontFamily: 'monospace',
    backgroundColor: '#f8f9ff',
    paddingHorizontal: 30,
    paddingVertical: 20,
    borderRadius: 15,
  },
  toggleBox: {
    backgroundColor: '#e8f4fd',
    padding: 20,
    borderRadius: 10,
    marginTop: 15,
    borderWidth: 2,
    borderColor: '#b3d9ff',
  },
  toggleBoxText: {
    color: '#2c5aa0',
    fontWeight: '500',
    textAlign: 'center',
  },
  animateButton: {
    marginVertical: 10,
  },
});