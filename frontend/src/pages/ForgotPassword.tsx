import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../components/ui/Input';
import { AuthButton } from '../components/ui/AuthButton';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleSend = () => {
    // TODO: integrar com POST /api/auth/forgot-password
    navigate('/otp-verification');
  };

  return (
    <section className="grow-0 basis-sm p-5 lg:basis-md">
      <h1 className="text-titulo mb-6 text-xl leading-tight font-extrabold sm:text-2xl md:text-3xl lg:text-4xl">
        Esqueceu a sua palavra-passe?
      </h1>
      <p className="text-parhh mb-6 text-xs leading-relaxed">
        Não se preocupe, isto acontece. Por favor, insira o endereço de email
        ligado à sua conta.
      </p>
      <Input
        placeholder="Escreva o seu email"
        type="email"
        value={email}
        onChange={setEmail}
      />
      <div className="mt-2">
        <AuthButton label="Send Code" onClick={handleSend} />
      </div>
      <p className="mt-6 text-center text-xs text-black">
        Lembra-se da Palavra-passe?{' '}
        <button
          onClick={() => navigate('/login')}
          className="text-blue-btn font-bold hover:underline"
        >
          Entrar
        </button>
      </p>
    </section>
  );
}
