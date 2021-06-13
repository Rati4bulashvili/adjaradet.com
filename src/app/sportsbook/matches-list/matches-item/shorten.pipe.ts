import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {
  transform(value: any){
    if(value.length > 10 && window.innerWidth < 600){
      return value.substr(0,8) + '...';
    }
    return value;
  }
}
