import Image from "next/image";
import DistantDisplay from "@/app/components/DistantDisplay";

export default function Home() {
  return (
    <div>
      show ultrasonic sensor 
      <DistantDisplay />
    </div>
  );
}
