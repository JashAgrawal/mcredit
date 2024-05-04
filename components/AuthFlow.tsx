import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, Button, Pressable } from 'react-native';
import { useSignUp, useSignIn, useOAuth } from '@clerk/clerk-expo';
import tw from 'twrnc';
import { Stack } from 'expo-router';
import { tintColorLight } from '@/constants/Colors';

const AuthFlow = () => {
  const { isLoaded: isSignUpLoaded, signUp, setActive } = useSignUp();
  const { isLoaded: isSignInLoaded, signIn } = useSignIn();
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');
  const [step, setStep] = useState('signin');

  const AuthButton = ({ onPress, text }: { onPress: any, text: string }) => {
    return (
      <Pressable onPress={onPress}>
        <View style={tw`w-full bg-[${tintColorLight}] p-3 rounded-lg shadow-md mb-2`}>
          <Text style={tw`text-center text-white font-medium`}>{text}</Text>
        </View>
      </Pressable>
    )
  }

  const handleSignIn = async () => {
    if (!isSignInLoaded) {
      return;
    }

    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });

      await setActive({ session: completeSignIn.createdSessionId });
    } catch (err) {
      console.error(err);
    }
  };

  const handleSignUp = async () => {
    if (!isSignUpLoaded) {
      return;
    }

    try {
      await signUp.create({
        firstName,
        lastName,
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      setPendingVerification(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleVerification = async () => {
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({ code });

      await setActive({ session: completeSignUp.createdSessionId });
    } catch (err) {
      console.error(err);
    }
  };

  const handleSignInWithOAuth = async () => {
    try {
      const { createdSessionId } = await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      }
    } catch (err) {
      console.error('OAuth error', err);
    }
  };

  const AuthOptions = [{
    name: 'Sign In',
    onPress: handleSignIn
  },
  {
    name: 'Sign Up',
    onPress: () => setStep('signup')
  }
    ,
  {
    name: 'Sign In with OAuth',
    onPress: () => handleSignInWithOAuth()
  },
    // {
    //   name: 'Reset Password',
    //   onPress: () => setStep('reset')
    // }
  ]

  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />
      <View style={{ marginVertical: 0, marginHorizontal: 'auto', padding: 20, backgroundColor: '#f9f9f9', width: '80%', borderRadius: 10, borderWidth: 1 }}>
        {step === 'signin' && (
          <>
            <Text style={{ marginBottom: 20, fontSize: 24, color: '#333' }}>Sign In</Text>
            <TextInput
              style={{ width: '100%', padding: 10, marginBottom: 10, borderColor: '#ccc', borderWidth: 1, borderRadius: 4 }}
              autoCapitalize="none"
              placeholder="Email..."
              value={emailAddress}
              onChangeText={(text) => setEmailAddress(text)}
            />
            <TextInput
              style={{ width: '100%', padding: 10, marginBottom: 10, borderColor: '#ccc', borderWidth: 1, borderRadius: 4 }}
              placeholder="Password..."
              secureTextEntry={true}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            {AuthOptions.map((option) =>
              <AuthButton onPress={option.onPress} text={option.name} key={option.name} />
            )}
          </>
        )}
        {step === 'signup' && (
          <>
            <Text style={{ marginBottom: 20, fontSize: 24, color: '#333' }}>Sign Up</Text>
            <TextInput
              style={{ width: '100%', padding: 10, marginBottom: 10, borderColor: '#ccc', borderWidth: 1, borderRadius: 4 }}
              autoCapitalize="none"
              placeholder="First Name..."
              value={firstName}
              onChangeText={(text) => setFirstName(text)}
            />
            <TextInput
              style={{ width: '100%', padding: 10, marginBottom: 10, borderColor: '#ccc', borderWidth: 1, borderRadius: 4 }}
              autoCapitalize="none"
              placeholder="Last Name..."
              value={lastName}
              onChangeText={(text) => setLastName(text)}
            />
            <TextInput
              style={{ width: '100%', padding: 10, marginBottom: 10, borderColor: '#ccc', borderWidth: 1, borderRadius: 4 }}
              autoCapitalize="none"
              placeholder="Email..."
              value={emailAddress}
              onChangeText={(text) => setEmailAddress(text)}
            />
            <TextInput
              style={{ width: '100%', padding: 10, marginBottom: 10, borderColor: '#ccc', borderWidth: 1, borderRadius: 4 }}
              placeholder="Password..."
              secureTextEntry={true}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <AuthButton onPress={handleSignUp} text="Sign Up" />
            <AuthButton onPress={() => setStep('signin')} text="Sign In" />
          </>
        )}
        {/* {step === 'reset' && (
        <>
          <Text style={{ marginBottom: 20, fontSize: 24, color: '#333' }}>Reset Password</Text>
          <TextInput
            style={{ width: '100%', padding: 10, marginBottom: 10, borderColor: '#ccc', borderWidth: 1, borderRadius: 4 }}
            autoCapitalize="none"
            placeholder="Email..."
            value={emailAddress}
            onChangeText={(text) => setEmailAddress(text)}
          />
          <Button title="Reset Password" onPress={handleReset} />
        </>
      )} */}
        {step === 'verification' && (
          <>
            <Text style={{ marginBottom: 20, fontSize: 24, color: '#333' }}>Verification</Text>
            <TextInput
              style={{ width: '100%', padding: 10, marginBottom: 10, borderColor: '#ccc', borderWidth: 1, borderRadius: 4 }}
              placeholder="Code..."
              value={code}
              onChangeText={(text) => setCode(text)}
            />
            <AuthButton onPress={handleVerification} text="Verify" />
          </>
        )}
      </View>
    </>
  );
};

export default AuthFlow;
