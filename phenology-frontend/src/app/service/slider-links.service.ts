import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SliderLinksService {

  links: Array<object> = [
    {
      id: 1,
      iconAlt: "Időjárás",
      omszLink: "https://www.met.hu/idojaras/",
      iconPath: "../../../assets/image/slider/idojaras.jpg",
      title: "Időjárás"
    },
    {
      id: 2,
      iconAlt: "Agrometeorológia",
      omszLink: "https://www.met.hu/idojaras/agrometeorologia/",
      iconPath: "../../../assets/image/slider/agro.jpg",
      title: "Agrome-teorológia"
    },
    {
      id: 3,
      iconAlt: "Éghajlat",
      omszLink: "https://www.met.hu/eghajlat/",
      iconPath: "../../../assets/image/slider/eghajlat.jpg",
      title: "Éghajlat"
    },
    {
      id: 4,
      iconAlt: "Előrejelzés",
      omszLink: "https://www.met.hu/idojaras/elorejelzes/",
      iconPath: "../../../assets/image/slider/elorejelzes1.jpg",
      title: "Előrejelzés"
    },
    {
      id: 5,
      iconAlt: "Humánmeteorológia",
      omszLink: "https://www.met.hu/idojaras/humanmeteorologia/",
      iconPath: "../../../assets/image/slider/humanmet.jpg",
      title: "Humánme-teorológia"
    },
    {
      id: 6,
      iconAlt: "Levegőkörnyezet",
      omszLink: "https://www.met.hu/levegokornyezet/",
      iconPath: "../../../assets/image/slider/levegokornyezet.jpg",
      title: "Levegő-környezet"
    },
    {
      id: 7,
      iconAlt: "Meteora",
      omszLink: "http://71net300.met.hu/meteora.enc/",
      iconPath: "../../../assets/image/slider/meteora.jpg",
      title: "Meteora"
    },
    {
      id: 8,
      iconAlt: "Élő radar",
      omszLink: "https://www.met.hu/idojaras/aktualis_idojaras/radar/",
      iconPath: "../../../assets/image/slider/radar1.jpg",
      title: "Élő radar"
    },
    {
      id: 9,
      iconAlt: "MET-ÉSZ",
      omszLink: "https://www.met.hu/idojaras/aktualis_idojaras/megfigyeles/metesz/",
      iconPath: "../../../assets/image/slider/metesz.jpg",
      title: "MET-ÉSZ"
    },
    {
      id: 10,
      iconAlt: "Repülésmeteorológia",
      omszLink: "https://aviation.met.hu/index2.php?lng=hu",
      iconPath: "../../../assets/image/slider/repules.jpg",
      title: "Repülésme-teorológia"
    },
    {
      id: 11,
      iconAlt: "Tavaink időjárása",
      omszLink: "https://www.met.hu/idojaras/tavaink/",
      iconPath: "../../../assets/image/slider/tavaink.jpg",
      title: "Tavaink időjárása"
    },
    {
      id: 12,
      iconAlt: "Veszélyjelzés",
      omszLink: "https://www.met.hu/idojaras/veszelyjelzes/",
      iconPath: "../../../assets/image/slider/veszelyjelzes.jpg",
      title: "Veszély-jelzés"
    },
  ]

  constructor() { }
}
