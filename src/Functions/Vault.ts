import { CoolerInterface } from "../interfaces/CoolerInterface";

function vaultProces2RemoveDuplicades(coolers: CoolerInterface[]): CoolerInterface[] {
  const deviceIdCount = new Map<string, number>();
  for (const cooler of coolers) {
    deviceIdCount.set(cooler.device_id, (deviceIdCount.get(cooler.device_id) || 0) + 1);
  }
  return coolers.filter(cooler => deviceIdCount.get(cooler.device_id) === 1);
}

export { vaultProces2RemoveDuplicades }