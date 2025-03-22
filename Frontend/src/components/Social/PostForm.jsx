"use client"

import { useState } from "react"

import { useRef, useEffect } from "react"
import { X, ImageIcon, Smile } from "lucide-react"

export default function PostForm({
  isPostModalOpen,
  setIsPostModalOpen,
  newPostImage,
  setNewPostImage,
  newPostCaption,
  setNewPostCaption,
  handleCreatePost,
  handleImageChange,
  editingPost,
  setEditingPost,
  editPostCaption,
  setEditPostCaption,
  editPostImage,
  setEditPostImage,
  handleSaveEdit,
  handleEditImageChange,
}) {
  const fileInputRef = useRef(null)
  const editFileInputRef = useRef(null)
  const emojiPickerRef = useRef(null)
  const editEmojiPickerRef = useRef(null)
  const modalRef = useRef(null)
  const editModalRef = useRef(null)

  // Sample emojis for the emoji picker
  const emojis = ["😀", "😂", "😍", "🥰", "😎", "🤩", "😊", "🙌", "👍", "❤️", "🔥", "✨", "🎉", "🌈", "🌟"]

  // State for emoji pickers
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [showEditEmojiPicker, setShowEditEmojiPicker] = useState(false)

  useEffect(() => {
    function handleClickOutside(event) {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
        setShowEmojiPicker(false)
      }
      if (editEmojiPickerRef.current && !editEmojiPickerRef.current.contains(event.target)) {
        setShowEditEmojiPicker(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Add emoji to post caption
  const addEmojiToCaption = (emoji) => {
    setNewPostCaption((prev) => prev + emoji)
    setShowEmojiPicker(false)
  }

  // Add emoji to edit post caption
  const addEmojiToEditCaption = (emoji) => {
    setEditPostCaption((prev) => prev + emoji)
    setShowEditEmojiPicker(false)
  }

  return (
    <>
      {/* Post Modal with enhanced design and improved responsiveness */}
      {isPostModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-3 sm:p-4 backdrop-blur-sm overflow-y-auto">
          <div
            ref={modalRef}
            className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-3xl w-full max-w-2xl relative shadow-2xl border border-purple-700/50 my-4 max-h-[90vh] flex flex-col"
          >
            <div className="p-4 sm:p-5 border-b border-purple-800/30 flex justify-between items-center shrink-0">
              <button
                onClick={() => setIsPostModalOpen(false)}
                className="text-gray-400 hover:bg-purple-900/30 rounded-full p-2 sm:p-2.5 transition-colors"
              >
                <X className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
              <h2 className="font-bold text-base sm:text-xl text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">
                Create Post
              </h2>
              <button
                onClick={handleCreatePost}
                className={`bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-full px-5 sm:px-6 py-1.5 sm:py-2.5 font-bold text-sm transition-all duration-300 transform hover:scale-105 shadow-md ${
                  !newPostCaption.trim() && !newPostImage ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={!newPostCaption.trim() && !newPostImage}
              >
                Post
              </button>
            </div>

            <div className="p-4 sm:p-6 overflow-y-auto flex space-x-6">
              <div className="flex flex-col flex-1 space-y-4 sm:space-y-5">
                <textarea
                  placeholder="What's on your mind today?"
                  value={newPostCaption}
                  onChange={(e) => setNewPostCaption(e.target.value)}
                  className="w-full border-none resize-none focus:ring-0 text-lg sm:text-xl p-0 min-h-[100px] sm:min-h-[150px] focus:outline-none bg-transparent text-gray-200"
                  autoFocus
                />

                <div className="flex items-center space-x-2 sm:space-x-3">
                  <button
                    className="text-purple-400 rounded-full h-10 w-10 sm:h-11 sm:w-11 flex items-center justify-center hover:bg-purple-900/30 transition-colors border border-purple-800/50"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <ImageIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    className="text-purple-400 rounded-full h-10 w-10 sm:h-11 sm:w-11 flex items-center justify-center hover:bg-purple-900/30 transition-colors border border-purple-800/50"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  >
                    <Smile className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>

                  {/* Emoji Picker */}
                  {showEmojiPicker && (
                    <div
                      ref={emojiPickerRef}
                      className="absolute top-20 right-4 bg-gray-800 p-2 sm:p-3 rounded-xl shadow-lg border border-purple-800/50 grid grid-cols-5 gap-1 sm:gap-2 w-56 sm:w-64 z-10"
                    >
                      {emojis.map((emoji, index) => (
                        <button
                          key={index}
                          className="text-lg sm:text-2xl hover:bg-purple-900/30 p-1 sm:p-2 rounded-lg transition-colors"
                          onClick={() => addEmojiToCaption(emoji)}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {newPostImage && (
                <div className="relative w-1/3 max-w-xs rounded-2xl overflow-hidden border border-purple-800/50 shadow-md flex items-center justify-center">
                  <img
                    src={newPostImage || "/placeholder.svg"}
                    alt="Upload preview"
                    className="w-full h-auto object-contain bg-black/30"
                  />
                  <button
                    onClick={() => setNewPostImage("")}
                    className="absolute top-2 right-2 bg-black bg-opacity-70 text-white rounded-full p-1.5 hover:bg-opacity-100 transition-opacity"
                  >
                    <X className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Edit Post Modal with enhanced design and improved responsiveness */}
      {editingPost && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-3 sm:p-4 backdrop-blur-sm overflow-y-auto">
          <div
            ref={editModalRef}
            className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-3xl w-full max-w-2xl sm:max-w-4xl relative shadow-2xl border border-purple-700/50 my-4 max-h-[95vh] flex flex-col"
          >
            <div className="p-4 sm:p-6 border-b border-purple-800/30 flex justify-between items-center shrink-0">
              <button
                onClick={() => setEditingPost(null)}
                className="text-gray-400 hover:bg-purple-900/30 rounded-full p-2 sm:p-3 transition-colors"
              >
                <X className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
              <h2 className="font-bold text-lg sm:text-xl text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">
                Edit Post
              </h2>
              <button
                onClick={handleSaveEdit}
                className={`bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-full px-5 sm:px-6 py-2 sm:py-3 font-bold text-sm sm:text-base transition-all duration-300 transform hover:scale-105 shadow-md ${
                  !editPostCaption.trim() && !editPostImage ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={!editPostCaption.trim() && !editPostImage}
              >
                Save
              </button>
            </div>
            <div className="p-5 sm:p-6 overflow-y-auto">
              <div className="flex flex-col sm:flex-row space-y-5 sm:space-y-0 sm:space-x-5">
                {/* Left Side: Avatar and Text Area */}
                <div className="flex flex-col flex-1 space-y-5 sm:space-y-6">
                  <div className="flex space-x-4 sm:space-x-5 items-center">
                    <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full overflow-hidden p-1 bg-gradient-to-r from-purple-600 to-pink-600 flex-shrink-0 shadow-md">
                      <div className="h-full w-full rounded-full overflow-hidden border-2 border-gray-900">
                        <img
                          src="/placeholder.svg?height=80&width=80"
                          alt="@currentuser"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                  <textarea
                    placeholder="What's on your mind today?"
                    value={editPostCaption}
                    onChange={(e) => setEditPostCaption(e.target.value)}
                    className="w-full border-none resize-none focus:ring-0 text-lg sm:text-xl p-0 min-h-[150px] sm:min-h-[200px] focus:outline-none bg-transparent text-gray-200"
                  />
                  <div className="flex space-x-2 sm:space-x-3">
                    <button
                      className="text-purple-400 rounded-full h-12 w-12 sm:h-14 sm:w-14 flex items-center justify-center hover:bg-purple-900/30 transition-colors border border-purple-800/50"
                      onClick={() => editFileInputRef.current?.click()}
                    >
                      <ImageIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                    </button>
                    <input
                      type="file"
                      ref={editFileInputRef}
                      onChange={handleEditImageChange}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      className="text-purple-400 rounded-full h-12 w-12 sm:h-14 sm:w-14 flex items-center justify-center hover:bg-purple-900/30 transition-colors border border-purple-800/50"
                      onClick={() => setShowEditEmojiPicker(!showEditEmojiPicker)}
                    >
                      <Smile className="h-5 w-5 sm:h-6 sm:w-6" />
                    </button>

                    {/* Edit Emoji Picker */}
                    {showEditEmojiPicker && (
                      <div
                        ref={editEmojiPickerRef}
                        className="absolute bottom-20 left-4 bg-gray-800 p-2 sm:p-3 rounded-xl shadow-lg border border-purple-800/50 grid grid-cols-5 gap-1 sm:gap-2 w-56 sm:w-64 z-10"
                      >
                        {emojis.map((emoji, index) => (
                          <button
                            key={index}
                            className="text-lg sm:text-2xl hover:bg-purple-900/30 p-1 sm:p-2 rounded-lg transition-colors"
                            onClick={() => addEmojiToEditCaption(emoji)}
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                {/* Right Side: Image Preview */}
                {editPostImage && (
                  <div className="relative rounded-2xl overflow-hidden border border-purple-800/50 shadow-md max-w-sm sm:max-w-md">
                    <img
                      src={editPostImage || "/placeholder.svg"}
                      alt="Upload preview"
                      className="w-full max-h-[300px] sm:max-h-[400px] object-contain bg-black/30"
                    />
                    <button
                      onClick={() => setEditPostImage("")}
                      className="absolute top-3 right-3 bg-black bg-opacity-70 text-white rounded-full p-2 hover:bg-opacity-100 transition-opacity"
                    >
                      <X className="h-5 w-5 sm:h-6 sm:w-6" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}