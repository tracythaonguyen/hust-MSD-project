INSERT INTO account (username, password, email, user_role, first_name, last_name)
VALUES
('admin', 'password123', 'admin@gmail.com', 'admin', 'Ad', 'Min'),
('jane_smith', 'password123456', 'jane.smith@example.com', 'learner', 'Jane', 'Smith'),
('sam_black', 'passwordsam987', 'sam.black@example.com', 'learner', 'Sam', 'Black'),
('lisa_green', 'greenpassword234', 'lisa.green@example.com', 'learner', 'Lisa', 'Green'),
('alex_brown', 'alexbrownpass', 'alex.brown@example.com', 'learner', 'Alex', 'Brown');

INSERT INTO learner (age, occupation, account_id)
VALUES
(25, 'Software Developer', 2),
(22, 'Graphic Designer', 3),
(28, 'Data Analyst', 4),
(30, 'Researcher', 5);

INSERT INTO category (category_name)
VALUES
('Movies'),
('News'),
('Interview'),
('Podcast'),
('Vlog'),
('Presentation'),
('Talkshow'),
('Animations');

INSERT INTO video(video_title, category_id, level, source_link)
VALUES
('Brooklyn Nine-Nine',1,'Medium','https://www.youtube.com/watch?v=LUE48DT8MyY'),
('Mini cheesecakes', 2, 'Medium', 'https://www.youtube.com/watch?v=3NE6rb1n8iU');

INSERT INTO track (track_id, video_id, start_time, end_time, transcript)
VALUES
(1, 1, 0, 1.07, 'Sir do you have a minute'),
(2, 1, 1.07, 2.55, 'I wanted to apologize'),
(3, 1, 2.55, 6.1, 'Being back at work has been weird');

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

INSERT INTO tag_to_video (tag_id, video_id)
VALUES
(10, 1),
(3, 2),
(9, 2);

INSERT INTO progress (learner_id, video_id, highest_score)
VALUES
(2, 1, 30),
(4, 1, 10);

INSERT INTO history (learner_id, video_id, track_id, track_score)
VALUES
(2, 1, 1, 10),
(2, 1, 2, 10),
(2, 1, 3, 10),
(4, 1, 1, 10);

INSERT INTO favorite (learner_id, video_id)
VALUES
(2, 1),
(3, 1),
(2, 2);

INSERT INTO CPA (learner_id, total_score)
VALUES
(2, 60),
(4, 20);
