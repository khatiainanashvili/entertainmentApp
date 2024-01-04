export interface Props {
  title: string;
  thumbnail: {
    trending?: {
      small?: string;
      large?: string;
    };
    regular: {
      small?: string;
      medium?: string;
      large?: string;
    };
  };
  year: number;
  category: string;
  rating: string;
  isBookmarked: boolean;
  isTrending: boolean;
  search: string;
  docID? : string | undefined;
  uID? : string | null
}
