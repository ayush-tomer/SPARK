"use client"

import { useEffect } from "react"

import { useState, useRef } from "react"
import { MoreHorizontal, Edit, Trash2, Smile } from "lucide-react"

export default function CommentSection({
  post,
  user,
  formatTimestamp,
  commentText,
  setCommentText,
  handleAddComment,
  editingComment,
  editCommentText,
  setEditCommentText,
  handleEditComment,
  handleSaveCommentEdit,
  handleDeleteComment,
}) {
  const [openCommentDropdown, setOpenCommentDropdown] = useState(null)
  const [showCommentEmojiPicker, setShowCommentEmojiPicker] = useState(false)
  const commentDropdownRef = useRef(null)
  const commentEmojiPickerRef = useRef(null)

  // Sample emojis for the emoji picker
  const emojis = ["😀", "😂", "😍", "🥰", "😎", "🤩", "😊", "🙌", "👍", "❤️", "🔥", "✨", "🎉", "🌈", "🌟"]

  useEffect(() => {
    function handleClickOutside(event) {
      if (commentDropdownRef.current && !commentDropdownRef.current.contains(event.target)) {
        setOpenCommentDropdown(null)
      }
      if (commentEmojiPickerRef.current && !commentEmojiPickerRef.current.contains(event.target)) {
        setShowCommentEmojiPicker(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Add emoji to comment
  const addEmojiToComment = (emoji) => {
    setCommentText((prev) => prev + emoji)
    setShowCommentEmojiPicker(false)
  }

  return (
    <div className="mt-4 sm:mt-5 space-y-4 sm:space-y-5 border-t border-purple-800/30 pt-4 sm:pt-5">
      {post.comments.length > 0 ? (
        post.comments.map((comment) => (
          <div
            key={comment.id}
            className="flex space-x-3 sm:space-x-4 text-sm hover:bg-purple-900/10 p-3 sm:p-4 rounded-xl transition-colors"
          >
            {/* Custom Avatar with small gradient border */}
            <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full overflow-hidden p-0.5 bg-gradient-to-r from-purple-500 to-pink-500 flex-shrink-0 shadow-md">
              <div className="h-full w-full rounded-full overflow-hidden border border-gray-900">
                <img
                  src={comment.profilePic || "/placeholder.svg"}
                  alt={`@${user.username}`}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1 sm:space-x-1.5 flex-wrap">
                  <span className="font-bold text-gray-200 hover:underline cursor-pointer">{comment.name}</span>
                  <span className="text-gray-400">@{user.username}</span>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-400 hover:underline cursor-pointer">
                    {formatTimestamp(comment.timestamp)}
                  </span>
                </div>

                {/* Comment dropdown menu */}
                <div className="relative">
                  <button
                    className="text-gray-400 rounded-full h-6 w-6 sm:h-7 sm:w-7 flex items-center justify-center hover:bg-purple-900/30 transition-colors"
                    onClick={() => setOpenCommentDropdown(openCommentDropdown === comment.id ? null : comment.id)}
                  >
                    <MoreHorizontal className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </button>

                  {openCommentDropdown === comment.id && (
                    <div
                      ref={commentDropdownRef}
                      className="absolute right-0 mt-1 w-36 sm:w-40 bg-gray-800 rounded-xl shadow-xl border border-purple-800/50 z-10 overflow-hidden"
                    >
                      <div
                        className="p-2 sm:p-2.5 hover:bg-purple-900/30 cursor-pointer font-medium text-purple-300 flex items-center gap-2 text-xs sm:text-sm"
                        onClick={() => {
                          handleEditComment(post.id, comment.id)
                          setOpenCommentDropdown(null)
                        }}
                      >
                        <Edit className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                        Edit comment
                      </div>
                      <div
                        className="p-2 sm:p-2.5 hover:bg-red-900/30 cursor-pointer font-medium text-red-400 flex items-center gap-2 text-xs sm:text-sm"
                        onClick={() => handleDeleteComment(post.id, comment.id)}
                      >
                        <Trash2 className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                        Delete comment
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {editingComment && editingComment.commentId === comment.id ? (
                <div className="mt-2 flex">
                  <input
                    type="text"
                    value={editCommentText}
                    onChange={(e) => setEditCommentText(e.target.value)}
                    className="flex-1 bg-gray-800 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-transparent focus:border-purple-600 text-sm text-gray-200"
                  />
                  <button
                    onClick={() => handleSaveCommentEdit(post.id)}
                    className="ml-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-full px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm transition-all duration-300 transform hover:scale-105 shadow-md"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <p className="text-gray-300 mt-1">{comment.text}</p>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-3 sm:py-4 text-gray-400 text-sm sm:text-base">
          No comments yet. Be the first to comment!
        </div>
      )}

      <div className="flex space-x-3 sm:space-x-4 mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-purple-800/30">
        {/* Custom Avatar with small gradient border */}
        <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full overflow-hidden p-0.5 bg-gradient-to-r from-purple-500 to-pink-500 flex-shrink-0 shadow-md">
          <div className="h-full w-full rounded-full overflow-hidden border border-gray-900">
            <img src="/placeholder.svg?height=40&width=40" alt="@currentuser" className="h-full w-full object-cover" />
          </div>
        </div>
        <div className="flex-1 flex">
          <div className="flex-1 relative">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a comment..."
              className="w-full bg-gray-800/80 rounded-full px-5 sm:px-6 py-2.5 sm:py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-purple-800/30 focus:border-purple-600 text-sm sm:text-base text-gray-200"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex">
              <div className="relative">
                <button
                  className="text-purple-400 rounded-full h-7 w-7 sm:h-8 sm:w-8 flex items-center justify-center hover:bg-purple-900/30 transition-colors"
                  onClick={() => setShowCommentEmojiPicker(!showCommentEmojiPicker)}
                >
                  <Smile className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>

                {showCommentEmojiPicker && (
                  <div
                    ref={commentEmojiPickerRef}
                    className="absolute bottom-9 sm:bottom-10 right-0 bg-gray-800 p-2 sm:p-3 rounded-xl shadow-lg border border-purple-800/50 grid grid-cols-5 gap-1 sm:gap-2 w-56 sm:w-64 z-10"
                  >
                    {emojis.map((emoji, index) => (
                      <button
                        key={index}
                        className="text-lg sm:text-2xl hover:bg-purple-900/30 p-1 sm:p-2 rounded-lg transition-colors"
                        onClick={() => addEmojiToComment(emoji)}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <button
            onClick={() => handleAddComment(post.id)}
            className={`ml-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-full px-4 sm:px-5 py-1.5 sm:py-2 transition-all duration-300 transform hover:scale-105 shadow-md ${
              !commentText.trim() ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={!commentText.trim()}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  )
}

