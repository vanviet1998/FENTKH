export class Host {
   static readonly URL: string = "https://ntkhbackend.herokuapp.com"
   static readonly getImageUrl = (id) => {
      return `https://drive.google.com/uc?export=view&id=${id}`

   }
}