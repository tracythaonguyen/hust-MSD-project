CREATE OR REPLACE FUNCTION update_total_score()
RETURNS TRIGGER AS $$
DECLARE
    v_level VARCHAR(50);
    multiplier FLOAT;
BEGIN
    SELECT level INTO v_level 
    FROM video 
    WHERE video_id = NEW.video_id;

    IF v_level = 'hard' THEN
        multiplier := 3;
    ELSIF v_level = 'medium' THEN
        multiplier := 2;
    ELSE
        multiplier := 1;
    END IF;

    UPDATE CPA
    SET total_score = total_score + (1 * multiplier)
    WHERE learner_id = NEW.learner_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to call the function when a track is marked as completed
CREATE TRIGGER update_score_after_completion
AFTER UPDATE OF completed ON history
FOR EACH ROW
WHEN (NEW.completed = 1)
EXECUTE FUNCTION update_total_score();


--Test case 1: complete track in hard video:
INSERT INTO account (username, password, email, user_role, first_name, last_name) VALUES ('test_user1', 'test_pass', 'test1@example.com', 'learner', 'Test', 'User1');
INSERT INTO learner (age, occupation, account_id) VALUES (25, 'Test Occupation', (SELECT account_id FROM account WHERE username = 'test_user1'));
INSERT INTO category (category_name) VALUES ('Hard Level Category');
INSERT INTO video (video_title, category_id, level, source_link) VALUES ('Hard Level Video', (SELECT category_id FROM category WHERE category_name = 'Hard Level Category'), 'hard', 'http://example.com');
INSERT INTO track (track_id, video_id, start_time, end_time, transcript) VALUES (101, (SELECT video_id FROM video WHERE video_title = 'Hard Level Video'), 0, 60, 'Test Transcript');
INSERT INTO CPA (learner_id, total_score) VALUES ((SELECT learner_id FROM learner WHERE account_id = (SELECT account_id FROM account WHERE username = 'test_user1')), 0);

INSERT INTO history (learner_id, video_id, track_id, completed)
VALUES
((SELECT learner_id 
  FROM learner 
  WHERE account_id = (SELECT account_id 
					  FROM account 
					  WHERE username = 'test_user1')), (SELECT video_id 
														FROM video 
														WHERE video_title = 'Hard Level Video'), 101, 0);

UPDATE history 
SET completed = 1 
WHERE learner_id = (SELECT learner_id 
					FROM learner 
					WHERE account_id = (SELECT account_id 
										FROM account 
										WHERE username = 'test_user1')) 
AND video_id = (SELECT video_id 
				FROM video 
				WHERE video_title = 'Hard Level Video') 
AND track_id = 101;

SELECT * FROM CPA WHERE learner_id = (SELECT learner_id FROM learner WHERE account_id = (SELECT account_id FROM account WHERE username = 'test_user1'));

--Test case 2: complete track in medium video:

-- Insert data for test case 2
INSERT INTO account (username, password, email, user_role, first_name, last_name) VALUES ('test_user2', 'test_pass', 'test2@example.com', 'learner', 'Test', 'User2');
INSERT INTO learner (age, occupation, account_id) VALUES (26, 'Test Occupation 2', (SELECT account_id FROM account WHERE username = 'test_user2'));
INSERT INTO category (category_name) VALUES ('Medium Level Category');
INSERT INTO video (video_title, category_id, level, source_link) VALUES ('Medium Level Video', (SELECT category_id FROM category WHERE category_name = 'Medium Level Category'), 'medium', 'http://example.com');
INSERT INTO track (track_id, video_id, start_time, end_time, transcript) VALUES (201, (SELECT video_id FROM video WHERE video_title = 'Medium Level Video'), 0, 60, 'Test Transcript 2');
INSERT INTO CPA (learner_id, total_score) VALUES ((SELECT learner_id FROM learner WHERE account_id = (SELECT account_id FROM account WHERE username = 'test_user2')), 10);

-- Initial state in history (track not completed)
INSERT INTO history (learner_id, video_id, track_id, completed)
VALUES
((SELECT learner_id FROM learner WHERE account_id = (SELECT account_id FROM account WHERE username = 'test_user2')), (SELECT video_id FROM video WHERE video_title = 'Medium Level Video'), 201, 0);

-- Mark the track as completed
UPDATE history 
SET completed = 1 
WHERE learner_id = (SELECT learner_id FROM learner WHERE account_id = (SELECT account_id FROM account WHERE username = 'test_user2')) 
AND video_id = (SELECT video_id FROM video WHERE video_title = 'Medium Level Video') 
AND track_id = 201;

-- Check the updated score
SELECT * FROM CPA WHERE learner_id = (SELECT learner_id FROM learner WHERE account_id = (SELECT account_id FROM account WHERE username = 'test_user2'));

select * from learner

select * from history

select * from video

select * from category

select * from track