interface Vote  {
    likes: number;
    dislikes: number;
}

export interface Comment {
    author: string;
    text: string;
}
export interface Blog {
    id?: number;
    title: string;
    description: string;
    text: string;
    author: string;
    votes: {
        [key: number]: Vote
    };
    comments: Comment[];
}