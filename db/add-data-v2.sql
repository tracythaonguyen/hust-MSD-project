
-- Reset the serial sequence of account_id in the account table
SELECT setval('account_account_id_seq', (SELECT COALESCE(MAX(account_id), 1) FROM account), false);
SELECT setval('category_category_id_seq',(SELECT COALESCE(MAX(category_id), 1) FROM category), false);
SELECT setval('learner_learner_id_seq',(SELECT COALESCE(MAX(learner_id), 1) FROM learner), false);
SELECT setval('favorite_favorite_id_seq',(SELECT COALESCE(MAX(favorite_id), 1) FROM favorite), false);
SELECT setval('history_history_id_seq',(SELECT COALESCE(MAX(history_id), 1) FROM history), false);
SELECT setval('progress_progress_id_seq',(SELECT COALESCE(MAX(progress_id), 1) FROM progress), false);
SELECT setval('tag_tag_id_seq',(SELECT COALESCE(MAX(tag_id), 1) FROM tag), false);
SELECT setval('video_video_id_seq',(SELECT COALESCE(MAX(video_id), 1) FROM video), false);
-- Insert data into the account table
INSERT INTO account (username, password, email, user_role, first_name, last_name)
VALUES
('admin', 'password123', 'admin@gmail.com', 'admin', 'Ad', 'Min'),
('jane_smith', 'password123456', 'jane.smith@example.com', 'learner', 'Jane', 'Smith'),
('sam_black', 'passwordsam987', 'sam.black@example.com', 'learner', 'Sam', 'Black'),
('lisa_green', 'greenpassword234', 'lisa.green@example.com', 'learner', 'Lisa', 'Green'),
('alex_brown', 'alexbrownpass', 'alex.brown@example.com', 'learner', 'Alex', 'Brown');

-- Insert data into the learner table
INSERT INTO learner (dob, occupation, account_id, total_score)
VALUES
('1995-01-15', 'Software Developer', 2, 0),
('1998-06-20', 'Graphic Designer', 3, 0),
('1990-03-30', 'Data Analyst', 4, 0),
('2000-07-25', 'Researcher', 5, 0);

-- Insert data into the category table
INSERT INTO category (category_name, category_description)
VALUES
('Movies', 'Films from various genres and eras, covering a wide range of topics and styles.'),
('News', 'Latest updates and reports from around the world, including politics, weather, and more.'),
('Interview', 'One-on-one conversations with individuals from different fields, offering insights and personal stories.'),
('Podcast', 'Audio or video episodes covering various topics, from educational to entertainment.'),
('Vlog', 'Personal video blogs sharing day-to-day experiences, travel adventures, and lifestyle.'),
('Presentation', 'Educational or informational content, often used in academic or professional settings.'),
('Talkshow', 'Entertaining discussions and interviews with guests, often involving audience participation.'),
('Animations', 'Animated content ranging from traditional cartoons to modern computer-generated productions.');

-- Insert data into the video table
INSERT INTO video(video_title, category_id, level, source_link, description)
VALUES
('Perry the Platypus plumber', 8, 'Easy', 'https://www.youtube.com/watch?v=nPz-OXEVafM', 'Clip from the Phineas and Ferb episode The Lemonade Stand'),
('Brooklyn Nine-Nine',1,'Medium','https://www.youtube.com/watch?v=LUE48DT8MyY', 'A short conversation video'),
('1 Minute Microwave CHOCOLATE CHIP COOKIE', 5, 'Medium', 'https://www.youtube.com/watch?v=Z6a6x0tH_pU', 'Easy 1 minute Chocolate Chip Cookies Recipe ! Microwave Chocolate Chip Cookie that tastes amazing!');

-- Insert data into the track table
INSERT INTO track (track_id, video_id, start_time, end_time, transcript)
VALUES
(1,1,0, 2, 'What, you have done already'),
(2,1,2,4, 'You have only been here for like 15 seconds'),
(3,1,4,6, 'and I was talking for like half of that'),
(4,1,6,7, 'What kind of a plumber are you'),
(5,1,10,11.5, 'A platypus plumber'),
(6,1,11.5,13.5, 'Perry the platypus plumber'),
(7,1,15.7,17, 'Perry the platypus'),
(1, 2, 0, 1.07, 'Sir do you have a minute'),
(2, 2, 1.07, 2.55, 'I wanted to apologize'),
(3, 2, 2.55, 6.1, 'Being back at work has been weird'),
(1,3,0, 4, 'Today, we are making this amazing one minute microwave cookie'),
(2,3,4,7, 'This is not a mug cookie, this is not a sad cookie'),
(3,3,7,10, 'This is a proper delicious microwave cookie'),
(4,3,10,14, 'I really wanted to develop a recipe for you that was quick and amazing'),
(5,3,14,17.5, 'Once you try this, you will always be making one minute chocolate chip cookie'),
(6,3,19,23.7, 'Okay so we are gonna start out with some good old butter which we are gonna melt in a microwave'),
(7,3,23.7,27.7, 'To this we are gonna add some brown sugar and a dash of milk which you will see in a moment'),
(8,3,27.7,31.3, 'I do not like to add eggs to any of my microwave recipes'),
(9,3,31.3,36.5, 'You know this eggs in the microwave usually become rubbery and we dont like to eat rubber'),
(10,3,36.5,38.5, 'Not on my channel okay'),
(11,3,38.5,41, 'So we are gonna substitute the eggs with a dash of milk');

-- Insert data into the tag table
INSERT INTO tag (tag_name)
VALUES
('Education'),
('Fashion'),
('Language Learning'),
('DIY'),
('Science'),
('Travel'),
('Music'),
('Technology'),
('Cooking'),
('Comedy');

-- Insert data into the tag_to_video table
INSERT INTO tag_to_video (tag_id, video_id)
VALUES
(10, 1),
(10, 2),
(9, 3);

-- Insert data into the history table
INSERT INTO history (learner_id, video_id, track_id, completed)
VALUES
(2, 1, 1,0),
(2, 1, 2,0),
(2, 1, 3,0),
(4, 1, 1,1),
(4, 1, 2,1),
(4, 1, 3,0);

-- Insert data into the progress table
INSERT INTO progress (learner_id, video_id, highest_score, click_time)
VALUES 
(2, 1, 30, '2023-12-21 15:30:45'),
(4, 1, 10, '2023-12-21 08:05:12');

-- Insert data into the favorite table
INSERT INTO favorite (learner_id, video_id)
VALUES 
  (1, 1),
  (2, 2);

--Insert data into the feedback table
INSERT INTO feedback(learner_id, video_id, content)
VALUES 
  (2, 1, 'good'),
  (2, 2, 'not bad');


