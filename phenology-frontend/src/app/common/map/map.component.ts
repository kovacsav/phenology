import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { Maps, Zoom } from '@syncfusion/ej2-angular-maps';
// import { world_map } from 'world-map';
Maps.Inject(Zoom);


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  public zoomSettings: object = {};
  // public shapeData: object = {};
  public layerType: string = '';
  public background: string = '#555555';
  public urlTemplate: string = '';
  public border: object = {
    color: 'green',
    width: 2
  };
  public margin: object = {
    bottom: 10,
    left: 20,
    right: 20,
    top: 70
  };
  // public shapeSettings = {
  //   autofill: true
  // };
  public titleSettings: object = {
    text: 'Maps Control',
    textStyle: {
      color: 'red',
      fontStyle: 'italic',
      fontWeight: 'regular',
      fontFamily: 'arial',
      size: '14px'
    },
    alignment: 'Center'
  };
  public centerPosition: object = {};
  public markerSettings: object = {};
  public navigationLineSettings: object = {};
  public mapsArea: object = {
    background: '#CCD1D1',
    border: {
      width: 2,
      color: 'green'
    }
  };

  ngOnInit(): void {
    this.layerType = 'OSM';
    this.urlTemplate = "http://mt1.google.com/vt/lyrs=m@129&hl=en&x=tileX&y=tileY&z=level";

    this.zoomSettings = {
      enable: true,
      zoomFactor: 4
    };
    this.centerPosition = {
      latitude: 37.394708,
      longitude: -89.954653
    };
    this.markerSettings = [{
      visible: true,
      height: 25,
      width: 15,
      dataSource: [
        {
          latitude: 34.060620,
          longitude: -118.330491,
          name: "California"
        },
        {
          latitude: 40.724546,
          longitude: -73.850344,
          name: "New York"
        }
      ]
    }];
    this.navigationLineSettings = [{
      visible: true,
      color: "blue",
      width: 5,
      angle: 0.1,
      latitude: [34.060620, 40.724546],
      longitude: [-118.330491, -73.850344]
    }];
    console.log(this.navigationLineSettings)
    // this.shapeData = world_map;
  }


  // // google maps zoom level
  // zoom: number = 8;

  // // initial center position for the map
  // lat: number = 51.673858;
  // lng: number = 7.815982;

  // address: string =  '';
  // private geoCoder: any;

  // @ViewChild('search')
  // public searchElementRef!: ElementRef;

  // constructor(
  //   private mapsAPILoader: MapsAPILoader,
  //   private ngZone: NgZone
  // ) { }

  // ngOnInit() {
  //   //load Places Autocomplete
  //   this.mapsAPILoader.load().then(() => {
  //     this.setCurrentLocation();
  //     this.geoCoder = new google.maps.Geocoder;

  //     let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
  //     autocomplete.addListener("place_changed", () => {
  //       this.ngZone.run(() => {
  //         //get the place result
  //         let place: google.maps.places.PlaceResult = autocomplete.getPlace();

  //         //verify result
  //         if (place.geometry === undefined || place.geometry === null) {
  //           return;
  //         }

  //         //set latitude, longitude and zoom
  //         this.lat = place.geometry.location?.lat() || 0;
  //         this.lng = place.geometry.location?.lng() || 0;
  //         this.zoom = 12;
  //       });
  //     });
  //   });
  // }

  // clickedMarker(label: string, index: number) {
  //   console.log(`clicked the marker: ${label || index}`)
  // }

  // mapClicked($event: MouseEvent) {
  //   this.markers.push({
  //     lat: $event.coords.lat,
  //     lng: $event.coords.lng,
  //     draggable: true
  //   });
  // }

  // // markerDragEnd(m: marker, $event: MouseEvent) {
  // //   console.log('dragEnd', m, $event);
  // // }

  // markers: marker[] = [
  //   {
  // 	  lat: 51.673858,
  // 	  lng: 7.815982,
  // 	  label: 'A',
  // 	  draggable: true
  //   },
  //   {
  // 	  lat: 51.373858,
  // 	  lng: 7.215982,
  // 	  label: 'B',
  // 	  draggable: false
  //   },
  //   {
  // 	  lat: 51.723858,
  // 	  lng: 7.895982,
  // 	  label: 'C',
  // 	  draggable: true
  //   }
  // ]

  //  // Get Current Location Coordinates
  //  private setCurrentLocation() {
  //   if ('geolocation' in navigator) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       this.lat = position.coords.latitude;
  //       this.lng = position.coords.longitude;
  //       console.log(position)
  //       this.zoom = 15;
  //       this.getAddress(this.lat, this.lng);
  //     });
  //   }
  //  }

  //  markerDragEnd(m: marker, $event: MouseEvent) {
  //   console.log($event);
  //   this.lat = $event.coords.lat;
  //   this.lng = $event.coords.lng;
  //   this.getAddress(this.lat, this.lng);
  // }

  // getAddress(latitude: number, longitude: number) {
  //   this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results: any, status: any) => {
  //     console.log(results);
  //     console.log(status);
  //     if (status === 'OK') {
  //       if (results[0]) {
  //         this.zoom = 12;
  //         this.address = results[0].formatted_address;
  //       } else {
  //         window.alert('No results found');
  //       }
  //     } else {
  //       window.alert('Geocoder failed due to: ' + status);
  //     }

  //   });
  // }

}

// just an interface for type safety.
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
