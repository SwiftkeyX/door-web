import ControlModule from "@/components/ControlModule";
import LogHistory from "@/components/LogHistory2";
import Pet from "@/components/Pet";
import Image from "next/image";
// import DistantDisplay from "@/utils/monitorDisplay";

export default function Home() {
    return (
        <div className="">
            {/* HEADER */}
            <div className="header font-bold px-[5rem] py-3 bg-amber-50">
                <div className="text-[2rem]">PETPASS</div>
                <div className="text-[1.5rem]">
                    the Personal Pet Entrance Dashboard
                </div>
            </div>

            <div className="px-[5rem] flex">
                {/* LEFT */}
                <div className=" w-[40%]">
                    {/* PET LIST */}
                    <div className="pet-list my-5 flex flex-col gap-y-5">
                        <div className="text-[1.4rem] font-bold">PET LIST</div>
                        <Pet />
                        <Pet />
                        <Pet />
                    </div>

                    {/* CONTROL MODULE */}
                    <div className="flex flex-col">
                        <div className="text-[1.4rem] font-bold">
                            Control Module
                        </div>
                        <ControlModule />
                    </div>

                    <div className="h-[10%]"></div>
                </div>

                {/* RIGHT */}
                <div className="px-[3rem] w-[60%]">
                    {/* CAMERA MODULE */}
                    <div>

                    </div>

                    {/* LOG */}
                    <LogHistory />
                </div>
            </div>
        </div>
    );
}
