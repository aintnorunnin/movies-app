class MovieModel {
  id: number;
  title: string;
  openingText: string;
  releaseDate: string;

  constructor(
    id: number,
    title: string,
    openingText: string,
    releaseDate: string
  ){
   this.id = id;
   this.title = title;
   this.openingText = openingText;
   this.releaseDate = releaseDate;   
  }
}

export default MovieModel;
