import VectorNavbar from '@/components/vector/VectorNavbar';
import VectorHero from '@/components/vector/VectorHero';
import VectorProof from '@/components/vector/VectorProof';
import VectorServices from '@/components/vector/VectorServices';
import VectorContact from '@/components/vector/VectorContact';
import VectorFooter from '@/components/vector/VectorFooter';
import VectorEmailForm from '@/components/vector/VectorEmailForm';

export default function VectorLandingPage() {
  return (
    <main className="bg-[#000000] min-h-screen font-sans selection:bg-[#13A940] selection:text-black">
      <VectorNavbar />
      <VectorHero />
      <VectorEmailForm />
      <VectorProof />
      <VectorServices />
      <VectorContact />
      <VectorFooter />
    </main>
  );
}