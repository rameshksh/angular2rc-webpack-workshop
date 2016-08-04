
import {Review} from './review';

export class Movie
{
    public Id: number;
    public Name: string;
    public Description: string;
    public Collection: number;
    public Genre: string;
    public Language: string;
    public Reviews: Array<Review>;
    public Year: string;
    public Rating: number;
}