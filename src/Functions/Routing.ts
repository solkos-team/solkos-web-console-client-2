const navigateModules = (dt: string, navigate: any) => {
    switch (dt) {
        case "CALL CENTER":
            return navigate("/home/clt_callCenter")
        case "IMBERA HEALTH":
            return navigate("/home/insightsNS")
        default: navigate("/home")
    }
}


export { navigateModules }