import { Hash, Lock } from 'lucide-react-native';
import { useState } from 'react';
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { useToast } from '../../hooks/useToast';
import { signInWithRA } from '../../services/authService';
import { Colors } from '../../theme';
import { styles } from './style';

interface LoginProps {
  onNavigateToSignUp: () => void;
  onLoginSuccess: () => void;
}

export function Login({ onNavigateToSignUp, onLoginSuccess }: LoginProps) {
  const toast = useToast();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(): Promise<void> {
    const normalizedIdentifier = identifier.trim().toLowerCase();

    if (!normalizedIdentifier || !password.trim()) {
      toast.show('Informe RA/e-mail e senha.', 'warning');
      return;
    }

    try {
      setIsLoading(true);
      await signInWithRA(normalizedIdentifier, password);
      toast.show('Login realizado com sucesso.', 'success');
      onLoginSuccess();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Falha ao entrar.';
      toast.show(message, 'error');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entrar</Text>

      <View style={styles.fieldWrap}>
        <Hash size={16} color={Colors.MUTED} strokeWidth={2} />
        <TextInput
          style={styles.input}
          placeholder="RA ou e-mail"
          placeholderTextColor={Colors.MUTED}
          autoCapitalize="none"
          value={identifier}
          onChangeText={setIdentifier}
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

      <TouchableOpacity>
        <Text style={styles.forgotText}>Esqueceu a senha?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.loginButton, isLoading && { opacity: 0.7 }]}
        onPress={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color={Colors.WHITE} />
        ) : (
          <Text style={styles.loginButtonText}>Entrar</Text>
        )}
      </TouchableOpacity>

      <View style={styles.separatorRow}>
        <View style={styles.separatorLine} />
        <Text style={styles.separatorText}>ou</Text>
        <View style={styles.separatorLine} />
      </View>

      <Text style={styles.signupText}>
        Nao tem conta?{' '}
        <Text style={styles.signupLink} onPress={onNavigateToSignUp}>
          Criar conta
        </Text>
      </Text>
    </View>
  );
}
