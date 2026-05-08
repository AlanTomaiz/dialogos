import { Hash, Lock, Mail, User } from 'lucide-react-native';
import { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import {
  AUTH_REGISTER_FAILED,
  SIGNUP_FILL_ALL_FIELDS,
  SIGNUP_SUCCESS
} from '../../config/messages';
import { useToast } from '../../hooks/useToast';
import { registerWithRA } from '../../services/authService';
import { Colors } from '../../theme';
import { styles } from './style';

interface SignUpProps {
  onNavigateToLogin: () => void;
  onSignUpSuccess: () => void;
}

export function SignUp({ onNavigateToLogin, onSignUpSuccess }: SignUpProps) {
  const toast = useToast();
  const [fullName, setFullName] = useState('');
  const [ra, setRA] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleSignUp(): Promise<void> {
    if (!fullName.trim() || !ra.trim() || !email.trim() || !password.trim()) {
      toast.show(SIGNUP_FILL_ALL_FIELDS, 'warning');
      return;
    }

    try {
      setIsLoading(true);
      await registerWithRA({
        fullName,
        ra,
        email,
        password
      });

      toast.show(SIGNUP_SUCCESS, 'success');
      onSignUpSuccess();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : AUTH_REGISTER_FAILED;
      toast.show(message, 'error');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Criar Conta</Text>
        <View style={styles.fieldWrap}>
          <User size={16} color={Colors.MUTED} strokeWidth={2} />
          <TextInput
            style={styles.input}
            placeholder="Nome completo"
            placeholderTextColor={Colors.MUTED}
            autoCapitalize="words"
            value={fullName}
            onChangeText={setFullName}
          />
        </View>
        <View style={styles.fieldWrap}>
          <Hash size={16} color={Colors.MUTED} strokeWidth={2} />
          <TextInput
            style={styles.input}
            placeholder="RA"
            placeholderTextColor={Colors.MUTED}
            autoCapitalize="none"
            value={ra}
            onChangeText={setRA}
          />
        </View>
        <View style={styles.fieldWrap}>
          <Mail size={16} color={Colors.MUTED} strokeWidth={2} />
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            placeholderTextColor={Colors.MUTED}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.fieldWrap}>
          <Lock size={16} color={Colors.MUTED} strokeWidth={2} />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor={Colors.MUTED}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <TouchableOpacity
          style={[styles.loginButton, isLoading && { opacity: 0.7 }]}
          onPress={handleSignUp}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color={Colors.WHITE} />
          ) : (
            <Text style={styles.loginButtonText}>Criar Conta</Text>
          )}
        </TouchableOpacity>
        <View style={styles.separatorRow}>
          <View style={styles.separatorLine} />
          <Text style={styles.separatorText}>ou</Text>
          <View style={styles.separatorLine} />
        </View>
        <Text style={styles.signupText}>
          Ja tem conta?{' '}
          <Text style={styles.signupLink} onPress={onNavigateToLogin}>
            Entrar
          </Text>
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
