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
        multiplier := 2;
    ELSIF v_level = 'medium' THEN
        multiplier := 1.5;
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
