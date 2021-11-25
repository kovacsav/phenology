import { Plant } from "./plant";

export class Observation {
  _id: string = '';
  date: string | null= '';
  // date: string | null= new Date().toLocaleDateString('hu-HU');
  location: string = '';
  gps?: string = '';
  plant: Plant = new Plant();
  phase: string = '';
  photo?: string = '';
  note?: string = '';
}
