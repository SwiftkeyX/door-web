import React from "react";

const ControlModule = () => {
    return (
        <div className="bg-amber-200 rounded-2xl p-5 flex justify-between items-center">
            <div>
                <div className="text-[1.2rem] font-bold">Door State</div>
                <div>
                    Currently : <span>CLOSED</span>
                </div>
            </div>
            <div className="text-[1.2rem] font-bold bg-green-700 text-white px-3 py-1 rounded-2xl">
                <button>open</button>
            </div>
        </div>
    );
};

export default ControlModule;
