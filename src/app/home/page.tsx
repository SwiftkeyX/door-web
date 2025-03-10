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

            <div className="p-10 grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-x-16 gap-y-5">
                <div className="flex flex-col gap-5">
                    <div>
                        <div className="heading">Pet List</div>
                        <PetList />
                    </div>
                    <div>
                        <div className="heading">Control Module</div>
                        <div className="bg-[#f3f3f3] p-4 rounded-2xl">
                            <div className="grid grid-cols-1 xl:grid-cols-[1fr_130px] gap-y-2">
                                <div className="">
                                    <div className="text-2xl font-bold">
                                        Door State
                                    </div>

                                    <div className="grid grid-cols-[75px_1fr] text-xl">
                                        <div>Status:</div>
                                        <div className="font-bold text-red-800 ">
                                            CLOSED
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-[75px_1fr] text-xl">
                                        <div>Lock:</div>
                                        <div className="font-bold text-red-800 ">
                                            LOCKED
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-row md:flex-col items-center gap-y-1 gap-x-2">
                                    <button className="bg-green-700 rounded-xl text-white text-2xl font-bold w-full h-[40px]">
                                        OPEN
                                    </button>
                                    <button className="bg-green-700 rounded-xl text-white text-2xl font-bold w-full h-[40px]">
                                        UNLOCK
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="heading">Activity History</div>
                    <div className="text-xl rounded-2xl bg-[#f3f3f3] px-5 py-3 flex flex-col h-[250px]">
                        <div>Feb 21 21:01:23 Something has been detected</div>
                        <div>Feb 21 21:01:23 Something has been detected</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
