import React, { useState, useEffect } from 'react';
import { FaTwitter, FaGithub, FaLinkedin, FaEdit, FaSave, FaTimes, FaPlus } from 'react-icons/fa';
import { doc, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db, getUserData } from '../auth';

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [newSkill, setNewSkill] = useState('');
  const [saveLoading, setSaveLoading] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  
  const auth = getAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserData();
        
        // Ensure all required fields exist
        const completeData = {
          fullName: data.fullName || '',
          username: data.username || '',
          bio: data.bio || '',
          email: data.email || '',
          skills: data.skills || [],
          socialLinks: data.socialLinks || {
            twitter: '',
            github: '',
            linkedin: ''
          }
        };
        
        setUserData(completeData);
        setEditedData(completeData);
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Create default structure if error
        const defaultData = {
          fullName: '',
          username: '',
          bio: '',
          email: '',
          skills: [],
          socialLinks: {
            twitter: '',
            github: '',
            linkedin: ''
          }
        };
        setUserData(defaultData);
        setEditedData(defaultData);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleEditToggle = () => {
    if (isEditing) {
      // Cancel editing
      setEditedData(userData);
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setEditedData({
        ...editedData,
        [parent]: {
          ...editedData[parent],
          [child]: value
        }
      });
    } else {
      setEditedData({
        ...editedData,
        [name]: value
      });
    }
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !editedData.skills.includes(newSkill.trim())) {
      setEditedData({
        ...editedData,
        skills: [...editedData.skills, newSkill.trim()]
      });
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setEditedData({
      ...editedData,
      skills: editedData.skills.filter(skill => skill !== skillToRemove)
    });
  };

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 3000);
  };

  const handleSave = async () => {
    if (!auth.currentUser) {
      showNotification('You must be logged in to save changes', 'error');
      return;
    }
    
    try {
      setSaveLoading(true);
      await updateDoc(doc(db, "users", auth.currentUser.uid), editedData);
      setUserData(editedData);
      setIsEditing(false);
      showNotification('Profile updated successfully!', 'success');
    } catch (error) {
      console.error("Error updating profile:", error);
      showNotification('Failed to update profile. Please try again.', 'error');
    } finally {
      setSaveLoading(false);
    }
  };

  // Get first letter of name for avatar
  const getInitial = () => {
    if (userData && userData.fullName && userData.fullName.length > 0) {
      return userData.fullName.charAt(0).toUpperCase();
    }
    return '?';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen ">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full mb-4 flex items-center justify-center">
            <div className="w-12 h-12 bg-gray-800 rounded-full"></div>
          </div>
          <div className="text-xl font-semibold text-gray-300">Loading profile...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6">
      {notification.show && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg transform transition-all duration-500 ease-in-out ${
          notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white font-medium`}>
          {notification.message}
        </div>
      )}
      
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl border border-gray-700">
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-500 px-6 py-8 sm:px-10">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-white">Profile</h1>
              <div className="flex space-x-3">
                {isEditing ? (
                  <>
                    <button 
                      className="flex items-center space-x-2 px-4 py-2 bg-white text-purple-600 rounded-lg font-medium shadow-md hover:bg-gray-100 transition-all duration-200 transform hover:scale-105"
                      onClick={handleSave}
                      disabled={saveLoading}
                    >
                      {saveLoading ? (
                        <svg className="animate-spin h-5 w-5 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : (
                        <FaSave />
                      )}
                      <span>{saveLoading ? 'Saving...' : 'Save'}</span>
                    </button>
                    <button 
                      className="flex items-center space-x-2 px-4 py-2 bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-600 transition-all duration-200"
                      onClick={handleEditToggle}
                    >
                      <FaTimes />
                      <span>Cancel</span>
                    </button>
                  </>
                ) : (
                  <button 
                    className="flex items-center space-x-2 px-4 py-2 bg-white text-purple-600 rounded-lg font-medium shadow-md hover:bg-gray-100 transition-all duration-200 transform hover:scale-105"
                    onClick={handleEditToggle}
                  >
                    <FaEdit />
                    <span>Edit Profile</span>
                  </button>
                )}
              </div>
            </div>
          </div>
          
          {/* Profile content */}
          <div className="px-6 py-8 sm:px-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Left column - Avatar and basic info */}
              <div className="md:col-span-1">
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative group">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center text-white text-5xl overflow-hidden">
                      {userData.profileImage ? (
                        <img 
                          src={userData.profileImage || "/placeholder.svg"} 
                          alt={userData.fullName} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="font-bold">{getInitial()}</span>
                      )}
                    </div>
                    {isEditing && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer">
                        <span className="text-white text-sm font-medium">Change Photo</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-white">{userData.fullName || 'Not Provided'}</h2>
                    <p className="text-purple-400 font-medium">@{userData.username || 'username'}</p>
                  </div>
                  
                  {/* Social Links - Only show if they exist */}
                  <div className="flex space-x-4 mt-2">
                    {userData.socialLinks.twitter && (
                      <a 
                        href={userData.socialLinks.twitter} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-[#1DA1F2] transition-colors duration-200 transform hover:scale-110"
                      >
                        <FaTwitter size={22} />
                      </a>
                    )}
                    {userData.socialLinks.github && (
                      <a 
                        href={userData.socialLinks.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors duration-200 transform hover:scale-110"
                      >
                        <FaGithub size={22} />
                      </a>
                    )}
                    {userData.socialLinks.linkedin && (
                      <a 
                        href={userData.socialLinks.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-[#0077B5] transition-colors duration-200 transform hover:scale-110"
                      >
                        <FaLinkedin size={22} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Right column - Details */}
              <div className="md:col-span-2 space-y-6">
                {/* Name */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="fullName"
                      value={editedData.fullName}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white transition-all duration-200"
                    />
                  ) : (
                    <p className="text-gray-200 font-medium">{userData.fullName || 'Not Provided'}</p>
                  )}
                </div>
                
                {/* Username */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">Username</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="username"
                      value={editedData.username}
                      onChange={handleInputChange}
                      placeholder="Enter your username"
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white transition-all duration-200"
                    />
                  ) : (
                    <p className="text-gray-200 font-medium">@{userData.username || 'Not Provided'}</p>
                  )}
                </div>
                
                {/* Email */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">Email</label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={editedData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white transition-all duration-200"
                    />
                  ) : (
                    <p className="text-gray-200 font-medium">{userData.email || 'Not Provided'}</p>
                  )}
                </div>
                
                {/* Bio */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">Bio</label>
                  {isEditing ? (
                    <textarea
                      name="bio"
                      value={editedData.bio}
                      onChange={handleInputChange}
                      placeholder="Tell us about yourself"
                      rows="4"
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white transition-all duration-200"
                    />
                  ) : (
                    <p className="text-gray-300 whitespace-pre-line">{userData.bio || 'Not Provided'}</p>
                  )}
                </div>
                
                {/* Social Links - Only show in edit mode */}
                {isEditing && (
                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-300">Social Links</label>
                    
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <FaTwitter className="text-[#1DA1F2]" />
                        <input
                          type="url"
                          name="socialLinks.twitter"
                          value={editedData.socialLinks.twitter}
                          onChange={handleInputChange}
                          placeholder="Twitter URL"
                          className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white transition-all duration-200"
                        />
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <FaGithub className="text-white" />
                        <input
                          type="url"
                          name="socialLinks.github"
                          value={editedData.socialLinks.github}
                          onChange={handleInputChange}
                          placeholder="GitHub URL"
                          className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white transition-all duration-200"
                        />
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <FaLinkedin className="text-[#0077B5]" />
                        <input
                          type="url"
                          name="socialLinks.linkedin"
                          value={editedData.socialLinks.linkedin}
                          onChange={handleInputChange}
                          placeholder="LinkedIn URL"
                          className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white transition-all duration-200"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Skills section */}
            <div className="mt-10">
              <h3 className="text-lg font-semibold text-white mb-4">Skills</h3>
              
              {isEditing ? (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {editedData.skills.map((skill, index) => (
                      <div 
                        key={index} 
                        className="group flex items-center space-x-1 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-3 py-1.5 rounded-full text-sm font-medium shadow-lg"
                      >
                        <span>{skill}</span>
                        <button 
                          onClick={() => handleRemoveSkill(skill)}
                          className="opacity-70 hover:opacity-100 transition-opacity duration-200"
                        >
                          <FaTimes size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      placeholder="Add a skill"
                      className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white transition-all duration-200"
                      onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                    />
                    <button 
                      onClick={handleAddSkill}
                      className="flex items-center justify-center px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg hover:opacity-90 transition-all duration-200 shadow-lg"
                    >
                      <FaPlus className="mr-2" />
                      Add
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {userData.skills && userData.skills.length > 0 ? (
                    userData.skills.map((skill, index) => (
                      <div 
                        key={index} 
                        className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-3 py-1.5 rounded-full text-sm font-medium shadow-lg transform transition-transform duration-200 hover:scale-105"
                      >
                        {skill}
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400">No skills added yet</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
