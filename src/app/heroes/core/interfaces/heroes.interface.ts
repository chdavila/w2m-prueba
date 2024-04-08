export enum PublisherEnum {
  marvelPublisher = 'Marvel Comics',
  dcPublisher = 'DC Comics'
}

export type Publisher = PublisherEnum.marvelPublisher | PublisherEnum.dcPublisher;

export interface Hero {
  id: string;
  superhero: string;
  publisher: Publisher;
  alter_ego: string;
  first_appearance: string;
  characters: string;
  img: string;
}

