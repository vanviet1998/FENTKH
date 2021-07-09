import 'reflect-metadata';
import { Container, Service } from 'typedi';

@Service()
export class Host {
   static readonly URL: string = "https://ntkhbackend.herokuapp.com"
   static readonly getImageUrl = (id) => {
      if(!id) return "#"
      return `https://drive.google.com/uc?export=view&id=${id}`

   }
}