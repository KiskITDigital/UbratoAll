export type CommentProps = {
  content: string;
  attachments: string[];
};

export type Comment = CommentProps & {
  id: number;
  verification_status: string;
  created_at: string;
};