CREATE TABLE IF NOT EXISTS Users (
    id BIGSERIAL PRIMARY KEY,
    uuid VARCHAR NOT NULL UNIQUE,
    fullname VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    gender VARCHAR(50),
    is_deleted BOOLEAN DEFAULT false,
    created_at DATE NOT NULL,
    updated_at DATE NOT NULL
);