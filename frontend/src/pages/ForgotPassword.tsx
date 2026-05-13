import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AuthLayout,
  InputField,
  AuthButton,
} from '../components/auth/AuthComponents';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleSend = () => {
    // TODO: integrar com POST /api/auth/forgot-password
    navigate('/otp-verification');
  };

  return (
    <section className="grow-0 basis-sm py-5 lg:basis-md">
      <h1 className="mb-6 text-xl leading-tight font-extrabold text-gray-800 sm:text-2xl md:text-3xl lg:text-4xl">
        Esqueceu a sua palavra-passe?
      </h1>
      <p className="mb-6 text-xs leading-relaxed text-gray-400">
        Não se preocupe, isto acontece. Por favor, insira o endereço de email ligado à sua conta.
      </p>

      {/* Input */}
      <InputField
        placeholder="Escreva o seu email"
        type="email"
        value={email}
        onChange={setEmail}
      />

      {/* Send btn */}
      <div className="mt-2">
        <AuthButton label="Send Code" onClick={handleSend} />
      </div>

      {/* Bottom link */}
      <p className="mt-6 text-center text-xs text-gray-400">
        Remember Password?{' '}
        <button
          onClick={() => navigate('/login')}
          className="font-bold text-[#4F7EF7] hover:underline"
        >
          Login Now
        </button>
      </p>
    </section>
  );
}
