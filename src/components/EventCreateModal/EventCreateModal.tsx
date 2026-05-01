import { useEffect, useState } from 'react';
import { Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../../theme';
import { styles } from './style';

export type EventCreateInput = {
  title: string;
  description: string;
  timeStart: string;
  timeEnd: string;
  location: string;
};

type EventCreateModalProps = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (input: EventCreateInput) => Promise<void> | void;
};

const INITIAL_FORM: EventCreateInput = {
  title: '',
  description: '',
  timeStart: '',
  timeEnd: '',
  location: ''
};

export function EventCreateModal({
  visible,
  onClose,
  onSubmit
}: EventCreateModalProps) {
  const insets = useSafeAreaInsets();
  const [form, setForm] = useState<EventCreateInput>(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!visible) {
      setForm(INITIAL_FORM);
      setIsSubmitting(false);
    }
  }, [visible]);

  function updateField(field: keyof EventCreateInput, value: string): void {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value
    }));
  }

  function applyTimeMask(raw: string): string {
    const digits = raw.replace(/\D/g, '').slice(0, 4);
    if (digits.length <= 2) return digits;
    return `${digits.slice(0, 2)}:${digits.slice(2)}`;
  }

  function updateTimeField(
    field: 'timeStart' | 'timeEnd',
    value: string
  ): void {
    updateField(field, applyTimeMask(value));
  }

  async function handleSubmit(): Promise<void> {
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit({
        title: form.title.trim(),
        description: form.description.trim(),
        timeStart: form.timeStart.trim(),
        timeEnd: form.timeEnd.trim(),
        location: form.location.trim()
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={onClose}
        />
        <View style={[styles.sheet, { paddingBottom: insets.bottom + 16 }]}>
          <View style={styles.handle} />
          <Text style={styles.title}>Novo evento</Text>

          <TextInput
            style={styles.input}
            placeholder="Titulo"
            placeholderTextColor={Colors.MUTED}
            value={form.title}
            onChangeText={(value) => updateField('title', value)}
          />

          <TextInput
            style={[styles.input, styles.descriptionInput]}
            placeholder="Descricao"
            placeholderTextColor={Colors.MUTED}
            multiline
            value={form.description}
            onChangeText={(value) => updateField('description', value)}
          />

          <View style={styles.timeRow}>
            <TextInput
              style={[styles.input, styles.timeInput]}
              placeholder="De (08:00)"
              placeholderTextColor={Colors.MUTED}
              keyboardType="number-pad"
              maxLength={5}
              value={form.timeStart}
              onChangeText={(value) => updateTimeField('timeStart', value)}
            />
            <TextInput
              style={[styles.input, styles.timeInput]}
              placeholder="Ate (10:00)"
              placeholderTextColor={Colors.MUTED}
              keyboardType="number-pad"
              maxLength={5}
              value={form.timeEnd}
              onChangeText={(value) => updateTimeField('timeEnd', value)}
            />
          </View>

          <TextInput
            style={styles.input}
            placeholder="Local"
            placeholderTextColor={Colors.MUTED}
            value={form.location}
            onChangeText={(value) => updateField('location', value)}
          />

          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={onClose}
              disabled={isSubmitting}
            >
              <Text style={styles.secondaryButtonText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleSubmit}
              disabled={isSubmitting}
            >
              <Text style={styles.primaryButtonText}>
                {isSubmitting ? 'Criando...' : 'Criar'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
