-- 1. Create the Tags table
CREATE TABLE tags (
    id SERIAL PRIMARY KEY,
    tag_name VARCHAR(50) UNIQUE NOT NULL
);

-- 2. Create the Restaurants table
CREATE TABLE restaurants (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    logo_url TEXT,
    rating NUMERIC(2, 1) CHECK (rating >= 0 AND rating <= 5),
    delivery_time_min INT DEFAULT 30,
    is_open BOOLEAN DEFAULT true
);

-- 3. Create the Junction table (Many-to-Many)
CREATE TABLE restaurant_tags (
    restaurant_id INT REFERENCES restaurants(id) ON DELETE CASCADE,
    tag_id INT REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (restaurant_id, tag_id)
);


-- Insert queries

-- Insert Common Tags
INSERT INTO tags (tag_name) VALUES 
('Burger'), ('Pizza'), ('Sushi'), ('Healthy'), ('Mexican'), 
('Italian'), ('Indian'), ('Dessert'), ('Coffee'), ('Chicken');

-- Insert 50 Restaurants
INSERT INTO restaurants (name, logo_url, rating) VALUES
('The Burger Joint', 'https://picsum.photos/seed/1/200', 4.5),
('Pizza Palace', 'https://picsum.photos/seed/2/200', 4.2),
('Sushi Zen', 'https://picsum.photos/seed/3/200', 4.8),
('Green Garden Salads', 'https://picsum.photos/seed/4/200', 4.1),
('Taco Fiesta', 'https://picsum.photos/seed/5/200', 3.9),
('Mama Mia Pasta', 'https://picsum.photos/seed/6/200', 4.6),
('Spice Route Indian', 'https://picsum.photos/seed/7/200', 4.4),
('Sweet Dreams Bakery', 'https://picsum.photos/seed/8/200', 4.7),
('Morning Brew', 'https://picsum.photos/seed/9/200', 4.3),
('Crispy Fried Chicken', 'https://picsum.photos/seed/10/200', 4.0),
('Urban Wok', 'https://picsum.photos/seed/11/200', 4.2),
('The Healthy Bowl', 'https://picsum.photos/seed/12/200', 4.5),
('Noodle Ninja', 'https://picsum.photos/seed/13/200', 4.4),
('Steakhouse Grill', 'https://picsum.photos/seed/14/200', 4.6),
('Vegan Vibes', 'https://picsum.photos/seed/15/200', 4.3),
('Donut District', 'https://picsum.photos/seed/16/200', 4.8),
('Wings & Rings', 'https://picsum.photos/seed/17/200', 3.8),
('Burrito Brothers', 'https://picsum.photos/seed/18/200', 4.1),
('Ramen House', 'https://picsum.photos/seed/19/200', 4.7),
('Deli Delight', 'https://picsum.photos/seed/20/200', 4.0),
('Kebab Kingdom', 'https://picsum.photos/seed/21/200', 4.2),
('Ice Cream Island', 'https://picsum.photos/seed/22/200', 4.9),
('Pasta Primo', 'https://picsum.photos/seed/23/200', 4.3),
('Falafel Fresh', 'https://picsum.photos/seed/24/200', 4.5),
('Grill Master', 'https://picsum.photos/seed/25/200', 4.1),
('Berry Berry Smoothies', 'https://picsum.photos/seed/26/200', 4.4),
('Curry Corner', 'https://picsum.photos/seed/27/200', 4.2),
('Bao Bun Shop', 'https://picsum.photos/seed/28/200', 4.6),
('The Salad Bar', 'https://picsum.photos/seed/29/200', 4.0),
('Midnight Munchies', 'https://picsum.photos/seed/30/200', 3.7),
('Waffle World', 'https://picsum.photos/seed/31/200', 4.5),
('Pita Pocket', 'https://picsum.photos/seed/32/200', 4.2),
('Dim Sum Den', 'https://picsum.photos/seed/33/200', 4.7),
('Chai & Chat', 'https://picsum.photos/seed/34/200', 4.4),
('The Fish Market', 'https://picsum.photos/seed/35/200', 4.3),
('BBQ Barn', 'https://picsum.photos/seed/36/200', 4.1),
('Soul Food Kitchen', 'https://picsum.photos/seed/37/200', 4.6),
('Crepe Cafe', 'https://picsum.photos/seed/38/200', 4.4),
('Zesty Zen', 'https://picsum.photos/seed/39/200', 4.2),
('The Bagel Bin', 'https://picsum.photos/seed/40/200', 4.0),
('Tandoori Times', 'https://picsum.photos/seed/41/200', 4.5),
('Poke Paradise', 'https://picsum.photos/seed/42/200', 4.8),
('The Soup Spot', 'https://picsum.photos/seed/43/200', 4.1),
('Greek Gods Gyros', 'https://picsum.photos/seed/44/200', 4.4),
('Juice Junction', 'https://picsum.photos/seed/45/200', 4.3),
('Hot Dog Heaven', 'https://picsum.photos/seed/46/200', 3.9),
('Tapas Terrace', 'https://picsum.photos/seed/47/200', 4.6),
('Biscuit Bakery', 'https://picsum.photos/seed/48/200', 4.5),
('Nacho Normal', 'https://picsum.photos/seed/49/200', 4.0),
('The Espresso Lab', 'https://picsum.photos/seed/50/200', 4.7);

-- Link Restaurants to Tags (A few examples)
INSERT INTO restaurant_tags (restaurant_id, tag_id)
SELECT r.id, t.id FROM restaurants r, tags t WHERE r.name = 'The Burger Joint' AND t.tag_name = 'Burger';
INSERT INTO restaurant_tags (restaurant_id, tag_id)
SELECT r.id, t.id FROM restaurants r, tags t WHERE r.name = 'Pizza Palace' AND t.tag_name = 'Pizza';
-- (In a real app, you would map all 50 in your backend code or a script)



CREATE TABLE menu_items (
    id SERIAL PRIMARY KEY,
    restaurant_id INT REFERENCES restaurants(id) ON DELETE CASCADE,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL,
    image_url TEXT,
    category VARCHAR(50), -- e.g., 'Appetizer', 'Main', 'Dessert', 'Drinks'
    is_available BOOLEAN DEFAULT true, -- To hide items when they are sold out
    calories INT
);



-- This script populates all 50 restaurants with 10 meals each (500 total)
INSERT INTO menu_items (restaurant_id, name, description, price, category, image_url)
SELECT 
    r.id,
    m.name,
    m.description,
    m.price,
    m.category,
    'https://picsum.photos/seed/' || r.id || m.id_offset || '/400/300'
FROM restaurants r
JOIN (
    -- Burger/Grill Menu Template
    SELECT 'Burger' as type, 1 as id_offset, 'Classic Cheeseburger' as name, 'Angus beef, cheddar, lettuce, tomato' as description, 12.99 as price, 'Main' as category UNION ALL
    SELECT 'Burger', 2, 'Bacon BBQ Burger', 'Smoky bacon, onion rings, BBQ sauce', 14.50, 'Main' UNION ALL
    SELECT 'Burger', 3, 'Mushroom Swiss', 'Sautéed mushrooms, melted swiss', 13.99, 'Main' UNION ALL
    SELECT 'Burger', 4, 'Spicy Zinger', 'Crispy chicken, jalapeños, spicy mayo', 11.99, 'Main' UNION ALL
    SELECT 'Burger', 5, 'Loaded Fries', 'Cheese sauce, bacon bits, chives', 7.50, 'Sides' UNION ALL
    SELECT 'Burger', 6, 'Mozzarella Sticks', '6 pieces with marinara dip', 6.99, 'Sides' UNION ALL
    SELECT 'Burger', 7, 'Coleslaw', 'Fresh creamy cabbage salad', 3.50, 'Sides' UNION ALL
    SELECT 'Burger', 8, 'Chocolate Shake', 'Thick hand-spun milkshake', 5.99, 'Drinks' UNION ALL
    SELECT 'Burger', 9, 'Iced Cola', 'Large fountain drink with ice', 2.50, 'Drinks' UNION ALL
    SELECT 'Burger', 10, 'Hot Fudge Sundae', 'Vanilla soft serve with fudge', 4.99, 'Dessert' UNION ALL

    -- Pizza/Italian Menu Template
    SELECT 'Pizza', 1, 'Pepperoni Passion', 'Double pepperoni, double cheese', 16.99, 'Main' UNION ALL
    SELECT 'Pizza', 2, 'Garden Veggie', 'Peppers, onions, olives, mushrooms', 15.50, 'Main' UNION ALL
    SELECT 'Pizza', 3, 'Meat Lovers', 'Sausage, pepperoni, ham, beef', 18.99, 'Main' UNION ALL
    SELECT 'Pizza', 4, 'Garlic Breadsticks', '8 pieces with garlic butter', 5.99, 'Sides' UNION ALL
    SELECT 'Pizza', 5, 'Buffalo Wings', 'Spicy chicken wings (10pcs)', 12.99, 'Sides' UNION ALL
    SELECT 'Pizza', 6, 'Caesar Salad', 'Fresh romaine and parmesan', 8.50, 'Salads' UNION ALL
    SELECT 'Pizza', 7, 'Cheesy Crust Add-on', 'Upgrade to stuffed crust', 3.00, 'Extras' UNION ALL
    SELECT 'Pizza', 8, 'Tiramisu', 'Authentic coffee-layered cake', 7.99, 'Dessert' UNION ALL
    SELECT 'Pizza', 9, 'Bottle of Water', '500ml spring water', 1.50, 'Drinks' UNION ALL
    SELECT 'Pizza', 10, 'Orange Soda', 'Refreshing citrus bubbly drink', 2.50, 'Drinks' UNION ALL

    -- Sushi/Asian Menu Template
    SELECT 'Sushi', 1, 'Salmon Nigiri', 'Fresh salmon over vinegar rice', 14.00, 'Sushi' UNION ALL
    SELECT 'Sushi', 2, 'California Roll', 'Crab, avocado, and cucumber', 9.50, 'Rolls' UNION ALL
    SELECT 'Sushi', 3, 'Dragon Roll', 'Eel and cucumber topped with avocado', 15.99, 'Rolls' UNION ALL
    SELECT 'Sushi', 4, 'Shrimp Tempura', '4 pieces of crispy fried shrimp', 11.00, 'Appetizers' UNION ALL
    SELECT 'Sushi', 5, 'Miso Soup', 'Traditional soybean broth', 4.00, 'Soups' UNION ALL
    SELECT 'Sushi', 6, 'Edamame', 'Steamed soybeans with sea salt', 5.00, 'Appetizers' UNION ALL
    SELECT 'Sushi', 7, 'Gyoza', '6 pieces of pan-fried dumplings', 8.50, 'Appetizers' UNION ALL
    SELECT 'Sushi', 8, 'Green Tea Ice Cream', 'Creamy matcha flavored dessert', 6.00, 'Dessert' UNION ALL
    SELECT 'Sushi', 9, 'Hot Green Tea', 'Traditional brewed tea', 2.50, 'Drinks' UNION ALL
    SELECT 'Sushi', 10, 'Sake (Small)', 'Warm traditional rice wine', 12.00, 'Drinks' UNION ALL

    -- Healthy/Salad Menu Template
    SELECT 'Healthy', 1, 'Quinoa Power Bowl', 'Quinoa, kale, sweet potato', 13.50, 'Bowls' UNION ALL
    SELECT 'Healthy', 2, 'Avocado Toast', 'Sourdough with poached egg', 10.99, 'Breakfast' UNION ALL
    SELECT 'Healthy', 3, 'Grilled Chicken Salad', 'Mixed greens with lemon vinaigrette', 12.50, 'Salads' UNION ALL
    SELECT 'Healthy', 4, 'Hummus & Pita', 'Homemade hummus with warm pita', 7.99, 'Sides' UNION ALL
    SELECT 'Healthy', 5, 'Fruit Salad', 'Seasonal fresh cut fruits', 6.50, 'Dessert' UNION ALL
    SELECT 'Healthy', 6, 'Lentil Soup', 'High protein organic lentils', 7.00, 'Soups' UNION ALL
    SELECT 'Healthy', 7, 'Greek Yogurt Parfait', 'Yogurt, granola, and honey', 5.99, 'Breakfast' UNION ALL
    SELECT 'Healthy', 8, 'Green Smoothie', 'Spinach, kale, apple, ginger', 7.50, 'Drinks' UNION ALL
    SELECT 'Healthy', 9, 'Detox Water', 'Cucumber and mint infused water', 3.00, 'Drinks' UNION ALL
    SELECT 'Healthy', 10, 'Chia Seed Pudding', 'Coconut milk and blueberries', 6.50, 'Dessert' UNION ALL

    -- Default/Cafe Menu Template
    SELECT 'Other', 1, 'Daily Special', 'Ask your server for details', 15.00, 'Main' UNION ALL
    SELECT 'Other', 2, 'Club Sandwich', 'Turkey, bacon, lettuce, tomato', 11.50, 'Main' UNION ALL
    SELECT 'Other', 3, 'Soup of the Day', 'Freshly made seasonal soup', 6.00, 'Soups' UNION ALL
    SELECT 'Other', 4, 'Side Salad', 'Small house green salad', 4.50, 'Sides' UNION ALL
    SELECT 'Other', 5, 'French Fries', 'Crispy golden potato fries', 4.00, 'Sides' UNION ALL
    SELECT 'Other', 6, 'Chocolate Cookie', 'Baked fresh in-house', 2.50, 'Dessert' UNION ALL
    SELECT 'Other', 7, 'Hot Coffee', 'Premium roasted beans', 3.50, 'Drinks' UNION ALL
    SELECT 'Other', 8, 'Hot Tea', 'Choice of herbal or black', 3.00, 'Drinks' UNION ALL
    SELECT 'Other', 9, 'Lemonade', 'Freshly squeezed lemons', 4.00, 'Drinks' UNION ALL
    SELECT 'Other', 10, 'Cheesecake', 'New York style with berry sauce', 7.50, 'Dessert'
) m ON (
    CASE 
        WHEN r.name ILIKE '%Burger%' OR r.name ILIKE '%Grill%' OR r.name ILIKE '%Chicken%' THEN m.type = 'Burger'
        WHEN r.name ILIKE '%Pizza%' OR r.name ILIKE '%Pasta%' THEN m.type = 'Pizza'
        WHEN r.name ILIKE '%Sushi%' OR r.name ILIKE '%Asian%' THEN m.type = 'Sushi'
        WHEN r.name ILIKE '%Healthy%' OR r.name ILIKE '%Salad%' THEN m.type = 'Healthy'
        ELSE m.type = 'Other'
    END
);