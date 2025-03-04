import Image from "next/image";
import React from "react";

const Pet = () => {
    return (
        <div className="bg-amber-200 rounded-3xl p-3 flex flex-row gap-4 ">
            <div className="">
                <Image src="/dog1.png" alt="" width={100} height={100} />
            </div>
            <div className="flex flex-col justify-center items-center">
                <div className="name font-bold text-[1.2rem]">
                    Doggo the Dog
                </div>
                <div className="status ">Status : Outside</div>
            </div>
        </div>
    );
};

export default Pet;
