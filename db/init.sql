-- 1. Create the database
CREATE DATABASE IF NOT EXISTS canvas_app;
USE canvas_app;

-- 2. Create the extended notes table
DROP TABLE IF EXISTS notes;
CREATE TABLE notes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,                -- Person canvassed
  content TEXT,                              -- Notes from the conversation
  canvasser_name VARCHAR(255),               -- Volunteer/staffer doing the outreach
  contact_method ENUM('in-person', 'phone', 'email', 'door-hanger') NOT NULL,
  follow_up_needed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Insert sample data
INSERT INTO notes (name, content, canvasser_name, contact_method, follow_up_needed) VALUES
('Maria Lopez', 'Supports our candidate, especially interested in education policy. Might volunteer.', 'Jamal Rivera', 'in-person', TRUE),
('John Kim', 'Undecided, asked about healthcare reform. Wants a flyer emailed.', 'Sophie Zhang', 'phone', TRUE),
('Aisha Hassan', 'Strong supporter. Voted early last election. Shared canvassing tips.', 'David Green', 'in-person', FALSE),
('Robert Johnson', 'No answer. Left a door hanger.', 'Emily Nguyen', 'door-hanger', FALSE),
('Linh Tran', 'Concerned about local policing. Wants more info on community safety platform.', 'Jamal Rivera', 'in-person', TRUE),
('Carlos Reyes', 'Moved recently, not yet registered. Explained how to register online.', 'Alex Martinez', 'phone', TRUE),
('Evelyn Parker', 'Not interested. Polite but declined to discuss politics.', 'Emily Nguyen', 'in-person', FALSE),
('James Nguyen', 'Leans other party. Respectful conversation, asked for fact sheet.', 'David Green', 'in-person', TRUE),
('Fatima Ali', 'Excited to see more representation. Might bring friends to the town hall.', 'Sophie Zhang', 'email', TRUE),
('Sam Thompson', 'Disabled veteran. Talked about healthcare access. Very thoughtful conversation.', 'Alex Martinez', 'in-person', FALSE);
