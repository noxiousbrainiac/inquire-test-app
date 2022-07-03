export interface IComment {
	id: number;
	postId: number;
	body: string;
}

export interface IPost {
	id?: number;
	title: string;
	body: string;
	comments: IComment[];
}

export interface PostState {
	posts: IPost[];
	post: IPost | null;
}

export interface NewPost {
	title: string;
	body: string;
}

export interface NewComment {
	postId: number;
	body: string;
}
