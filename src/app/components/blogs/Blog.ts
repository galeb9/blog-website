interface Voter  {
    name: string;
    liked: boolean;
}
export interface Comment {
    author: string;
    text: string;
    replies: string[];
    votedBy: {
        [key: number]: Voter;
    };
    likes: number;
    dislikes: number;
}

export interface Blog {
    id?: number;
    title: string;
    description: string;
    text: string;
    author: string;
    likes: string;
    dislikes: string;
    comments: Comment[];
}
