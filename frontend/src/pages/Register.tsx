import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@context/AuthContext';
import { errorMessages } from '../lib/utils';
import { toast } from 'react-toastify';
import { Input } from '@components/ui/Input';
import { AuthButton } from '@components/ui/AuthButton';

export default function Register() {
  const navigate = useNavigate();
  const { register, isSubmitting, error } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | ''>('');

  useEffect(() => {
    if (error) {
      toast.error(errorMessages[error] ?? error);
    }
  }, [error]);

  const handleRegister = async () => {
    if (!username) {
      toast.error(errorMessages['NAME_REQUIRED']);
      return;
    }

    if (username.trim().length < 2) {
      toast.error(errorMessages['NAME_TOO_SHORT']);
      return;
    }

    if (!email) {
      toast.error(errorMessages['EMAIL_REQUIRED']);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error(errorMessages['INVALID_EMAIL_FORMAT']);
      return;
    }

    if (!password) {
      toast.error(errorMessages['PASSWORD_REQUIRED']);
      return;
    }

    if (password.length < 8) {
      toast.error(errorMessages['PASSWORD_TOO_SHORT']);
      return;
    }

    if (
      !/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/.test(
        password
      )
    ) {
      toast.error(errorMessages['PASSWORD_WEAK']);
      return;
    }

    if (password !== confirm) {
      toast.error(errorMessages['PASSWORD_MISMATCH']);
      return;
    }

    if (!gender) {
      toast.error(errorMessages['GENDER_REQUIRED']);
      return;
    }

    try {
      await register(username, email, password, gender);
      toast.success('Conta criada com sucesso! Faça login para continuar.');
      navigate('/login');
    } catch {
      // erro tratado pelo useEffect acima
    }
  };

  return (
    <section className="grow-0 basis-sm p-5 lg:basis-md">
      <h1 className="text-titulo mb-6 text-xl leading-tight font-extrabold sm:text-2xl md:text-3xl lg:text-4xl">
        Olá! Registe-se para começar
      </h1>
      <Input
        placeholder="Jonh Doe"
        label="Nome e Sobrenome"
        value={username}
        onChange={setUsername}
      />
      <Input
        placeholder="email@exemplo.com"
        label="Email"
        type="email"
        value={email}
        onChange={setEmail}
      />
      <Input
        placeholder="********"
        label="Palavra-passe"
        hasEye
        value={password}
        onChange={setPassword}
      />
      <Input
        placeholder="********"
        label="Confirme a palavra-passe"
        hasEye
        value={confirm}
        onChange={setConfirm}
      />
      <div className="mb-3">
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Género
        </label>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setGender('male')}
            className={`flex-1 rounded-lg border py-3 text-sm font-semibold transition ${
              gender === 'male'
                ? 'border-botao bg-botao text-white'
                : 'hover:border-botao border-gray-300 text-gray-600'
            }`}
          >
            Masculino
          </button>
          <button
            type="button"
            onClick={() => setGender('female')}
            className={`flex-1 rounded-lg border py-3 text-sm font-semibold transition ${
              gender === 'female'
                ? 'border-botao bg-botao text-white'
                : 'hover:border-botao border-gray-300 text-gray-600'
            }`}
          >
            Femenino
          </button>
        </div>
      </div>
      <AuthButton
        label={isSubmitting ? 'A registrar...' : 'Registrar'}
        onClick={handleRegister}
        disabled={isSubmitting}
      />
      <p className="mt-6 text-center text-xs text-black">
        Já tem uma conta?{' '}
        <button
          onClick={() => navigate('/login')}
          className="text-blue-btn font-extrabold hover:cursor-pointer hover:underline"
        >
          Entrar
        </button>
      </p>
    </section>
  );
}
