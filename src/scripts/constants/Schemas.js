import { Schema, arrayOf } from 'normalizr'

// Normalizr schemas for SoundCloud API responses
const userSchema = new Schema('users')
const trackSchema = new Schema('tracks')
const playlistSchema = new Schema('playlists')

trackSchema.define({
  user: userSchema
})

playlistSchema.define({
  tracks: arrayOf(trackSchema)
})

export const Schemas = {
  USER: userSchema,
  USER_ARRAY: arrayOf(userSchema),
  TRACK: trackSchema,
  TRACK_ARRAY: arrayOf(trackSchema),
  PLAYLIST: playlistSchema,
  PLAYLIST_ARRAY: arrayOf(playlistSchema)
}
