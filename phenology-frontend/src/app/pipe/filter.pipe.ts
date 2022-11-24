import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any | null, selectedPlant: string, selectedYear: string = ''): any | null {

    if (!Array.isArray(value) || !(selectedPlant || selectedYear)) {
      //console.log("nincs adat");
      return value;
    }

    //phrase = typeof phrase === 'number' ? phrase : ('' + phrase).toLowerCase();

    return value.filter(item => {
      const strItem: string = ('' + item.plant.name).toLowerCase();
      selectedPlant = ('' + selectedPlant).toLowerCase();
      const strItemYear: string = ('' + item.date).slice(0,4);
      selectedYear = ('' + selectedYear);

      if (selectedPlant && !selectedYear) {
        return strItem.includes(selectedPlant)
      }
      if (selectedYear && !selectedPlant) {
        return strItemYear.includes(selectedYear)
      }
      return ( strItemYear.includes(selectedYear) && strItem.includes(selectedPlant))
    })
      /*
      if (typeof item.[key] === 'number' && typeof phrase === 'number') {
        return item[key] = phrase;
      }

      if (key === 'zip' || key === 'country' || key === 'city' || key === 'street' || key === 'notes') {
        //console.log('object', item.address)
        for (let key1 in item.address) {
          if (key1 === key) {
            const strItem: string = ('' + item.address[key1]).toLowerCase();
            // console.log('object', item.address[key1])
            // console.log('strItem', strItem)
            return strItem.includes((phrase as string));
          }
        }
      }

      const strItem: string = ('' + item[key]).toLowerCase();
      return strItem.includes((phrase as string));
    })
    */

    /* phrase = ('' + phrase).toLowerCase();
    return value.filter(item => {
      const strItem: string = ('' + item[key]).toLowerCase();
      return strItem.includes(phrase);
    }) */

  }

}
