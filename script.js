// Restaurant data
        const restaurants = [
            {
                id: 1,
                name: "Burger Lab",
                cuisine: "Burgers • American",
                rating: 4.5,
                deliveryTime: "30-40 min",
                deliveryFee: "Rs 99 delivery fee",
                promo: "30% OFF",
                icon: "🍔",
                color: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                pandaPick: true
            },
            {
                id: 2,
                name: "Pizza Hut",
                cuisine: "Pizza • Italian",
                rating: 4.2,
                deliveryTime: "35-45 min",
                deliveryFee: "Rs 150 delivery fee",
                promo: "25% OFF",
                icon: "🍕",
                color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                pandaPick: false
            },
            {
                id: 3,
                name: "Butt Karahi",
                cuisine: "Pakistani • BBQ",
                rating: 4.4,
                deliveryTime: "25-35 min",
                deliveryFee: "Free delivery",
                promo: "FREE DELIVERY",
                icon: "🍛",
                color: "linear-gradient(135deg, #fad961 0%, #f76b1c 100%)",
                pandaPick: true
            },
            {
                id: 4,
                name: "Cheezious",
                cuisine: "Pizza • Fast Food",
                rating: 4.3,
                deliveryTime: "40-50 min",
                deliveryFee: "Rs 120 delivery fee",
                promo: "20% OFF",
                icon: "🧀",
                color: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
                pandaPick: false
            },
            {
                id: 5,
                name: "KFC",
                cuisine: "Fast Food • Chicken",
                rating: 4.1,
                deliveryTime: "30-40 min",
                deliveryFee: "Rs 99 delivery fee",
                promo: "BUY 1 GET 1",
                icon: "🍗",
                color: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)",
                pandaPick: true
            },
            {
                id: 6,
                name: "Gloria Jean's",
                cuisine: "Coffee • Desserts",
                rating: 4.6,
                deliveryTime: "20-30 min",
                deliveryFee: "Free delivery",
                promo: "FREE DELIVERY",
                icon: "☕",
                color: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
                pandaPick: false
            },
            {
                id: 7,
                name: "Subway",
                cuisine: "Sandwiches • Healthy",
                rating: 4.0,
                deliveryTime: "25-35 min",
                deliveryFee: "Rs 80 delivery fee",
                promo: "15% OFF",
                icon: "🥪",
                color: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                pandaPick: true
            },
            {
                id: 8,
                name: "Dunkin'",
                cuisine: "Coffee • Donuts",
                rating: 4.3,
                deliveryTime: "30-40 min",
                deliveryFee: "Rs 100 delivery fee",
                promo: "BUY 2 GET 1",
                icon: "🍩",
                color: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
                pandaPick: false
            }
        ];
        
        // Categories data
        const categories = [
            { id: 1, name: "Pakistani", icon: "🍛", color: "#FFE8E8" },
            { id: 2, name: "Pizza", icon: "🍕", color: "#FFF3E0" },
            { id: 3, name: "Burgers", icon: "🍔", color: "#FFF9C4" },
            { id: 4, name: "Chinese", icon: "🥡", color: "#E8F5E9" },
            { id: 5, name: "Desserts", icon: "🍰", color: "#FCE4EC" },
            { id: 6, name: "BBQ", icon: "🍖", color: "#FFF3E0" },
            { id: 7, name: "Fast Food", icon: "🍟", color: "#FFEBEE" },
            { id: 8, name: "Healthy", icon: "🥗", color: "#E8F5E9" }
        ];
        
        // DOM Elements
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileSidebar = document.getElementById('mobileSidebar');
        const mobileSidebarClose = document.getElementById('mobileSidebarClose');
        const mobileOverlay = document.getElementById('mobileOverlay');
        const searchBox = document.getElementById('searchBox');
        const cartBtn = document.getElementById('cartBtn');
        const cartCount = cartBtn.querySelector('.cart-count');
        const locationBtn = document.getElementById('locationBtn');
        const loginBtn = document.getElementById('loginBtn');
        const signupBtn = document.getElementById('signupBtn');
        const findRestaurantsBtn = document.getElementById('findRestaurantsBtn');
        const restaurantsGrid = document.getElementById('restaurantsGrid');
        const categoriesGrid = document.getElementById('categoriesGrid');
        const pandaPopupAd = document.getElementById('pandaPopupAd');
        const pandaPopupClose = document.getElementById('pandaPopupClose');
        const pandaPickBtn = document.getElementById('pandaPick');
        const superRestaurantBtn = document.getElementById('superRestaurant');
        const filterCheckboxes = document.querySelectorAll('.filter-option input[type="checkbox"]');
        const priceTags = document.querySelectorAll('.price-tag');
        const navItems = document.querySelectorAll('.nav-item');
        const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
        
        // Global variables
        let cartItems = 2;
        let currentRestaurants = [...restaurants];
        let searchTimeout;
        
        // Initialize function
        function init() {
            renderCategories();
            renderRestaurants();
            setupEventListeners();
            showPandaPopupAfterDelay();
            setupScrollEffects();
            checkScreenSize();
        }
        
        // Render categories
        function renderCategories() {
            categoriesGrid.innerHTML = '';
            
            categories.forEach(category => {
                const categoryCard = document.createElement('div');
                categoryCard.className = 'category-card';
                categoryCard.dataset.category = category.name.toLowerCase();
                categoryCard.style.backgroundColor = category.color;
                
                categoryCard.innerHTML = `
                    <div class="category-icon">${category.icon}</div>
                    <div class="category-name">${category.name}</div>
                `;
                
                categoryCard.addEventListener('click', () => {
                    filterByCategory(category.name);
                    highlightCategoryCard(categoryCard);
                });
                
                categoriesGrid.appendChild(categoryCard);
            });
        }
        
        // Render restaurants
        function renderRestaurants(restaurantsToRender = currentRestaurants) {
            restaurantsGrid.innerHTML = '';
            
            if (restaurantsToRender.length === 0) {
                restaurantsGrid.innerHTML = `
                    <div class="no-results" style="grid-column: 1 / -1; text-align: center; padding: 40px;">
                        <div style="font-size: 60px; margin-bottom: 20px;">🐼</div>
                        <h3 style="margin-bottom: 10px; color: #666;">No restaurants found</h3>
                        <p style="color: #999;">Try adjusting your filters or search term</p>
                    </div>
                `;
                return;
            }
            
            restaurantsToRender.forEach(restaurant => {
                const restaurantCard = document.createElement('div');
                restaurantCard.className = 'restaurant-card';
                restaurantCard.dataset.id = restaurant.id;
                
                const pandaBadge = restaurant.pandaPick ? '<div class="promo-badge" style="background: #FF9800;">🐼 Pick</div>' : '';
                
                restaurantCard.innerHTML = `
                    <div class="restaurant-image" style="background: ${restaurant.color};">
                        ${restaurant.icon}
                        <div class="promo-badge">${restaurant.promo}</div>
                        ${pandaBadge}
                    </div>
                    <div class="restaurant-info">
                        <h3 class="restaurant-name">${restaurant.name}</h3>
                        <div class="restaurant-meta">
                            <span class="rating">
                                <i class="fas fa-star"></i> ${restaurant.rating}
                            </span>
                            <span>•</span>
                            <span>${restaurant.cuisine}</span>
                        </div>
                        <div class="delivery-info">${restaurant.deliveryTime} • ${restaurant.deliveryFee}</div>
                    </div>
                `;
                
                restaurantCard.addEventListener('click', () => {
                    openRestaurantDetail(restaurant);
                });
                
                restaurantCard.addEventListener('dblclick', (e) => {
                    e.stopPropagation();
                    addToFavorites(restaurant);
                });
                
                restaurantsGrid.appendChild(restaurantCard);
            });
        }
        
        // Setup event listeners
        function setupEventListeners() {
            // Mobile menu
            mobileMenuBtn.addEventListener('click', openMobileSidebar);
            mobileSidebarClose.addEventListener('click', closeMobileSidebar);
            mobileOverlay.addEventListener('click', closeMobileSidebar);
            
            // Navigation items
            navItems.forEach(item => {
                item.addEventListener('click', () => {
                    setActiveNavItem(item);
                    closeMobileSidebar();
                });
            });
            
            mobileNavItems.forEach(item => {
                item.addEventListener('click', () => {
                    setActiveNavItem(item, true);
                    closeMobileSidebar();
                });
            });
            
            // Search functionality
            searchBox.addEventListener('input', handleSearch);
            
            // Cart
            cartBtn.addEventListener('click', openCart);
            
            // Location selector
            locationBtn.addEventListener('click', changeLocation);
            
            // Login/Signup
            loginBtn.addEventListener('click', () => alert('Login functionality would open here'));
            signupBtn.addEventListener('click', () => alert('Signup functionality would open here'));
            
            // Find restaurants
            findRestaurantsBtn.addEventListener('click', () => {
                document.querySelector('.restaurants-section').scrollIntoView({ behavior: 'smooth' });
            });
            
            // Panda popup ad
            pandaPopupClose.addEventListener('click', () => {
                pandaPopupAd.classList.remove('active');
                localStorage.setItem('pandaPopupClosed', 'true');
            });
            
            // Panda's Pick button
            if (pandaPickBtn) {
                pandaPickBtn.addEventListener('click', showPandaPicks);
            }
            
            // Super Restaurant button
            if (superRestaurantBtn) {
                superRestaurantBtn.addEventListener('click', showSuperRestaurants);
            }
            
            // Filters
            filterCheckboxes.forEach(checkbox => {
                checkbox.addEventListener('change', applyFilters);
            });
            
            // Price tags
            priceTags.forEach(tag => {
                tag.addEventListener('click', () => {
                    setActivePriceTag(tag);
                    applyFilters();
                });
            });
            
            // Window resize
            window.addEventListener('resize', checkScreenSize);
            
            // Click outside to close popup ad
            document.addEventListener('click', (e) => {
                if (!pandaPopupAd.contains(e.target) && pandaPopupAd.classList.contains('active')) {
                    pandaPopupAd.classList.remove('active');
                }
            });
        }
        
        // Scroll effects
        function setupScrollEffects() {
            let lastScrollTop = 0;
            const header = document.querySelector('.main-header');
            
            window.addEventListener('scroll', () => {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                
                // Hide/show header
                if (scrollTop > lastScrollTop && scrollTop > 100) {
                    header.style.transform = 'translateY(-100%)';
                } else {
                    header.style.transform = 'translateY(0)';
                }
                
                lastScrollTop = scrollTop;
            });
        }
        
        // Check screen size
        function checkScreenSize() {
            const isMobile = window.innerWidth <= 768;
            
            // Adjust navigation display based on screen size
            const navContainer = document.getElementById('navContainer');
            if (isMobile) {
                navContainer.style.display = 'none';
            } else {
                navContainer.style.display = 'flex';
            }
            
            // Adjust panda popup ad position
            if (window.innerWidth <= 576) {
                pandaPopupAd.style.bottom = '80px';
            } else {
                pandaPopupAd.style.bottom = '20px';
            }
        }
        
        // Open mobile sidebar
        function openMobileSidebar() {
            mobileSidebar.classList.add('active');
            mobileOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
        
        // Close mobile sidebar
        function closeMobileSidebar() {
            mobileSidebar.classList.remove('active');
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
        
        // Set active navigation item
        function setActiveNavItem(item, isMobile = false) {
            const items = isMobile ? mobileNavItems : navItems;
            
            items.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            
            const tab = item.dataset.tab;
            showTabContent(tab);
        }
        
        // Show tab content
        function showTabContent(tab) {
            // In a real app, this would load different content
            console.log(`Switching to ${tab} tab`);
        }
        
        // Handle search
        function handleSearch() {
            clearTimeout(searchTimeout);
            
            searchTimeout = setTimeout(() => {
                const searchTerm = searchBox.value.toLowerCase().trim();
                
                if (searchTerm.length === 0) {
                    currentRestaurants = [...restaurants];
                } else {
                    currentRestaurants = restaurants.filter(restaurant => 
                        restaurant.name.toLowerCase().includes(searchTerm) ||
                        restaurant.cuisine.toLowerCase().includes(searchTerm)
                    );
                }
                
                applyFilters();
            }, 300);
        }
        
        // Apply filters
        function applyFilters() {
            let filtered = [...currentRestaurants];
            
            // Free delivery filter
            const freeDelivery = document.getElementById('freeDelivery').checked;
            if (freeDelivery) {
                filtered = filtered.filter(r => r.deliveryFee === 'Free delivery');
            }
            
            // Discounts filter
            const discounts = document.getElementById('discounts').checked;
            if (discounts) {
                filtered = filtered.filter(r => r.promo.includes('OFF') || r.promo.includes('FREE'));
            }
            
            // Cuisine filters
            const selectedCuisines = [];
            if (document.getElementById('pakistani').checked) selectedCuisines.push('Pakistani');
            if (document.getElementById('pizza').checked) selectedCuisines.push('Pizza');
            if (document.getElementById('bbq').checked) selectedCuisines.push('BBQ');
            if (document.getElementById('burgers').checked) selectedCuisines.push('Burgers');
            if (document.getElementById('chinese').checked) selectedCuisines.push('Chinese');
            if (document.getElementById('desserts').checked) selectedCuisines.push('Desserts');
            
            if (selectedCuisines.length > 0) {
                filtered = filtered.filter(r => 
                    selectedCuisines.some(cuisine => r.cuisine.includes(cuisine))
                );
            }
            
            renderRestaurants(filtered);
        }
        
        // Filter by category
        function filterByCategory(category) {
            const filtered = restaurants.filter(r => 
                r.cuisine.toLowerCase().includes(category.toLowerCase())
            );
            
            currentRestaurants = filtered;
            renderRestaurants(filtered);
            
            // Show category name
            const categoryTitle = document.querySelector('.restaurants-section .section-title');
            categoryTitle.textContent = `${category} Restaurants`;
        }
        
        // Highlight category card
        function highlightCategoryCard(card) {
            const allCards = document.querySelectorAll('.category-card');
            allCards.forEach(c => {
                c.style.borderColor = '#e8e8e8';
                c.style.boxShadow = 'none';
            });
            
            card.style.borderColor = '#d70f64';
            card.style.boxShadow = '0 4px 12px rgba(215, 15, 100, 0.2)';
        }
        
        // Show panda picks
        function showPandaPicks() {
            const filtered = restaurants.filter(r => r.pandaPick);
            currentRestaurants = filtered;
            renderRestaurants(filtered);
            
            // Update title
            const sectionTitle = document.querySelector('.restaurants-section .section-title');
            sectionTitle.textContent = "Panda's Picks";
            
            // Show notification
            showNotification("Showing Panda's favorite restaurants! 🐼");
        }
        
        // Show super restaurants
        function showSuperRestaurants() {
            const filtered = restaurants.filter(r => r.rating >= 4.3);
            currentRestaurants = filtered;
            renderRestaurants(filtered);
            
            // Update title
            const sectionTitle = document.querySelector('.restaurants-section .section-title');
            sectionTitle.textContent = "Super Restaurants (4.3+ rating)";
            
            // Show notification
            showNotification("Showing only super restaurants with high ratings! ⭐");
        }
        
        // Set active price tag
        function setActivePriceTag(tag) {
            priceTags.forEach(t => t.classList.remove('active'));
            tag.classList.add('active');
        }
        
        // Open cart
        function openCart() {
            if (cartItems > 0) {
                alert(`Your cart has ${cartItems} items. Total: Rs. ${cartItems * 500}`);
            } else {
                alert('Your cart is empty. Add some delicious food!');
            }
        }
        
        // Change location
        function changeLocation() {
            const newLocation = prompt('Enter your delivery address:', 'New address Service Road W Islamabad');
            
            if (newLocation && newLocation.trim()) {
                const locationText = locationBtn.querySelector('.location-text');
                const truncated = newLocation.length > 30 ? 
                    newLocation.substring(0, 30) + '...' : newLocation;
                
                locationText.textContent = truncated;
                locationText.title = newLocation;
                
                showNotification(`Location updated to: ${newLocation}`);
            }
        }
        
        // Open restaurant detail
        function openRestaurantDetail(restaurant) {
            // In a real app, this would navigate to restaurant detail page
            alert(`Opening ${restaurant.name} menu...\n\nCuisine: ${restaurant.cuisine}\nRating: ${restaurant.rating}\nDelivery: ${restaurant.deliveryTime}\nFee: ${restaurant.deliveryFee}\n\n${restaurant.pandaPick ? '🐼 Panda Approved!' : ''}`);
        }
        
        // Add to favorites
        function addToFavorites(restaurant) {
            // Create heart animation
            const heart = document.createElement('div');
            heart.innerHTML = '❤️';
            heart.style.position = 'fixed';
            heart.style.top = '50%';
            heart.style.left = '50%';
            heart.style.transform = 'translate(-50%, -50%)';
            heart.style.fontSize = '80px';
            heart.style.zIndex = '10000';
            heart.style.pointerEvents = 'none';
            heart.style.animation = 'heartPop 1s ease-out forwards';
            
            document.body.appendChild(heart);
            
            // Remove heart after animation
            setTimeout(() => {
                heart.remove();
            }, 1000);
            
            // Show notification
            showNotification(`Added ${restaurant.name} to favorites! ❤️`);
        }
        
        // Show panda popup ad
        function showPandaPopupAfterDelay() {
            // Check if already closed
            if (localStorage.getItem('pandaPopupClosed') === 'true') {
                return;
            }
            
            setTimeout(() => {
                pandaPopupAd.classList.add('active');
            }, 3000);
        }
        
        // Show notification
        function showNotification(message) {
            // Create notification element
            const notification = document.createElement('div');
            notification.className = 'notification';
            notification.textContent = message;
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--primary-color);
                color: white;
                padding: 15px 20px;
                border-radius: var(--radius);
                box-shadow: var(--shadow);
                z-index: 10000;
                transform: translateX(100%);
                transition: transform 0.3s ease;
                max-width: 300px;
                font-weight: 500;
            `;
            
            document.body.appendChild(notification);
            
            // Show notification
            setTimeout(() => {
                notification.style.transform = 'translateX(0)';
            }, 10);
            
            // Hide notification
            setTimeout(() => {
                notification.style.transform = 'translateX(100%)';
                
                // Remove notification
                setTimeout(() => {
                    notification.remove();
                }, 300);
            }, 3000);
        }
        
        // Add heart animation keyframes
        const style = document.createElement('style');
        style.textContent = `
            @keyframes heartPop {
                0% {
                    transform: translate(-50%, -50%) scale(0);
                    opacity: 0;
                }
                50% {
                    transform: translate(-50%, -50%) scale(1.2);
                    opacity: 1;
                }
                100% {
                    transform: translate(-50%, -50%) scale(0);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Deals area horizontal scroll
        const dealsScroll = document.querySelector('.deals-scroll');
        let isDown = false;
        let startX;
        let scrollLeft;
        
        dealsScroll.addEventListener('mousedown', (e) => {
            isDown = true;
            dealsScroll.style.cursor = 'grabbing';
            startX = e.pageX - dealsScroll.offsetLeft;
            scrollLeft = dealsScroll.scrollLeft;
        });
        
        dealsScroll.addEventListener('mouseleave', () => {
            isDown = false;
            dealsScroll.style.cursor = 'grab';
        });
        
        dealsScroll.addEventListener('mouseup', () => {
            isDown = false;
            dealsScroll.style.cursor = 'grab';
        });
        
        dealsScroll.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - dealsScroll.offsetLeft;
            const walk = (x - startX) * 2;
            dealsScroll.scrollLeft = scrollLeft - walk;
        });
        
        // Mobile touch support
        dealsScroll.addEventListener('touchstart', (e) => {
            isDown = true;
            startX = e.touches[0].pageX - dealsScroll.offsetLeft;
            scrollLeft = dealsScroll.scrollLeft;
        });
        
        dealsScroll.addEventListener('touchend', () => {
            isDown = false;
        });
        
        dealsScroll.addEventListener('touchmove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.touches[0].pageX - dealsScroll.offsetLeft;
            const walk = (x - startX) * 2;
            dealsScroll.scrollLeft = scrollLeft - walk;
        });
        
        // Initialize
        document.addEventListener('DOMContentLoaded', init);