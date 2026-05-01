import {
  AlertCircle,
  CheckCircle2,
  Info,
  TriangleAlert
} from 'lucide-react-native';
import React, { useEffect, useRef } from 'react';
import { Animated, Text, View } from 'react-native';
import { styles, TOAST_TYPES } from './styles';

export type ToastType = 'success' | 'info' | 'warning' | 'error';

export type ToastItem = {
  id: number;
  message: string;
  type: ToastType;
  duration?: number;
};

type Props = {
  toasts: ToastItem[];
  onHide: (id: number) => void;
};

type ToastCardProps = {
  item: ToastItem;
  offset: number;
  onHide: (id: number) => void;
};

function ToastCard({ item, offset, onHide }: ToastCardProps) {
  const opacity = useRef(new Animated.Value(0)).current;
  const duration = item.duration ?? 2500;
  const typeConfig = TOAST_TYPES[item.type];

  const IconComponent =
    item.type === 'success'
      ? CheckCircle2
      : item.type === 'info'
        ? Info
        : item.type === 'warning'
          ? TriangleAlert
          : AlertCircle;

  useEffect(() => {
    opacity.stopAnimation();
    opacity.setValue(0);

    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true
      }),
      Animated.delay(duration),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true
      })
    ]).start(({ finished }) => {
      if (finished) {
        onHide(item.id);
      }
    });
  }, [item.id, duration, opacity, onHide]);

  return (
    <Animated.View
      style={[
        styles.stackItem,
        {
          opacity,
          transform: [{ translateY: -offset }]
        }
      ]}
    >
      <View
        style={[styles.toast, { backgroundColor: typeConfig.backgroundColor }]}
      >
        <IconComponent size={20} color={typeConfig.iconColor} />
        <Text style={[styles.text, { color: typeConfig.textColor }]}>
          {item.message}
        </Text>
      </View>
    </Animated.View>
  );
}

export function Toast({ toasts, onHide }: Props) {
  if (toasts.length === 0) {
    return null;
  }

  return (
    <View pointerEvents="none" style={styles.container}>
      {toasts.map((item, index) => (
        <ToastCard
          key={item.id}
          item={item}
          offset={index * 2}
          onHide={onHide}
        />
      ))}
    </View>
  );
}
