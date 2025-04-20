// DOM Elements
const alumniList = document.getElementById('alumni-list');
const searchInput = document.getElementById('searchInput');
const batchFilter = document.getElementById('batchFilter');
const branchFilter = document.getElementById('branchFilter');
const locationFilter = document.getElementById('locationFilter');
const resetFiltersBtn = document.getElementById('resetFilters');
const prevPageBtn = document.getElementById('prevPage');
const nextPageBtn = document.getElementById('nextPage');
const pageInfo = document.getElementById('pageInfo');
const postForm = document.getElementById('postForm');
const postsContainer = document.getElementById('posts');
const profileForm = document.getElementById('profileForm');
const profilePreview = document.getElementById('profilePreview');
const loginLink = document.getElementById('loginLink');
const loginModal = document.getElementById('loginModal');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const tabBtns = document.querySelectorAll('.tab-btn');
const closeBtns = document.querySelectorAll('.close');
const addEventBtn = document.getElementById('addEventBtn');
const eventModal = document.getElementById('eventModal');
const eventForm = document.getElementById('eventForm');
const calendar = document.getElementById('calendar');
const eventsList = document.getElementById('eventsList');
const getStartedBtn = document.getElementById('getStartedBtn');
const currentUserAvatar = document.getElementById('currentUserAvatar');
const currentUserName = document.getElementById('currentUserName');
const avatarUpload = document.getElementById('avatarUpload');
const profileAvatar = document.getElementById('profileAvatar');
const navLinks = document.querySelectorAll('#main-nav a');

// Enhanced Alumni Data
const alumniData = [
  { 
    id: 1,
    name: 'Rahul Sharma', 
    batch: '2018', 
    branch: 'CSE', 
    job: 'Software Engineer', 
    company: 'Google',
    location: 'Bangalore',
    email: 'rahul.sharma@example.com',
    achievements: 'Full-stack development, AI/ML, Cloud certifications',
    avatar: null,
    connections: 42
  },
  { 
    id: 2,
    name: 'Anjali Mehta', 
    batch: '2019', 
    branch: 'ECE', 
    job: 'Systems Analyst', 
    company: 'Infosys',
    location: 'Delhi',
    email: 'anjali.mehta@example.com',
    achievements: 'IOT specialist, Project management',
    avatar: null,
    connections: 35
  },
  { 
    id: 3,
    name: 'Zoya Khan', 
    batch: '2020', 
    branch: 'IT', 
    job: 'Data Scientist', 
    company: 'TCS',
    location: 'Mumbai',
    email: 'zoya.khan@example.com',
    achievements: 'Machine Learning, Data Visualization',
    avatar: null,
    connections: 28
  },
  { 
    id: 4,
    name: 'Vikram Patel', 
    batch: '2018', 
    branch: 'ME', 
    job: 'Product Designer', 
    company: 'Mahindra',
    location: 'Pune',
    email: 'vikram.patel@example.com',
    achievements: 'CAD/CAM expert, 3D printing specialist',
    avatar: null,
    connections: 31
  },
  { 
    id: 5,
    name: 'Priya Gupta', 
    batch: '2021', 
    branch: 'CSE', 
    job: 'Frontend Developer', 
    company: 'Wipro',
    location: 'Bangalore',
    email: 'priya.gupta@example.com',
    achievements: 'UI/UX design, React & Angular development',
    avatar: null,
    connections: 19
  },
  { 
    id: 6,
    name: 'Arjun Singh', 
    batch: '2019', 
    branch: 'ECE', 
    job: 'Network Engineer', 
    company: 'Cisco',
    location: 'Hyderabad',
    email: 'arjun.singh@example.com',
    achievements: 'CCNA, CCNP, Network Security',
    avatar: null,
    connections: 37
  }
];

// Enhanced Posts Data
const postsData = [
  {
    id: 1,
    user: 'Rahul Sharma',
    userAvatar: null,
    content: 'Excited to share that I\'ve just been promoted to Senior Software Engineer at Google! Looking forward to new challenges.',
    timestamp: 'April 18, 2025, 10:30 AM',
    likes: 24,
    comments: 8,
    image: null
  },
  {
    id: 2,
    user: 'Anjali Mehta',
    userAvatar: null,
    content: 'Our college reunion is happening next month! Who\'s planning to attend? Let\'s connect before the event.',
    timestamp: 'April 15, 2025, 3:45 PM',
    likes: 37,
    comments: 15,
    image: null
  },
  {
    id: 3,
    user: 'Zoya Khan',
    userAvatar: null,
    content: 'Just published my first research paper on Machine Learning applications in healthcare. Feel free to reach out if you\'re interested in collaborating on similar projects!',
    timestamp: 'April 10, 2025, 5:20 PM',
    likes: 42,
    comments: 11,
    image: null
  }
];

// Events Data
const eventsData = [
  {
    id: 1,
    title: 'Annual Alumni Meet',
    date: '2025-05-15',
    time: '10:00',
    location: 'College Campus',
    description: 'Join us for the annual alumni gathering with networking opportunities and guest speakers.'
  },
  {
    id: 2,
    title: 'Tech Talk: Future of AI',
    date: '2025-05-22',
    time: '18:30',
    location: 'Virtual (Zoom)',
    description: 'A discussion on the latest trends in Artificial Intelligence led by industry experts.'
  },
  {
    id: 3,
    title: 'Career Mentorship Session',
    date: '2025-05-30',
    time: '16:00',
    location: 'Conference Hall, Block A',
    description: 'Connect with alumni mentors for career guidance and professional development.'
  }
];

// Global variables
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
let currentPage = 1;
let itemsPerPage = 6;
let filteredAlumni = [...alumniData];
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

// Initialize the application
function init() {
  // Load data from localStorage or use default data
  const storedAlumni = JSON.parse(localStorage.getItem('alumniData'));
  const storedPosts = JSON.parse(localStorage.getItem('posts'));
  const storedEvents = JSON.parse(localStorage.getItem('events'));
  
  if (storedAlumni) filteredAlumni = storedAlumni;
  
  // Set up event listeners
  setupEventListeners();
  
  // Update UI based on login status
  updateUIBasedOnLogin();
  
  // Display initial data
  applyFiltersAndSearch();
  displayPosts(storedPosts || postsData);
  displayEvents(storedEvents || eventsData);
  renderCalendar();
  
  // Highlight current nav link based on hash
  highlightCurrentNavLink();
}

// Set up event listeners
function setupEventListeners() {
  // Search and filters
  searchInput?.addEventListener('input', applyFiltersAndSearch);
  batchFilter?.addEventListener('change', applyFiltersAndSearch);
  branchFilter?.addEventListener('change', applyFiltersAndSearch);
  locationFilter?.addEventListener('change', applyFiltersAndSearch);
  resetFiltersBtn?.addEventListener('click', resetFilters);
  
  // Pagination
  prevPageBtn?.addEventListener('click', goToPrevPage);
  nextPageBtn?.addEventListener('click', goToNextPage);
  
  // Post form
  postForm?.addEventListener('submit', handlePostSubmit);
  
  // Profile form
  profileForm?.addEventListener('submit', handleProfileSubmit);
  
  // Authentication
  loginLink?.addEventListener('click', openLoginModal);
  loginForm?.addEventListener('submit', handleLogin);
  signupForm?.addEventListener('submit', handleSignup);
  tabBtns.forEach(btn => btn.addEventListener('click', switchTab));
  closeBtns.forEach(btn => btn.addEventListener('click', closeModal));
  
  // Events
  addEventBtn?.addEventListener('click', openEventModal);
  eventForm?.addEventListener('submit', handleEventSubmit);
  
  // Get Started button
  getStartedBtn?.addEventListener('click', () => {
    if (currentUser) {
      document.querySelector('#directory').scrollIntoView({ behavior: 'smooth' });
    } else {
      openLoginModal();
    }
  });
  
  // Avatar upload
  avatarUpload?.addEventListener('change', handleAvatarUpload);
  
  // Navigation
  window.addEventListener('hashchange', highlightCurrentNavLink);
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      navLinks.forEach(l => l.classList.remove('active'));
      e.target.classList.add('active');
    });
  });
  
  // Window click to close modals
  window.addEventListener('click', (e) => {
    if (e.target === loginModal) closeModal();
    if (e.target === eventModal) closeModal();
  });
}

// Update UI based on login status
function updateUIBasedOnLogin() {
  if (currentUser) {
    loginLink.textContent = 'Logout';
    loginLink.removeEventListener('click', openLoginModal);
    loginLink.addEventListener('click', handleLogout);
    
    currentUserName.textContent = currentUser.name;
    displayUserAvatar(currentUserAvatar, currentUser);
    displayUserAvatar(profileAvatar, currentUser);
    
    // Populate profile form
    if (profileForm) {
      document.getElementById('name').value = currentUser.name || '';
      document.getElementById('batch').value = currentUser.batch || '';
      document.getElementById('branch').value = currentUser.branch || '';
      document.getElementById('job').value = currentUser.job || '';
      document.getElementById('company').value = currentUser.company || '';
      document.getElementById('location').value = currentUser.location || '';
      document.getElementById('email').value = currentUser.email || '';
      document.getElementById('achievements').value = currentUser.achievements || '';
      document.getElementById('linkedin').value = currentUser.linkedin || '';
    }
    
    // Display profile preview
    if (profilePreview) {
      showProfile(currentUser);
    }
    
    // Show connection count
    if (document.getElementById('connectionCount')) {
      document.getElementById('connectionCount').textContent = currentUser.connections || 0;
    }
  } else {
    loginLink.textContent = 'Login';
    loginLink.removeEventListener('click', handleLogout);
    loginLink.addEventListener('click', openLoginModal);
    
    currentUserName.textContent = 'Guest';
    currentUserAvatar.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>';
  }
}

// Display user avatar
function displayUserAvatar(element, user) {
  if (!element) return;
  
  if (user && user.avatar) {
    element.innerHTML = `<img src="${user.avatar}" alt="${user.name}" />`;
  } else if (user && user.name) {
    const initials = user.name.split(' ').map(n => n[0]).join('').toUpperCase();
    element.textContent = initials;
  } else {
    element.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>';
  }
}

// Apply filters and search
function applyFiltersAndSearch() {
  // Get filter values
  const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
  const batchValue = batchFilter ? batchFilter.value.toLowerCase() : '';
  const branchValue = branchFilter ? branchFilter.value.toLowerCase() : '';
  const locationValue = locationFilter ? locationFilter.value.toLowerCase() : '';
  
  // Filter data
  filteredAlumni = alumniData.filter(alumni => {
    const matchesSearch = 
      alumni.name.toLowerCase().includes(searchTerm) ||
      alumni.batch.toLowerCase().includes(searchTerm) ||
      alumni.branch.toLowerCase().includes(searchTerm) ||
      alumni.location.toLowerCase().includes(searchTerm) ||
      alumni.job.toLowerCase().includes(searchTerm) ||
      (alumni.company && alumni.company.toLowerCase().includes(searchTerm));
    
    const matchesBatch = batchValue ? alumni.batch.toLowerCase() === batchValue : true;
    const matchesBranch = branchValue ? alumni.branch.toLowerCase() === branchValue : true;
    const matchesLocation = locationValue ? alumni.location.toLowerCase() === locationValue : true;
    
    return matchesSearch && matchesBatch && matchesBranch && matchesLocation;
  });
  
  // Reset to first page when filters change
  currentPage = 1;
  
  // Display results
  displayAlumni();
}

// Reset filters
function resetFilters() {
  if (searchInput) searchInput.value = '';
  if (batchFilter) batchFilter.value = '';
  if (branchFilter) branchFilter.value = '';
  if (locationFilter) locationFilter.value = '';
  
  filteredAlumni = [...alumniData];
  currentPage = 1;
  
  displayAlumni();
}

// Display alumni with pagination
function displayAlumni() {
  if (!alumniList) return;
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredAlumni.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredAlumni.length);
  const alumniToShow = filteredAlumni.slice(startIndex, endIndex);
  
  // Update pagination UI
  if (pageInfo) pageInfo.textContent = `Page ${currentPage} of ${totalPages || 1}`;
  if (prevPageBtn) prevPageBtn.disabled = currentPage === 1;
  if (nextPageBtn) nextPageBtn.disabled = currentPage === totalPages || totalPages === 0;
  
  // Clear list
  alumniList.innerHTML = '';
  
  // Display message if no results
  if (alumniToShow.length === 0) {
    alumniList.innerHTML = '<div class="no-results">No alumni found matching your criteria</div>';
    return;
  }
  
  // Display alumni cards
  alumniToShow.forEach(alumni => {
    const card = document.createElement('div');
    card.classList.add('alumni-card');
    card.dataset.id = alumni.id;
    
    const isConnected = currentUser && currentUser.connections && currentUser.connections.includes(alumni.id);
    
    card.innerHTML = `
      <div class="card-header"></div>
      <div class="avatar" id="avatar-${alumni.id}"></div>
      <div class="card-body">
        <h3>${alumni.name}</h3>
        <p>${alumni.batch} | ${alumni.branch}</p>
        <p>${alumni.job}${alumni.company ? ` at ${alumni.company}` : ''}</p>
        <p><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg> ${alumni.location}</p>
      </div>
      <div class="card-footer">
        <button class="connect-btn" data-id="${alumni.id}">${isConnected ? 'Connected' : 'Connect'}</button>
        <button class="message-btn" data-id="${alumni.id}">Message</button>
      </div>
    `;
    
    alumniList.appendChild(card);
    
    // Display avatar
    const avatarElement = document.getElementById(`avatar-${alumni.id}`);
    displayUserAvatar(avatarElement, alumni);
    
    // Add connect button functionality
    const connectBtn = card.querySelector('.connect-btn');
    connectBtn.addEventListener('click', () => handleConnect(alumni.id));
    
    // Add message button functionality
    const messageBtn = card.querySelector('.message-btn');
    messageBtn.addEventListener('click', () => handleMessage(alumni.id));
  });
}

// Pagination functions
function goToPrevPage() {
  if (currentPage > 1) {
    currentPage--;
    displayAlumni();
    window.scrollTo({ top: document.getElementById('directory').offsetTop, behavior: 'smooth' });
  }
}

function goToNextPage() {
  const totalPages = Math.ceil(filteredAlumni.length / itemsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    displayAlumni();
    window.scrollTo({ top: document.getElementById('directory').offsetTop, behavior: 'smooth' });
  }
}

// Handle connect button click
function handleConnect(alumniId) {
  if (!currentUser) {
    showNotification('Please login to connect with alumni', 'error');
    openLoginModal();
    return;
  }
  
  // Initialize connections array if it doesn't exist
  if (!currentUser.connections) {
    currentUser.connections = [];
  }
  
  // Toggle connection status
  const isConnected = currentUser.connections.includes(alumniId);
  
  if (isConnected) {
    // Remove connection
    currentUser.connections = currentUser.connections.filter(id => id !== alumniId);
    showNotification('Connection removed', 'success');
  } else {
    // Add connection
    currentUser.connections.push(alumniId);
    showNotification('Connection added', 'success');
  }
  
  // Update local storage
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
  
  // Update connection count
  if (document.getElementById('connectionCount')) {
    document.getElementById('connectionCount').textContent = currentUser.connections.length;
  }
  
  // Update UI
  updateUIBasedOnLogin();
  applyFiltersAndSearch();
}

// Handle message button click
function handleMessage(alumniId) {
  if (!currentUser) {
    showNotification('Please login to message alumni', 'error');
    openLoginModal();
    return;
  }
  
  const alumni = alumniData.find(a => a.id === alumniId);
  
  if (alumni) {
    showNotification(`Message feature for ${alumni.name} coming soon!`, 'success');
  }
}

// Display posts
function displayPosts(posts) {
  if (!postsContainer) return;
  
  postsContainer.innerHTML = '';
  
  if (posts.length === 0) {
    postsContainer.innerHTML = '<div class="no-posts">No posts yet. Be the first to share!</div>';
    return;
  }
  
  posts.forEach(post => {
    const div = document.createElement('div');
    div.classList.add('post');
    
    div.innerHTML = `
      <div class="post-header">
        <div class="post-user">
          <div class="user-avatar" id="post-avatar-${post.id}"></div>
          <div>
            <strong>${post.user}</strong>
            <div class="post-time">${post.timestamp}</div>
          </div>
        </div>
      </div>
      <div class="post-content">${post.content}</div>
      ${post.image ? `<img src="${post.image}" alt="Post image" class="post-image">` : ''}
      <div class="post-actions">
        <div class="post-action" data-action="like" data-id="${post.id}">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
          <span>${post.likes || 0}</span>
        </div>
        <div class="post-action" data-action="comment" data-id="${post.id}">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0
          // (Continuing the code that was cut off)
<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
          <span>${post.comments || 0}</span>
        </div>
        <div class="post-action" data-action="share" data-id="${post.id}">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
          <span>Share</span>
        </div>
      </div>
    `;
    
    postsContainer.appendChild(div);
    
    // Display post avatar
    const postAvatar = document.getElementById(`post-avatar-${post.id}`);
    const user = alumniData.find(a => a.name === post.user) || { name: post.user };
    displayUserAvatar(postAvatar, user);
    
    // Add event listeners for post actions
    const likeBtn = div.querySelector('[data-action="like"]');
    const commentBtn = div.querySelector('[data-action="comment"]');
    const shareBtn = div.querySelector('[data-action="share"]');
    
    likeBtn.addEventListener('click', () => handleLike(post.id));
    commentBtn.addEventListener('click', () => handleComment(post.id));
    shareBtn.addEventListener('click', () => handleShare(post.id));
  });
}

// Handle post submit
function handlePostSubmit(e) {
  e.preventDefault();
  
  if (!currentUser) {
    showNotification('Please login to post', 'error');
    openLoginModal();
    return;
  }
  
  const contentInput = document.getElementById('postContent');
  const imageInput = document.getElementById('postImage');
  
  if (!contentInput.value.trim()) {
    showNotification('Post cannot be empty', 'error');
    return;
  }
  
  // Get stored posts or use default
  const posts = JSON.parse(localStorage.getItem('posts')) || postsData;
  
  // Create new post
  const newPost = {
    id: Date.now(),
    user: currentUser.name,
    userAvatar: currentUser.avatar,
    content: contentInput.value.trim(),
    timestamp: new Date().toLocaleString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: 'numeric', 
      minute: 'numeric', 
      hour12: true 
    }),
    likes: 0,
    comments: 0,
    image: null
  };
  
  // Handle image upload
  if (imageInput.files && imageInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
      newPost.image = e.target.result;
      
      // Add post to beginning of array
      posts.unshift(newPost);
      
      // Save to localStorage
      localStorage.setItem('posts', JSON.stringify(posts));
      
      // Display posts
      displayPosts(posts);
      
      // Reset form
      postForm.reset();
      
      showNotification('Post added successfully', 'success');
    };
    reader.readAsDataURL(imageInput.files[0]);
  } else {
    // Add post to beginning of array
    posts.unshift(newPost);
    
    // Save to localStorage
    localStorage.setItem('posts', JSON.stringify(posts));
    
    // Display posts
    displayPosts(posts);
    
    // Reset form
    postForm.reset();
    
    showNotification('Post added successfully', 'success');
  }
}

// Handle post interactions
function handleLike(postId) {
  if (!currentUser) {
    showNotification('Please login to like posts', 'error');
    openLoginModal();
    return;
  }
  
  const posts = JSON.parse(localStorage.getItem('posts')) || postsData;
  const postIndex = posts.findIndex(p => p.id === postId);
  
  if (postIndex !== -1) {
    // Increment likes
    posts[postIndex].likes = (posts[postIndex].likes || 0) + 1;
    
    // Save to localStorage
    localStorage.setItem('posts', JSON.stringify(posts));
    
    // Update UI
    displayPosts(posts);
    showNotification('Post liked', 'success');
  }
}

function handleComment(postId) {
  if (!currentUser) {
    showNotification('Please login to comment', 'error');
    openLoginModal();
    return;
  }
  
  const comment = prompt('Add your comment:');
  
  if (comment && comment.trim()) {
    const posts = JSON.parse(localStorage.getItem('posts')) || postsData;
    const postIndex = posts.findIndex(p => p.id === postId);
    
    if (postIndex !== -1) {
      // Increment comments count
      posts[postIndex].comments = (posts[postIndex].comments || 0) + 1;
      
      // Initialize comments array if it doesn't exist
      if (!posts[postIndex].commentsList) {
        posts[postIndex].commentsList = [];
      }
      
      // Add comment
      posts[postIndex].commentsList.push({
        user: currentUser.name,
        content: comment.trim(),
        timestamp: new Date().toLocaleString()
      });
      
      // Save to localStorage
      localStorage.setItem('posts', JSON.stringify(posts));
      
      // Update UI
      displayPosts(posts);
      showNotification('Comment added', 'success');
    }
  }
}

function handleShare(postId) {
  if (!currentUser) {
    showNotification('Please login to share posts', 'error');
    openLoginModal();
    return;
  }
  
  showNotification('Share feature coming soon!', 'success');
}

// Handle profile submit
function handleProfileSubmit(e) {
  e.preventDefault();
  
  if (!currentUser) {
    showNotification('Please login to update profile', 'error');
    openLoginModal();
    return;
  }
  
  // Get form values
  const name = document.getElementById('name').value.trim();
  const batch = document.getElementById('batch').value.trim();
  const branch = document.getElementById('branch').value.trim();
  const job = document.getElementById('job').value.trim();
  const company = document.getElementById('company').value.trim();
  const location = document.getElementById('location').value.trim();
  const email = document.getElementById('email').value.trim();
  const achievements = document.getElementById('achievements').value.trim();
  const linkedin = document.getElementById('linkedin').value.trim();
  
  // Validate required fields
  if (!name || !batch || !branch || !email) {
    showNotification('Please fill all required fields', 'error');
    return;
  }
  
  // Update user data
  currentUser.name = name;
  currentUser.batch = batch;
  currentUser.branch = branch;
  currentUser.job = job;
  currentUser.company = company;
  currentUser.location = location;
  currentUser.email = email;
  currentUser.achievements = achievements;
  currentUser.linkedin = linkedin;
  
  // If this is a new user, add to alumni data
  let existingAlumni = alumniData.find(a => a.id === currentUser.id);
  
  if (!existingAlumni) {
    currentUser.id = alumniData.length > 0 ? Math.max(...alumniData.map(a => a.id)) + 1 : 1;
    currentUser.connections = currentUser.connections || [];
    
    alumniData.push(currentUser);
    localStorage.setItem('alumniData', JSON.stringify(alumniData));
  } else {
    // Update existing alumni
    const index = alumniData.findIndex(a => a.id === currentUser.id);
    if (index !== -1) {
      alumniData[index] = { ...alumniData[index], ...currentUser };
      localStorage.setItem('alumniData', JSON.stringify(alumniData));
    }
  }
  
  // Save to localStorage
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
  
  // Update UI
  updateUIBasedOnLogin();
  applyFiltersAndSearch();
  showProfile(currentUser);
  
  showNotification('Profile updated successfully', 'success');
}

// Handle avatar upload
function handleAvatarUpload(e) {
  if (!currentUser) {
    showNotification('Please login to upload avatar', 'error');
    openLoginModal();
    return;
  }
  
  const file = e.target.files[0];
  
  if (file) {
    const reader = new FileReader();
    reader.onload = function(event) {
      // Set avatar in current user
      currentUser.avatar = event.target.result;
      
      // Save to localStorage
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      
      // Update UI
      updateUIBasedOnLogin();
      
      // Update in alumni data if exists
      const index = alumniData.findIndex(a => a.id === currentUser.id);
      if (index !== -1) {
        alumniData[index].avatar = event.target.result;
        localStorage.setItem('alumniData', JSON.stringify(alumniData));
      }
      
      showNotification('Avatar updated successfully', 'success');
    };
    reader.readAsDataURL(file);
  }
}

// Show profile
function showProfile(user) {
  if (!profilePreview) return;
  
  profilePreview.innerHTML = `
    <div class="profile-header">
      <div class="profile-avatar" id="preview-avatar"></div>
      <h2>${user.name}</h2>
      <p>${user.batch} | ${user.branch}</p>
    </div>
    <div class="profile-details">
      ${user.job ? `<p><strong>Job:</strong> ${user.job}${user.company ? ` at ${user.company}` : ''}</p>` : ''}
      ${user.location ? `<p><strong>Location:</strong> ${user.location}</p>` : ''}
      ${user.email ? `<p><strong>Email:</strong> ${user.email}</p>` : ''}
      ${user.achievements ? `<p><strong>Achievements:</strong> ${user.achievements}</p>` : ''}
      ${user.linkedin ? `<p><strong>LinkedIn:</strong> <a href="${user.linkedin}" target="_blank">${user.linkedin}</a></p>` : ''}
    </div>
    <div class="profile-stats">
      <div class="stat">
        <strong>${user.connections ? user.connections.length : 0}</strong>
        <span>Connections</span>
      </div>
      <div class="stat">
        <strong>${postsData.filter(p => p.user === user.name).length}</strong>
        <span>Posts</span>
      </div>
    </div>
  `;
  
  // Display avatar
  const previewAvatar = document.getElementById('preview-avatar');
  displayUserAvatar(previewAvatar, user);
}

// Authentication functions
function openLoginModal() {
  loginModal.style.display = 'flex';
  document.querySelector('.tab-btn[data-tab="login"]').click();
}

function closeModal() {
  loginModal.style.display = 'none';
  eventModal.style.display = 'none';
}

function switchTab(e) {
  const tabName = e.target.dataset.tab;
  
  // Update active state of tab buttons
  tabBtns.forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.tab === tabName) {
      btn.classList.add('active');
    }
  });
  
  // Show/hide forms
  if (tabName === 'login') {
    loginForm.style.display = 'block';
    signupForm.style.display = 'none';
  } else {
    loginForm.style.display = 'none';
    signupForm.style.display = 'block';
  }
}

function handleLogin(e) {
  e.preventDefault();
  
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;
  
  if (!email || !password) {
    showNotification('Please enter email and password', 'error');
    return;
  }
  
  // Check if user exists
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    // Set current user
    currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    // Close modal
    closeModal();
    
    // Update UI
    updateUIBasedOnLogin();
    
    showNotification('Login successful', 'success');
  } else {
    showNotification('Invalid email or password', 'error');
  }
}

function handleSignup(e) {
  e.preventDefault();
  
  const name = document.getElementById('signupName').value.trim();
  const email = document.getElementById('signupEmail').value.trim();
  const password = document.getElementById('signupPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  
  if (!name || !email || !password || !confirmPassword) {
    showNotification('Please fill all fields', 'error');
    return;
  }
  
  if (password !== confirmPassword) {
    showNotification('Passwords do not match', 'error');
    return;
  }
  
  // Get existing users or initialize empty array
  const users = JSON.parse(localStorage.getItem('users')) || [];
  
  // Check if email already exists
  if (users.some(u => u.email === email)) {
    showNotification('Email already exists', 'error');
    return;
  }
  
  // Create new user
  const newUser = {
    id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
    name,
    email,
    password,
    connections: [],
    registeredDate: new Date().toISOString()
  };
  
  // Add to users array
  users.push(newUser);
  
  // Save to localStorage
  localStorage.setItem('users', JSON.stringify(users));
  
  // Set as current user
  currentUser = newUser;
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
  
  // Close modal
  closeModal();
  
  // Update UI
  updateUIBasedOnLogin();
  
  showNotification('Registration successful', 'success');
  
  // Direct to profile page
  window.location.href = 'profile.html';
}

function handleLogout() {
  // Clear current user
  currentUser = null;
  localStorage.removeItem('currentUser');
  
  // Update UI
  updateUIBasedOnLogin();
  
  showNotification('Logged out successfully', 'success');
  
  // Redirect to home page if on profile page
  if (window.location.pathname.includes('profile.html')) {
    window.location.href = 'index.html';
  }
}

// Events Calendar functions
function openEventModal() {
  if (!currentUser) {
    showNotification('Please login to add events', 'error');
    openLoginModal();
    return;
  }
  
  eventModal.style.display = 'flex';
}

function handleEventSubmit(e) {
  e.preventDefault();
  
  const title = document.getElementById('eventTitle').value.trim();
  const date = document.getElementById('eventDate').value;
  const time = document.getElementById('eventTime').value;
  const location = document.getElementById('eventLocation').value.trim();
  const description = document.getElementById('eventDescription').value.trim();
  
  if (!title || !date || !time || !location) {
    showNotification('Please fill all required fields', 'error');
    return;
  }
  
  // Get existing events or use default
  const events = JSON.parse(localStorage.getItem('events')) || eventsData;
  
  // Create new event
  const newEvent = {
    id: Date.now(),
    title,
    date,
    time,
    location,
    description,
    createdBy: currentUser.id
  };
  
  // Add to events array
  events.push(newEvent);
  
  // Save to localStorage
  localStorage.setItem('events', JSON.stringify(events));
  
  // Close modal
  closeModal();
  
  // Update UI
  displayEvents(events);
  renderCalendar();
  
  showNotification('Event added successfully', 'success');
}

function displayEvents(events) {
  if (!eventsList) return;
  
  eventsList.innerHTML = '';
  
  if (events.length === 0) {
    eventsList.innerHTML = '<div class="no-events">No events scheduled</div>';
    return;
  }
  
  // Sort events by date
  const sortedEvents = [...events].sort((a, b) => new Date(a.date) - new Date(b.date));
  
  // Display only upcoming events
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const upcomingEvents = sortedEvents.filter(event => new Date(event.date) >= today);
  
  if (upcomingEvents.length === 0) {
    eventsList.innerHTML = '<div class="no-events">No upcoming events</div>';
    return;
  }
  
  upcomingEvents.forEach(event => {
    const div = document.createElement('div');
    div.classList.add('event-item');
    
    const eventDate = new Date(event.date);
    const formattedDate = eventDate.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
    
    div.innerHTML = `
      <div class="event-date">
        <div class="event-day">${eventDate.getDate()}</div>
        <div class="event-month">${new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}</div>
      </div>
      <div class="event-details">
        <h3>${event.title}</h3>
        <p><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg> ${formattedDate}, ${event.time}</p>
        <p><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg> ${event.location}</p>
        ${event.description ? `<p class="event-description">${event.description}</p>` : ''}
      </div>
      <div class="event-actions">
        <button class="attend-btn" data-id="${event.id}">Attend</button>
      </div>
    `;
    
    eventsList.appendChild(div);
    
    // Add attend button functionality
    const attendBtn = div.querySelector('.attend-btn');
    attendBtn.addEventListener('click', () => handleAttendEvent(event.id));
  });
}

function handleAttendEvent(eventId) {
  if (!currentUser) {
    showNotification('Please login to attend events', 'error');
    openLoginModal();
    return;
  }
  
  showNotification('You are now registered for this event!', 'success');
}

function renderCalendar() {
  if (!calendar) return;
  
  // Get current month events
  const events = JSON.parse(localStorage.getItem('events')) || eventsData;
  
  // Get month data
  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startDayOfWeek = firstDay.getDay(); // 0 = Sunday, 6 = Saturday
  
  // Month names
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
  // Update month and year display
  const calendarHeader = calendar.querySelector('.calendar-header') || document.createElement('div');
  calendarHeader.classList.add('calendar-header');
  calendarHeader.innerHTML = `
    <button id="prevMonth"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg></button>
    <h3>${monthNames[currentMonth]} ${currentYear}</h3>
    <button id="nextMonth"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></button>
  `;
  
  if (!calendar.contains(calendarHeader)) {
    calendar.appendChild(calendarHeader);
  }
  
  // Add event listeners for month navigation
  const prevMonthBtn = document.getElementById('prevMonth');
  const nextMonthBtn = document.getElementById('nextMonth');
  
  prevMonthBtn.addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    renderCalendar();
  });
  
  nextMonthBtn.addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    renderCalendar();
  });
  
  // Create calendar days
  const calendarDays = calendar.querySelector('.calendar-days') || document.createElement('div');
  calendarDays.classList.add('calendar-days');
  calendarDays.innerHTML = '';
  
  // Add day names
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  dayNames.forEach(day => {
    const dayNameDiv = document.createElement('div');
    dayNameDiv.classList.add('day-name');
    dayNameDiv.textContent = day;
    calendarDays.appendChild(dayNameDiv);
  });
  
  // Add blank spaces for days before start of month
  for (let i = 0; i < startDayOfWeek; i++) {
    const blankDay = document.createElement('div');
    blankDay.classList.add('calendar-day', 'blank');
    calendarDays.appendChild(blankDay);
  }
  
  // Add days of the month
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentYear, currentMonth, day);
    const dayDiv = document.createElement('div');
    dayDiv.classList.add('calendar-day');
    dayDiv.textContent = day;
    
    // Highlight today
    if (date.getTime() === today.getTime()) {
      dayDiv.classList.add('today');
    }
    
    // Check for events on this day
    const dayEvents = events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getDate() === day && 
             eventDate.getMonth() === currentMonth && 
             eventDate.getFullYear() === currentYear;
    });
    
    if (dayEvents.length > 0) {
      dayDiv.classList.add('has-events');
      
      // Add event indicator
      const eventIndicator = document.createElement('div');
      eventIndicator.classList.add('event-indicator');
      eventIndicator.textContent = dayEvents.length;
      dayDiv.appendChild(eventIndicator);
      
      // Add tooltip with event names
      const tooltip = document.createElement('div');
      tooltip.classList.add('tooltip');
      dayEvents.forEach(event => {
        const eventItem = document.createElement('div');
        eventItem.classList.add('tooltip-event');
        eventItem.textContent = event.title;
        tooltip.appendChild(eventItem);
      });
      dayDiv.appendChild(tooltip);
      
      // Show events for this day when clicked
      dayDiv.addEventListener('click', () => {
        showDayEvents(dayEvents, day, monthNames[currentMonth], currentYear);
      });
    }
    
    calendarDays.appendChild(dayDiv);
  }
  
  if (!calendar.contains(calendarDays)) {
    calendar.appendChild(calendarDays);
  }
}

function showDayEvents(events, day, month, year) {
  const dayEventsModal = document.getElementById('dayEventsModal') || document.createElement('div');
  dayEventsModal.id = 'dayEventsModal';
  dayEventsModal.classList.add('modal');
  
  dayEventsModal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h2>Events on ${month} ${day}, ${year}</h2>
        <span class="close">&times;</span>
      </div>
      <div class="modal-body">
        <div class="day-events-list">
          ${events.map(event => `
            <div class="day-event-item">
              <div class="event-time">${event.time}</div>
              <div class="event-info">
                <h3>${event.title}</h3>
                <p>${event.location}</p>
                ${event.description ? `<p class="event-description">${event.description}</p>` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
  
  document.body.appendChild(dayEventsModal);
  dayEventsModal.style.display = 'flex';
  
  // Close modal
  const closeBtn = dayEventsModal.querySelector('.close');
  closeBtn.addEventListener('click', () => {
    dayEventsModal.style.display = 'none';
  });
  
  // Close when clicking outside
  window.addEventListener('click', (e) => {
    if (e.target === dayEventsModal) {
      dayEventsModal.style.display = 'none';
    }
  });
}

// Helper functions
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.classList.add('notification', type);
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  // Show notification
  setTimeout(() => {
    notification.classList.add('show');
  }, 10);
  
  // Hide and remove after 3 seconds
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Highlight current nav link based on hash
function highlightCurrentNavLink() {
  const hash = window.location.hash || '#home';
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === hash) {
      link.classList.add('active');
    }
  });
  
  // Show correct section
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    section.style.display = 'none';
    if (section.id === hash.substring(1)) {
      section.style.display = 'block';
    }
  });
}

// Initialize application
document.addEventListener('DOMContentLoaded', init);