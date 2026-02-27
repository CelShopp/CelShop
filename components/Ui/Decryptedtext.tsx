import DecryptedText from '../../DecryptedText';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6">
      
      <DecryptedText
        text="Wrong Move"
        speed={60}
        maxIterations={10}
        characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
        className="text-4xl font-bold"
      />

      <DecryptedText
        text="Probably a missing semicolon."
        speed={50}
        maxIterations={8}
        characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
        className="text-lg opacity-70"
      />

    </div>
  );
}