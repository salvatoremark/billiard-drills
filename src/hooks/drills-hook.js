import drillData from "../store/drill-data.json";
import { getStoredObject, storeObject } from "../components/helpers";

export function useDrillData() {
  let storedDrills = getStoredObject("drills");
  if (!storedDrills) {
    storeObject("drills", drillData);
    return drillData;
  }
  return storedDrills;
}
