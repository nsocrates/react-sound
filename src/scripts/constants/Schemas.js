import { Schema, arrayOf } from 'normalizr'

// Normalizr schemas for SoundCloud API responses
const userSchema = new Schema('users')
const trackSchema = new Schema('tracks')
const playlistSchema = new Schema('playlists')
const commentSchema = new Schema('comments')

trackSchema.define({
  user: userSchema
})

playlistSchema.define({
  tracks: arrayOf(trackSchema),
  user: userSchema
})

commentSchema.define({
  user: userSchema
})

export const Schemas = {
  USER: userSchema,
  USER_ARRAY: arrayOf(userSchema),
  TRACK: trackSchema,
  TRACK_ARRAY: arrayOf(trackSchema),
  PLAYLIST: playlistSchema,
  PLAYLIST_ARRAY: arrayOf(playlistSchema),
  COMMENT: commentSchema,
  COMMENT_ARRAY: arrayOf(commentSchema)
}
