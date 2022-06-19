import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  toLowerCase(input: any) {
    if (input !== null && input !== "" && input !== undefined) {
      return input.toLowerCase();
    }
    return "";
  }
}
