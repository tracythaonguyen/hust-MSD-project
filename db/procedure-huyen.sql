-- for update total_score in learner table
CREATE OR REPLACE FUNCTION update_learner_score()
RETURNS TRIGGER AS $$
DECLARE
    video_level VARCHAR(50);
    score_increment INT;
BEGIN
    -- Retrieve the level of the video
    SELECT level INTO video_level FROM video WHERE video_id = NEW.video_id;

    -- Determine the score increment based on the level of the video
    CASE video_level
        WHEN 'Easy' THEN score_increment := 1;
        WHEN 'Medium' THEN score_increment := 2;
        WHEN 'Hard' THEN score_increment := 3;
        ELSE score_increment := 0; -- Default case if the level is not defined
    END CASE;

    UPDATE learner SET total_score = total_score + score_increment WHERE learner_id = NEW.learner_id;

    RETURN NEW;
END;
$$ 
LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_score
AFTER UPDATE OF completed ON history
FOR EACH ROW
WHEN (OLD.completed = 0 AND NEW.completed = 1)
EXECUTE PROCEDURE update_learner_score();

select * from history;
INSERT INTO history (learner_id, video_id, track_id)
VALUES 
(3, 1, 1),
(3, 2, 1);
UPDATE history SET completed = 1 WHERE learner_id = 3 AND video_id = 1 AND track_id = 1;
select * from learner;
UPDATE history SET completed = 1 WHERE learner_id = 3 AND video_id = 2 AND track_id = 1;
select * from learner;

--for update click_time in progress table
CREATE OR REPLACE FUNCTION update_click_time(p_learner_id INT, p_video_id INT)
RETURNS VOID AS $$
BEGIN
    -- Check if a progress record already exists for this learner and video
    IF EXISTS (SELECT 1 FROM progress WHERE learner_id = p_learner_id AND video_id = p_video_id) THEN
        -- Update the existing record
        UPDATE progress 
        SET click_time = CURRENT_TIMESTAMP 
        WHERE learner_id = p_learner_id AND video_id = p_video_id;
    ELSE
        -- Insert a new record if it does not exist
        INSERT INTO progress (learner_id, video_id, click_time)
        VALUES (p_learner_id, p_video_id, CURRENT_TIMESTAMP);
    END IF;
END;
$$ LANGUAGE plpgsql;

SELECT update_click_time(2, 3);
select * from progress