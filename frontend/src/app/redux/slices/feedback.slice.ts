import { createSlice } from "@reduxjs/toolkit";
import { getFeedback } from "../thunks/feedback.thunk";

export interface CommentInterface {
  id: number;
  content: string;
  created_at: string;
  updated_at: string;
  is_visible: boolean;
  children?: CommentInterface[];
  user?: {
    id: number;
    username: string;
  };
}

export interface TagInterface {
  id: number;
  tag: {
    id: number;
    name: string;
    created_at: string;
  };
}

export interface VoteInterface {
  id: number;
  voteType: 'UPVOTE' | 'DOWNVOTE';
}

export interface UserInterface {
  id: number;
  username: string;
  email: string;
  role: string;
  createdAt: string;
  isActive: boolean;
}

export interface FeedbackInterface {
  id: number;
  title: string;
  description: string;
  status: string;
  created_at: string;
  deleted_at: string | null;
  is_visible: boolean;
  score: number;
  user: UserInterface;
  comments: CommentInterface[];
  tags: TagInterface[];
  votes: VoteInterface[];
}

interface FeedbackState {
  feedbacks: FeedbackInterface[];
  isLoading: boolean;
  error: string;
  totalCount: number;
}

const initialState: FeedbackState = {
  feedbacks: [],
  isLoading: false,
  error: "",
  totalCount: 0
};

const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    addComment: (state, action) => {
      const { feedbackId, comment } = action.payload;
      const feedback = state.feedbacks.find(f => f.id === feedbackId);
      if (feedback) {
        feedback.comments.push(comment);
      }
    },
    updateComment: (state, action) => {
      const { feedbackId, commentId, updatedComment } = action.payload;
      const feedback = state.feedbacks.find(f => f.id === feedbackId);
      if (feedback) {
        const updateCommentRecursively = (comments: CommentInterface[]): boolean => {
          for (let comment of comments) {
            if (comment.id === commentId) {
              Object.assign(comment, updatedComment);
              return true;
            }
            if (comment.children && updateCommentRecursively(comment.children)) {
              return true;
            }
          }
          return false;
        };
        updateCommentRecursively(feedback.comments);
      }
    },
    deleteComment: (state, action) => {
      const { feedbackId, commentId } = action.payload;
      const feedback = state.feedbacks.find(f => f.id === feedbackId);
      if (feedback) {
        const deleteCommentRecursively = (comments: CommentInterface[]): CommentInterface[] => {
          return comments.filter(comment => {
            if (comment.id === commentId) {
              return false;
            }
            if (comment.children) {
              comment.children = deleteCommentRecursively(comment.children);
            }
            return true;
          });
        };
        feedback.comments = deleteCommentRecursively(feedback.comments);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getFeedback.pending, (state) => {
      state.isLoading = true;
      state.error = "";
    });
    builder.addCase(getFeedback.fulfilled, (state, action) => {
      state.isLoading = false;
      state.feedbacks = action.payload.feedbacks;
      state.totalCount = action.payload.totalCount;
      state.error = "";
    });
    builder.addCase(getFeedback.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || "Failed to fetch feedback";
    });
  },
});

export const { addComment, updateComment, deleteComment } = feedbackSlice.actions;
export default feedbackSlice.reducer;