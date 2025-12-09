import {AppContainer} from '@components/common/ContainerLayout';
import {CustomButton} from '@components/common/CustomButton';
import {BODY, HEADINGS} from '@theme/Fonts';
import {COLORS} from '@theme/Colors';
import React, {useState, useRef, useCallback, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';
import {useTranslation} from 'react-i18next';

// --- Dimensions Setup ---
// NOTE: We only use width from Dimensions. The height will be fixed later.
const {width} = Dimensions.get('window');

export interface SlideType {
  key: string;
  // image: React.ReactNode;
  image: number;
  title: string;
  subtitle: string;
}

export const onboardingData: SlideType[] = [
  {
    key: '1',
    image: require('@assets/images/Onboarding/FirstOnboarding.png'),
    title: 'Now reading books\nwill be easier',
    subtitle:
      'Discover new worlds, join a vibrant reading community. Start your reading adventure effortlessly with us.',
  },
  {
    key: '2',
    image: require('@assets/images/Onboarding/SecondOnboarding.png'),
    title: 'Your Bookish Soulmate\nAwaits',
    subtitle:
      'Let us be your guide to the perfect read. Discover books tailored to your tastes for a truly rewarding experience.',
  },
  {
    key: '3',
    image: require('@assets/images/Onboarding/ThirdOnboarding.png'),
    title: 'Start Your Adventure',
    subtitle:
      "Ready to embark on a quest for inspiration and knowledge? Your adventure begins now. Let's go!",
  },
];

const PURPLE_ACCENT = COLORS.PRIMARY_ACCENT; // Use the constant from Colors.ts

const OnboardingScreen: React.FC = () => {
  const {t, i18n} = useTranslation();

  const [currentIndex, setCurrentIndex] = useState(0);
  const swiperRef = useRef<SwiperFlatList | null>(null);

  const isLastSlide = currentIndex === onboardingData.length - 1;

  // --- Handlers (Unchanged) ---
  const handleNext = useCallback(() => {
    if (isLastSlide) {
      console.log('Onboarding complete! Navigating...');
    } else {
      if (swiperRef.current) {
        swiperRef.current.scrollToIndex({
          index: currentIndex + 1,
          animated: true,
        });
      }
    }
  }, [currentIndex, isLastSlide]);

  const handleSkip = () => {
    console.log('Skipping onboarding...');
  };

  const handleSignIn = (lng: string) => {
    // console.log('Navigating to Sign In...');
    i18n.changeLanguage(lng);
  };

  // --- Render Functions ---

  const renderItem = ({item}: {item: SlideType}) => (
    // **FIXED:** Removed absolute height from slide style. It will now take up all available space.
    <View style={styles.slide}>
      <View style={styles.contentContainer}>
        {/* {item.image} */}
        <View style={styles.imgWrp}>
          <Image source={item.image} />
        </View>
        {/* **FIXED:** Applied correct font styles from HEADINGS/BODY */}
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
      </View>
    </View>
  );

  const renderPagination = () => (
    <View style={styles.paginationContainer}>
      {onboardingData.map((_, i) => (
        <View
          key={i}
          style={[
            styles.dot,
            {
              // Use theme colors
              backgroundColor:
                i === currentIndex ? PURPLE_ACCENT : PURPLE_ACCENT + '40',
            },
          ]}
        />
      ))}
    </View>
  );

  const renderBottomControls = () => (
    // **FIXED:** Removed absolute positioning from bottomControls to place it naturally
    // at the bottom of the SwiperFlatList content area.
    <View style={styles.bottomControls}>
      {renderPagination()}
      <View style={styles.buttonWrapper}>
        <CustomButton
          title={isLastSlide ? 'Get Started' : 'Continue'}
          onPress={handleNext}
          variant="primary"
          buttonStyle={styles.mainButton}
        />
        <CustomButton
          title={t('onboarding.signIn')}
          variant="outline"
          onPress={_ => handleSignIn('mm')}
          buttonStyle={styles.secondaryButtonContainer}
          textStyle={styles.secondaryButtonText}
        />
      </View>
    </View>
  );

  return (
    <AppContainer
      backgroundColor={COLORS.BACKGROUND}
      statusBarStyle="dark-content">
      {/* 1. Skip Button (Top Left) */}
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        {/* **FIXED:** Applied correct font styles to Skip text */}
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      {/* 2. Swiper FlatList (Main Content)
          **FIXED:** SwiperFlatList is now allowed to fill the rest of the AppContainer space.
          The bottom controls will be rendered as part of the Swiper's content flow.
      */}
      <SwiperFlatList
        ref={swiperRef}
        autoplay={false}
        index={currentIndex}
        data={onboardingData}
        renderItem={renderItem}
        showPagination={false} // Using a custom pagination
        onChangeIndex={({index}) => setCurrentIndex(index)}
        // ListEmptyComponent={renderBottomControls}
        // Append the bottom controls to the end of the swiper content
        // ListFooterComponent={
        //   <View style={{width: 100, height: 40, backgroundColor: 'red'}}></View>
        // }
      />
      {renderBottomControls()}
    </AppContainer>
  );
};

// --- STYLES ---

const styles = StyleSheet.create({
  imagePlaceholder: {
    width: 250,
    height: 250,
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },
  imgWrp: {width: 320, height: 320, overflow: 'hidden'},
  img: {width: '100%', height: '100%'},
  // We removed the 'height: height' property from here.
  // The slide now automatically takes the height of its SwiperFlatList parent.
  slide: {
    width, // Keep width fixed to the screen width
    flex: 1, // Ensures the slide fills the height available to the SwiperFlatList
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    width: '85%',
    alignItems: 'center',
    // Removed marginTop: -50; adjust vertical spacing with padding/margin in inner views
  },
  // **FIXED FONT STYLE**
  title: {
    // This looks like H3 (Open Sans Bold, 24px) or similar size, but bold.
    ...HEADINGS.H3,
    color: COLORS.BLACK,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
    lineHeight: 32, // Adjusted line height for better appearance
  },
  // **FIXED FONT STYLE**
  subtitle: {
    // This is body text, likely Body Medium Regular (14px) or Body Large Regular (16px)
    ...BODY.LARGE_REGULAR, // Using 16px Regular for subtitles
    color: COLORS.TEXT_BODY, // Use theme color for dark gray text
    textAlign: 'center',
    paddingHorizontal: 15,
  },

  // --- Controls Styling ---

  // **FIXED:** Adjusted top position to be relative to the content view's start
  skipButton: {
    position: 'absolute',
    top: 10, // Adjust relative to AppContainer's SafeAreaView top inset
    left: 20,
    zIndex: 10,
    padding: 10,
  },
  skipText: {
    color: PURPLE_ACCENT,
    ...BODY.LARGE_SEMIBOLD,
  },

  // **FIXED:** Removed absolute positioning. This will now flow correctly.
  bottomControls: {
    width: width, // Must match slide width
    paddingHorizontal: 30,
    paddingBottom: 20,
    // Add extra padding top to separate from swiper content if needed
    paddingTop: 40,
    backgroundColor: COLORS.BACKGROUND,
  },

  // Pagination
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },

  // Buttons (Used with CustomButton component)
  buttonWrapper: {
    width: '100%',
    alignItems: 'center',
    gap: 10, // Use gap for spacing between buttons
  },
  mainButton: {
    width: '100%',
    paddingVertical: 18,
    borderRadius: 16,
  },
  secondaryButtonContainer: {
    width: '100%',
    paddingVertical: 10,
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  secondaryButtonText: {
    color: PURPLE_ACCENT,
    ...BODY.LARGE_SEMIBOLD,
  },
});

export default OnboardingScreen;
