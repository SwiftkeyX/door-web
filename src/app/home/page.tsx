import ControlModule2 from "@/components/ControlModule2";
import PetList from "@/components/PetList";
import React from "react";

function Home() {
    return (
        <div>
            <div className="bg-[#868686] flex flex-col p-5 md:p-10">
                <div className="text-5xl font-extrabold text-white">
                    PetPass
                </div>
                <div className="text-xl md:text-3xl font-semibold text-white">
                    the Personal Pet Entrance Dashboard
                </div>
            </div>

            <div className="py-5 px-10 grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-x-16 gap-y-5">
                <div className="flex flex-col gap-5">
                    <div>
                        <div className="heading">Pet List</div>
                        <PetList />
                    </div>
                    <div>
                        <div className="heading">Control Module</div>
                        <ControlModule2 />
                    </div>
                </div>
                <div>
                    <div className="heading">Activity History</div>
                    <div className="text-xl rounded-2xl bg-[#f3f3f3] px-5 py-3 flex flex-col h-[670px]">
                        <div>Feb 21 21:01:23 Something has been detected</div>
                        <div>Feb 21 21:01:23 Something has been detected</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
