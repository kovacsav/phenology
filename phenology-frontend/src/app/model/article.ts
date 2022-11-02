export class Article {
  _id: string = '';
  abstract: string = '';
  author: string = '';
  date: string = '';
  image: Array<{imgPath: String, imgTitle: String}> = [
    {imgPath: '', imgTitle: ''}
  ]
  main: string = '';
  title: string = '';
}
