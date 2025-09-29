import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Modal } from 'react-native';
import useStyles from '@hooks/useStyles';

const Loading = ({ 
  message = 'Loading...', 
  size = 'large', 
  color = '#8A2BE2',
  showMessage = true,
  containerStyle = {},
  textStyle = {},
  fullScreen = false,
  overlay = false
}) => {
  const styles = useStyles(createStyles);

  const LoadingContent = () => (
    <View style={[styles.container, containerStyle]}>
      <ActivityIndicator size={size} color={color} />
      {showMessage && (
        <Text style={[styles.loadingText, textStyle]}>{message}</Text>
      )}
    </View>
  );

  if (fullScreen) {
    return (
      <Modal
        transparent={true}
        animationType="fade"
        visible={true}
        statusBarTranslucent={true}
      >
        <View style={styles.fullScreenOverlay}>
          <LoadingContent />
        </View>
      </Modal>
    );
  }

  if (overlay) {
    return (
      <View style={styles.overlayContainer}>
        <LoadingContent />
      </View>
    );
  }

  return <LoadingContent />;
};

const createStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  fullScreenOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default Loading;
