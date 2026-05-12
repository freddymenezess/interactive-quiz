import quizImage from '@public/quizapp.png';

export default function LogoPage() {
  return (
    <div className="flex items-center gap-2">
      <img src={quizImage} alt="Quiz App Logo" />
    </div>
  );
}
