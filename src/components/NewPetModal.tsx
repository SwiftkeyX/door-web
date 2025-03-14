import { PetPostRequest } from "@/app/api/pet/route";
import clsx from "clsx";
import { useState } from "react";

function isValidHexString(input: string): boolean {
    return /^[0-9A-Fa-f]+$/.test(input);
}

interface NewPetModalProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    handleCreatePet: (req: PetPostRequest) => Promise<void>;
}

export default function NewPetModal({
    isOpen,
    setIsOpen,
    handleCreatePet,
}: NewPetModalProps) {
    const [petName, setPetName] = useState<string>("");
    const [petUID, setPetUID] = useState<string>("");

    async function onClickCreatePet() {
        if (!isValidHexString(petUID)) {
            return;
        }
        await handleCreatePet({
            pet_name: petName,
            uid: petUID,
        });
        setIsOpen(false);
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/75">
            <div className="bg-white p-6 rounded-xl shadow-lg w-96 relative">
                <button
                    className="absolute top-2 right-3 text-gray-500"
                    onClick={() => setIsOpen(false)}
                >
                    ✖
                </button>
                <h2 className="text-2xl font-bold mb-2">Add a new pet</h2>

                <div className="flex flex-col gap-y-2">
                    <div className="flex flex-col">
                        <div className="font-semibold text-lg">Pet name</div>
                        <input
                            className={clsx(
                                "border border-gray-300 rounded-lg text-md px-2",
                                {
                                    "ring-1 ring-red-500": petName.length == 0,
                                }
                            )}
                            placeholder="Enter new pet name"
                            value={petName}
                            onChange={(e) => setPetName(e.currentTarget.value)}
                        />

                        {petName.length == 0 && (
                            <div className="text-red-800 font-semibold">
                                Name cannot be empty
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col">
                        <div className="font-semibold text-lg">Pet UID</div>
                        <input
                            className={clsx(
                                "border border-gray-300 rounded-lg text-md px-2",
                                {
                                    "ring-1 ring-red-500":
                                        !isValidHexString(petUID),
                                }
                            )}
                            placeholder="Enter new pet UID in hex (ex. FF000000)"
                            maxLength={8}
                            value={petUID}
                            onChange={(e) => setPetUID(e.currentTarget.value)}
                        />

                        {!isValidHexString(petUID) && (
                            <div className="text-red-800 font-semibold">
                                Please enter a valid hex string
                            </div>
                        )}
                    </div>

                    <button
                        className="bg-green-700 text-white font-semibold rounded-md h-[30px] mt-[10px]"
                        onClick={() => onClickCreatePet()}
                    >
                        Add new
                    </button>
                </div>
            </div>
        </div>
    );
}
