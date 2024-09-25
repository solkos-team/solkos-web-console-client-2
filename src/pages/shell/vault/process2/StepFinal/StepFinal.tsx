import React, { useEffect, useState } from "react";
import { InsightsVault } from "../../Components/InsightsVault";
import { VaultLogo } from "../../../../../sampleData/Vault/VaultIcons";
import { CoolerInterface } from "../../../../../interfaces/CoolerInterface";
import { Button, Loader, Skeleton } from "@mantine/core";
import { vaultProces2TransformData } from "../../../../../Functions/Vault";
import { fetchUniversal, fetchVaul } from "../../../../../utils/apiUtils";

export const StepFinal = ({
    active,
    coolersToChange,
}: {
    active: number;
    coolersToChange: CoolerInterface[];
}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [coolerData, setCoolersData] = useState([]);
    const body = { coolers: vaultProces2TransformData(coolersToChange) };
    const fetchData = async () => {
        try {
            // const data = await fetchUniversal("vault", body, setIsLoading);
            const data = await fetchVaul("vault", setIsLoading, body);
            setIsLoading(false);
            setCoolersData(data);
        } catch (error) {
            console.error("Error:", error);
        }
    };
    useEffect(() => {
        active == 3 ? fetchData() : "";
    }, [active]);

    return (
        <section
            style={{
                width: "100%",
                height: "100%",
                display: active == 3 ? "flex" : "none",
                flexDirection: "column",
            }}
        >
            <section className="section_Vault_Title">
                <img
                    src={VaultLogo}
                    alt="Descripción de la imagen"
                    style={{ width: "5rem", height: "3rem", marginTop: -20 }}
                />
                <div className="vault_h2_description">Proceder con los cambios.</div>
            </section>
            <section style={{ width: "100%", height: "30%", display: "flex" }}>
                {
                    isLoading == true
                        ? ''
                        : <InsightsVault />
                }
            </section>
            <section
                style={{
                    width: "100%",
                    height: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <section className="vault_container_final">
                    {
                        isLoading == true
                            ? <Skeleton style={{ width: '10vh', height: '10vh' }} />
                            :
                            <>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="40px"
                                    height="40px"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <rect width="24" height="24" rx="4" fill="#B2F2BB" />
                                    <path
                                        d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                                        stroke="#40C057"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                                <div className="vault_container_final_h1">
                                    Proceso Completo {coolersToChange.length}
                                </div>
                            </>
                    }
                </section>
            </section>
            <section
                style={{
                    width: "100%",
                    height: "10%",
                    display: "flex",
                    justifyContent: "end",
                }}
            >
                {" "}
                <Button
                    style={{ color: "#FFFF", background: "#ED5079" }}
                    onClick={() => {
                        window.location.href = window.location.href;
                    }}
                >
                    Finalizar
                </Button>{" "}
            </section>
        </section>
    );
};
