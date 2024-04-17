import {color} from "../enums/color";


export class searchInputService {


  private colorValues: string[] = [];

  get getColorValues() {
    this.putEnumValuesInArray()
    return this.colorValues;
  }

  putEnumValuesInArray() {
    const colors = Object.keys(color).filter((item) => {
      return isNaN(Number(item));
    });
    return colors;
  }
}
