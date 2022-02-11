import { Plant } from "./plant";
import { User } from "./user";

export class Observation {
  // _id: string = '';
  date: string | null = '';
  // date: string | null= new Date().toLocaleDateString('hu-HU');
  location: string = 'Miskolc';
  gps?: string = '';
  plant: Plant = new Plant();
  phase: string = '';
  photo?: string[] = [];
  note?: string = '';
  user: User = new User();
}
