CREATE TABLE IF NOT EXISTS users (
    user_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    username string NOT NULL,
    email string NOT NULL,
    pic_url string,
    member_since timestamp DEFAULT now(),
    last_login timestamp DEFAULT now()
);
CREATE TABLE IF NOT EXISTS songs (
    song_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES users(user_id),
    name string NOT NULL,
    length time NOT NULL,
    storage_url string NOT NULL,
    plays int8 DEFAULT 0,
    date_uploaded timestamp DEFAULT now(),
    art_url string
);
CREATE TABLE IF NOT EXISTS songComments (
    comment_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    song_id uuid REFERENCES songs(song_id),
    user_id uuid REFERENCES users(user_id),
    message string NOT NULL,
    date_posted timestamp DEFAULT now()
);
CREATE TABLE IF NOT EXISTS songLikes (
    like_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    song_id uuid REFERENCES songs(song_id),
    user_id uuid REFERENCES users(user_id)
);
CREATE TABLE IF NOT EXISTS commentLikes (
    like_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    comment_id uuid REFERENCES songComments(comment_id),
    user_id uuid REFERENCES users(user_id)
);