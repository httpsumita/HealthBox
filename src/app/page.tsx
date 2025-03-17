import Image from "next/image";
import Navbar from "../components/navbar";
import FadeInText from "@/components/eldoraui/blurin";

export default function Home() {
  return (
    <>
    <Navbar />
    {/* <AnimatedText text="ABCD" /> */}
    <FadeInText text="Let me know the symptoms and I will suggest you the best medication" className="text-l sm:mx-18 md:mx-64" subtext="Some are" subtextClassName="text-gray-900" />
    </>
  );
}
