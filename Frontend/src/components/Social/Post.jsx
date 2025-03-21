"use client"

import { useState, useRef, useEffect } from "react"
import { getUserData } from "../../auth"
import { Sparkles } from "lucide-react"
import PostForm from "./PostForm"
import PostList from "./PostList"

export default function Post() {
  // Replace the initial posts state with an empty array
  const [posts, setPosts] = useState([])

  // Add a new state for editing posts
  const [editingPost, setEditingPost] = useState(null)
  const [editPostCaption, setEditPostCaption] = useState("")
  const [editPostImage, setEditPostImage] = useState("")

  // Add state for editing comments
  const [editingComment, setEditingComment] = useState(null)
  const [editCommentText, setEditCommentText] = useState("")

  const [isPostModalOpen, setIsPostModalOpen] = useState(false)
  const [newPostImage, setNewPostImage] = useState("")
  const [newPostCaption, setNewPostCaption] = useState("")
  const [expandedComments, setExpandedComments] = useState(null)
  const [commentText, setCommentText] = useState("")
  const [openDropdown, setOpenDropdown] = useState(null)
  const [openCommentDropdown, setOpenCommentDropdown] = useState(null)

  // Add state for emoji picker
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [showEditEmojiPicker, setShowEditEmojiPicker] = useState(false)
  const [showCommentEmojiPicker, setShowCommentEmojiPicker] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    getUserData()
      .then((userData) => setUser(userData))
      .catch((err) => console.error(err))
  }, [])

  // Sample emojis for the emoji picker
  const emojis = ["😀", "😂", "😍", "🥰", "😎", "🤩", "😊", "🙌", "👍", "❤️", "🔥", "✨", "🎉", "🌈", "🌟"]

  const fileInputRef = useRef(null)
  const dropdownRef = useRef(null)
  const commentDropdownRef = useRef(null)
  const editFileInputRef = useRef(null)
  const emojiPickerRef = useRef(null)
  const editEmojiPickerRef = useRef(null)
  const commentEmojiPickerRef = useRef(null)
  const modalRef = useRef(null)
  const editModalRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null)
      }
      if (commentDropdownRef.current && !commentDropdownRef.current.contains(event.target)) {
        setOpenCommentDropdown(null)
      }
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
        setShowEmojiPicker(false)
      }
      if (editEmojiPickerRef.current && !editEmojiPickerRef.current.contains(event.target)) {
        setShowEditEmojiPicker(false)
      }
      if (commentEmojiPickerRef.current && !commentEmojiPickerRef.current.contains(event.target)) {
        setShowCommentEmojiPicker(false)
      }
    }

    // Add overflow hidden to body when modal is open
    if (isPostModalOpen || editingPost) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.body.style.overflow = "auto"
    }
  }, [isPostModalOpen, editingPost])

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setNewPostImage(event.target.result.toString())
        }
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }

  // Add a function to handle image change in edit mode
  const handleEditImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setEditPostImage(event.target.result.toString())
        }
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const handleCreatePost = () => {
    // Allow post creation if either caption or image is present
    if (newPostCaption.trim() !== "" || newPostImage !== "") {
      const newPost = {
        id: Date.now().toString(),
        // username: "currentuser",
        // name: "Current User",
        profilePic: "/placeholder.svg?height=40&width=40",
        image: newPostImage || "",
        caption: newPostCaption,
        likes: 0,
        liked: false,
        comments: [],
        timestamp: new Date(),
      }
      setPosts([newPost, ...posts])
      setNewPostImage("")
      setNewPostCaption("")
      setIsPostModalOpen(false)
    }
  }

  const handleLikePost = (postId) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            liked: !post.liked,
            likes: post.liked ? post.likes - 1 : post.likes + 1,
          }
        }
        return post
      }),
    )
  }

  // Add a function to handle comment editing
  const handleEditComment = (postId, commentId) => {
    const post = posts.find((p) => p.id === postId)
    const comment = post.comments.find((c) => c.id === commentId)
    setEditingComment({ postId, commentId })
    setEditCommentText(comment.text)
  }

  // Add a function to save edited comment
  const handleSaveCommentEdit = (postId) => {
    if (editCommentText.trim() !== "") {
      setPosts(
        posts.map((post) => {
          if (post.id === postId) {
            return {
              ...post,
              comments: post.comments.map((comment) => {
                if (comment.id === editingComment.commentId) {
                  return {
                    ...comment,
                    text: editCommentText,
                  }
                }
                return comment
              }),
            }
          }
          return post
        }),
      )
      setEditingComment(null)
      setEditCommentText("")
    }
  }

  // Add a function to delete comment
  const handleDeleteComment = (postId, commentId) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: post.comments.filter((comment) => comment.id !== commentId),
          }
        }
        return post
      }),
    )
  }

  // Modify handleAddComment to hide comments after adding
  const handleAddComment = (postId) => {
    if (commentText.trim() !== "") {
      setPosts(
        posts.map((post) => {
          if (post.id === postId) {
            return {
              ...post,
              comments: [
                ...post.comments,
                {
                  id: `c${Date.now()}`,
                  // username: "currentuser",
                  // name: "Current User",
                  profilePic: "/placeholder.svg?height=40&width=40",
                  text: commentText,
                  timestamp: new Date(),
                },
              ],
            }
          }
          return post
        }),
      )
      setCommentText("")
      // Don't hide comments after adding
      // setExpandedComments(null);
    }
  }

  // Add a function to handle post editing
  const handleEditPost = (post) => {
    setEditingPost(post)
    setEditPostCaption(post.caption)
    setEditPostImage(post.image)
  }

  // Add a function to save edited post
  const handleSaveEdit = () => {
    if (editPostCaption.trim() !== "" || editPostImage !== "") {
      setPosts(
        posts.map((post) => {
          if (post.id === editingPost.id) {
            return {
              ...post,
              caption: editPostCaption,
              image: editPostImage,
            }
          }
          return post
        }),
      )
      setEditingPost(null)
      setEditPostCaption("")
      setEditPostImage("")
    }
  }

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

  // Add emoji to comment
  const addEmojiToComment = (emoji) => {
    setCommentText((prev) => prev + emoji)
    setShowCommentEmojiPicker(false)
  }

  const formatTimestamp = (timestamp) => {
    const now = new Date()
    const diff = now - new Date(timestamp)
    const seconds = Math.floor(diff / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (days > 0) return `${days}d`
    if (hours > 0) return `${hours}h`
    if (minutes > 0) return `${minutes}m`
    return `${seconds}s`
  }

  return (
    <div className="max-w-4xl mt-20 mx-auto min-h-screen text-gray-200">
      {/* Enhanced header with gradient */}
      <header className="sticky top-0 z-10 bg-gray-950/90 backdrop-blur-md border-b border-purple-800/50 px-5 sm:px-8 py-4 sm:py-5 flex justify-between items-center shadow-lg">
        <h1 className="text-xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">
          TechVibe
        </h1>
        <button
          onClick={() => setIsPostModalOpen(true)}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-full px-4 sm:px-7 py-2.5 sm:py-3 font-bold text-sm transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center gap-1.5 sm:gap-2"
        >
          <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          <span className="hidden sm:inline">Create Post</span>
          <span className="sm:hidden">Post</span>
        </button>
      </header>

      {/* Post Form Component */}
      <PostForm
        isPostModalOpen={isPostModalOpen}
        setIsPostModalOpen={setIsPostModalOpen}
        newPostImage={newPostImage}
        setNewPostImage={setNewPostImage}
        newPostCaption={newPostCaption}
        setNewPostCaption={setNewPostCaption}
        handleCreatePost={handleCreatePost}
        handleImageChange={handleImageChange}
        editingPost={editingPost}
        setEditingPost={setEditingPost}
        editPostCaption={editPostCaption}
        setEditPostCaption={setEditPostCaption}
        editPostImage={editPostImage}
        setEditPostImage={setEditPostImage}
        handleSaveEdit={handleSaveEdit}
        handleEditImageChange={handleEditImageChange}
      />

      {/* Post List Component */}
      <PostList
        posts={posts}
        setPosts={setPosts}
        user={user}
        formatTimestamp={formatTimestamp}
        handleLikePost={handleLikePost}
        expandedComments={expandedComments}
        setExpandedComments={setExpandedComments}
        handleEditPost={handleEditPost}
        setIsPostModalOpen={setIsPostModalOpen}
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

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }

        .hover-pulse:hover {
          animation: pulse 1.5s ease-in-out infinite;
        }

        /* Add smooth transitions to all interactive elements */
        button,
        a,
        input,
        textarea {
          transition: all 0.2s ease-in-out;
        }

        /* Add subtle hover effect to post images */
        .post-image:hover {
          transform: scale(1.01);
          transition: transform 0.3s ease;
        }
      `}</style>
    </div>
  )
}
