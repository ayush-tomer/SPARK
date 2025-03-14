"use client";

import { useState, useRef, useEffect } from "react";
import { getUserData } from "../auth";
import {
  Heart,
  MessageCircle,
  MoreHorizontal,
  Share,
  X,
  ImageIcon,
  Smile,
  Sparkles,
  Edit,
  Trash2,
} from "lucide-react";

export default function SocialFeed() {
  // Replace the initial posts state with an empty array
  const [posts, setPosts] = useState([]);

  // Add a new state for editing posts
  const [editingPost, setEditingPost] = useState(null);
  const [editPostCaption, setEditPostCaption] = useState("");
  const [editPostImage, setEditPostImage] = useState("");

  // Add state for editing comments
  const [editingComment, setEditingComment] = useState(null);
  const [editCommentText, setEditCommentText] = useState("");

  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [newPostImage, setNewPostImage] = useState("");
  const [newPostCaption, setNewPostCaption] = useState("");
  const [expandedComments, setExpandedComments] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openCommentDropdown, setOpenCommentDropdown] = useState(null);

  // Add state for emoji picker
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showEditEmojiPicker, setShowEditEmojiPicker] = useState(false);
  const [showCommentEmojiPicker, setShowCommentEmojiPicker] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserData()
      .then((userData) => setUser(userData))
      .catch((err) => console.error(err));
  }, []);

  // Sample emojis for the emoji picker
  const emojis = [
    "😀",
    "😂",
    "😍",
    "🥰",
    "😎",
    "🤩",
    "😊",
    "🙌",
    "👍",
    "❤️",
    "🔥",
    "✨",
    "🎉",
    "🌈",
    "🌟",
  ];

  const fileInputRef = useRef(null);
  const dropdownRef = useRef(null);
  const commentDropdownRef = useRef(null);
  const editFileInputRef = useRef(null);
  const emojiPickerRef = useRef(null);
  const editEmojiPickerRef = useRef(null);
  const commentEmojiPickerRef = useRef(null);
  const modalRef = useRef(null);
  const editModalRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
      if (
        commentDropdownRef.current &&
        !commentDropdownRef.current.contains(event.target)
      ) {
        setOpenCommentDropdown(null);
      }
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false);
      }
      if (
        editEmojiPickerRef.current &&
        !editEmojiPickerRef.current.contains(event.target)
      ) {
        setShowEditEmojiPicker(false);
      }
      if (
        commentEmojiPickerRef.current &&
        !commentEmojiPickerRef.current.contains(event.target)
      ) {
        setShowCommentEmojiPicker(false);
      }
    }

    // Add overflow hidden to body when modal is open
    if (isPostModalOpen || editingPost) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, [isPostModalOpen, editingPost]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setNewPostImage(event.target.result.toString());
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // Add a function to handle image change in edit mode
  const handleEditImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setEditPostImage(event.target.result.toString());
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

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
      };
      setPosts([newPost, ...posts]);
      setNewPostImage("");
      setNewPostCaption("");
      setIsPostModalOpen(false);
    }
  };

  const handleLikePost = (postId) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            liked: !post.liked,
            likes: post.liked ? post.likes - 1 : post.likes + 1,
          };
        }
        return post;
      })
    );
  };

  // Add a function to handle comment editing
  const handleEditComment = (postId, commentId) => {
    const post = posts.find((p) => p.id === postId);
    const comment = post.comments.find((c) => c.id === commentId);
    setEditingComment({ postId, commentId });
    setEditCommentText(comment.text);
  };

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
                  };
                }
                return comment;
              }),
            };
          }
          return post;
        })
      );
      setEditingComment(null);
      setEditCommentText("");
    }
  };

  // Add a function to delete comment
  const handleDeleteComment = (postId, commentId) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: post.comments.filter(
              (comment) => comment.id !== commentId
            ),
          };
        }
        return post;
      })
    );
    setOpenCommentDropdown(null);
  };

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
            };
          }
          return post;
        })
      );
      setCommentText("");
      // Don't hide comments after adding
      // setExpandedComments(null);
    }
  };

  // Add a function to handle post editing
  const handleEditPost = (post) => {
    setEditingPost(post);
    setEditPostCaption(post.caption);
    setEditPostImage(post.image);
  };

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
            };
          }
          return post;
        })
      );
      setEditingPost(null);
      setEditPostCaption("");
      setEditPostImage("");
    }
  };

  // Add emoji to post caption
  const addEmojiToCaption = (emoji) => {
    setNewPostCaption((prev) => prev + emoji);
    setShowEmojiPicker(false);
  };

  // Add emoji to edit post caption
  const addEmojiToEditCaption = (emoji) => {
    setEditPostCaption((prev) => prev + emoji);
    setShowEditEmojiPicker(false);
  };

  // Add emoji to comment
  const addEmojiToComment = (emoji) => {
    setCommentText((prev) => prev + emoji);
    setShowCommentEmojiPicker(false);
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - new Date(timestamp);
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d`;
    if (hours > 0) return `${hours}h`;
    if (minutes > 0) return `${minutes}m`;
    return `${seconds}s`;
  };

  return (
    <div className="max-w-4xl mx-auto min-h-screen text-gray-200">
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
                  !newPostCaption.trim() && !newPostImage
                    ? "opacity-50 cursor-not-allowed"
                    : ""
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
                  !editPostCaption.trim() && !editPostImage
                    ? "opacity-50 cursor-not-allowed"
                    : ""
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
                      onClick={() =>
                        setShowEditEmojiPicker(!showEditEmojiPicker)
                      }
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

      {/* Enhanced post display with improved responsiveness */}
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
              Create your first post by clicking the "Create Post" button above
              and share your thoughts with the world!
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
                      <span className="font-bold text-gray-200 hover:underline cursor-pointer">
                        {post.name}
                      </span>
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
                    onClick={() =>
                      setOpenDropdown(openDropdown === post.id ? null : post.id)
                    }
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
                          handleEditPost(post);
                          setOpenDropdown(null);
                        }}
                      >
                        <Edit className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        Edit post
                      </div>
                      <div
                        className="p-2.5 sm:p-3 hover:bg-red-900/30 cursor-pointer font-medium text-red-400 flex items-center gap-2 text-sm"
                        onClick={() => {
                          setPosts(posts.filter((p) => p.id !== post.id));
                          setOpenDropdown(null);
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
                  <p
                    className={`line-clamp-3 ${
                      expanded ? "line-clamp-none" : ""
                    }`}
                  >
                    {post.caption}
                  </p>
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
                  onClick={() =>
                    setExpandedComments(
                      expandedComments === post.id ? null : post.id
                    )
                  }
                >
                  <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="font-medium text-sm sm:text-base">
                    {post.comments.length}
                  </span>
                </button>
                <button
                  className={`flex items-center space-x-1.5 sm:space-x-2.5 rounded-full py-2 sm:py-2.5 px-4 sm:px-5 transition-colors ${
                    post.liked
                      ? "text-pink-400 bg-pink-900/20 hover:bg-pink-900/30"
                      : "text-gray-400 hover:text-pink-400 hover:bg-pink-900/20"
                  }`}
                  onClick={() => handleLikePost(post.id)}
                >
                  <Heart
                    className={`h-4 w-4 sm:h-5 sm:w-5 ${
                      post.liked ? "fill-current" : ""
                    }`}
                  />
                  <span className="font-medium text-sm sm:text-base">
                    {post.likes}
                  </span>
                </button>

                <button className="flex items-center space-x-1.5 sm:space-x-2.5 text-gray-400 hover:text-purple-300 hover:bg-purple-900/30 rounded-full py-2 sm:py-2.5 px-4 sm:px-5 transition-colors">
                  <Share className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="font-medium text-sm sm:text-base hidden sm:inline">
                    Share
                  </span>
                </button>
              </div>

              {expandedComments === post.id && (
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
                              <span className="font-bold text-gray-200 hover:underline cursor-pointer">
                                {comment.name}
                              </span>
                              <span className="text-gray-400">
                                @{user.username}
                              </span>
                              <span className="text-gray-500">•</span>
                              <span className="text-gray-400 hover:underline cursor-pointer">
                                {formatTimestamp(comment.timestamp)}
                              </span>
                            </div>

                            {/* Comment dropdown menu */}
                            <div className="relative">
                              <button
                                className="text-gray-400 rounded-full h-6 w-6 sm:h-7 sm:w-7 flex items-center justify-center hover:bg-purple-900/30 transition-colors"
                                onClick={() =>
                                  setOpenCommentDropdown(
                                    openCommentDropdown === comment.id
                                      ? null
                                      : comment.id
                                  )
                                }
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
                                      handleEditComment(post.id, comment.id);
                                      setOpenCommentDropdown(null);
                                    }}
                                  >
                                    <Edit className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                                    Edit comment
                                  </div>
                                  <div
                                    className="p-2 sm:p-2.5 hover:bg-red-900/30 cursor-pointer font-medium text-red-400 flex items-center gap-2 text-xs sm:text-sm"
                                    onClick={() =>
                                      handleDeleteComment(post.id, comment.id)
                                    }
                                  >
                                    <Trash2 className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                                    Delete comment
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                          {editingComment &&
                          editingComment.commentId === comment.id ? (
                            <div className="mt-2 flex">
                              <input
                                type="text"
                                value={editCommentText}
                                onChange={(e) =>
                                  setEditCommentText(e.target.value)
                                }
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
                        <img
                          src="/placeholder.svg?height=40&width=40"
                          alt="@currentuser"
                          className="h-full w-full object-cover"
                        />
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
                              onClick={() =>
                                setShowCommentEmojiPicker(
                                  !showCommentEmojiPicker
                                )
                              }
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
                          !commentText.trim()
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                        disabled={!commentText.trim()}
                      >
                        Post
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

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
  );
}
