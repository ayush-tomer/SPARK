"use client"

import { useEffect } from "react"

import { useState, useRef } from "react"
import { Heart, MessageCircle, MoreHorizontal, Share, Edit, Trash2, Sparkles } from "lucide-react"
import CommentSection from "./CommentSection"

export default function PostList({
  posts,
  setPosts,
  user,
  formatTimestamp,
  handleLikePost,
  expandedComments,
  setExpandedComments,
  handleEditPost,
  setIsPostModalOpen,
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
  const [openDropdown, setOpenDropdown] = useState(null)
  const [expanded, setExpanded] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="divide-y divide-purple-800/30">
      {posts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 sm:py-24 px-4 sm:px-6 text-center">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-purple-900/40 to-pink-900/30 flex items-center justify-center mb-6 sm:mb-8 shadow-lg">
            <Sparkles className="h-12 w-12 sm:h-14 sm:w-14 text-purple-300" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300 mb-3">
            No posts yet
          </h3>
          <p className="text-gray-400 max-w-md mb-8 sm:mb-10 text-base sm:text-lg">
            Create your first post by clicking the "Create Post" button above and share your thoughts with the world!
          </p>
          <button
            onClick={() => setIsPostModalOpen(true)}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-full px-8 sm:px-10 py-3 sm:py-4 font-bold text-base transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Create Your First Post
          </button>
        </div>
      ) : (
        posts.map((post) => (
          <div
            key={post.id}
            className="p-5 sm:p-7 hover:bg-purple-900/10 transition-colors border-b border-purple-800/30 animate-fadeIn"
          >
            {/* User Info Section */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3 sm:space-x-5">
                {/* Profile Picture */}
                <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-full overflow-hidden p-0.5 bg-gradient-to-r from-purple-500 to-pink-500 flex-shrink-0 shadow-lg">
                  <div className="h-full w-full rounded-full overflow-hidden border-2 border-gray-900">
                    <img
                      src={post.profilePic || "/placeholder.svg"}
                      alt={`@${user.username}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                {/* Name, Username, and Timestamp */}
                <div>
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <span className="font-bold text-gray-200 hover:underline cursor-pointer">{post.name}</span>
                    <span className="text-gray-400">@{user.username}</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-400 hover:underline cursor-pointer">
                      {formatTimestamp(post.timestamp)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Dropdown Menu */}
              <div className="relative">
                <button
                  className="text-gray-400 rounded-full h-8 w-8 sm:h-9 sm:w-9 flex items-center justify-center hover:bg-purple-900/30 transition-colors"
                  onClick={() => setOpenDropdown(openDropdown === post.id ? null : post.id)}
                >
                  <MoreHorizontal className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>

                {openDropdown === post.id && (
                  <div
                    ref={dropdownRef}
                    className="absolute right-0 mt-2 w-40 sm:w-48 bg-gray-800 rounded-xl shadow-xl border border-purple-800/50 z-10 overflow-hidden"
                  >
                    <div
                      className="p-2.5 sm:p-3 hover:bg-purple-900/30 cursor-pointer font-medium text-purple-300 flex items-center gap-2 text-sm"
                      onClick={() => {
                        handleEditPost(post)
                        setOpenDropdown(null)
                      }}
                    >
                      <Edit className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      Edit post
                    </div>
                    <div
                      className="p-2.5 sm:p-3 hover:bg-red-900/30 cursor-pointer font-medium text-red-400 flex items-center gap-2 text-sm"
                      onClick={() => {
                        setPosts(posts.filter((p) => p.id !== post.id))
                        setOpenDropdown(null)
                      }}
                    >
                      <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      Delete post
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Post Content Section */}
            {post.caption && (
              <div className="relative mt-3 sm:mt-4 mb-3 sm:mb-4 text-gray-300 text-base sm:text-lg">
                <p className={`line-clamp-3 ${expanded ? "line-clamp-none" : ""}`}>{post.caption}</p>
                {post.caption.length > 200 && (
                  <button
                    onClick={() => setExpanded(!expanded)}
                    className="text-purple-400 font-semibold hover:underline mt-2 transition-colors hover:text-purple-300"
                  >
                    {expanded ? "Show less" : "Show more"}
                  </button>
                )}
              </div>
            )}

            {post.image && (
              <div className="mt-3 sm:mt-4 mb-4 sm:mb-5 rounded-2xl overflow-hidden border border-purple-800/30 hover:border-purple-700/50 transition-colors shadow-lg hover:shadow-xl">
                <img
                  src={post.image || "/placeholder.svg"}
                  alt="Post"
                  className="w-full max-h-[400px] sm:max-h-[600px] object-contain bg-black/40"
                />
              </div>
            )}

            {/* Interaction Buttons */}
            <div className="flex justify-between mt-4 sm:mt-5 text-gray-400">
              <button
                className="flex items-center space-x-1.5 sm:space-x-2.5 text-gray-400 hover:text-purple-300 hover:bg-purple-900/30 rounded-full py-2 sm:py-2.5 px-4 sm:px-5 transition-colors"
                onClick={() => setExpandedComments(expandedComments === post.id ? null : post.id)}
              >
                <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="font-medium text-sm sm:text-base">{post.comments.length}</span>
              </button>
              <button
                className={`flex items-center space-x-1.5 sm:space-x-2.5 rounded-full py-2 sm:py-2.5 px-4 sm:px-5 transition-colors ${
                  post.liked
                    ? "text-pink-400 bg-pink-900/20 hover:bg-pink-900/30"
                    : "text-gray-400 hover:text-pink-400 hover:bg-pink-900/20"
                }`}
                onClick={() => handleLikePost(post.id)}
              >
                <Heart className={`h-4 w-4 sm:h-5 sm:w-5 ${post.liked ? "fill-current" : ""}`} />
                <span className="font-medium text-sm sm:text-base">{post.likes}</span>
              </button>

              <button className="flex items-center space-x-1.5 sm:space-x-2.5 text-gray-400 hover:text-purple-300 hover:bg-purple-900/30 rounded-full py-2 sm:py-2.5 px-4 sm:px-5 transition-colors">
                <Share className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="font-medium text-sm sm:text-base hidden sm:inline">Share</span>
              </button>
            </div>

            {/* Comment Section Component */}
            {expandedComments === post.id && (
              <CommentSection
                post={post}
                user={user}
                formatTimestamp={formatTimestamp}
                commentText={commentText}
                setCommentText={setCommentText}
                handleAddComment={handleAddComment}
                editingComment={editingComment}
                editCommentText={editCommentText}
                setEditCommentText={setEditCommentText}
                handleEditComment={handleEditComment}
                handleSaveCommentEdit={handleSaveCommentEdit}
                handleDeleteComment={handleDeleteComment}
              />
            )}
          </div>
        ))
      )}
    </div>
  )
}

