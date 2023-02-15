import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datetimeFormat',
})
export class DatetimeFormatPipe implements PipeTransform {
  //   transform(value: any, format: string = 'MM/dd/yyyy HH:mm:ss'): string {
  //     return new Date(value).toLocaleString();
  //   }

  transform(value: any): string {
    const date = new Date(value);
    const now = new Date();
    const diff = (now.getTime() - date.getTime()) / 1000;
    if (diff < 60) {
      return 'just now';
    } else if (diff < 3600) {
      return `${Math.floor(diff / 60)} minutes ago`;
    } else if (diff < 86400) {
      return `${Math.floor(diff / 3600)} hours ago`;
    } else if (diff < 604800) {
      return `${Math.floor(diff / 86400)} days ago`;
    } else if (diff < 2592000) {
      return `${Math.floor(diff / 604800)} weeks ago`;
    } else if (diff < 31536000) {
      return `${Math.floor(diff / 2592000)} months ago`;
    } else {
      return `${Math.floor(diff / 31536000)} years ago`;
    }
  }
}
